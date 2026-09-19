import React, { useState, useRef } from 'react';
import { MoveHorizontal } from 'lucide-react';

const projects = {
  villa: {
    before: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    after: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    labelBefore: 'BEFORE: GALIAN & STRUKTUR COR',
    labelAfter: 'AFTER: VILLA LUXURY FINISHED',
    title: 'Villa Tropis Sanctuary 2 Lantai - Canggu Bali',
    desc: 'Transformasi dari lahan kosong berkontur dan pengecoran pondasi cakar ayam bertulang menjadi villa tropis modern berfasad kayu ulin dengan infinity pool.',
    duration: '⏱️ Durasi: 6 Bulan',
    volume: '🧱 Volume Beton: 340 m³',
    value: '💰 Nilai Kontrak: Rp 3.8 Miliar'
  },
  office: {
    before: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    after: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    labelBefore: 'BEFORE: RAW CONCRETE & DUCTING',
    labelAfter: 'AFTER: EXECUTIVE OFFICE SCBD',
    title: 'Office Penthouse & Corporate Lounge - SCBD Jakarta',
    desc: 'Renovasi dan fit-out lantai kantor eksekutif dari kondisi bare shell beton kasar menjadi ruang kerja arsitektural berpanel akustik dan marmer travertine.',
    duration: '⏱️ Durasi: 4 Bulan',
    volume: '🏢 Luas Area: 850 m²',
    value: '💰 Nilai Kontrak: Rp 2.4 Miliar'
  },
  resto: {
    before: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
    after: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    labelBefore: 'BEFORE: DINDING BATA MENTAH',
    labelAfter: 'AFTER: MODERN BISTRO & LOUNGE',
    title: 'Modern Bistro & Boutique Lounge - Senopati',
    desc: 'Pembangunan interior hospitality dari struktur pasangan bata mentah dan instalasi kabel pipa terbuka menjadi restoran tematik hangat berkelas.',
    duration: '⏱️ Durasi: 3 Bulan',
    volume: '🍽️ Kapasitas: 120 Kursi',
    value: '💰 Nilai Kontrak: Rp 1.6 Miliar'
  }
};

export default function BeforeAfterSlider() {
  const [activeProject, setActiveProject] = useState('villa');
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);

  const cur = projects[activeProject] || projects.villa;

  const handlePointerMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pct);
  };

  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    handlePointerMove(e.clientX || (e.touches && e.touches[0].clientX));
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div>
      {/* Project Switcher */}
      <div className="ba-project-switcher">
        <button
          type="button"
          className={`ba-project-btn ${activeProject === 'villa' ? 'active' : ''}`}
          onClick={() => {
            setActiveProject('villa');
            setSliderPos(50);
          }}
        >
          Villa Tropis Canggu Bali
        </button>
        <button
          type="button"
          className={`ba-project-btn ${activeProject === 'office' ? 'active' : ''}`}
          onClick={() => {
            setActiveProject('office');
            setSliderPos(50);
          }}
        >
          Office Penthouse SCBD
        </button>
        <button
          type="button"
          className={`ba-project-btn ${activeProject === 'resto' ? 'active' : ''}`}
          onClick={() => {
            setActiveProject('resto');
            setSliderPos(50);
          }}
        >
          Bistro & Resto Modern
        </button>
      </div>

      {/* Slider Viewport */}
      <div
        ref={containerRef}
        className="ba-slider-container"
        style={{ '--ba-pos': `${sliderPos}%` }}
        onMouseDown={handlePointerDown}
        onMouseMove={(e) => {
          if (isDraggingRef.current) handlePointerMove(e.clientX);
        }}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={(e) => {
          if (isDraggingRef.current && e.touches[0]) handlePointerMove(e.touches[0].clientX);
        }}
        onTouchEnd={handlePointerUp}
      >
        <div className="ba-image before">
          <img src={cur.before} alt="Kondisi Awal Konstruksi Raw Concrete" loading="lazy" />
        </div>
        <div className="ba-image after">
          <img src={cur.after} alt="Hasil Finishing Arsitektur Luxury" loading="lazy" />
        </div>

        <div className="ba-handle">
          <div className="ba-handle-btn">
            <MoveHorizontal style={{ width: 20, height: 20 }} />
          </div>
        </div>

        <div className="ba-label left">{cur.labelBefore}</div>
        <div className="ba-label right">{cur.labelAfter}</div>

        <input
          type="range"
          className="ba-range-input"
          min="0"
          max="100"
          value={sliderPos}
          onChange={(e) => setSliderPos(parseFloat(e.target.value))}
          aria-label="Slider Sebelum dan Sesudah"
        />
      </div>

      {/* Description & Technical Transformation Scope */}
      <div className="ba-project-info-card">
        <div>
          <div className="ba-info-title">{cur.title}</div>
          <div className="ba-info-desc">{cur.desc}</div>
        </div>
        <div className="ba-info-chips">
          <span className="ba-chip">{cur.duration}</span>
          <span className="ba-chip">{cur.volume}</span>
          <span className="ba-chip">{cur.value}</span>
        </div>
      </div>
    </div>
  );
}
