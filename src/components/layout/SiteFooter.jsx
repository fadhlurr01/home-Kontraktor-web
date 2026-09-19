import React, { useState, useEffect } from 'react';
import { Box } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function SiteFooter() {
  const { t, currency, setCurrency, navigateToWidget } = useApp();
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
                <Box style={{ width: 22, height: 22 }} />
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
                <a href="#footer" className="footer-link">
                  Standar Kepatuhan K3 & ISO
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <div>{t('foot.copyright')}</div>
          <div className="server-time-badge">
            <span className="server-pulse-dot"></span>
            <span>{t('foot.server_time')} </span>
            <span id="server-live-clock">{serverTime}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
