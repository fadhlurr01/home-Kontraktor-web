import React, { useState } from 'react';
import { Eye, Info, ArrowUpRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { portfolioTemplates } from '../../data/portfolioData';

export default function PortfolioSection() {
  const { t, openModal } = useApp();
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredList = portfolioTemplates.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.cat === activeFilter;
  });

  const getCount = (cat) => {
    if (cat === 'all') return portfolioTemplates.length;
    return portfolioTemplates.filter((item) => item.cat === cat).length;
  };

  return (
    <section id="portofolio" className="scroll-reveal">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">{t('port.tag')}</div>
          <h2 className="section-title">
            Koleksi 15 Demo Template <em>Siap Pakai</em>
          </h2>
          <p className="section-desc">{t('port.desc')}</p>
        </div>

        {/* Filter Pills */}
        <div className="portfolio-filter-row">
          <button
            type="button"
            className={`filter-pill ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            <span>{t('port.filter_all')}</span>
            <span className="pill-count-badge">{getCount('all')}</span>
          </button>
          <button
            type="button"
            className={`filter-pill ${activeFilter === 'res' ? 'active' : ''}`}
            onClick={() => setActiveFilter('res')}
          >
            <span>{t('port.filter_res')}</span>
            <span className="pill-count-badge">{getCount('res')}</span>
          </button>
          <button
            type="button"
            className={`filter-pill ${activeFilter === 'com' ? 'active' : ''}`}
            onClick={() => setActiveFilter('com')}
          >
            <span>{t('port.filter_com')}</span>
            <span className="pill-count-badge">{getCount('com')}</span>
          </button>
          <button
            type="button"
            className={`filter-pill ${activeFilter === 'ecom' ? 'active' : ''}`}
            onClick={() => setActiveFilter('ecom')}
          >
            <span>{t('port.filter_ecom')}</span>
            <span className="pill-count-badge">{getCount('ecom')}</span>
          </button>
          <button
            type="button"
            className={`filter-pill ${activeFilter === 'civ' ? 'active' : ''}`}
            onClick={() => setActiveFilter('civ')}
          >
            <span>{t('port.filter_civ')}</span>
            <span className="pill-count-badge">{getCount('civ')}</span>
          </button>
          <button
            type="button"
            className={`filter-pill ${activeFilter === 'hosp' ? 'active' : ''}`}
            onClick={() => setActiveFilter('hosp')}
          >
            <span>{t('port.filter_hosp')}</span>
            <span className="pill-count-badge">{getCount('hosp')}</span>
          </button>
        </div>

        {/* Grid of Templates */}
        <div className="portfolio-grid">
          {filteredList.map((tpl) => (
            <div key={tpl.id} className="template-card" data-cat={tpl.cat}>
              <div className="template-preview-img-box">
                <img
                  src={tpl.img}
                  alt={tpl.title}
                  className="template-img"
                  loading="lazy"
                  onError={(e) => {
                    if (tpl.fallbackImg && e.currentTarget.src !== tpl.fallbackImg) {
                      e.currentTarget.src = tpl.fallbackImg;
                    }
                  }}
                />
                <span className={`template-badge badge-${tpl.cat}`}>
                  {tpl.badge}
                </span>
                <button
                  type="button"
                  className="template-direct-link-badge"
                  title="Live Demo Simulator"
                  onClick={() => openModal('demo', tpl)}
                >
                  <ArrowUpRight style={{ width: 15, height: 15 }} />
                </button>
              </div>

              <div className="template-content">
                <div className="template-header-meta">
                  <h3 className="template-title">{tpl.title}</h3>
                  <span className="template-status-live">LIVE READY</span>
                </div>

                <p className="template-desc">{tpl.desc}</p>

                <div className="template-feature-tags">
                  {tpl.features?.slice(0, 2).map((feat, i) => (
                    <span key={i} className="tag-pill">
                      {feat.length > 34 ? feat.substring(0, 34) + '...' : feat}
                    </span>
                  ))}
                </div>

                <div className="template-actions">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm btn-open-demo"
                    onClick={() => openModal('demo', tpl)}
                  >
                    <Eye style={{ width: 14, height: 14 }} />
                    <span>Live Demo</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => openModal('consult')}
                  >
                    <span>Pesan Web</span>
                  </button>
                  <button
                    type="button"
                    className="template-inspect-btn"
                    onClick={() => openModal('spec', tpl.id)}
                  >
                    <Info style={{ width: 14, height: 14 }} />
                    <span>Inspeksi Spesifikasi Lengkap</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
