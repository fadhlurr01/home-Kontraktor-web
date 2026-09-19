import React, { useState, useEffect } from 'react';
import { Box, ShieldCheck, Lock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function SiteFooter() {
  const { t, currency, setCurrency, navigateToWidget, openModal } = useApp();
  const [serverTime, setServerTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        hour12: false,
        timeZone: 'Asia/Jakarta'
      });
      setServerTime(`${timeStr} WIB (UTC+7)`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Identity */}
          <div className="footer-brand-col">
            <div className="brand-logo">
              <div className="brand-icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="6" width="8" height="16" rx="1" stroke="currentColor" strokeWidth="2"/>
                  <rect x="12" y="2" width="8" height="20" rx="1" stroke="currentColor" strokeWidth="2"/>
                  <rect x="7" y="9" width="2" height="2" rx="0.5" fill="currentColor"/>
                  <rect x="7" y="14" width="2" height="2" rx="0.5" fill="currentColor"/>
                  <rect x="15" y="5" width="2" height="2" rx="0.5" fill="currentColor"/>
                  <rect x="15" y="10" width="2" height="2" rx="0.5" fill="currentColor"/>
                  <rect x="15" y="15" width="2" height="2" rx="0.5" fill="currentColor"/>
                </svg>
              </div>
              <div className="brand-text">
                <span className="brand-name">
                  CONTRACTOR<span>.HUB</span>
                </span>
              </div>
            </div>
            <p>{t('foot.slogan')}</p>

            {/* Currency Selector */}
            <div className="footer-currency-box" style={{ marginTop: '1.25rem' }}>
              <label
                htmlFor="footer-currency-select"
                style={{
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-muted)',
                  display: 'block',
                  marginBottom: '0.35rem'
                }}
              >
                CURRENCY / MATA UANG:
              </label>
              <select
                id="footer-currency-select"
                className="form-select"
                style={{
                  maxWidth: '180px',
                  padding: '0.4rem 0.8rem',
                  fontSize: '0.85rem'
                }}
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="IDR">IDR (Rupiah Indonesia)</option>
                <option value="USD">USD (US Dollar)</option>
              </select>
            </div>
          </div>

          {/* Col 2: Solutions */}
          <div className="footer-col">
            <h5>{t('foot.col_solutions')}</h5>
            <ul className="footer-links">
              <li>
                <a href="#solusi" className="footer-link">
                  Interior Design Hub
                </a>
              </li>
              <li>
                <a href="#solusi" className="footer-link">
                  Architecture Bureau
                </a>
              </li>
              <li>
                <a href="#solusi" className="footer-link">
                  Civil & Heavy EPC
                </a>
              </li>
              <li>
                <a href="#solusi" className="footer-link">
                  Renovation & Retrofit
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Tools & Docs */}
          <div className="footer-col">
            <h5>{t('foot.col_tools')}</h5>
            <ul className="footer-links">
              <li>
                <a
                  href="#widgets"
                  className="footer-link"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToWidget('widget-calc');
                  }}
                >
                  Cost Estimator m²
                </a>
              </li>
              <li>
                <a
                  href="#widgets"
                  className="footer-link"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToWidget('widget-tour');
                  }}
                >
                  3D WebGL Sandbox
                </a>
              </li>
              <li>
                <a href="#fitur" className="footer-link">
                  Dokumentasi Teknis
                </a>
              </li>
              <li>
                <a href="#brochure" className="footer-link">
                  Panduan Strategi 2026
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal */}
          <div className="footer-col">
            <h5>{t('foot.col_legal')}</h5>
            <ul className="footer-links">
              <li>
                <a href="#footer" className="footer-link">
                  Syarat Lisensi Komersial
                </a>
              </li>
              <li>
                <a href="#footer" className="footer-link">
                  Kebijakan Privasi Data Proyek
                </a>
              </li>
              <li>
                <a href="#footer" className="footer-link">
                  Sertifikat Keamanan SSL
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openModal('admin')}
                  className="footer-link footer-admin-link"
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    color: 'var(--primary)',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem'
                  }}
                >
                  <Lock size={13} />
                  <span>Admin CRM Leads Portal</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar - Responsive & Clickable Portal */}
        <div className="footer-bottom">
          <div className="footer-bottom-copy">{t('foot.copyright')}</div>
          <div className="footer-bottom-actions">
            <button
              type="button"
              id="footer-admin-btn"
              className="footer-management-btn"
              onClick={() => openModal('admin')}
              title="Buka Portal Manajemen & CRM Admin"
            >
              <ShieldCheck size={15} />
              <span>Portal Manajemen</span>
            </button>
            <div className="server-time-badge">
              <span className="server-pulse-dot"></span>
              <span>{t('foot.server_time')} </span>
              <span id="server-live-clock">{serverTime}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
