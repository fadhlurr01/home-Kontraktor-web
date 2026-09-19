import React, { useState, useEffect, useRef } from 'react';
import {
  Building2,
  HardHat,
  Sofa,
  Landmark,
  Hammer,
  Compass,
  Award,
  ShieldCheck,
  DraftingCompass,
  Layers,
  Cpu,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const testimonialsList = [
  {
    text: '"Template Komorebi Sanctuary membuat portofolio villa kami terlihat sangat berkelas. Jumlah klien high-end yang mengajukan konsultasi meningkat 4x lipat dalam 3 bulan."',
    avatar: 'IP',
    name: 'Ar. Irvan Pratama, IAI',
    role: 'Principal Architect, Studio Terra',
    tier: 'BIRO ARSITEKTUR'
  },
  {
    text: '"Formulir RFP dan sistem showcase alat berat membuat perusahaan kami dipercaya memenangkan tender infrastruktur regional bernilai 40 Miliar."',
    avatar: 'HK',
    name: 'Hendra Kusuma, ST',
    role: 'Direktur Operasional, PT Mandiri Megah Struktur',
    tier: 'KONTRAKTOR SIPIL & EPC'
  },
  {
    text: '"Klien kami sangat suka fitur Before/After slider dan katalog material interaktif. Proses closing proyek kantor jadi jauh lebih cepat."',
    avatar: 'SN',
    name: 'Siti Nurhaliza',
    role: 'Founder & Creative Lead, Forma Space Interior',
    tier: 'INTERIOR FIT-OUT'
  }
];

export default function TestimonialsSection() {
  const { t } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHoveredRef.current) {
        setCurrentIndex((prev) => (prev + 1) % testimonialsList.length);
      }
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Dual Continuous Marquee (Trusted By) */}
      <section id="trusted-by" className="scroll-reveal" style={{ padding: '4.5rem 0' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '2.5rem' }}>
            <div className="section-tag">{t('trust.tag')}</div>
            <h2 className="section-title">
              Dipercaya Oleh Biro Arsitektur & <em>Kontraktor Terkemuka</em>
            </h2>
          </div>

          <div className="marquee-wrapper">
            {/* Row 1 */}
            <div className="marquee-track">
              <div className="client-logo-badge">
                <Building2 style={{ width: 16, height: 16 }} /> STUDIO TERRA ARCHITECTURE
              </div>
              <div className="client-logo-badge">
                <HardHat style={{ width: 16, height: 16 }} /> PT MANDIRI MEGAH STRUKTUR
              </div>
              <div className="client-logo-badge">
                <Sofa style={{ width: 16, height: 16 }} /> FORMA SPACE INTERIOR FIT-OUT
              </div>
              <div className="client-logo-badge">
                <Landmark style={{ width: 16, height: 16 }} /> NUSANTARA EPC HOLDINGS
              </div>
              <div className="client-logo-badge">
                <Hammer style={{ width: 16, height: 16 }} /> PT CIPTA GRAHA UTAMA
              </div>
              <div className="client-logo-badge">
                <Compass style={{ width: 16, height: 16 }} /> ATELIER PRATAMA IAI
              </div>
              {/* Loop Clones */}
              <div className="client-logo-badge">
                <Building2 style={{ width: 16, height: 16 }} /> STUDIO TERRA ARCHITECTURE
              </div>
              <div className="client-logo-badge">
                <HardHat style={{ width: 16, height: 16 }} /> PT MANDIRI MEGAH STRUKTUR
              </div>
              <div className="client-logo-badge">
                <Sofa style={{ width: 16, height: 16 }} /> FORMA SPACE INTERIOR FIT-OUT
              </div>
              <div className="client-logo-badge">
                <Landmark style={{ width: 16, height: 16 }} /> NUSANTARA EPC HOLDINGS
              </div>
              <div className="client-logo-badge">
                <Hammer style={{ width: 16, height: 16 }} /> PT CIPTA GRAHA UTAMA
              </div>
              <div className="client-logo-badge">
                <Compass style={{ width: 16, height: 16 }} /> ATELIER PRATAMA IAI
              </div>
            </div>

            {/* Row 2 (Reverse) */}
            <div className="marquee-track reverse">
              <div className="client-logo-badge">
                <Award style={{ width: 16, height: 16 }} /> ASOSIASI KONTRAKTOR INDONESIA
              </div>
              <div className="client-logo-badge">
                <ShieldCheck style={{ width: 16, height: 16 }} /> DEWAN SMK3 KONSTRUKSI NASIONAL
              </div>
              <div className="client-logo-badge">
                <DraftingCompass style={{ width: 16, height: 16 }} /> IKATAN ARSITEK INDONESIA (IAI)
              </div>
              <div className="client-logo-badge">
                <Layers style={{ width: 16, height: 16 }} /> BALI BESPOKE VILLA LAB
              </div>
              <div className="client-logo-badge">
                <Cpu style={{ width: 16, height: 16 }} /> SURABAYA INFRASTRUCTURE CORP
              </div>
              <div className="client-logo-badge">
                <CheckCircle2 style={{ width: 16, height: 16 }} /> ISO 9001:2015 CERTIFIED PARTNER
              </div>
              {/* Loop Clones */}
              <div className="client-logo-badge">
                <Award style={{ width: 16, height: 16 }} /> ASOSIASI KONTRAKTOR INDONESIA
              </div>
              <div className="client-logo-badge">
                <ShieldCheck style={{ width: 16, height: 16 }} /> DEWAN SMK3 KONSTRUKSI NASIONAL
              </div>
              <div className="client-logo-badge">
                <DraftingCompass style={{ width: 16, height: 16 }} /> IKATAN ARSITEK INDONESIA (IAI)
              </div>
              <div className="client-logo-badge">
                <Layers style={{ width: 16, height: 16 }} /> BALI BESPOKE VILLA LAB
              </div>
              <div className="client-logo-badge">
                <Cpu style={{ width: 16, height: 16 }} /> SURABAYA INFRASTRUCTURE CORP
              </div>
              <div className="client-logo-badge">
                <CheckCircle2 style={{ width: 16, height: 16 }} /> ISO 9001:2015 CERTIFIED PARTNER
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section id="testimonials" className="scroll-reveal">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">{t('testi.tag')}</div>
            <h2 className="section-title">
              Hasil Nyata dari Perusahaan yang Beralih ke <em>Contractor Web</em>
            </h2>
          </div>

          <div
            className="testimonial-carousel-box"
            onMouseEnter={() => {
              isHoveredRef.current = true;
            }}
            onMouseLeave={() => {
              isHoveredRef.current = false;
            }}
          >
            <div className="quote-symbol">“</div>

            {testimonialsList.map((item, idx) => (
              <div
                key={idx}
                className={`testimonial-card-slide ${idx === currentIndex ? 'active' : ''}`}
              >
                <p className="testimonial-text">{item.text}</p>
                <div className="testimonial-author-row">
                  <div className="author-profile">
                    <div className="author-avatar">{item.avatar}</div>
                    <div>
                      <div className="author-name">{item.name}</div>
                      <div className="author-role">{item.role}</div>
                    </div>
                  </div>
                  <span className="client-tier-tag">{item.tier}</span>
                </div>
              </div>
            ))}

            {/* Indicators */}
            <div className="carousel-indicators">
              {testimonialsList.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`carousel-dot ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
