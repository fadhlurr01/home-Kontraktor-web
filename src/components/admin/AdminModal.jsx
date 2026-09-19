import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Download,
  Search,
  Filter,
  Trash2,
  Phone,
  CheckCircle,
  Clock,
  Briefcase,
  Layers,
  RefreshCw,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { api } from '../../services/api';
import { useApp } from '../../context/AppContext';

export default function AdminModal({ isOpen, onClose }) {
  const { showToast } = useApp();
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    activeSurvey: 0,
    deals: 0,
    conversionRate: 0
  });

  const [loading, setLoading] = useState(false);
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Auto-fetch when modal opens and authenticated
  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchData();
    }
  }, [isOpen, isAuthenticated, typeFilter, statusFilter]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthLoading(true);

    try {
      const res = await api.adminLogin(pin);
      if (res.success) {
        setIsAuthenticated(true);
        setPin('');
        showToast({
          type: 'success',
          title: 'Login Berhasil',
          message: 'Selamat datang di Contractor CRM Leads Portal.'
        });
        fetchData();
      } else {
        showToast({
          type: 'error',
          title: 'Akses Ditolak',
          message: res.message || 'PIN Admin tidak valid (Default: admin123)'
        });
      }
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Error',
        message: 'Gagal melakukan otentikasi admin'
      });
    } finally {
      setAuthLoading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [leadsRes, statsRes] = await Promise.all([
        api.getInquiries({ type: typeFilter, status: statusFilter, search: searchQuery }),
        api.getAdminStats()
      ]);

      if (leadsRes.data) setLeads(leadsRes.data);
      if (statsRes.data) setStats(statsRes.data);
    } catch (err) {
      console.error('Fetch leads error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.updateInquiryStatus(id, newStatus);
      showToast({
        type: 'success',
        title: 'Status Diperbarui',
        message: `Status lead telah diubah ke: ${newStatus}`
      });
      fetchData();
    } catch (err) {
      showToast({ type: 'error', title: 'Error', message: 'Gagal mengubah status' });
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Hapus data leads atas nama "${name}"?`)) return;
    try {
      await api.deleteInquiry(id);
      showToast({
        type: 'info',
        title: 'Lead Dihapus',
        message: 'Data leads telah dihapus dari database.'
      });
      fetchData();
    } catch (err) {
      showToast({ type: 'error', title: 'Error', message: 'Gagal menghapus data' });
    }
  };

  const handleExportCsv = () => {
    window.open(api.getExportUrl(), '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop open" style={{ zIndex: 100000 }} onClick={onClose}>
      <div
        className="modal-container admin-modal"
        style={{ maxWidth: isAuthenticated ? '940px' : '420px', maxHeight: '90vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="modal-header" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="section-tag" style={{ margin: 0, padding: '0.15rem 0.6rem', fontSize: '0.72rem' }}>
                CRM SYSTEM
              </span>
              <h3 className="modal-title" style={{ fontSize: '1.25rem', margin: 0 }}>
                {isAuthenticated ? 'Contractor Leads Portal' : 'Admin Login'}
              </h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0 0' }}>
              {isAuthenticated
                ? 'Kelola database prospek konsultasi, tender RFP, dan disposisi armada'
                : 'Masukkan PIN otentikasi manajemen'}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {isAuthenticated && (
              <button
                type="button"
                onClick={() => setIsAuthenticated(false)}
                title="Logout"
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-secondary)',
                  padding: '0.4rem 0.6rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <LogOut style={{ width: 14, height: 14 }} />
                <span>Logout</span>
              </button>
            )}
            <button
              type="button"
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Tutup"
            >
              <X style={{ width: 20, height: 20 }} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body" style={{ paddingTop: '1.25rem' }}>
          {!isAuthenticated ? (
            /* Login Form */
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: 'rgba(26, 90, 240, 0.1)',
                    border: '1px solid rgba(26, 90, 240, 0.25)',
                    color: '#1A5AF0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem auto'
                  }}
                >
                  <Lock style={{ width: 26, height: 26 }} />
                </div>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                  Otentikasi Manajemen
                </h4>
                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  Gunakan PIN default: <code style={{ color: '#1A5AF0', fontWeight: 600 }}>admin123</code>
                </p>
              </div>

              <div className="form-group">
                <label className="form-label">PIN Kredensial</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Masukkan PIN..."
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  autoFocus
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={authLoading}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {authLoading ? 'Memverifikasi...' : 'Buka Dashboard Leads'}
              </button>
            </form>
          ) : (
            /* Leads Dashboard */
            <div>
              {/* KPI Summary Cards */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}
              >
                <div
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    padding: '1rem 1.15rem',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                    Total Prospek
                  </div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                    {stats.totalLeads}
                  </div>
                </div>

                <div
                  style={{
                    background: 'rgba(26, 90, 240, 0.05)',
                    border: '1.5px solid rgba(26, 90, 240, 0.25)',
                    borderRadius: '12px',
                    padding: '1rem 1.15rem',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ fontSize: '0.75rem', color: '#1A5AF0', textTransform: 'uppercase', fontWeight: 700 }}>
                    Prospek Baru
                  </div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1A5AF0', marginTop: '0.25rem' }}>
                    {stats.newLeads}
                  </div>
                </div>

                <div
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    padding: '1rem 1.15rem',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                    Survey Lokasi
                  </div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0284c7', marginTop: '0.25rem' }}>
                    {stats.activeSurvey}
                  </div>
                </div>

                <div
                  style={{
                    background: 'rgba(34, 197, 94, 0.05)',
                    border: '1.5px solid rgba(34, 197, 94, 0.25)',
                    borderRadius: '12px',
                    padding: '1rem 1.15rem',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ fontSize: '0.75rem', color: '#16a34a', textTransform: 'uppercase', fontWeight: 700 }}>
                    SPK / Deal Closing
                  </div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#16a34a', marginTop: '0.25rem' }}>
                    {stats.deals}
                  </div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '0.75rem'
                }}
              >
                {/* Search */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: '1 1 220px' }}>
                  <Search style={{ width: 16, height: 16, color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    placeholder="Cari nama, telp, tipe..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && fetchData()}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-primary)',
                      fontSize: '0.85rem',
                      width: '100%',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Filters */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                      padding: '0.45rem 0.75rem',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 500
                    }}
                  >
                    <option value="all">Semua Kategori</option>
                    <option value="consult">Konsultasi</option>
                    <option value="rfp">Tender RFP</option>
                    <option value="fleet">Armada Alat Berat</option>
                    <option value="brochure">Unduh Brosur</option>
                  </select>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                      padding: '0.45rem 0.75rem',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 500
                    }}
                  >
                    <option value="all">Semua Status</option>
                    <option value="Baru">Baru</option>
                    <option value="Dihubungi">Dihubungi</option>
                    <option value="Survey Lokasi">Survey Lokasi</option>
                    <option value="SPK / Deal">SPK / Deal</option>
                    <option value="Batal">Batal</option>
                  </select>

                  <button
                    type="button"
                    onClick={fetchData}
                    title="Refresh Data"
                    style={{
                      background: 'transparent',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      padding: '0.35rem 0.6rem',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <RefreshCw style={{ width: 14, height: 14 }} className={loading ? 'spin-anim' : ''} />
                  </button>

                  <button
                    type="button"
                    onClick={handleExportCsv}
                    className="btn btn-secondary"
                    style={{ padding: '0.35rem 0.8rem', fontSize: '0.8rem', gap: '0.35rem' }}
                  >
                    <Download style={{ width: 14, height: 14 }} />
                    <span>Ekspor CSV</span>
                  </button>
                </div>
              </div>

              {/* Leads List / Table */}
              <div style={{ overflowX: 'auto' }}>
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    textAlign: 'left',
                    fontSize: '0.84rem'
                  }}
                >
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                      <th style={{ padding: '0.75rem 0.5rem' }}>Tanggal & Klien</th>
                      <th style={{ padding: '0.75rem 0.5rem' }}>Tipe & Proyek</th>
                      <th style={{ padding: '0.75rem 0.5rem' }}>Catatan / Budget</th>
                      <th style={{ padding: '0.75rem 0.5rem' }}>Status</th>
                      <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.length === 0 ? (
                      <tr>
                        <td colSpan={5} style={{ padding: '2.5rem 0', textAlign: 'center', color: 'var(--text-secondary)' }}>
                          {loading ? 'Memuat data prospek...' : 'Tidak ada data leads yang sesuai dengan filter.'}
                        </td>
                      </tr>
                    ) : (
                      leads.map((item) => (
                        <tr
                          key={item.id}
                          style={{
                            borderBottom: '1px solid rgba(255,255,255,0.06)',
                            verticalAlign: 'top'
                          }}
                        >
                          {/* Client */}
                          <td style={{ padding: '0.75rem 0.5rem', minWidth: '170px' }}>
                            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.name}</div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                              {item.phone}
                            </div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted, #777)', marginTop: '0.15rem' }}>
                              {new Date(item.createdAt).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                          </td>

                          {/* Type & Project */}
                          <td style={{ padding: '0.75rem 0.5rem', minWidth: '180px' }}>
                            <span
                              style={{
                                display: 'inline-block',
                                fontSize: '0.7rem',
                                padding: '0.15rem 0.5rem',
                                borderRadius: '4px',
                                background:
                                  item.type === 'consult'
                                    ? 'rgba(56, 189, 248, 0.15)'
                                    : item.type === 'rfp'
                                    ? 'rgba(255, 107, 0, 0.15)'
                                    : item.type === 'fleet'
                                    ? 'rgba(234, 179, 8, 0.15)'
                                    : 'rgba(168, 85, 247, 0.15)',
                                color:
                                  item.type === 'consult'
                                    ? '#38bdf8'
                                    : item.type === 'rfp'
                                    ? 'var(--accent-color)'
                                    : item.type === 'fleet'
                                    ? '#eab308'
                                    : '#c084fc',
                                textTransform: 'uppercase',
                                fontWeight: 600,
                                marginBottom: '0.25rem'
                              }}
                            >
                              {item.type}
                            </span>
                            <div style={{ color: 'var(--text-primary)', fontSize: '0.82rem', fontWeight: 500 }}>
                              {item.projectType}
                            </div>
                          </td>

                          {/* Notes & Budget */}
                          <td style={{ padding: '0.75rem 0.5rem', maxWidth: '240px' }}>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.4 }}>
                              {item.notes || '-'}
                            </div>
                            {item.budget && item.budget !== '-' && (
                              <div style={{ fontSize: '0.75rem', color: 'var(--accent-color)', marginTop: '0.25rem' }}>
                                Est: {item.budget}
                              </div>
                            )}
                          </td>

                          {/* Status Dropdown */}
                          <td style={{ padding: '0.75rem 0.5rem', minWidth: '140px' }}>
                            <select
                              value={item.status}
                              onChange={(e) => handleStatusChange(item.id, e.target.value)}
                              style={{
                                background:
                                  item.status === 'Baru'
                                    ? 'rgba(255, 107, 0, 0.15)'
                                    : item.status === 'SPK / Deal'
                                    ? 'rgba(34, 197, 94, 0.15)'
                                    : item.status === 'Survey Lokasi'
                                    ? 'rgba(56, 189, 248, 0.15)'
                                    : item.status === 'Batal'
                                    ? 'rgba(239, 68, 68, 0.15)'
                                    : 'rgba(255,255,255,0.08)',
                                color:
                                  item.status === 'Baru'
                                    ? 'var(--accent-color)'
                                    : item.status === 'SPK / Deal'
                                    ? '#22c55e'
                                    : item.status === 'Survey Lokasi'
                                    ? '#38bdf8'
                                    : item.status === 'Batal'
                                    ? '#ef4444'
                                    : 'var(--text-primary)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '6px',
                                padding: '0.3rem 0.5rem',
                                fontSize: '0.78rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                outline: 'none'
                              }}
                            >
                              <option value="Baru">Baru</option>
                              <option value="Dihubungi">Dihubungi</option>
                              <option value="Survey Lokasi">Survey Lokasi</option>
                              <option value="SPK / Deal">SPK / Deal</option>
                              <option value="Batal">Batal</option>
                            </select>
                          </td>

                          {/* Actions */}
                          <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right', minWidth: '100px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.4rem' }}>
                              {item.phone && (
                                <a
                                  href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '').replace(/^0/, '62')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="Chat WhatsApp"
                                  style={{
                                    padding: '0.35rem',
                                    borderRadius: '6px',
                                    background: 'rgba(37, 211, 102, 0.15)',
                                    color: '#25D366',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                  }}
                                >
                                  <Phone style={{ width: 14, height: 14 }} />
                                </a>
                              )}
                              <button
                                type="button"
                                onClick={() => handleDelete(item.id, item.name)}
                                title="Hapus Lead"
                                style={{
                                  padding: '0.35rem',
                                  borderRadius: '6px',
                                  background: 'rgba(239, 68, 68, 0.1)',
                                  color: '#ef4444',
                                  border: 'none',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                <Trash2 style={{ width: 14, height: 14 }} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
