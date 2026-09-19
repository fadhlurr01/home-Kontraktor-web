import React, { useState, useEffect } from 'react';
import { X, Monitor, Tablet, Smartphone, ExternalLink, Loader2, ShieldCheck, RefreshCw, MessageSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function LiveViewportModal() {
  const { activeModal, modalData, closeModal, openModal } = useApp();
  const [device, setDevice] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [loading, setLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(1);

  // Reset device and loading when new modal opens
  useEffect(() => {
    if (activeModal === 'demo') {
      setLoading(true);
      setDevice('desktop');
      setIframeKey((prev) => prev + 1);
    }
  }, [activeModal, modalData]);

  if (activeModal !== 'demo' || !modalData) return null;

  const url = modalData.url || 'https://karya-build-cl1i.vercel.app/';
  const title = modalData.title || 'Website Preview';
  const badge = modalData.badge || 'LIVE PREVIEW';

  const handleRefresh = () => {
    setLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div className="modal-backdrop open" id="modal-live-viewport" onClick={closeModal}>
      <div
        className="modal-container modal-viewport-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="live-modal-title"
      >
        {/* Browser Simulator Top Bar */}
        <div className="viewport-browser-bar">
          {/* Traffic light window controls */}
          <div className="browser-traffic-lights" aria-hidden="true">
            <span className="dot dot-close" onClick={closeModal} title="Tutup"></span>
            <span className="dot dot-min" onClick={() => setDevice('tablet')} title="Tablet View"></span>
            <span className="dot dot-max" onClick={() => setDevice('desktop')} title="Desktop View"></span>
          </div>

          {/* Title & Badge */}
          <div className="viewport-meta-info">
            <h3 className="viewport-site-title" id="live-modal-title">
              {title}
            </h3>
            <span className="viewport-badge-pill">
              <span className="status-live-pulse"></span>
              {badge}
            </span>
          </div>

          {/* Center Address Bar */}
          <div className="viewport-address-bar">
            <ShieldCheck size={14} className="address-ssl-icon" />
            <span className="address-url-text" title={url}>
              {url.replace(/^https?:\/\//, '')}
            </span>
            <button
              type="button"
              className="address-reload-btn"
              onClick={handleRefresh}
              title="Muat ulang preview"
            >
              <RefreshCw size={13} />
            </button>
          </div>

          {/* Right Action Controls: Device Switcher & External Link */}
          <div className="viewport-top-actions">
            <div className="viewport-device-switcher" role="group" aria-label="Pilih Ukuran Layar">
              <button
                type="button"
                className={`device-btn ${device === 'desktop' ? 'active' : ''}`}
                onClick={() => setDevice('desktop')}
                title="Tampilan Desktop (100%)"
              >
                <Monitor size={15} />
                <span className="device-btn-text">Desktop</span>
              </button>
              <button
                type="button"
                className={`device-btn ${device === 'tablet' ? 'active' : ''}`}
                onClick={() => setDevice('tablet')}
                title="Tampilan Tablet (768px)"
              >
                <Tablet size={15} />
                <span className="device-btn-text">Tablet</span>
              </button>
              <button
                type="button"
                className={`device-btn ${device === 'mobile' ? 'active' : ''}`}
                onClick={() => setDevice('mobile')}
                title="Tampilan Mobile (390px)"
              >
                <Smartphone size={15} />
                <span className="device-btn-text">Mobile</span>
              </button>
            </div>

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-open-external"
              id="live-modal-external-link"
              title="Buka Website di Tab Baru"
            >
              <ExternalLink size={14} />
              <span>Buka Tab Baru</span>
            </a>

            <button
              type="button"
              className="viewport-close-btn"
              onClick={closeModal}
              aria-label="Tutup Preview"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Viewport Stage / Sandbox Canvas */}
        <div className="modal-viewport-body">
          <div className={`viewport-canvas-stage device-${device}`} id="viewport-stage">
            {loading && (
              <div className="viewport-loader-overlay">
                <Loader2 className="spin-slow loader-icon" size={32} />
                <span className="loader-text">Menghubungkan ke Live Template Sandbox...</span>
                <span className="loader-subtext">{url}</span>
              </div>
            )}
            <iframe
              key={iframeKey}
              id="live-viewport-iframe"
              src={url}
              title={title}
              className="viewport-embedded-iframe"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              loading="eager"
              onLoad={() => setLoading(false)}
            />
          </div>
        </div>

        {/* Viewport Footer Bar */}
        <div className="viewport-footer-bar">
          <div className="viewport-footer-left">
            <span className="telemetry-pill">
              ⚡ LIVE INTERACTIVE DEMO • {device.toUpperCase()} MODE
            </span>
            <span className="telemetry-hint">
              Anda dapat mengklik dan menjelajahi semua halaman langsung di dalam viewport ini.
            </span>
          </div>
          <div className="viewport-footer-right">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => {
                closeModal();
                openModal('consult', modalData);
              }}
            >
              <MessageSquare size={14} />
              <span>Pesan Template Ini</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
