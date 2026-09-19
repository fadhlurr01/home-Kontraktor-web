import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const AppContext = createContext();

export function AppProvider({ children }) {
  // 1. Theme State (Dark / Light)
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem('contractor_theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('contractor_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // 2. Language State (Bilingual ID / EN)
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('contractor_lang') || 'id';
  });

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('contractor_lang', lang);
  };

  const t = (key) => {
    if (translations[language] && translations[language][key]) {
      return translations[language][key];
    }
    if (translations.id && translations.id[key]) {
      return translations.id[key];
    }
    return key;
  };

  // 3. Currency State (IDR / USD)
  const [currency, setCurrency] = useState('IDR');

  // 4. Modal Management
  const [activeModal, setActiveModal] = useState(null); // 'consult' | 'rfp' | 'fleet' | 'demo' | 'spec' | 'download-success'
  const [modalData, setModalData] = useState(null);

  const openModal = (modalId, data = null) => {
    setModalData(data);
    setActiveModal(modalId);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalData(null);
    document.body.style.overflow = '';
  };

  // 5. Rich Toast System
  const [toasts, setToasts] = useState([]);

  const showToast = ({ title = 'Notifikasi', message = '', type = 'info', duration = 4500, action = null }) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 5);
    const now = new Date();
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
    
    const newToast = { id, title, message, type, duration, action, timeStr };
    setToasts(prev => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // 6. Active Widget Tab (with scroll helper)
  const [activeWidgetTab, setActiveWidgetTab] = useState('widget-calc');

  const navigateToWidget = (tabId) => {
    setActiveWidgetTab(tabId);
    const el = document.getElementById('widgets');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme: setThemeState,
        language,
        setLanguage,
        t,
        currency,
        setCurrency,
        activeModal,
        modalData,
        openModal,
        closeModal,
        toasts,
        showToast,
        removeToast,
        activeWidgetTab,
        setActiveWidgetTab,
        navigateToWidget
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
