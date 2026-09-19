import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'contractor_data.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial seed data
const initialData = {
  inquiries: [
    {
      id: 'lead-101',
      type: 'consult',
      name: 'Ir. Bambang Soedibyo',
      phone: '081288992211',
      email: 'bambang.s@megatower.co.id',
      projectType: 'Desain Interior & Fit-Out Komersial',
      notes: 'Rencana renovasi 3 lantai kantor pusat, butuh spesifikasi high-grade acoustic & HVAC.',
      budget: 'Rp 850.000.000 - Rp 1.500.000.000',
      status: 'Survey Lokasi', // 'Baru' | 'Dihubungi' | 'Survey Lokasi' | 'SPK / Deal' | 'Batal'
      createdAt: new Date(Date.now() - 24 * 3600 * 1000 * 2).toISOString()
    },
    {
      id: 'lead-102',
      type: 'rfp',
      name: 'PT Cahaya Sentosa Land',
      phone: '081399884433',
      email: 'procurement@cahayaland.id',
      projectType: 'Konstruksi Sipil & Bangunan Bertingkat',
      notes: 'Tender pembangunan gudang logistik modern 4.500 m2 di Karawang Industrial Estate.',
      budget: 'Rp 5.000.000.000+',
      status: 'Dihubungi',
      createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString()
    },
    {
      id: 'lead-103',
      type: 'fleet',
      name: 'Hendrik Pratama, ST',
      phone: '085711223344',
      email: 'hendrik.kontraktor@gmail.com',
      projectType: 'Sewa Alat Berat & Earthmoving',
      notes: 'Sewa 2 unit Excavator CAT 320D dan 1 unit Vibro Roller 10 ton durasi 3 bulan di Cibubur.',
      budget: 'Rp 120.000.000 / bulan',
      status: 'Baru',
      createdAt: new Date().toISOString()
    }
  ],
  estimates: [],
  settings: {
    companyName: 'Nusantara Karya Konstruksi',
    emailNotification: 'admin@kontraktor.id',
    contactWhatsapp: '6281234567890',
    adminPin: 'admin123'
  }
};

class Database {
  constructor() {
    this.init();
  }

  init() {
    if (!fs.existsSync(DB_FILE)) {
      this.save(initialData);
    }
  }

  load() {
    try {
      if (!fs.existsSync(DB_FILE)) {
        this.save(initialData);
        return initialData;
      }
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(raw);
    } catch (err) {
      console.error('Database load error:', err);
      return initialData;
    }
  }

  save(data) {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Database save error:', err);
    }
  }

  // --- Inquiries Operations ---
  getInquiries({ type, status, search } = {}) {
    const data = this.load();
    let list = data.inquiries || [];

    if (type && type !== 'all') {
      list = list.filter((item) => item.type === type);
    }

    if (status && status !== 'all') {
      list = list.filter((item) => item.status === status);
    }

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (item) =>
          (item.name && item.name.toLowerCase().includes(q)) ||
          (item.phone && item.phone.includes(q)) ||
          (item.projectType && item.projectType.toLowerCase().includes(q)) ||
          (item.notes && item.notes.toLowerCase().includes(q))
      );
    }

    // Sort newest first
    return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  getInquiryById(id) {
    const data = this.load();
    return (data.inquiries || []).find((item) => item.id === id);
  }

  createInquiry(payload) {
    const data = this.load();
    const newInquiry = {
      id: 'lead-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
      type: payload.type || 'consult',
      name: payload.name || 'Anonymous Client',
      phone: payload.phone || '',
      email: payload.email || '',
      projectType: payload.projectType || 'Konstruksi Umum',
      notes: payload.notes || '',
      budget: payload.budget || '-',
      duration: payload.duration || '-',
      unitCount: payload.unitCount || null,
      status: 'Baru',
      createdAt: new Date().toISOString()
    };

    if (!data.inquiries) data.inquiries = [];
    data.inquiries.unshift(newInquiry);
    this.save(data);
    return newInquiry;
  }

  updateInquiryStatus(id, newStatus) {
    const data = this.load();
    const item = (data.inquiries || []).find((i) => i.id === id);
    if (!item) return null;

    item.status = newStatus;
    item.updatedAt = new Date().toISOString();
    this.save(data);
    return item;
  }

  deleteInquiry(id) {
    const data = this.load();
    const beforeCount = (data.inquiries || []).length;
    data.inquiries = (data.inquiries || []).filter((i) => i.id !== id);
    if (data.inquiries.length !== beforeCount) {
      this.save(data);
      return true;
    }
    return false;
  }

  // --- Estimates ---
  createEstimate(payload) {
    const data = this.load();
    const newEst = {
      id: 'est-' + Date.now().toString(36),
      ...payload,
      createdAt: new Date().toISOString()
    };
    if (!data.estimates) data.estimates = [];
    data.estimates.unshift(newEst);
    this.save(data);
    return newEst;
  }

  // --- KPI Stats ---
  getStats() {
    const data = this.load();
    const inquiries = data.inquiries || [];
    const totalLeads = inquiries.length;
    const newLeads = inquiries.filter((i) => i.status === 'Baru').length;
    const activeSurvey = inquiries.filter((i) => i.status === 'Survey Lokasi').length;
    const deals = inquiries.filter((i) => i.status === 'SPK / Deal').length;

    return {
      totalLeads,
      newLeads,
      activeSurvey,
      deals,
      conversionRate: totalLeads > 0 ? Math.round((deals / totalLeads) * 100) : 0,
      estimatesCalculated: (data.estimates || []).length
    };
  }

  // --- Admin PIN Verification ---
  verifyAdmin(pin) {
    const data = this.load();
    const configuredPin = data.settings?.adminPin || 'admin123';
    return pin === configuredPin;
  }
}

export const db = new Database();
