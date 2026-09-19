import React, { useState } from 'react';
import {
  ShieldCheck,
  Wind,
  Droplets,
  CloudRain,
  Thermometer,
  Check,
  AlertOctagon,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const siteData = {
  jakarta: {
    normal: {
      temp: '31°C',
      wind: 14,
      humid: '72%',
      rain: '0.0 mm/h',
      tempStatus: 'Indeks Panas Aman',
      windStatus: 'Batas Kritis: 38 km/h',
      humidStatus: 'Optimal untuk Curing',
      rainStatus: 'Kondisi Kering / Cerah'
    },
    storm: {
      temp: '24°C',
      wind: 54,
      humid: '96%',
      rain: '48.5 mm/h',
      tempStatus: 'Penurunan Suhu Cepat',
      windStatus: '🚨 ANGIN BADAI KRITIS',
      humidStatus: 'Kelembaban Ekstrem',
      rainStatus: '🚨 HUJAN DERAS & PETIR'
    }
  },
  ikn: {
    normal: {
      temp: '29°C',
      wind: 18,
      humid: '82%',
      rain: '0.5 mm/h',
      tempStatus: 'Indeks Panas Tropis',
      windStatus: 'Batas Kritis: 38 km/h',
      humidStatus: 'Kondusif untuk Pengecoran',
      rainStatus: 'Berawan Tipis'
    },
    storm: {
      temp: '23°C',
      wind: 48,
      humid: '98%',
      rain: '62.0 mm/h',
      tempStatus: 'Curah Hujan Tinggi',
      windStatus: '🚨 ANGIN GUST 48 KM/H',
      humidStatus: 'Saturasi Air Tanah Penuh',
      rainStatus: '🚨 HUJAN BADAI TROPIS'
    }
  },
  surabaya: {
    normal: {
      temp: '34°C',
      wind: 22,
      humid: '65%',
      rain: '0.0 mm/h',
      tempStatus: 'Suhu Lapangan Tinggi',
      windStatus: 'Batas Kritis: 38 km/h',
      humidStatus: 'Curing Tambahan Diperlukan',
      rainStatus: 'Cerah Panas'
    },
    storm: {
      temp: '26°C',
      wind: 58,
      humid: '92%',
      rain: '55.0 mm/h',
      tempStatus: 'Penurunan Drastis',
      windStatus: '🚨 BADAI PESISIR 58 KM/H',
      humidStatus: 'Gelombang Tinggi',
      rainStatus: '🚨 HUJAN LEBAT DERMAGA'
    }
  },
  bali: {
    normal: {
      temp: '30°C',
      wind: 20,
      humid: '74%',
      rain: '0.0 mm/h',
      tempStatus: 'Indeks Nyaman',
      windStatus: 'Batas Kritis: 38 km/h',
      humidStatus: 'Optimal untuk Finishing',
      rainStatus: 'Cerah Berangin'
    },
    storm: {
      temp: '24°C',
      wind: 50,
      humid: '95%',
      rain: '42.0 mm/h',
      tempStatus: 'Angin Tebing Kencang',
      windStatus: '🚨 ANGIN TEBING KRITIS',
      humidStatus: 'Kabut Tebal',
      rainStatus: '🚨 BADAI ANGIN PANTAI'
    }
  }
};

export default function WeatherWidget() {
  const { language } = useApp();
  const [selectedSite, setSelectedSite] = useState('jakarta');
  const [currentMode, setCurrentMode] = useState('normal'); // 'normal' | 'storm'

  const telemetry = (siteData[selectedSite] || siteData.jakarta)[currentMode];
  const isNormal = currentMode === 'normal';

  return (
    <div>
      {/* Widget Header & Purpose Explanation */}
      <div className="k3-widget-header">
        <div>
          <div className="k3-module-tag">
            <ShieldCheck style={{ width: 15, height: 15 }} />
            <span>SISTEM MONITORING K3 (SMK3 IoT) • PERMENAKER NO. 5/2018</span>
          </div>
          <h4 className="k3-module-title">Pusat Monitoring Cuaca Site & Otorisasi Keselamatan K3</h4>
          <p className="k3-module-desc">
            Sistem validasi izin kerja (Work Permit K3) real-time berdasarkan parameter cuaca lapangan
            untuk menjamin keselamatan operasional Tower Crane, pengecoran beton ready-mix, dan
            pekerjaan di ketinggian.
          </p>
        </div>

        {/* Site Location & Simulation Controls */}
        <div className="k3-controls-bar">
          <div className="k3-control-group">
            <label htmlFor="weather-site-select" className="k3-control-label">
              Pilih Lokasi Proyek Aktif:
            </label>
            <select
              className="form-select k3-site-select"
              id="weather-site-select"
              value={selectedSite}
              onChange={(e) => setSelectedSite(e.target.value)}
            >
              <option value="jakarta">Proyek Mega-Tower Jakarta CBD</option>
              <option value="ikn">Proyek Istana Garuda IKN Nusantara</option>
              <option value="surabaya">Proyek Jembatan & Dermaga Surabaya</option>
              <option value="bali">Proyek Luxury Cliff Resort Bali</option>
            </select>
          </div>

          <div className="k3-control-group">
            <span className="k3-control-label">Uji Skenario Lapangan:</span>
            <div className="k3-sim-btn-group">
              <button
                type="button"
                className={`btn-sim-mode ${isNormal ? 'active' : ''}`}
                onClick={() => setCurrentMode('normal')}
              >
                ☀ KONDISI NORMAL
              </button>
              <button
                type="button"
                className={`btn-sim-mode btn-sim-storm ${!isNormal ? 'active' : ''}`}
                onClick={() => setCurrentMode('storm')}
              >
                ⛈ SIMULASI ANGIN BADAI
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Telemetry Grid */}
      <div className="weather-telemetry-grid">
        <div className="weather-card">
          <div className="weather-card-header">
            <Thermometer style={{ width: 18, height: 18 }} />
            <span>SUHU LAPANGAN</span>
          </div>
          <div className="weather-value">{telemetry.temp}</div>
          <div className="weather-sub">{telemetry.tempStatus}</div>
        </div>

        <div className="weather-card">
          <div className="weather-card-header">
            <Wind style={{ width: 18, height: 18 }} />
            <span>KECEPATAN ANGIN</span>
          </div>
          <div className="weather-value">{telemetry.wind} km/h</div>
          <div className="weather-sub">{telemetry.windStatus}</div>
        </div>

        <div className="weather-card">
          <div className="weather-card-header">
            <Droplets style={{ width: 18, height: 18 }} />
            <span>KELEMBABAN RELATIF</span>
          </div>
          <div className="weather-value">{telemetry.humid}</div>
          <div className="weather-sub">{telemetry.humidStatus}</div>
        </div>

        <div className="weather-card">
          <div className="weather-card-header">
            <CloudRain style={{ width: 18, height: 18 }} />
            <span>CURAH HUJAN</span>
          </div>
          <div className="weather-value">{telemetry.rain}</div>
          <div className="weather-sub">{telemetry.rainStatus}</div>
        </div>
      </div>

      {/* K3 Construction Safety Directives */}
      <div className="k3-directives-grid">
        {/* Crane Directives */}
        <div className="k3-directive-card">
          <div className="k3-card-header">
            <div className="k3-op-title">Operasional Tower Crane & Rigging</div>
            <div className={`k3-status-pill ${isNormal ? 'status-safe' : 'status-danger'}`}>
              {isNormal ? (
                <>
                  <Check style={{ width: 14, height: 14 }} />
                  <span>{language === 'en' ? 'PERMIT GRANTED' : 'IZIN DIBERIKAN'}</span>
                </>
              ) : (
                <>
                  <AlertOctagon style={{ width: 14, height: 14 }} />
                  <span>{language === 'en' ? 'STOP LIFTING' : 'STOP OPERASI CRANE'}</span>
                </>
              )}
            </div>
          </div>
          <p className="k3-card-desc">
            {isNormal
              ? `Kecepatan angin ${telemetry.wind} km/h memenuhi syarat aman pengangkatan beban heavy rigging hingga 24 Ton.`
              : `KRITIS: Hembusan angin ${telemetry.wind} km/h melebihi batas 38 km/h! Kunci rem swing ke mode bebas (weathervaning) segera.`}
          </p>
        </div>

        {/* Concrete Pouring Directives */}
        <div className="k3-directive-card">
          <div className="k3-card-header">
            <div className="k3-op-title">Pengecoran Beton Ready-Mix (Slump)</div>
            <div className={`k3-status-pill ${isNormal ? 'status-safe' : 'status-warning'}`}>
              {isNormal ? (
                <>
                  <Check style={{ width: 14, height: 14 }} />
                  <span>{language === 'en' ? 'OPTIMAL POURING' : 'PENGECORAN KONDUSIF'}</span>
                </>
              ) : (
                <>
                  <AlertTriangle style={{ width: 14, height: 14 }} />
                  <span>{language === 'en' ? 'DELAY POURING' : 'TUNDA PENGECORAN'}</span>
                </>
              )}
            </div>
          </div>
          <p className="k3-card-desc">
            {isNormal
              ? `Curah hujan ${telemetry.rain} menjaga rasio air-semen (w/c ratio) mutu beton K-350 tetap sempurna.`
              : `Curah hujan deras berisiko merusak slump & mutu tekan beton. Tutup plat lantai yang baru dicor dengan terpal pelindung.`}
          </p>
        </div>

        {/* Height Work Directives */}
        <div className="k3-directive-card">
          <div className="k3-card-header">
            <div className="k3-op-title">Pekerjaan di Ketinggian & Scaffolding</div>
            <div className={`k3-status-pill ${isNormal ? 'status-safe' : 'status-danger'}`}>
              {isNormal ? (
                <>
                  <Check style={{ width: 14, height: 14 }} />
                  <span>{language === 'en' ? 'WORK PERMIT OPEN' : 'IZIN KERJA TERBUKA'}</span>
                </>
              ) : (
                <>
                  <AlertOctagon style={{ width: 14, height: 14 }} />
                  <span>{language === 'en' ? 'EVACUATE HEIGHTS' : 'EVAKUASI KETINGGIAN'}</span>
                </>
              )}
            </div>
          </div>
          <p className="k3-card-desc">
            {isNormal
              ? 'Tidak terdeteksi petir atau turbulensi. Wajib menggunakan Full Body Harness double lanyard.'
              : 'Bahaya sambaran petir & terpaan badai kencang. Turunkan seluruh pekerja dari scaffolding & tepi perimeter gedung.'}
          </p>
        </div>
      </div>

      {/* Advisory Box */}
      <div className={`k3-advisory-box ${!isNormal ? 'advisory-critical' : ''}`}>
        <div className="k3-advisory-title">
          {isNormal
            ? 'SOP K3 AKTIF: SELURUH AKTIVITAS SITE DIIZINKAN BERJALAN NORMAL'
            : 'PROTOKOL DARURAT K3 AKTIF: HENTIKAN PEKERJAAN LUAR RUANG & KETINGGIAN'}
        </div>
        <div className="k3-advisory-text">
          {isNormal
            ? 'Petugas K3 Lapangan (Safety Officer) telah menyetujui seluruh lembar Work Permit harian. Pastikan toolbox meeting pagi telah dilaksanakan dan perlengkapan APD lengkap terpasang.'
            : 'Peringatan Sirine Site: Seluruh pengawas diwajibkan memastikan pekerja berada di shelter aman dan mengikat material ringan agar tidak terbawa angin.'}
        </div>
      </div>
    </div>
  );
}
