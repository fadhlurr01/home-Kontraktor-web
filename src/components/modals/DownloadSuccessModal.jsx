import React from 'react';
import { X, CheckCircle2, FileText, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function DownloadSuccessModal() {
  const { activeModal, closeModal, t } = useApp();

  if (activeModal !== 'download-success') return null;

  return (
    <div className="modal-backdrop open" id="modal-download-success" onClick={closeModal}>
      <div className="modal-container" style={{ maxWidth: '480px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-body" style={{ padding: '2.5rem 1.75rem' }}>
          <div className="success-icon-badge" style={{ margin: '0 auto 1.25rem' }}>
            <CheckCircle2 style={{ width: 48, height: 48, color: 'var(--accent-emerald)' }} />
          </div>

          <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            {t('dl.title')}
          </h3>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            {t('dl.desc')}
          </p>

          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.85rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1.5rem',
              textAlign: 'left'
            }}
          >
            <FileText style={{ width: 28, height: 28, color: 'var(--accent-cyan)' }} />
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                Contractor_Digital_Strategy_2026.pdf
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                PDF Dokumen • 18.4 MB • Versi Lengkap
              </div>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={closeModal}
          >
            <Check style={{ width: 16, height: 16 }} />
            <span>{t('dl.btn')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
