/* ==========================================================================
   CONTRACTOR.HUB - Main Global Logic & Event Controller (JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLanguage();
  initHeader();
  initMobileDrawer();
  initHeroBlueprintSwitcher();
  initWorkflowStream();
  initWidgetTabs();
  initPortfolioFilters();
  initTemplateDemos();
  initSpecSheetInspectors();
  initTestimonialCarousel();
  initFaqAccordion();
  initModals();
  initServerClock();
  initCurrencySelector();
  initBrochureForm();
  initScrollReveal();
  initFeatureInspectLinks();
  initScrollToTop();
});

/* ==========================================================================
   1. Dark / Light Theme Switcher
   ========================================================================== */
function initTheme() {
  const themeBtns = document.querySelectorAll('.theme-btn');
  const savedTheme = localStorage.getItem('contractor_theme') || 'dark';

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('contractor_theme', theme);
    themeBtns.forEach(btn => {
      btn.innerHTML = theme === 'dark' ? '🌓' : '☀️';
    });
  }

  setTheme(savedTheme);

  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });
  });
}

/* ==========================================================================
   2. Bilingual Language Switcher (ID / EN)
   ========================================================================== */
function initLanguage() {
  const langBtns = document.querySelectorAll('.lang-btn');
  let currentLang = localStorage.getItem('contractor_lang') || 'id';

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('contractor_lang', lang);

    langBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    const dict = typeof translations !== 'undefined' ? translations[lang] : null;
    if (!dict) return;

    // Update all data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) {
        el.setAttribute('placeholder', dict[key]);
      }
    });
  }

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetLang = btn.getAttribute('data-lang') || 'id';
      applyLanguage(targetLang);
    });
  });

  applyLanguage(currentLang);
}

/* ==========================================================================
   3. Header Sticky & Dynamic Glass on Scroll
   ========================================================================== */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  function handleScroll() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   4. Mobile Menu Drawer
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-toggle-btn');
  const drawer = document.querySelector('.mobile-drawer');
  const closeBtns = document.querySelectorAll('.drawer-close-trigger');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.toggle('open');
      document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
    });

    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        drawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

/* ==========================================================================
   5. Hero Blueprint Interactive Project Switcher (Lightweight & Instant)
   ========================================================================== */
function initHeroBlueprintSwitcher() {
  const pills = document.querySelectorAll('.hero-filter-box .filter-pill');
  const img = document.getElementById('hero-blueprint-img');
  const title = document.getElementById('hero-blueprint-title');
  const type = document.getElementById('hero-blueprint-type');
  const area = document.getElementById('hero-blueprint-area');
  const struct = document.getElementById('hero-blueprint-struct');
  const status = document.getElementById('hero-blueprint-status');

  const data = {
    all: {
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      title: 'Aura Master Villa & Penthouse',
      type: 'RESIDENSIAL MEWAH',
      area: '850 m²',
      struct: 'WF Baja & K-350',
      status: '100% Ready'
    },
    interior: {
      img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
      title: 'Grand Lounge & Bespoke Interior',
      type: 'INTERIOR FIT-OUT',
      area: '420 m²',
      struct: 'Oak Parquet & Akustik',
      status: '100% Ready'
    },
    arch: {
      img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
      title: 'Atelier Pavilion & Masterplanning',
      type: 'BIRO ARSITEKTUR',
      area: '1,200 m²',
      struct: 'Curtain Wall & Concrete',
      status: '100% Ready'
    },
    civil: {
      img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
      title: 'Nexus Commercial Tower & EPC',
      type: 'SIPIL & GEDUNG TINGGI',
      area: '14,500 m²',
      struct: 'Bore Pile & Precast',
      status: '100% Ready'
    }
  };

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const mode = pill.getAttribute('data-mode') || 'all';
      const item = data[mode] || data.all;

      if (img) {
        img.style.opacity = '0.4';
        setTimeout(() => {
          img.src = item.img;
          img.style.opacity = '1';
        }, 150);
      }
      if (title) title.textContent = item.title;
      if (type) type.textContent = item.type;
      if (area) area.textContent = item.area;
      if (struct) struct.textContent = item.struct;
      if (status) status.textContent = item.status;
    });
  });
}

