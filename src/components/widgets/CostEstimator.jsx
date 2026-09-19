import React, { useState } from 'react';
import { FileSpreadsheet } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function CostEstimator() {
  const { currency, openModal } = useApp();

  const [area, setArea] = useState(250);
  const [buildingType, setBuildingType] = useState('1.0');
  const [floors, setFloors] = useState('1.12');
  const [floorCount, setFloorCount] = useState(2);
  const [location, setLocation] = useState('1.0');
  const [tierRate, setTierRate] = useState(7800000); // Luxury default

  const handleAreaChange = (val) => {
    let num = parseInt(val, 10);
    if (isNaN(num)) num = 30;
    if (num < 30) num = 30;
    if (num > 5000) num = 5000;
    setArea(num);
  };

  const handleFloorsChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    setFloors(e.target.value);
    setFloorCount(parseInt(selectedOption.getAttribute('data-floors') || 2, 10));
  };

  // Calculation logic
  const typeFactor = parseFloat(buildingType);
  const floorFactor = parseFloat(floors);
  const locFactor = parseFloat(location);

  const baseCost = area * tierRate * typeFactor * floorFactor * locFactor;
  const structCost = baseCost * 0.45;
  const finishCost = baseCost * 0.30;
  const mepCost = baseCost * 0.25;

  let months = Math.ceil(area / 150) + floorCount * 1.5;
  months = Math.max(3, Math.min(Math.round(months), 24));

  // Currency formatting
  const rateUSD = 15500;
  const formatMoney = (val) => {
    if (currency === 'USD') {
      return `$${Math.round(val / rateUSD).toLocaleString()}`;
    }
    if (val >= 1000000000) {
      return `Rp ${(val / 1000000000).toFixed(2)} Miliar`;
    }
    return `Rp ${(val / 1000000).toFixed(0)} Juta`;
  };

  const formatSub = (val, pct) => {
    if (currency === 'USD') {
      return `$${Math.round(val / rateUSD).toLocaleString()} (${pct}%)`;
    }
    if (val >= 1000000000) {
      return `Rp ${(val / 1000000000).toFixed(2)} M (${pct}%)`;
    }
    return `Rp ${(val / 1000000).toFixed(1)} Jt (${pct}%)`;
  };

  return (
    <div className="calculator-layout">
      <div className="calc-controls">
        {/* Luas Bangunan */}
        <div className="calc-input-group">
          <label className="calc-label" htmlFor="calc-area-slider">
            <span>Luas Bangunan Proyek</span>
            <span className="calc-label-hint">Ketik angka / geser slider:</span>
          </label>
          <div className="calc-input-row-sync">
            <input
              type="range"
              min="30"
              max="3000"
              step="10"
              value={area}
              onChange={(e) => handleAreaChange(e.target.value)}
              className="calc-range-slider"
              id="calc-area-slider"
            />
            <div className="calc-number-box-wrapper">
              <input
                type="number"
                min="30"
                max="5000"
                step="5"
                value={area}
                onChange={(e) => handleAreaChange(e.target.value)}
                className="calc-number-input"
                id="calc-area-number"
              />
              <span className="calc-unit-label">m²</span>
            </div>
          </div>
        </div>

        {/* Kategori Bangunan & Jumlah Lantai Grid */}
        <div className="calc-grid-2col">
          <div className="calc-input-group" style={{ marginBottom: 0 }}>
            <label className="calc-label" htmlFor="calc-building-type">
              <span>Kategori Bangunan</span>
            </label>
            <select
              className="form-select"
              id="calc-building-type"
              value={buildingType}
              onChange={(e) => setBuildingType(e.target.value)}
            >
              <option value="1.0">Residensial / Villa Mewah (1.0x)</option>
              <option value="1.15">Gedung Komersial & Kantor (1.15x)</option>
              <option value="1.25">Bangunan Sipil & Industrial (1.25x)</option>
              <option value="1.40">Rumah Sakit / Hotel Bintang 5 (1.40x)</option>
            </select>
          </div>

          <div className="calc-input-group" style={{ marginBottom: 0 }}>
            <label className="calc-label" htmlFor="calc-floors-select">
              <span>Jumlah Lantai</span>
            </label>
            <select
              className="form-select"
              id="calc-floors-select"
              value={floors}
              onChange={handleFloorsChange}
            >
              <option value="1.0" data-floors="1">
                1 Lantai
              </option>
              <option value="1.12" data-floors="2">
                2 Lantai (+12%)
              </option>
              <option value="1.25" data-floors="4">
                3 - 4 Lantai (+25%)
              </option>
            </select>
          </div>
        </div>

        {/* Lokasi / Wilayah Proyek Indeks */}
        <div className="calc-input-group" style={{ marginTop: '1rem' }}>
          <label className="calc-label" htmlFor="calc-location-select">
            <span>Wilayah / Lokasi Konstruksi</span>
          </label>
          <select
            className="form-select"
            id="calc-location-select"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="1.0">Jabodetabek (Indeks Standar 1.0)</option>
            <option value="0.95">Surabaya & Jawa Timur (Indeks 0.95)</option>
            <option value="1.08">Bali & Nusa Tenggara (Indeks 1.08)</option>
            <option value="1.22">IKN Nusantara / Luar Jawa (Indeks 1.22)</option>
          </select>
        </div>

        {/* Tingkat Kualitas Material */}
        <div className="calc-input-group">
          <label className="calc-label">
            <span>Spesifikasi Mutu Material</span>
          </label>
          <div className="material-tier-options">
            <button
              type="button"
              className={`tier-option-btn ${tierRate === 4500000 ? 'active' : ''}`}
              onClick={() => setTierRate(4500000)}
            >
              <span className="tier-name">Standard</span>
              <span className="tier-rate">
                {currency === 'USD' ? '$290/m²' : 'Rp 4.5 Jt/m²'}
              </span>
            </button>
            <button
              type="button"
              className={`tier-option-btn ${tierRate === 7800000 ? 'active' : ''}`}
              onClick={() => setTierRate(7800000)}
            >
              <span className="tier-name">Luxury</span>
              <span className="tier-rate">
                {currency === 'USD' ? '$500/m²' : 'Rp 7.8 Jt/m²'}
              </span>
            </button>
            <button
              type="button"
              className={`tier-option-btn ${tierRate === 12500000 ? 'active' : ''}`}
              onClick={() => setTierRate(12500000)}
            >
              <span className="tier-name">Bespoke</span>
              <span className="tier-rate">
                {currency === 'USD' ? '$800/m²' : 'Rp 12.5 Jt/m²'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Crystal-Clear High-Contrast Result Card */}
      <div className="calc-result-card">
        <div>
          <div className="calc-title-hud">ESTIMASI ANGGARAN KASAR (RAB AWAL)</div>
          <div className="calc-result-total" id="calc-total-amount">
            {formatMoney(baseCost)}
          </div>
          <div className="calc-est-time" id="calc-est-time">
            ± {months} Bulan Kerja (Estimasi Jadwal Konstruksi)
          </div>

          <div className="calc-breakdown-list">
            <div className="calc-breakdown-item">
              <span>Pekerjaan Struktur & Pondasi:</span>
              <strong id="calc-struct-val">{formatSub(structCost, 45)}</strong>
            </div>
            <div className="calc-breakdown-item">
              <span>Pekerjaan Arsitektur & Finishing:</span>
              <strong id="calc-finish-val">{formatSub(finishCost, 30)}</strong>
            </div>
            <div className="calc-breakdown-item">
              <span>Pekerjaan MEP & Elektrikal:</span>
              <strong id="calc-mep-val">{formatSub(mepCost, 25)}</strong>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-cyan btn-block"
          style={{ marginTop: '1.75rem' }}
          onClick={() => openModal('rfp')}
        >
          <FileSpreadsheet style={{ width: 18, height: 18 }} />
          <span>Dapatkan Penawaran Detail & RAB Resmi</span>
        </button>
      </div>
    </div>
  );
}
