import React, { useState } from 'react';
import { Download, CheckCircle, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';

export default function BrochureSection() {
  const { t, openModal, showToast } = useApp();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.submitInquiry({
        type: 'brochure',
        name: `${formData.name} ${formData.company ? '(' + formData.company + ')' : ''}`,
        email: formData.email,
        phone: formData.phone,
        projectType: 'Download Brosur Company Profile & Katalog'
      });
    } catch (err) {
      console.warn('Brochure download inquiry fallback:', err);
    }

    setLoading(false);
    openModal('download-success');
    showToast({
      type: 'success',
      title: 'Brosur Siap Diunduh!',
      message:
        'Paket Panduan Strategi Digital Kontraktor 2026 telah dikirimkan ke email Anda.'
    });
    setFormData({ name: '', email: '', phone: '', company: '' });
  };

  return (
    <section id="brochure" className="scroll-reveal">
      <div className="container">
        <div className="brochure-lead-container">
          <div className="brochure-info">
            <div className="section-tag" style={{ marginBottom: '1.25rem' }}>
              {t('brochure.tag')}
            </div>
            <h3>{t('brochure.title')}</h3>
            <p>{t('brochure.desc')}</p>

            <ul className="brochure-perks-list">
              <li>
                <CheckCircle style={{ width: 18, height: 18 }} />
                <span>{t('brochure.p1')}</span>
              </li>
              <li>
                <CheckCircle style={{ width: 18, height: 18 }} />
                <span>{t('brochure.p2')}</span>
              </li>
              <li>
                <CheckCircle style={{ width: 18, height: 18 }} />
                <span>{t('brochure.p3')}</span>
              </li>
              <li>
                <CheckCircle style={{ width: 18, height: 18 }} />
                <span>{t('brochure.p4')}</span>
              </li>
            </ul>
          </div>

          <div className="brochure-form">
            <form onSubmit={handleSubmit}>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="brochure-name">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    id="brochure-name"
                    className="form-input"
                    required
                    placeholder="Contoh: Ir. Budi Santoso"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="brochure-email">
                    Email Perusahaan *
                  </label>
                  <input
                    type="email"
                    id="brochure-email"
                    className="form-input"
                    required
                    placeholder="budi@kontraktor-utama.co.id"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="brochure-phone">
                    Nomor WhatsApp *
                  </label>
                  <input
                    type="tel"
                    id="brochure-phone"
                    className="form-input"
                    required
                    placeholder="0812-3456-7890"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="brochure-co">
                    Nama Perusahaan / Biro
                  </label>
                  <input
                    type="text"
                    id="brochure-co"
                    className="form-input"
                    placeholder="PT Megah Cipta Konstruksi"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-brochure-download btn-lg"
                disabled={loading}
              >
                <Download style={{ width: 18, height: 18 }} />
                <span>
                  {loading
                    ? 'Menyiapkan Dokumen PDF...'
                    : t('brochure.btn_submit')}
                </span>
              </button>

              <div className="form-disclaimer">
                <ShieldCheck style={{ width: 14, height: 14 }} />
                <span>{t('brochure.disclaimer')}</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
