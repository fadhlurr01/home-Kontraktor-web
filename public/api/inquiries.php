<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$dataFile = __DIR__ . '/data_inquiries.json';

// Initialize data file if missing
if (!file_exists($dataFile)) {
    $initialData = [
        [
            'id' => 'lead-101',
            'type' => 'consult',
            'name' => 'Ir. Bambang Soedibyo',
            'phone' => '081288992211',
            'email' => 'bambang.s@megatower.co.id',
            'projectType' => 'Desain Interior & Fit-Out Komersial',
            'notes' => 'Rencana renovasi 3 lantai kantor pusat.',
            'budget' => 'Rp 850.000.000 - Rp 1.500.000.000',
            'status' => 'Survey Lokasi',
            'createdAt' => date('c', time() - 86400 * 2)
        ]
    ];
    file_put_contents($dataFile, json_encode($initialData, JSON_PRETTY_PRINT));
}

$items = json_decode(file_get_contents($dataFile), true) ?: [];

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $type = $_GET['type'] ?? 'all';
    $status = $_GET['status'] ?? 'all';
    $search = strtolower($_GET['search'] ?? '');

    $filtered = array_filter($items, function($item) use ($type, $status, $search) {
        if ($type !== 'all' && ($item['type'] ?? '') !== $type) return false;
        if ($status !== 'all' && ($item['status'] ?? '') !== $status) return false;
        if ($search !== '') {
            $matched = (stripos($item['name'] ?? '', $search) !== false) ||
                       (stripos($item['phone'] ?? '', $search) !== false) ||
                       (stripos($item['notes'] ?? '', $search) !== false);
            if (!$matched) return false;
        }
        return true;
    });

    echo json_encode(['success' => true, 'count' => count($filtered), 'data' => array_values($filtered)]);
    exit;
}

if ($method === 'POST') {
    $raw = file_get_contents('php://input');
    $body = json_decode($raw, true);

    if (!$body || empty($body['name']) || empty($body['phone'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Nama dan nomor telepon wajib diisi']);
        exit;
    }

    $newItem = [
        'id' => 'lead-' . uniqid(),
        'type' => $body['type'] ?? 'consult',
        'name' => htmlspecialchars($body['name']),
        'phone' => htmlspecialchars($body['phone']),
        'email' => htmlspecialchars($body['email'] ?? ''),
        'projectType' => htmlspecialchars($body['projectType'] ?? 'Konstruksi Umum'),
        'notes' => htmlspecialchars($body['notes'] ?? ''),
        'budget' => htmlspecialchars($body['budget'] ?? '-'),
        'duration' => htmlspecialchars($body['duration'] ?? '-'),
        'unitCount' => $body['unitCount'] ?? null,
        'status' => 'Baru',
        'createdAt' => date('c')
    ];

    array_unshift($items, $newItem);
    file_put_contents($dataFile, json_encode($items, JSON_PRETTY_PRINT));

    http_response_code(201);
    echo json_encode([
        'success' => true,
        'message' => 'Permohonan berhasil dikirim ke server cPanel.',
        'data' => $newItem
    ]);
    exit;
}

if ($method === 'PATCH') {
    $raw = file_get_contents('php://input');
    $body = json_decode($raw, true);
    $id = $_GET['id'] ?? ($body['id'] ?? '');
    $newStatus = $body['status'] ?? '';

    $found = false;
    foreach ($items as &$item) {
        if ($item['id'] === $id) {
            $item['status'] = $newStatus;
            $found = true;
            break;
        }
    }

    if ($found) {
        file_put_contents($dataFile, json_encode($items, JSON_PRETTY_PRINT));
        echo json_encode(['success' => true, 'message' => 'Status berhasil diubah']);
    } else {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Data tidak ditemukan']);
    }
    exit;
}

http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Method not allowed']);
