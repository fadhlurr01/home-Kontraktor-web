import React, { useState } from 'react';
import { ArrowRight, MessageSquare, Layers, Box } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import WebGLHeroCanvas from './WebGLHeroCanvas';

const heroBlueprintData = {
  all: {
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    title: 'Aura Master Villa & Penthouse',
    type: 'RESIDENSIAL MEWAH',
    area: '850 m²',
    struct: 'WF Baja & K-350',
    status: '100% Ready'
  },
  interior: {
    img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
    title: 'Grand Lounge & Bespoke Interior',
    type: 'INTERIOR FIT-OUT',
    area: '420 m²',
    struct: 'Oak Parquet & Akustik',
    status: '100% Ready'
  },
  arch: {
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
    title: 'Atelier Pavilion & Masterplanning',
    type: 'BIRO ARSITEKTUR',
    area: '1,200 m²',
    struct: 'Curtain Wall & Concrete',
    status: '100% Ready'
  },
  civil: {
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
    title: 'Nexus Commercial Tower & EPC',
    type: 'SIPIL & GEDUNG TINGGI',
    area: '14,500 m²',
    struct: 'Bore Pile & Precast',
    status: '100% Ready'
  }
};

const modeLabels = {
  all: 'STRUCTURAL SYNTHESIS v2.6',
  interior: 'INTERIOR FIT-OUT WIREFRAME',
  arch: 'PARAMETRIC TOWER SCAFFOLD',
  civil: 'STEEL TRUSS & CANTILEVER'
};

export default function HeroSection() {
  const { t, openModal } = useApp();
  const [activeMode, setActiveMode] = useState('all');

  const currentProject = heroBlueprintData[activeMode] || heroBlueprintData.all;

  return (
    <section className="hero-section" id="hero">
      <div className="container hero-grid">
        {/* Left Column: Headline, Filter, CTA, Metrics */}
        <div className="hero-content">

          <h1 className="hero-headline">
            {t('hero.title_pre')}{' '}
            <span className="kinetic-highlight">{t('hero.title_highlight')}</span>
          </h1>

          <p className="hero-subheadline">{t('hero.subtitle')}</p>

          {/* Interactive Mode Filter */}
          <div className="hero-filter-box">
            <span className="hero-filter-label">
              <Layers size={14} />
              {t('hero.filter_label')}
            </span>
            <div className="filter-pills-row">
              <button
                type="button"
                className={`filter-pill ${activeMode === 'all' ? 'active' : ''}`}
                onClick={() => setActiveMode('all')}
              >
                {t('hero.filter_all')}
              </button>
              <button
                type="button"
                className={`filter-pill ${activeMode === 'interior' ? 'active' : ''}`}
                onClick={() => setActiveMode('interior')}
              >
                {t('hero.filter_interior')}
              </button>
              <button
                type="button"
                className={`filter-pill ${activeMode === 'arch' ? 'active' : ''}`}
                onClick={() => setActiveMode('arch')}
              >
                {t('hero.filter_arch')}
              </button>
              <button
                type="button"
                className={`filter-pill ${activeMode === 'civil' ? 'active' : ''}`}
                onClick={() => setActiveMode('civil')}
              >
                {t('hero.filter_civil')}
              </button>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="hero-cta-group">
            <a href="#portofolio" className="btn btn-primary">
              <span>{t('hero.cta_explore')}</span>
              <ArrowRight size={17} />
            </a>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => openModal('consult')}
            >
              <MessageSquare size={17} />
              <span>{t('hero.cta_consult')}</span>
            </button>
          </div>

          {/* Live Verified Metrics */}
          <div className="hero-metrics">
            <div className="metric-item">
              <div className="metric-val">{t('hero.stat_1_val')}</div>
              <div className="metric-label">{t('hero.stat_1_lbl')}</div>
            </div>
            <div className="metric-item">
              <div className="metric-val">{t('hero.stat_2_val')}</div>
              <div className="metric-label">{t('hero.stat_2_lbl')}</div>
            </div>
            <div className="metric-item">
              <div className="metric-val">{t('hero.stat_3_val')}</div>
              <div className="metric-label">{t('hero.stat_3_lbl')}</div>
            </div>
          </div>
        </div>

        {/* Right Column: Architectural Blueprint & 3D Deck */}
        <div className="hero-blueprint-deck">
          <div className="blueprint-deck-header">
            <span className="blueprint-status-tag">
              <span
                className="status-dot"
                style={{
                  display: 'inline-block',
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: 'var(--accent-emerald)',
                  marginRight: 6
                }}
              ></span>
              {modeLabels[activeMode] || 'STRUCTURAL CAD'}
            </span>
            <span style={{ color: 'var(--text-muted)' }}>GRID: WF-300 | Z: 28.0m</span>
          </div>

          <div className="blueprint-render-box">
            <WebGLHeroCanvas activeMode={activeMode} />
            <div className="blueprint-cad-overlay"></div>
            <div className="blueprint-floating-tag top-right">
              <Layers size={13} style={{ color: 'var(--accent-cyan)' }} />
              <span>{currentProject.type}</span>
            </div>
            <div className="blueprint-floating-tag bottom-left">
              <Box size={13} style={{ color: 'var(--accent-amber)' }} />
              <span>LUAS: {currentProject.area}</span>
            </div>
          </div>

          <div className="blueprint-deck-footer">
            <div className="blueprint-proj-title-row">
              <div className="blueprint-proj-title">{currentProject.title}</div>
              <div className="blueprint-proj-type">{currentProject.status}</div>
            </div>

            <div className="blueprint-telemetry-row">
              <div className="telemetry-box">
                <span className="telemetry-label">STRUKTUR</span>
                <span className="telemetry-val">{currentProject.struct}</span>
              </div>
              <div className="telemetry-box">
                <span className="telemetry-label">PRECISION</span>
                <span className="telemetry-val">LOD 350 BIM</span>
              </div>
              <div className="telemetry-box">
                <span className="telemetry-label">FPS REFRESH</span>
                <span className="telemetry-val">60 FPS AUTO</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