/* ==========================================================================
   6. Interactive Architectural Workflow Stream (Section 05 - No Cards)
   ========================================================================== */
function initWorkflowStream() {
  const steps = document.querySelectorAll('.v-stream-step');
  if (steps.length === 0) return;
  // Dynamic step interactions can be added here if needed
}

/* ==========================================================================
   7. Widget Tabs Switcher
   ========================================================================== */
function initWidgetTabs() {
  const tabBtns = document.querySelectorAll('.widget-tab-btn');
  const panes = document.querySelectorAll('.widget-pane');

  function activateTab(targetId) {
    tabBtns.forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-target') === targetId);
    });
    panes.forEach(p => {
      p.classList.toggle('active', p.getAttribute('id') === targetId);
    });

    if (targetId === 'widget-tour' && window.tourResize) {
      setTimeout(window.tourResize, 50);
      setTimeout(window.tourResize, 250);
    }
    if (targetId === 'widget-ba' && window.baResize) {
      setTimeout(window.baResize, 50);
      setTimeout(window.baResize, 250);
    }
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  window.activateWidgetTab = activateTab;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      activateTab(targetId);
    });
  });
}

/* ==========================================================================
   8. Feature Library Inspect Links to Live Widget Sandbox
   ========================================================================== */
function initFeatureInspectLinks() {
  const triggers = document.querySelectorAll('.feature-preview-trigger');

  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetTab = btn.getAttribute('data-target-tab');
      if (targetTab && window.activateWidgetTab) {
        e.preventDefault();
        const widgetSec = document.getElementById('widgets');
        if (widgetSec) {
          widgetSec.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            window.activateWidgetTab(targetTab);
          }, 350);
        }
      }
    });
  });
}

/* ==========================================================================
   9. Portfolio Filters
   ========================================================================== */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.portfolio-filter-row .filter-pill');
  const cards = document.querySelectorAll('.portfolio-grid .template-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.getAttribute('data-cat') || 'all';

      cards.forEach(card => {
        const cardCat = card.getAttribute('data-cat');
        if (cat === 'all' || cardCat === cat) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.35s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   9b. Interactive Multi-Device Live Iframe Viewport Sandbox
   ========================================================================== */
function initTemplateDemos() {
  const demoBtns = document.querySelectorAll('.btn-open-demo');
  const modal = document.getElementById('modal-live-viewport');
  const iframe = document.getElementById('live-viewport-iframe');
  const stage = document.getElementById('viewport-stage');
  const loader = document.getElementById('viewport-loader');
  const modalTitle = document.getElementById('live-modal-title');
  const modalUrl = document.getElementById('live-modal-url');
  const externalLink = document.getElementById('live-modal-external-link');
  const deviceBtns = document.querySelectorAll('.viewport-device-switcher .device-btn');

  if (!modal || !iframe) return;

  function setDeviceMode(device) {
    if (!stage) return;
    stage.classList.remove('device-desktop', 'device-tablet', 'device-mobile');
    stage.classList.add(`device-${device}`);

    deviceBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-device') === device);
    });
  }

  deviceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const dev = btn.getAttribute('data-device') || 'desktop';
      setDeviceMode(dev);
    });
  });

  demoBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const url = btn.getAttribute('data-url');
      const title = btn.getAttribute('data-title') || 'Website Preview';
      const initialMode = btn.getAttribute('data-mode') || 'desktop';

      if (!url) return;

      if (modalTitle) modalTitle.textContent = `${title} • Live Viewport`;
      if (modalUrl) modalUrl.textContent = url;
      if (externalLink) externalLink.href = url;

      setDeviceMode(initialMode);

      if (loader) loader.style.display = 'flex';
      iframe.src = url;

      iframe.onload = () => {
        if (loader) loader.style.display = 'none';
      };

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  // Reset iframe on modal close to save memory and network
  const closeTriggers = modal.querySelectorAll('.modal-close-btn, .modal-close-trigger');
  closeTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      setTimeout(() => {
        if (!modal.classList.contains('open')) {
          iframe.src = 'about:blank';
        }
      }, 300);
    });
  });
}

