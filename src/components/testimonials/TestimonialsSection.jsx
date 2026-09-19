import React from 'react';
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
  CheckCircle2,
  Star,
  CheckCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const testimonialsList = [
  {
    text: '"Template Komorebi Sanctuary membuat portofolio villa kami terlihat sangat berkelas. Jumlah klien high-end yang mengajukan konsultasi meningkat 4x lipat dalam 3 bulan."',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
    initials: 'IP',
    name: 'Ar. Irvan Pratama, IAI',
    role: 'Principal Architect, Studio Terra',
    tier: 'BIRO ARSITEKTUR',
    stars: 5,
    tag: 'Verified Partner'
  },
  {
    text: '"Formulir RFP dan sistem showcase alat berat membuat perusahaan kami dipercaya memenangkan tender infrastruktur regional bernilai 40 Miliar."',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
    initials: 'HK',
    name: 'Hendra Kusuma, ST',
    role: 'Direktur Operasional, PT Mandiri Megah Struktur',
    tier: 'KONTRAKTOR SIPIL & EPC',
    stars: 5,
    tag: 'Verified Contractor'
  },
  {
    text: '"Klien kami sangat suka fitur Before/After slider dan katalog material interaktif. Proses closing proyek kantor jadi jauh lebih cepat."',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&q=80',
    initials: 'SN',
    name: 'Siti Nurhaliza',
    role: 'Founder & Creative Lead, Forma Space Interior',
    tier: 'INTERIOR FIT-OUT',
    stars: 5,
    tag: 'Verified Client'
  }
];

export default function TestimonialsSection() {
  const { t } = useApp();

  return (
    <>
      {/* Dual Continuous Marquee (Trusted By) */}
      <section id="trusted-by" className="scroll-reveal" style={{ padding: '4.5rem 0' }}>
        <div className="container">
          <div className="marquee-wrapper">
            <h4 className="marquee-title">{t('marquee.trusted_by')}</h4>

            {/* Row 1 (Forward) */}
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

      {/* Testimonial Section - Pulse AI Grid Layout */}
      <section id="testimonials" className="scroll-reveal">
        <div className="container">
          <div className="section-header">
            <div className="section-tag pulse-pill-tag">
              <Star size={14} className="tag-icon-sparkle" />
              <span>{t('testi.tag')}</span>
            </div>
            <h2 className="section-title">
              Hasil Nyata dari Perusahaan yang Beralih ke <em>Contractor Web</em>
            </h2>
            <p className="section-desc">
              Lihat bagaimana para arsitek, direktur konstruksi, dan developer mempercepat siklus tender dan memenangkan proyek bergengsi.
            </p>
          </div>

          <div className="pulse-reviews-grid">
            {testimonialsList.map((item, idx) => (
              <article key={idx} className="pulse-review-card">
                <div className="pulse-review-header">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="pulse-review-avatar"
                  />
                  <div className="pulse-review-author-info">
                    <h3 className="pulse-review-name">{item.name}</h3>
                    <div className="pulse-review-role-row">
                      <span className="pulse-review-role">{item.role}</span>
                      <span className="pulse-review-verified">
                        <CheckCircle size={12} /> {item.tag}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="pulse-review-text">{item.text}</p>

                <div className="pulse-review-footer">
                  <div className="pulse-review-stars">
                    {[...Array(item.stars)].map((_, sIdx) => (
                      <Star key={sIdx} size={15} fill="#FFB800" color="#FFB800" />
                    ))}
                  </div>
                  <span className="pulse-review-tier">{item.tier}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
