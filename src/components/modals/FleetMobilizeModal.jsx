import React, { useState } from 'react';
import { X, Send, MessageCircle, Copy, Check, CheckCircle2, Loader2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function FleetMobilizeModal() {
  const { activeModal, modalData, closeModal, language, showToast } = useApp();

  const [siteDest, setSiteDest] = useState('Site Proyek IKN Nusantara');
  const [targetDate, setTargetDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [duration, setDuration] = useState('3 Bulan');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ticketId, setTicketId] = useState('#DISP-2026-8891');

  if (activeModal !== 'fleet' || !modalData) return null;

  const unit = modalData;
  const isReady = unit.status.includes('READY');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const newTicket = '#DISP-2026-' + Math.floor(1000 + Math.random() * 9000);
      setTicketId(newTicket);
      setLoading(false);
      setSubmitted(true);

      showToast({
        type: 'success',
        title: language === 'en' ? 'Dispatch Sent to Workshop!' : 'Disposisi Terkirim ke Workshop!',
        message:
          language === 'en'
            ? `Digital dispatch permit ${newTicket} for ${unit.name} has been registered.`
            : `Surat jalan digital ${newTicket} untuk ${unit.name} telah didaftarkan ke Workshop & Logistik.`
      });
    }, 800);
  };

  const handleCopyTicket = () => {
    navigator.clipboard.writeText(ticketId);
    showToast({
      type: 'info',
      title: language === 'en' ? 'Ticket No. Copied' : 'Nomor Tiket Tersalin',
      message: `${ticketId} telah disalin ke clipboard.`
    });
  };

  const handleWhatsApp = () => {
    const msg =
      language === 'en'
        ? `Hello Contractor.Hub Logistics Team,\n\nI would like to request equipment mobilization:\n- Unit: ${unit.name} (${unit.code})\n- Capacity: ${unit.capacity}\n- Destination: ${siteDest}\n- Date: ${targetDate}\n- Duration: ${duration}\n\nPlease confirm dispatch permit. Thank you!`
        : `Halo Tim Workshop & Logistik Contractor.Hub,\n\nSaya ingin mengajukan permohonan mobilisasi armada:\n- Unit: ${unit.name} (${unit.code})\n- Kapasitas: ${unit.capacity}\n- Tujuan: ${siteDest}\n- Tanggal: ${targetDate}\n- Durasi: ${duration}\n\nMohon konfirmasi ketersediaan rute pengawalan & surat jalan. Terima kasih!`;

    window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="modal-backdrop open" id="modal-fleet-mobilize" onClick={closeModal}>
      <div className="modal-container modal-fleet-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="fleet-modal-pretitle">SISTEM DISPOSISI LOGISTIK ALAT BERAT</div>
            <h3 className="modal-title">
              {isReady ? 'Permintaan Mobilisasi Unit' : 'Request Booking & Reservasi Unit'}
            </h3>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={closeModal}
            aria-label="Tutup Modal"
          >
            <X style={{ width: 20, height: 20 }} />
          </button>
        </div>

        <div className="modal-body">
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              {/* Unit Info Card */}
              <div className="fleet-unit-summary-card">
                <div className="unit-summary-header">
                  <div>
                    <code style={{ color: 'var(--accent-cyan)' }}>{unit.code}</code>
                    <h4 style={{ margin: '0.2rem 0', fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                      {unit.name}
                    </h4>
                  </div>
                  <span className={isReady ? 'status-pill-ready' : 'status-pill-deployed'}>
                    {unit.status}
                  </span>
                </div>
                <div className="unit-summary-meta">
                  <div>
                    <span>KAPASITAS: </span>
                    <strong>{unit.capacity}</strong>
                  </div>
                  <div>
                    <span>LOKASI ASAL: </span>
                    <strong>{unit.location}</strong>
                  </div>
                </div>
              </div>

              {/* Destination & Quick Chips */}
              <div className="form-group" style={{ marginTop: '1rem' }}>
                <label className="form-label">Lokasi Site Proyek Tujuan *</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  value={siteDest}
                  onChange={(e) => setSiteDest(e.target.value)}
                />
                <div className="fleet-chips-row" style={{ marginTop: '0.5rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {['Site IKN Nusantara', 'Mega Proyek PIK 2', 'Tower SCBD Jakarta', 'Pelabuhan Surabaya'].map((site) => (
                    <button
                      key={site}
                      type="button"
                      className="fleet-chip"
                      onClick={() => setSiteDest(site)}
                    >
                      + {site}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Duration Grid */}
              <div className="calc-grid-2col">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Rencana Tanggal Mobilisasi *</label>
                  <input
                    type="date"
                    className="form-input"
                    required
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Durasi Operasional</label>
                  <select
                    className="form-select"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  >
                    <option value="1 Bulan">1 Bulan</option>
                    <option value="3 Bulan">3 Bulan</option>
                    <option value="6 Bulan">6 Bulan</option>
                    <option value="12+ Bulan">12+ Bulan (Proyek Multi-Years)</option>
                  </select>
                </div>
              </div>

              {/* Legal & Safety Checkboxes */}
              <div style={{ marginTop: '1rem', background: 'var(--bg-card)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.4rem', fontFamily: 'var(--font-mono)' }}>
                  STANDAR LEGALITAS & K3
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                  <input type="checkbox" defaultChecked /> Sertakan Operator & Rigger Bersertifikat SIO Kemnaker RI
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                  <input type="checkbox" defaultChecked /> Asuransi Alat Berat (Contractors' Plant & Machinery / CPM)
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  <input type="checkbox" defaultChecked /> Sertifikat Surat Ijin Layak Operasi (SILO) Aktif Terverifikasi
                </label>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="spin" style={{ width: 16, height: 16 }} />
                      <span>Memproses Surat Jalan...</span>
                    </>
                  ) : (
                    <>
                      <Send style={{ width: 16, height: 16 }} />
                      <span>Konfirmasi Disposisi</span>
                    </>
                  )}
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleWhatsApp}>
                  <MessageCircle style={{ width: 16, height: 16 }} />
                  <span>WhatsApp Logistik</span>
                </button>
              </div>
            </form>
          ) : (
            /* Success Ticket View */
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div className="success-icon-badge" style={{ margin: '0 auto 1rem' }}>
                <CheckCircle2 style={{ width: 44, height: 44, color: 'var(--accent-emerald)' }} />
              </div>
              <h4 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                Disposisi Mobilisasi Berhasil Diterbitkan
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', maxWidth: '440px', margin: '0 auto 1.25rem' }}>
                Surat jalan digital dan alokasi unit telah didaftarkan ke Kepala Workshop & Tim Logistik.
              </p>

              <div className="fleet-ticket-code-card">
                <div className="ticket-code-header">
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    NO. TIKET DISPOSISI ARMADA
                  </span>
                  <span className="fleet-sla-badge">SLA: &lt; 2 JAM</span>
                </div>
                <div className="fleet-ticket-num">{ticketId}</div>
                <div style={{ fontSize: '0.835rem', color: 'var(--text-secondary)', marginTop: '0.5rem', lineHeight: 1.5 }}>
                  Unit: <strong>{unit.name}</strong> ({unit.code})<br />
                  Kapasitas: <strong>{unit.capacity}</strong><br />
                  Tujuan: <strong>{siteDest}</strong><br />
                  Estimasi Tiba: <strong>1x24 Jam Kerja (Mulai {targetDate})</strong>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button type="button" className="btn btn-secondary btn-sm" onClick={handleCopyTicket}>
                  <Copy style={{ width: 14, height: 14 }} /> Salin No. Tiket
                </button>
                <button type="button" className="btn btn-primary btn-sm" onClick={closeModal}>
                  <Check style={{ width: 14, height: 14 }} /> Selesai
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
