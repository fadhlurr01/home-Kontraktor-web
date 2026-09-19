import React, { useState } from 'react';
import { X, UploadCloud, Send, FileCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function RfpModal() {
  const { activeModal, closeModal, t, showToast } = useApp();
  const [company, setCompany] = useState('');
  const [person, setPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [projectValue, setProjectValue] = useState('5000000000');
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);

  if (activeModal !== 'rfp') return null;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      closeModal();
      showToast({
        type: 'success',
        title: 'Dokumen Tender RFP Diterima!',
        message: `Proposal tender atas nama ${company} telah masuk ke sistem Quantity Surveyor kami.`
      });
      setCompany('');
      setPerson('');
      setPhone('');
      setFileName('');
    }, 1000);
  };

  return (
    <div className="modal-backdrop open" id="modal-tender-rfp" onClick={closeModal}>
      <div className="modal-container" style={{ maxWidth: '560px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 className="modal-title">{t('rfp.title')}</h3>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={closeModal}
            aria-label="Tutup"
          >
            <X style={{ width: 20, height: 20 }} />
          </button>
        </div>

        <div className="modal-body">
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
            {t('rfp.desc')}
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">{t('rfp.co_lbl')}</label>
              <input
                type="text"
                className="form-input"
                required
                placeholder="PT Wira Nusa Konstruksi Tbk"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            <div className="calc-grid-2col">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Nama PIC / Penanggung Jawab *</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  placeholder="Ir. Bambang Wijaya"
                  value={person}
                  onChange={(e) => setPerson(e.target.value)}
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">No. WhatsApp PIC *</label>
                <input
                  type="tel"
                  className="form-input"
                  required
                  placeholder="0812-3456-7890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label className="form-label">{t('rfp.val_lbl')}</label>
              <select
                className="form-select"
                value={projectValue}
                onChange={(e) => setProjectValue(e.target.value)}
              >
                <option value="1000000000">&lt; Rp 1 Miliar (Fit-Out / Residensial)</option>
                <option value="5000000000">Rp 1 - 5 Miliar (Gedung Komersial)</option>
                <option value="20000000000">Rp 5 - 20 Miliar (Infrastruktur Menengah)</option>
                <option value="50000000000">&gt; Rp 20 Miliar (Heavy EPC / Mega Proyek)</option>
              </select>
            </div>

            {/* File Upload Zone */}
            <div className="form-group">
              <label className="form-label">{t('rfp.upload_lbl')}</label>
              <div
                style={{
                  border: '2px dashed var(--border-medium)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem',
                  textAlign: 'center',
                  background: 'var(--bg-card)',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".dwg,.dxf,.pdf,.xlsx,.xls,.zip"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer'
                  }}
                />
                {fileName ? (
                  <div>
                    <FileCheck style={{ width: 32, height: 32, color: 'var(--accent-emerald)', margin: '0 auto 0.5rem' }} />
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                      {fileName}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Klik untuk mengganti file</div>
                  </div>
                ) : (
                  <div>
                    <UploadCloud style={{ width: 32, height: 32, color: 'var(--accent-cyan)', margin: '0 auto 0.5rem' }} />
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                      {t('rfp.upload_hint')}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                      {t('rfp.upload_max')}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button type="submit" className="btn btn-cyan btn-block btn-lg" disabled={loading}>
              <Send style={{ width: 18, height: 18 }} />
              <span>{loading ? 'Mengunggah Dokumen...' : t('rfp.btn')}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