/* ==========================================================================
   9c. Dynamic Spec Sheet Inspector Controller
   ========================================================================== */
const templateSpecsData = {
  karyabuild: {
    title: 'KaryaBuild - Kontraktor & Toko Material SNI',
    badge: 'E-COMMERCE & GENERAL CONTRACTOR',
    url: 'https://karya-build-cl1i.vercel.app/',
    desc: 'Solusi terintegrasi konstruksi gedung komersial, perumahan, interior fit-out, serta e-commerce pengadaan material konstruksi SNI berstandar ISO 9001:2015.',
    framework: 'React 18 / Vite / Lucide Icons',
    css: 'TailwindCSS + Dark Slate Color Matrix',
    seo: '100/100 • Schema.org GeneralContractor & Product JSON-LD',
    responsive: 'Fluid Mobile-First (320px - 2560px)',
    features: [
      'Katalog Pengadaan Material Konstruksi SNI Terverifikasi',
      'Kalkulator Estimasi Rencana Anggaran Biaya (RAB) per m²',
      'Standar Manajemen Mutu Internasional ISO 9001:2015',
      'Multi-Cart E-Commerce Checkout & Request Tender Proyek',
      'Dashboard Status Pengiriman Material Real-Time'
    ]
  },
  kontraktorpro: {
    title: 'Kontraktor Pro - Platform Bangun & Renovasi',
    badge: 'E-COMMERCE & RENOVASI RUMAH',
    url: 'https://kontraktorpro-beta.vercel.app/',
    desc: 'Platform e-commerce kontraktor bangunan terpercaya dengan paket bangun rumah, renovasi modern, material SNI, kalkulator RAB interaktif, dan sistem pembayaran termin aman.',
    framework: 'React 18 / Vite / Outfit & Plus Jakarta Sans',
    css: 'TailwindCSS + Clean Light Slate UI',
    seo: '99/100 • OpenGraph & Twitter Card SEO Suite',
    responsive: 'All Mobile, Tablet & High-Res Screens',
    features: [
      'Sistem Pembayaran Bertahap (Termin Escrow Milestone)',
      'Paket Bangun Rumah Baru Standard, Luxury, & Bespoke',
      'Kalkulator RAB Interaktif dengan Pemilihan Lantai & Wilayah',
      'Galeri Proyek Renovasi Sebelum dan Sesudah (Before/After)',
      'Formulir Konsultasi WhatsApp Cepat & Transparan'
    ]
  },
  binakarya: {
    title: 'BinaKarya Konstruksi - Garansi Struktur 24 Bulan',
    badge: 'PLATFORM KONTRAKTOR & E-COMMERCE',
    url: 'https://binakarya-jet.vercel.app/',
    desc: 'Platform kontraktor modern berstandar SNI, e-commerce material konstruksi, kalkulator RAB otomatis, konsultasi AI, dan sistem pembayaran termin terintegrasi.',
    framework: 'React 18 / TypeScript / Vite',
    css: 'TailwindCSS + Dark Mode Slate & Vibrant Accents',
    seo: '100/100 • Verified Performance Score',
    responsive: 'Adaptive Touch Gestures & Desktop Viewports',
    features: [
      'Garansi Resmi Struktur Bangunan Selama 24 Bulan',
      'Asisten Virtual Konsultasi AI Terintegrasi',
      'Katalog Material Konstruksi dengan Filter Kategori',
      'Kalkulator Biaya Proyek Real-Time Berdasarkan Indeks Lokasi',
      'Sistem Termin Pembayaran Aman dengan Bukti Progres'
    ]
  },
  nusantrakontruksi: {
    title: 'Nusantara Konstruksi - Hunian Mewah & Komersial',
    badge: 'RESIDENSIAL MEWAH & RENOVASI',
    url: 'https://nusantrakontruksi.vercel.app/',
    desc: 'Jasa kontraktor bangun rumah, ruko, gedung, dan renovasi dengan garansi resmi, RAB transparan, dan pengawasan profesional berstandar arsitektur tropis modern.',
    framework: 'React 18 / Plus Jakarta Sans & Outfit',
    css: 'TailwindCSS + Warm Stone Natural Theme',
    seo: '98/100 • Mobile-Friendly Testing Passed',
    responsive: 'Fully Responsive All Breakpoints',
    features: [
      'Portofolio Rumah Tinggal Mewah & Ruko Komersial',
      'DED (Detail Engineering Design) Tracking System',
      'RAB Transparan dengan Rincian Upah & Material',
      'Garansi Pemeliharaan Pasca-Konstruksi Terjamin',
      'Tim Arsitek & Sipil Bersertifikat LPJK'
    ]
  },
  nusantarakarya: {
    title: 'Nusantara Karya - Biro Arsitektur & Perencanaan',
    badge: 'BIRO ARSITEKTUR & MASTERPLANNING',
    url: 'https://nusantara-karya.vercel.app/',
    desc: 'Website kontraktor dan jasa konstruksi terpercaya: portofolio proyek arsitektur & renovasi, testimoni klien, dan kalkulator formulir penawaran harga RAB online.',
    framework: 'React 18 / Playfair Display & Plus Jakarta Sans',
    css: 'TailwindCSS + Editorial Serif Aesthetics',
    seo: '99/100 • Architectural Rich Snippets Schema',
    responsive: 'High-DPI Retina Displays Ready',
    features: [
      'Portofolio Editorial Visual High-Resolution',
      'Kalkulator Formulir Penawaran RAB Online Instan',
      'Layanan Masterplanning, Arsitektur & Interior Fit-Out',
      'Testimoni Video & Ulasan Owner Properti Eksklusif',
      'Dokumen Rencana Kerja dan Syarat (RKS) Digital'
    ]
  },
  nkontruksi: {
    title: 'NKontruksi - Smart Estimator RAB Otomatis',
    badge: 'SMART ESTIMATOR & KONTRAKTOR',
    url: 'https://nkontruksi.vercel.app/',
    desc: 'Website kontraktor bangunan dan renovasi profesional dengan galeri proyek, kalkulator estimasi biaya otomatis (RAB) per m², dan formulir konsultasi pelanggan.',
    framework: 'React 18 / Space Grotesk Font',
    css: 'TailwindCSS + Dynamic Slate Grid',
    seo: '100/100 • Sub-1s First Contentful Paint',
    responsive: 'Ultra Fast Smartphone & Desktop Interface',
    features: [
      'Kalkulator Estimasi Biaya Cepat (RAB Otomatis per m²)',
      'Galeri Proyek Interaktif dengan Filter Sektor',
      'Formulir Permintaan Penawaran Terintegrasi Email / WA',
      'Indeks Penyesuaian Material & Biaya Wilayah Konstruksi',
      'Sistem Konsultasi Cepat Tanpa Biaya di Awal'
    ]
  },
  nusantarakokoh: {
    title: 'Nusantara Kokoh - Heavy Civil & Industrial',
    badge: 'HEAVY INDUSTRIAL & EPC',
    url: 'https://nusantara-kokoh.vercel.app/',
    desc: 'Platform kontraktor & pemborong bangunan berdaya tahan tinggi dengan portofolio proyek lengkap, estimasi RAB interaktif, layanan rancang bangun, dan tema Dark Brutalist.',
    framework: 'React 18 / Space Grotesk Typography',
    css: 'Dark Brutalist (#0F0F0F) + Electric Orange Accent',
    seo: '99/100 • Heavy EPC Industrial Keywords Schema',
    responsive: 'Rugged Design for Field Tablets & Workstations',
    features: [
      'Spesialis Gudang Pabrik, Hanggar & Gedung Bertingkat',
      'Matriks Kesiapan Armada & Alat Berat Konstruksi',
      'Kalkulator Struktur Berat & Beton Bertulang',
      'Portal Pengajuan Tender Skala Korporasi (RFP Upload)',
      'Sertifikasi Standar K3 Nasional (SMK3 Permenaker)'
    ]
  },
  nusakarya: {
    title: 'NusaKarya - Luxury Architectural Studio',
    badge: 'LUXURY ARCHITECTURE & FIT-OUT',
    url: 'https://nusakarya-psi.vercel.app/',
    desc: 'Website kontraktor profesional terpercaya dengan portofolio proyek konstruksi eksklusif, kalkulator estimasi RAB, Syne Typography, dan dark aesthetic modern.',
    framework: 'React 18 / Syne & Space Grotesk',
    css: 'Pure Dark (#0A0A0A) + Gold Amber Neon Accent',
    seo: '100/100 • Premium Architecture Luxury Index',
    responsive: 'Retina Viewports & Dynamic Smooth Scrolling',
    features: [
      'Showcase Karya Arsitektur Sayembara & Hunian Mewah',
      'Kalkulator RAB Presisi Tinggi dengan Spesifikasi Material',
      'Formulir Request for Proposal (RFP) Terstruktur',
      'Fitur Light & Dark Atmosphere Switcher',
      'Konsultasi Bersama Principal Architect Terpercaya'
    ]
  },
  nusara: {
    title: 'Nusara Hospitality - Interior & Resort Fit-Out',
    badge: 'INTERIOR FIT-OUT & HOSPITALITY',
    url: 'https://nusara-umber.vercel.app/',
    desc: 'Website spesialis interior fit-out hotel bintang lima, luxury resort, lounge, dan restoran tematik modern dengan visual showcase beresolusi ultra-tinggi.',
    framework: 'React 18 / Vite / Lucide Icons',
    css: 'TailwindCSS + Earthy Umber Palette & Glassmorphism',
    seo: '99/100 • Hospitality & Interior Design Schema',
    responsive: 'Optimized Touch Swipes for Portfolios',
    features: [
      'Showcase Interior Restoran, Lounge & Villa High-End',
      'Inspector Swatch Material Kayu, Marmer & Tekstil',
      'Spesifikasi Akustik Ruang & Desain Tata Cahaya',
      'Estimasi Biaya Fit-Out per Luas Area Komersial',
      'Brosur Portofolio PDF Download Otomatis'
    ]
  },
  karyautama: {
    title: 'Karya Utama - Infrastruktur & EPC Skala Besar',
    badge: 'INFRASTRUKTUR & TENDER B2B',
    url: 'https://karya-utama-dusky.vercel.app/',
    desc: 'Portal kontraktor EPC dan pengembang kawasan industri, logistik park, serta fasilitas pergudangan modern siap tender B2B dan pengadaan proyek strategis.',
    framework: 'React 18 / Dusk Industrial Framework',
    css: 'TailwindCSS + Precision Monospace & Steel Grey',
    seo: '100/100 • Enterprise Tender Portal Schema',
    responsive: 'Multi-Monitor 4K & Mobile Field Inspect',
    features: [
      'Portal Dokumen Tender RFP & Unduh RKS Proyek',
      'Showcase Proyek Infrastruktur, Jalan & Kawasan Industri',
      'Matriks Status Unit Alat Berat Ready-Deploy',
      'Sistem Verifikasi Kepatuhan Lingkungan & K3',
      'Layanan Pengadaan Proyek B2B Nasional'
    ]
  },
  nusakon: {
    title: 'Nusakon - Total Design & Build Terpadu',
    badge: 'RANCANG BANGUN & MANAJEMEN',
    url: 'https://nusakon.vercel.app/',
    desc: 'Layanan total design-and-build satu atap dari perizinan PBG/SLF, perancangan arsitektur, hingga eksekusi konstruksi dengan timeline terencana real-time.',
    framework: 'React 18 / Vite / Modern UI Kit',
    css: 'TailwindCSS + Blueprint Technical Cyan',
    seo: '99/100 • General Contractor Schema Validated',
    responsive: 'Desktop, Laptop, Tablet & Mobile Compliant',
    features: [
      'Total One-Stop Service Design & Build',
      'Konsultasi Pengurusan Izin PBG & SLF Gedung',
      'Visualisasi Timeline Milestone & Kurva-S Proyek',
      'Kalkulator Estimasi Biaya Rancang Bangun Terpadu',
      'Sistem Pelaporan Mingguan Progres Lapangan'
    ]
  },
  nunsabuild: {
    title: 'NunsaBuild - Green Building & Sustainable Living',
    badge: 'GREEN BUILDING & SUSTAINABLE',
    url: 'https://nunsabuild.vercel.app/',
    desc: 'Konstruksi ramah lingkungan berstandar Greenship, integrasi tenaga surya (solar panel), ventilasi pasif hemat energi untuk hunian residensial masa depan.',
    framework: 'React 18 / Eco Emerald System',
    css: 'TailwindCSS + Clean Sustainable Nature Palette',
    seo: '100/100 • Green Architecture SEO Optimized',
    responsive: 'Mobile-First Fluid Breakpoints',
    features: [
      'Sertifikasi Standar Greenship Bangunan Hijau',
      'Kalkulator ROI Penghematan Energi & Solar Panel',
      'Penggunaan Material Daur Ulang & Rendah Karbon',
      'Desain Pencahayaan Alami & Sirkulasi Udara Silang',
      'Konsultasi Sertifikasi Bangunan Ramah Lingkungan'
    ]
  },
  karyaprima: {
    title: 'Karya Prima - Spesialis Baja WF & Gudang Pabrik',
    badge: 'STRUKTUR BAJA & GUDANG LOGISTIK',
    url: 'https://karya-prima.vercel.app/',
    desc: 'Spesialis fabrikasi dan ereksi baja WF, konstruksi hanggar, pabrik manufaktur, dan gudang logistik bentang lebar bergaransi SNI mutu baja ASTM.',
    framework: 'React 18 / Vite Engineering Kit',
    css: 'TailwindCSS + Heavy Steel Industrial Blue',
    seo: '99/100 • Steel Construction Schema Valid',
    responsive: 'Workshop Tablet & Executive Desktop',
    features: [
      'Fabrikasi Baja Wide Flange (WF) & H-Beam SNI di Workshop',
      'Ereksi Gudang Logistik Bentang Lebar Tanpa Tiang Tengah',
      'Perhitungan Beban Angin, Gempa & Lendutan Baja',
      'Garansi Kekuatan Struktur Baja 10+ Tahun',
      'Permintaan Penawaran Harga Fabrikasi Cepat'
    ]
  },
  nusaka: {
    title: 'Nusaka - Minimalist Japandi & Urban Residence',
    badge: 'URBAN RESIDENCE & PENTHOUSE',
    url: 'https://nusaka-chi.vercel.app/',
    desc: 'Biro arsitektur dan kontraktor hunian urban modern, townhouse minimalis Jepang-Skandinavia (Japandi) dan penthouse dengan estetika presisi tinggi.',
    framework: 'React 18 / Japandi Minimalist Kit',
    css: 'TailwindCSS + Warm Neutral Wood & Glass',
    seo: '100/100 • Modern Residence Directory Schema',
    responsive: 'Touchscreen Gesture Smooth Animations',
    features: [
      'Desain Arsitektur Japandi Minimalis & Fungsional',
      'Showcase Townhouse Compact & Penthouse Mewah',
      'Integrasi 360° Virtual Tour Ruang Interaktif',
      'Kalkulator Estimasi Pembangunan Rumah Urban',
      'Paket Lengkap Arsitektur + Custom Furniture'
    ]
  },
  kontraksuid: {
    title: 'Kontraksu ID - Smart Home & Renovasi Kilat',
    badge: 'SMART HOME & RENOVASI KILAT',
    url: 'https://kontraksu-id.vercel.app/',
    desc: 'Kontraktor renovasi rumah kilat dan instalasi otomasi smart home IoT, instalasi kelistrikan pintar, dan pengawasan progres digital via smartphone 24/7.',
    framework: 'React 18 / Smart IoT Framework',
    css: 'TailwindCSS + Cyber Slate & Amber Accent',
    seo: '100/100 • Smart Home Contractor SEO Ready',
    responsive: 'Mobile App Web-View & Desktop Viewports',
    features: [
      'Renovasi Rumah Kilat 14-30 Hari Kerja Bergaransi',
      'Instalasi Otomasi Smart Home (Smart Lock, Lighting, CCTV IoT)',
      'Live CCTV & Progress Monitoring 24/7 via Smartphone',
      'Kalkulator Paket Renovasi Ruangan (Dapur, Kamar Mandi, Fasad)',
      'Garansi Kebocoran & Instalasi Kelistrikan Pintar'
    ]
  }
};

