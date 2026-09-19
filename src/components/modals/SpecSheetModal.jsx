import React from 'react';
import { X, Check, Eye, MessageCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { templateSpecsData } from '../../data/portfolioData';

export default function SpecSheetModal() {
  const { activeModal, modalData, closeModal, openModal } = useApp();

  if (activeModal !== 'spec') return null;

  const tplId = modalData || 'karyabuild';
  const data = templateSpecsData[tplId] || templateSpecsData.karyabuild;

  const handleLaunchDemo = () => {
    openModal('demo', data);
  };

  const waUrl = `https://wa.me/6281234567890?text=Halo%20Admin%20CONTRACTOR.HUB,%20saya%20tertarik%20dengan%20spesifikasi%20template%20${encodeURIComponent(
    data.title
  )}`;

  return (
    <div className="modal-backdrop open" id="modal-spec-sheet" onClick={closeModal}>
      <div className="modal-container" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="template-badge" style={{ marginBottom: '0.35rem' }}>
              {data.badge}
            </div>
            <h3 className="modal-title">{data.title}</h3>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={closeModal}
            aria-label="Tutup Spesifikasi"
          >
            <X style={{ width: 20, height: 20 }} />
          </button>
        </div>

        <div className="modal-body">
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
            {data.desc}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '0.85rem',
              marginBottom: '1.25rem'
            }}
          >
            <div
              style={{
                background: 'var(--bg-card)',
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div
                style={{
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                FRAMEWORK / ENGINE
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                {data.framework}
              </div>
            </div>

            <div
              style={{
                background: 'var(--bg-card)',
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div
                style={{
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                STYLING & DESIGN
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                {data.css}
              </div>
            </div>

            <div
              style={{
                background: 'var(--bg-card)',
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div
                style={{
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                PERFORMA & SEO
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--accent-emerald)' }}>
                {data.seo}
              </div>
            </div>

            <div
              style={{
                background: 'var(--bg-card)',
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div
                style={{
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                RESPONSIVENESS
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>
                {data.responsive}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ fontSize: '0.88rem', marginBottom: '0.65rem', color: 'var(--text-primary)' }}>
              Fitur & Modul Arsitektur Utama:
            </h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {data.features.map((feat, idx) => (
                <li
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '0.4rem'
                  }}
                >
                  <Check style={{ width: 14, height: 14, color: 'var(--accent-cyan)' }} />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button type="button" className="btn btn-primary btn-block" onClick={handleLaunchDemo}>
              <Eye style={{ width: 16, height: 16 }} />
              <span>Buka Live Demo Sandbox</span>
            </button>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-block"
            >
              <MessageCircle style={{ width: 16, height: 16 }} />
              <span>Tanya Spesifikasi Template via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
