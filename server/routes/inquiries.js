import express from 'express';
import { db } from '../db.js';

const router = express.Router();

// GET /api/inquiries - List leads with filters
router.get('/', (req, res) => {
  try {
    const { type, status, search } = req.query;
    const items = db.getInquiries({ type, status, search });
    res.json({ success: true, count: items.length, data: items });
  } catch (err) {
    console.error('Error fetching inquiries:', err);
    res.status(500).json({ success: false, message: 'Gagal mengambil data leads' });
  }
});

// GET /api/inquiries/export - Export leads to CSV
router.get('/export', (req, res) => {
  try {
    const items = db.getInquiries();
    const headers = ['ID', 'Tipe', 'Nama', 'Telepon', 'Email', 'Tipe Proyek', 'Status', 'Budget', 'Tanggal Masuk', 'Catatan'];
    
    const rows = items.map((item) => [
      item.id,
      item.type,
      `"${(item.name || '').replace(/"/g, '""')}"`,
      `"${item.phone || ''}"`,
      `"${item.email || ''}"`,
      `"${(item.projectType || '').replace(/"/g, '""')}"`,
      item.status,
      `"${item.budget || '-'}"`,
      new Date(item.createdAt).toLocaleString('id-ID'),
      `"${(item.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="leads_kontraktor_${Date.now()}.csv"`);
    res.send('\uFEFF' + csvContent); // UTF-8 BOM for Excel compatibility
  } catch (err) {
    console.error('Error exporting CSV:', err);
    res.status(500).json({ success: false, message: 'Gagal mengekspor CSV' });
  }
});

// POST /api/inquiries - Create new lead
router.post('/', (req, res) => {
  try {
    const { name, phone, type, email, projectType, notes, budget, duration, unitCount } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Nama dan nomor telepon/WhatsApp wajib diisi'
      });
    }

    const created = db.createInquiry({
      name,
      phone,
      type: type || 'consult',
      email,
      projectType,
      notes,
      budget,
      duration,
      unitCount
    });

    res.status(201).json({
      success: true,
      message: 'Permohonan berhasil dikirim. Tim teknis kami akan segera menghubungi Anda.',
      data: created
    });
  } catch (err) {
    console.error('Error creating inquiry:', err);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan sistem saat memproses permohonan' });
  }
});

// PATCH /api/inquiries/:id/status - Update lead status
router.patch('/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Baru', 'Dihubungi', 'Survey Lokasi', 'SPK / Deal', 'Batal'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status tidak valid. Pilihan: ${validStatuses.join(', ')}`
      });
    }

    const updated = db.updateInquiryStatus(id, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Data leads tidak ditemukan' });
    }

    res.json({ success: true, message: 'Status berhasil diperbarui', data: updated });
  } catch (err) {
    console.error('Error updating inquiry status:', err);
    res.status(500).json({ success: false, message: 'Gagal memperbarui status' });
  }
});

// DELETE /api/inquiries/:id - Delete lead
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const deleted = db.deleteInquiry(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Data leads tidak ditemukan' });
    }
    res.json({ success: true, message: 'Data leads berhasil dihapus' });
  } catch (err) {
    console.error('Error deleting inquiry:', err);
    res.status(500).json({ success: false, message: 'Gagal menghapus data' });
  }
});

export default router;
