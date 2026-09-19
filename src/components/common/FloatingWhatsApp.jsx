import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function FloatingWhatsApp() {
  const { language } = useApp();
  const msg = language === 'en'
    ? 'Hello Contractor.Hub, I would like to consult about website templates for our construction firm.'
    : 'Halo Tim Contractor.Hub, saya ingin konsultasi mengenai template website untuk perusahaan kontraktor/arsitek kami.';

  const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(msg)}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      id="floating-whatsapp"
      className="floating-whatsapp-btn"
      aria-label="Konsultasi WhatsApp"
      title="Konsultasi WhatsApp Langsung"
    >
      <div className="wa-icon-bubble">
        <MessageCircle size={22} color="#FFFFFF" />
        <span className="wa-status-dot" />
      </div>
      <div className="wa-text-group">
        <span className="wa-label-top">Online</span>
        <span className="wa-label-main">WhatsApp</span>
      </div>
    </a>
  );
}