function initSpecSheetInspectors() {
  const inspectBtns = document.querySelectorAll('.template-inspect-btn');
  const modal = document.getElementById('modal-spec-sheet');
  const badgeEl = document.getElementById('spec-modal-badge');
  const titleEl = document.getElementById('spec-modal-title');
  const descEl = document.getElementById('spec-modal-desc');
  const valFramework = document.getElementById('spec-val-framework');
  const valCss = document.getElementById('spec-val-css');
  const valSeo = document.getElementById('spec-val-seo');
  const valResponsive = document.getElementById('spec-val-responsive');
  const featuresListEl = document.getElementById('spec-modal-features-list');
  const launchDemoBtn = document.getElementById('spec-btn-launch-demo');
  const waBtn = document.getElementById('spec-btn-wa');

  if (!modal) return;

  inspectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const templateId = btn.getAttribute('data-template-id') || 'karyabuild';
      const data = templateSpecsData[templateId] || templateSpecsData.karyabuild;

      if (badgeEl) badgeEl.textContent = data.badge;
      if (titleEl) titleEl.textContent = data.title;
      if (descEl) descEl.textContent = data.desc;
      if (valFramework) valFramework.textContent = data.framework;
      if (valCss) valCss.textContent = data.css;
      if (valSeo) valSeo.textContent = data.seo;
      if (valResponsive) valResponsive.textContent = data.responsive;

      if (featuresListEl && data.features) {
        featuresListEl.innerHTML = data.features.map(f => `<li>✓ ${f}</li>`).join('');
      }

      if (launchDemoBtn) {
        launchDemoBtn.onclick = () => {
          modal.classList.remove('open');
          setTimeout(() => {
            const demoBtn = document.querySelector(`.btn-open-demo[data-url="${data.url}"]`);
            if (demoBtn) {
              demoBtn.click();
            } else {
              window.open(data.url, '_blank');
            }
          }, 200);
        };
      }

      if (waBtn) {
        waBtn.href = `https://wa.me/6281234567890?text=Halo%20Admin%20CONTRACTOR.HUB,%20saya%20tertarik%20dengan%20spesifikasi%20template%20${encodeURIComponent(data.title)}`;
      }

      if (window.lucide) {
        window.lucide.createIcons();
      }

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
}

