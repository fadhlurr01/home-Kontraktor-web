import React, { useState } from 'react';
import { X, Send, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';

export default function ConsultModal() {
  const { activeModal, closeModal, t, showToast } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [projectType, setProjectType] = useState('Desain Interior & Fit-Out');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  if (activeModal !== 'consult') return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.submitInquiry({
        type: 'consult',
        name,
        phone,
        projectType,
        notes
      });

      setLoading(false);
      closeModal();
      showToast({
        type: 'success',
        title: 'Jadwal Konsultasi Diterima',
        message: res.message || `Terima kasih ${name}, Technical Architect kami akan menghubungi Anda via WhatsApp ${phone}.`
      });
      setName('');
      setPhone('');
      setNotes('');
    } catch (err) {
      setLoading(false);
      showToast({
        type: 'error',
        title: 'Gagal Mengirim Form',
        message: err.message || 'Silakan periksa koneksi Anda dan coba lagi.'
      });
    }
  };

  return (
    <div className="modal-backdrop open" id="modal-consult" onClick={closeModal}>
      <div className="modal-container" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 className="modal-title">{t('consult.title')}</h3>
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
            {t('consult.desc')}
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">{t('consult.name_lbl')}</label>
              <input
                type="text"
                className="form-input"
                required
                placeholder="Nama Lengkap Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">{t('consult.wa_lbl')}</label>
              <input
                type="tel"
                className="form-input"
                required
                placeholder="0812-3456-7890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">{t('consult.type_lbl')}</label>
              <select
                className="form-select"
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
              >
                <option value="Desain Interior & Fit-Out">Desain Interior & Fit-Out</option>
                <option value="Biro Arsitektur & Perencanaan">Biro Arsitektur & Perencanaan</option>
                <option value="Kontraktor Konstruksi Gedung / Sipil">Kontraktor Konstruksi Gedung / Sipil</option>
                <option value="E-Commerce Material & Alat Berat">E-Commerce Material & Alat Berat</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Catatan Tambahan (Opsional)</label>
              <textarea
                className="form-input"
                rows="3"
                placeholder="Kebutuhan khusus seperti 3D WebGL kustom atau integrasi ERP..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading}>
              <Calendar style={{ width: 18, height: 18 }} />
              <span>{loading ? 'Menyimpan Jadwal...' : t('consult.btn')}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
