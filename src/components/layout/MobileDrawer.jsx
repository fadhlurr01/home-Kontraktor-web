import React from 'react';
import { X, Box } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function MobileDrawer({ isOpen, onClose }) {
  const { language, setLanguage, theme, toggleTheme, t, openModal, navigateToWidget } = useApp();

  const handleLinkClick = (href, widgetTab = null) => {
    onClose();
    if (widgetTab) {
      setTimeout(() => navigateToWidget(widgetTab), 200);
    }
  };

  return (
    <div className={`mobile-drawer ${isOpen ? 'open' : ''}`} id="mobile-drawer">
      <div className="mobile-drawer-backdrop" onClick={onClose}></div>
      <div className="mobile-drawer-content">
        <div className="mobile-drawer-header">
          <a href="#hero" className="brand-logo" onClick={onClose}>
            <div className="brand-icon-box">
              <Box style={{ width: 20, height: 20 }} />
            </div>
            <div className="brand-text">
              <span className="brand-name">
                CONTRACTOR<span>.HUB</span>
              </span>
            </div>
          </a>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={onClose}
            aria-label="Tutup Menu"
          >
            <X style={{ width: 20, height: 20 }} />
          </button>
        </div>

        <nav className="mobile-nav-list">
          <a
            href="#solusi"
            className="mobile-nav-link"
            onClick={() => handleLinkClick('#solusi')}
          >
            {t('nav.solutions')}
          </a>
          <a
            href="#portofolio"
            className="mobile-nav-link"
            onClick={() => handleLinkClick('#portofolio')}
          >
            {t('nav.templates')}
          </a>
          <a
            href="#widgets"
            className="mobile-nav-link"
            onClick={() => handleLinkClick('#widgets', 'widget-calc')}
          >
            {t('nav.tools')}
          </a>
          <a
            href="#fitur"
            className="mobile-nav-link"
            onClick={() => handleLinkClick('#fitur')}
          >
            {t('nav.features')}
          </a>
          <a
            href="#portofolio"
            className="mobile-nav-link"
            onClick={() => handleLinkClick('#portofolio')}
          >
            {t('nav.portfolio')}
          </a>
          <a
            href="#pricing"
            className="mobile-nav-link"
            onClick={() => handleLinkClick('#pricing')}
          >
            {t('nav.pricing')}
          </a>
          <a
            href="#faq"
            className="mobile-nav-link"
            onClick={() => handleLinkClick('#faq')}
          >
            {t('nav.faq')}
          </a>
        </nav>

        <div className="mobile-drawer-footer">
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem' }}>
            <div className="lang-switcher" style={{ flex: 1 }}>
              <button
                type="button"
                className={`lang-btn ${language === 'id' ? 'active' : ''}`}
                onClick={() => setLanguage('id')}
              >
                ID
              </button>
              <span className="lang-sep">|</span>
              <button
                type="button"
                className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                onClick={() => setLanguage('en')}
              >
                EN
              </button>
            </div>
            <button
              type="button"
              className="theme-btn"
              onClick={toggleTheme}
              style={{ width: '42px', height: '42px' }}
            >
              {theme === 'dark' ? '🌓' : '☀️'}
            </button>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={() => {
              onClose();
              openModal('consult');
            }}
          >
            {t('nav.free_consult')}
          </button>
        </div>
      </div>
    </div>
  );
}