/* ==========================================================================
   10. Testimonial Carousel Continuous Auto-Rotation (Automatic Swipe)
   ========================================================================== */
function initTestimonialCarousel() {
  const slides = document.querySelectorAll('.testimonial-card-slide');
  const dots = document.querySelectorAll('.carousel-indicators .carousel-dot');
  if (slides.length === 0) return;

  let currentIndex = 0;
  let timer = null;

  function showSlide(index) {
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
    currentIndex = index;
  }

  function nextSlide() {
    const next = (currentIndex + 1) % slides.length;
    showSlide(next);
  }

  function startAuto() {
    stopAuto();
    timer = setInterval(nextSlide, 3500); // Smooth auto rotation every 3.5s
  }

  function stopAuto() {
    if (timer) clearInterval(timer);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      showSlide(idx);
      startAuto();
    });
  });

  const wrapper = document.querySelector('.testimonial-carousel-box');
  if (wrapper) {
    wrapper.addEventListener('mouseenter', stopAuto);
    wrapper.addEventListener('mouseleave', startAuto);
  }

  startAuto();
}

/* ==========================================================================
   11. FAQ Accordions with Category Tiers
   ========================================================================== */
function initFaqAccordion() {
  const tierBtns = document.querySelectorAll('.faq-tier-btn');
  const faqItems = document.querySelectorAll('.faq-item');

  tierBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tierBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const tier = btn.getAttribute('data-tier') || 'all';
      faqItems.forEach(item => {
        const itemTier = item.getAttribute('data-tier');
        if (tier === 'all' || itemTier === tier) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   12. Modals Controller
   ========================================================================== */
function initModals() {
  const triggers = document.querySelectorAll('[data-open-modal]');
  const closeBtns = document.querySelectorAll('.modal-close-btn, .modal-close-trigger');
  const backdrops = document.querySelectorAll('.modal-backdrop');

  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-open-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        targetModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      backdrops.forEach(m => m.classList.remove('open'));
      document.body.style.overflow = '';
    });
  });

  backdrops.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });
}

