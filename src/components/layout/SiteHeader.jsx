import React, { useState, useEffect } from 'react';
import {
  Box,
  ChevronDown,
  Sofa,
  Compass,
  HardHat,
  Layout,
  Layers,
  Calculator,
  Eye,
  FileCode2,
  Menu,
  Moon,
  Sun
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function SiteHeader({ onOpenMobileDrawer }) {
  const { theme, toggleTheme, language, setLanguage, t, openModal, navigateToWidget } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`} id="site-header">
      <div className="nav-container">
        {/* Clean Brand Logo */}
        <a href="#hero" className="brand-logo">
          <div className="brand-icon-box">
            <Box style={{ width: 22, height: 22 }} />
          </div>
          <div className="brand-text">
            <span className="brand-name">
              CONTRACTOR<span>.HUB</span>
            </span>
          </div>
        </a>

        {/* Desktop Nav Menu */}
        <nav className="nav-menu" aria-label="Main Navigation">
          {/* Solusi Dropdown */}
          <div className="nav-item">
            <a href="#solusi" className="nav-link">
              <span>{t('nav.solutions')}</span>
              <ChevronDown className="chevron" style={{ width: 14, height: 14 }} />
            </a>
            <div className="nav-dropdown">
              <a href="#solusi" className="dropdown-item">
                <Sofa className="item-icon" style={{ width: 18, height: 18 }} />
                <span>{t('drop.interior')}</span>
              </a>
              <a href="#solusi" className="dropdown-item">
                <Compass className="item-icon" style={{ width: 18, height: 18 }} />
                <span>{t('drop.arch')}</span>
              </a>
              <a href="#solusi" className="dropdown-item">
                <HardHat className="item-icon" style={{ width: 18, height: 18 }} />
                <span>{t('drop.civil')}</span>
              </a>
            </div>
          </div>

          {/* Template Dropdown */}
          <div className="nav-item">
            <a href="#portofolio" className="nav-link">
              <span>{t('nav.templates')}</span>
              <ChevronDown className="chevron" style={{ width: 14, height: 14 }} />
            </a>
            <div className="nav-dropdown">
              <a href="#portofolio" className="dropdown-item">
                <Layout className="item-icon" style={{ width: 18, height: 18 }} />
                <span>{t('drop.live_demo')}</span>
              </a>
              <a
                href="#widgets"
                className="dropdown-item"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToWidget('widget-tour');
                }}
              >
                <Box className="item-icon" style={{ width: 18, height: 18 }} />
                <span>{t('drop.sandbox')}</span>
              </a>
              <a href="#portofolio" className="dropdown-item">
                <Layers className="item-icon" style={{ width: 18, height: 18 }} />
                <span>{t('drop.catalog')}</span>
              </a>
            </div>
          </div>

          {/* Smart Tools Dropdown */}
          <div className="nav-item">
            <a href="#widgets" className="nav-link">
              <span>{t('nav.tools')}</span>
              <ChevronDown className="chevron" style={{ width: 14, height: 14 }} />
            </a>
            <div className="nav-dropdown">
              <a
                href="#widgets"
                className="dropdown-item"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToWidget('widget-calc');
                }}
              >
                <Calculator className="item-icon" style={{ width: 18, height: 18 }} />
                <span>{t('drop.calculator')}</span>
              </a>
              <a
                href="#widgets"
                className="dropdown-item"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToWidget('widget-tour');
                }}
              >
                <Eye className="item-icon" style={{ width: 18, height: 18 }} />
                <span>{t('drop.viewer_3d')}</span>
              </a>
              <a
                href="#widgets"
                className="dropdown-item"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToWidget('widget-fleet');
                }}
              >
                <FileCode2 className="item-icon" style={{ width: 18, height: 18 }} />
                <span>{t('drop.bim')}</span>
              </a>
            </div>
          </div>

          <a href="#fitur" className="nav-link">
            <span>{t('nav.features')}</span>
          </a>
          <a href="#portofolio" className="nav-link">
            <span>{t('nav.portfolio')}</span>
          </a>
          <a href="#pricing" className="nav-link">
            <span>{t('nav.pricing')}</span>
          </a>
          <a href="#faq" className="nav-link">
            <span>{t('nav.faq')}</span>
          </a>
        </nav>

        {/* Action Controls */}
        <div className="nav-actions">
          {/* Bilingual Switcher */}
          <div className="lang-toggle" aria-label="Pilihan Bahasa">
            <button
              type="button"
              className={`lang-btn ${language === 'id' ? 'active' : ''}`}
              onClick={() => setLanguage('id')}
              aria-label="Bahasa Indonesia"
            >
              ID
            </button>
            <button
              type="button"
              className={`lang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
              aria-label="English Language"
            >
              EN
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            className="theme-btn"
            onClick={toggleTheme}
            aria-label="Ganti Tema Gelap Terang"
          >
            {theme === 'dark' ? (
              <Moon style={{ width: 16, height: 16 }} />
            ) : (
              <Sun style={{ width: 16, height: 16 }} />
            )}
          </button>

          {/* Consultation CTA */}
          <button
            type="button"
            className="btn btn-primary btn-sm btn-nav-cta"
            onClick={() => openModal('consult')}
          >
            {t('nav.free_consult')}
          </button>

          {/* Mobile Toggle Button */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={onOpenMobileDrawer}
            aria-label="Buka Menu Mobile"
          >
            <Menu style={{ width: 22, height: 22 }} />
          </button>
        </div>
      </div>
    </header>
  );
}
