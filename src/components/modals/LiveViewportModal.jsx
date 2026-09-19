import React, { useState } from 'react';
import { X, Monitor, Tablet, Smartphone, ExternalLink, Loader2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function LiveViewportModal() {
  const { activeModal, modalData, closeModal } = useApp();
  const [device, setDevice] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [loading, setLoading] = useState(true);

  if (activeModal !== 'demo' || !modalData) return null;

  const url = modalData.url || 'https://karya-build-cl1i.vercel.app/';
  const title = modalData.title || 'Website Preview';

  return (
    <div className="modal-backdrop open" id="modal-live-viewport" onClick={closeModal}>
      <div className="modal-container modal-viewport-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="viewport-header-left">
            <h3 className="modal-title" id="live-modal-title">
              {title} • Live Viewport
            </h3>
            <div className="viewport-url-badge" id="live-modal-url">
              {url}
            </div>
          </div>

          {/* Device Switcher Controls */}
          <div className="viewport-device-switcher">
            <button
              type="button"
              className={`device-btn ${device === 'desktop' ? 'active' : ''}`}
              onClick={() => setDevice('desktop')}
              title="Tampilan Desktop"
            >
              <Monitor style={{ width: 16, height: 16 }} />
            </button>
            <button
              type="button"
              className={`device-btn ${device === 'tablet' ? 'active' : ''}`}
              onClick={() => setDevice('tablet')}
              title="Tampilan Tablet"
            >
              <Tablet style={{ width: 16, height: 16 }} />
            </button>
            <button
              type="button"
              className={`device-btn ${device === 'mobile' ? 'active' : ''}`}
              onClick={() => setDevice('mobile')}
              title="Tampilan Smartphone"
            >
              <Smartphone style={{ width: 16, height: 16 }} />
            </button>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="device-btn external-btn"
              id="live-modal-external-link"
              title="Buka di Tab Baru"
            >
              <ExternalLink style={{ width: 15, height: 15 }} />
            </a>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={closeModal}
            aria-label="Tutup Preview"
          >
            <X style={{ width: 20, height: 20 }} />
          </button>
        </div>

        {/* Viewport Sandbox Body */}
        <div className="modal-body modal-viewport-body">
          <div className={`viewport-stage device-${device}`} id="viewport-stage">
            {loading && (
              <div className="viewport-loader" id="viewport-loader">
                <Loader2 className="spin" style={{ width: 28, height: 28, color: 'var(--accent-cyan)' }} />
                <span>Memuat Live Sandbox Preview...</span>
              </div>
            )}
            <iframe
              id="live-viewport-iframe"
              src={url}
              title={title}
              className="viewport-iframe"
              onLoad={() => setLoading(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