/* ==========================================================================
   13. Server Live Clock
   ========================================================================== */
function initServerClock() {
  const clockEl = document.getElementById('server-live-clock');
  if (!clockEl) return;

  function updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour12: false, timeZone: 'Asia/Jakarta' });
    clockEl.textContent = `${timeStr} WIB (UTC+7)`;
  }

  setInterval(updateClock, 1000);
  updateClock();
}

/* ==========================================================================
   14. Currency Selector
   ========================================================================== */
function initCurrencySelector() {
  const select = document.getElementById('footer-currency-select');
  if (!select) return;

  select.addEventListener('change', (e) => {
    window.currentCurrency = e.target.value;
    if (window.refreshEstimatorCurrency) {
      window.refreshEstimatorCurrency(window.currentCurrency);
    }
  });
}

/* ==========================================================================
   15. Brochure Download Lead Form
   ========================================================================== */
function initBrochureForm() {
  const form = document.getElementById('brochure-lead-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    btn.textContent = '⏳ Menyiapkan Dokumen PDF...';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = '✓ BROSUR BERHASIL DIUNDUH';
      btn.style.background = 'var(--accent-emerald)';

      const modal = document.getElementById('modal-download-success');
      if (modal) {
        modal.classList.add('open');
      }

      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.background = '';
        form.reset();
      }, 4000);
    }, 1500);
  });
}

/* ==========================================================================
   16. Global Smooth Scroll Reveal System (Applied across all sections)
   ========================================================================== */
function initScrollReveal() {
  const elements = document.querySelectorAll('.scroll-reveal');
  if (elements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   17. Floating Back to Top Button (Above WhatsApp)
   ========================================================================== */
function initScrollToTop() {
  const btn = document.getElementById('scroll-top-btn');
  if (!btn) return;

  function handleScroll() {
    if (window.scrollY > 280) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
