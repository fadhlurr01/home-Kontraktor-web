import express from 'express';
import { db } from '../db.js';

const router = express.Router();

// POST /api/calculator/estimate - Calculate construction cost based on parameters
router.post('/estimate', (req, res) => {
  try {
    const { area, specTier, projectType, floors = 1, contact } = req.body;

    const parsedArea = parseFloat(area) || 100;
    const numFloors = parseInt(floors, 10) || 1;

    // Rates per m² in IDR
    const baseRates = {
      standard: 3800000,   // Rp 3.8 jt/m2
      premium: 5500000,    // Rp 5.5 jt/m2
      luxury: 8200000      // Rp 8.2 jt/m2
    };

    const tier = specTier && baseRates[specTier] ? specTier : 'standard';
    const ratePerM2 = baseRates[tier];

    // Multiplier for multi-floor foundation & structural reinforcement
    const floorMultiplier = numFloors > 1 ? 1 + (numFloors - 1) * 0.12 : 1.0;

    const subtotal = parsedArea * ratePerM2 * floorMultiplier;
    const taxPpn = Math.round(subtotal * 0.11);
    const totalEstimate = subtotal + taxPpn;

    // Estimated timeline calculation (average 100m2 takes 90 days)
    const estimatedDays = Math.max(45, Math.round((parsedArea / 100) * 75 * (numFloors * 0.8)));

    const result = {
      area: parsedArea,
      floors: numFloors,
      specTier: tier,
      ratePerM2,
      subtotal,
      ppn: taxPpn,
      totalEstimate,
      estimatedDays,
      formattedTotal: 'Rp ' + totalEstimate.toLocaleString('id-ID'),
      formattedPerM2: 'Rp ' + ratePerM2.toLocaleString('id-ID')
    };

    // Store estimate in db
    db.createEstimate({
      ...result,
      contact: contact || null
    });

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    console.error('Calculator estimate error:', err);
    res.status(500).json({ success: false, message: 'Gagal melakukan kalkulasi estimasi biaya' });
  }
});

export default router;
