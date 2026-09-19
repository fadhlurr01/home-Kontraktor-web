import express from 'express';
import { db } from '../db.js';

const router = express.Router();

// POST /api/admin/login - Verify admin PIN
router.post('/login', (req, res) => {
  try {
    const { pin } = req.body;
    if (!pin) {
      return res.status(400).json({ success: false, message: 'PIN admin wajib dimasukkan' });
    }

    const isValid = db.verifyAdmin(pin);
    if (!isValid) {
      return res.status(401).json({ success: false, message: 'PIN Admin tidak valid' });
    }

    // Return session token (simple base64 hash with timestamp for lightweight auth)
    const token = Buffer.from(`admin_${Date.now()}_authenticated`).toString('base64');
    res.json({
      success: true,
      token,
      message: 'Autentikasi admin berhasil'
    });
  } catch (err) {
    console.error('Admin login error:', err);
    res.status(500).json({ success: false, message: 'Gagal melakukan login admin' });
  }
});

// GET /api/admin/stats - KPI Dashboard stats
router.get('/stats', (req, res) => {
  try {
    const stats = db.getStats();
    res.json({ success: true, data: stats });
  } catch (err) {
    console.error('Admin stats error:', err);
    res.status(500).json({ success: false, message: 'Gagal mengambil data statistik' });
  }
});

export default router;
