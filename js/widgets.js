/* ==========================================================================
   CONTRACTOR.HUB - Interactive Widgets Engine (JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCostEstimator();
  initBeforeAfterSlider();
  initWeatherWidget();
  initFleetMatrix();
  initBimViewer();
  initBlueprintViewer();
  initMaterialSwatches();
});

/* ==========================================================================
   1. Advanced Cost Estimator Calculator (RAB m²) with Direct Input & Real Logic
   ========================================================================== */
function initCostEstimator() {
  const areaSlider = document.getElementById('calc-area-slider');
  const areaNumberInput = document.getElementById('calc-area-number');
  const tierBtns = document.querySelectorAll('.tier-option-btn');
  const typeSelect = document.getElementById('calc-building-type');
  const floorSelect = document.getElementById('calc-floors-select');
  const locationSelect = document.getElementById('calc-location-select');
  
  const totalDisplay = document.getElementById('calc-total-amount');
  const structDisplay = document.getElementById('calc-struct-val');
  const mepDisplay = document.getElementById('calc-mep-val');
  const finishDisplay = document.getElementById('calc-finish-val');
  const timeDisplay = document.getElementById('calc-est-time');

  let currentTierRate = 7800000; // Default Luxury (IDR)
  let currentTierName = 'Luxury Architectural';
  let currency = window.currentCurrency || 'IDR';

  function calculate() {
    if (!totalDisplay) return;

    let area = parseInt(areaSlider ? areaSlider.value : (areaNumberInput ? areaNumberInput.value : 250), 10);
    if (isNaN(area) || area < 30) area = 30;
    if (area > 5000) area = 5000;

    // Sync input fields
    if (areaSlider && areaSlider.value != area) areaSlider.value = area;
    if (areaNumberInput && areaNumberInput.value != area) areaNumberInput.value = area;

    const typeFactor = parseFloat(typeSelect ? typeSelect.value : 1.0);
    const floorFactor = parseFloat(floorSelect ? floorSelect.value : 1.0);
    const locFactor = parseFloat(locationSelect ? locationSelect.value : 1.0);

    const baseCost = area * currentTierRate * typeFactor * floorFactor * locFactor;

    const structCost = baseCost * 0.45;
    const mepCost = baseCost * 0.25;
    const finishCost = baseCost * 0.30;

    // Estimate project months based on area and floor count
    const floors = floorSelect ? parseInt(floorSelect.options[floorSelect.selectedIndex].getAttribute('data-floors') || 2, 10) : 2;
    let months = Math.ceil(area / 150) + (floors * 1.5);
    months = Math.max(3, Math.min(Math.round(months), 24));

    if (currency === 'USD') {
      const rateUSD = 15500;
      totalDisplay.textContent = `$${Math.round(baseCost / rateUSD).toLocaleString()}`;
      if (structDisplay) structDisplay.textContent = `$${Math.round(structCost / rateUSD).toLocaleString()} (45%)`;
      if (mepDisplay) mepDisplay.textContent = `$${Math.round(mepCost / rateUSD).toLocaleString()} (25%)`;
      if (finishDisplay) finishDisplay.textContent = `$${Math.round(finishCost / rateUSD).toLocaleString()} (30%)`;
    } else {
      if (baseCost >= 1000000000) {
        totalDisplay.textContent = `Rp ${(baseCost / 1000000000).toFixed(2)} Miliar`;
      } else {
        totalDisplay.textContent = `Rp ${(baseCost / 1000000).toFixed(0)} Juta`;
      }
      if (structDisplay) {
        structDisplay.textContent = structCost >= 1000000000 ? `Rp ${(structCost / 1000000000).toFixed(2)} M (45%)` : `Rp ${(structCost / 1000000).toFixed(1)} Jt (45%)`;
      }
      if (mepDisplay) {
        mepDisplay.textContent = mepCost >= 1000000000 ? `Rp ${(mepCost / 1000000000).toFixed(2)} M (25%)` : `Rp ${(mepCost / 1000000).toFixed(1)} Jt (25%)`;
      }
      if (finishDisplay) {
        finishDisplay.textContent = finishCost >= 1000000000 ? `Rp ${(finishCost / 1000000000).toFixed(2)} M (30%)` : `Rp ${(finishCost / 1000000).toFixed(1)} Jt (30%)`;
      }
    }

    if (timeDisplay) timeDisplay.textContent = `± ${months} Bulan Kerja (Estimasi Jadwal Konstruksi)`;
  }

  if (areaSlider) {
    areaSlider.addEventListener('input', (e) => {
      if (areaNumberInput) areaNumberInput.value = e.target.value;
      calculate();
    });
  }

  if (areaNumberInput) {
    areaNumberInput.addEventListener('input', (e) => {
      if (areaSlider) areaSlider.value = e.target.value;
      calculate();
    });
  }

  if (typeSelect) typeSelect.addEventListener('change', calculate);
  if (floorSelect) floorSelect.addEventListener('change', calculate);
  if (locationSelect) locationSelect.addEventListener('change', calculate);

  tierBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tierBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTierRate = parseFloat(btn.getAttribute('data-rate') || 7800000);
      currentTierName = btn.getAttribute('data-name') || 'Luxury';
      calculate();
    });
  });

  window.refreshEstimatorCurrency = (newCurrency) => {
    currency = newCurrency;
    calculate();
  };

  calculate();
}

/* ==========================================================================
   2. Split Before-After Slider with Resilient Clip-Path & Real Construction Photos
   ========================================================================== */
function initBeforeAfterSlider() {
  const container = document.querySelector('.ba-slider-container');
  if (!container) return;

  const beforeImg = container.querySelector('.ba-image.before img');
  const afterImg = container.querySelector('.ba-image.after img');
  const projectBtns = document.querySelectorAll('.ba-project-btn');
  const labelLeft = container.querySelector('.ba-label.left');
  const labelRight = container.querySelector('.ba-label.right');
  const infoTitle = document.getElementById('ba-info-title');
  const infoDesc = document.getElementById('ba-info-desc');
  const infoDuration = document.getElementById('ba-chip-duration');
  const infoVolume = document.getElementById('ba-chip-volume');
  const infoValue = document.getElementById('ba-chip-value');

  const projects = {
    villa: {
      before: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80",
      after: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      labelBefore: "BEFORE: GALIAN & STRUKTUR COR",
      labelAfter: "AFTER: VILLA LUXURY FINISHED",
      title: "Villa Tropis Sanctuary 2 Lantai - Canggu Bali",
      desc: "Transformasi dari lahan kosong berkontur dan pengecoran pondasi cakar ayam bertulang menjadi villa tropis modern berfasad kayu ulin dengan infinity pool.",
      duration: "⏱️ Durasi: 6 Bulan",
      volume: "🧱 Volume Beton: 340 m³",
      value: "💰 Nilai Kontrak: Rp 3.8 Miliar"
    },
    office: {
      before: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
      after: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      labelBefore: "BEFORE: RAW CONCRETE & DUCTING",
      labelAfter: "AFTER: EXECUTIVE OFFICE SCBD",
      title: "Office Penthouse & Corporate Lounge - SCBD Jakarta",
      desc: "Renovasi dan fit-out lantai kantor eksekutif dari kondisi bare shell beton kasar menjadi ruang kerja arsitektural berpanel akustik dan marmer travertine.",
      duration: "⏱️ Durasi: 4 Bulan",
      volume: "🏢 Luas Area: 850 m²",
      value: "💰 Nilai Kontrak: Rp 2.4 Miliar"
    },
    resto: {
      before: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
      after: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
      labelBefore: "BEFORE: DINDING BATA MENTAH",
      labelAfter: "AFTER: MODERN BISTRO & LOUNGE",
      title: "Modern Bistro & Boutique Lounge - Senopati",
      desc: "Pembangunan interior hospitality dari struktur pasangan bata mentah dan instalasi kabel pipa terbuka menjadi restoran tematik hangat berkelas.",
      duration: "⏱️ Durasi: 3 Bulan",
      volume: "🍽️ Kapasitas: 120 Kursi",
      value: "💰 Nilai Kontrak: Rp 1.6 Miliar"
    }
  };

  let isDragging = false;

  function setSliderPosition(clientX) {
    const rect = container.getBoundingClientRect();
    let posX = clientX - rect.left;
    if (posX < 0) posX = 0;
    if (posX > rect.width) posX = rect.width;

    const percentage = ((posX / rect.width) * 100).toFixed(2);
    container.style.setProperty('--ba-pos', `${percentage}%`);
  }

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    setSliderPosition(e.clientX);
  });

  window.addEventListener('mouseup', () => { isDragging = false; });
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    setSliderPosition(e.clientX);
  });

  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    setSliderPosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => { isDragging = false; });
  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    setSliderPosition(e.touches[0].clientX);
  }, { passive: true });

  // Project Switcher
  projectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projectBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const pKey = btn.getAttribute('data-project') || 'villa';
      const data = projects[pKey] || projects.villa;

      if (beforeImg) beforeImg.src = data.before;
      if (afterImg) afterImg.src = data.after;
      if (labelLeft) labelLeft.textContent = data.labelBefore;
      if (labelRight) labelRight.textContent = data.labelAfter;
      if (infoTitle) infoTitle.textContent = data.title;
      if (infoDesc) infoDesc.textContent = data.desc;
      if (infoDuration) infoDuration.textContent = data.duration;
      if (infoVolume) infoVolume.textContent = data.volume;
      if (infoValue) infoValue.textContent = data.value;
    });
  });

  window.baResize = () => {
    container.style.setProperty('--ba-pos', '50%');
  };
}

/* ==========================================================================
   3. Site Weather & K3 Construction Safety Radar Engine (SMK3 IoT)
   ========================================================================== */
function initWeatherWidget() {
  const siteSelect = document.getElementById('weather-site-select');
  const tempEl = document.getElementById('weather-temp-val');
  const windEl = document.getElementById('weather-wind-val');
  const humidEl = document.getElementById('weather-humid-val');
  const rainEl = document.getElementById('weather-rain-val');

  const tempStatusEl = document.getElementById('weather-temp-status');
  const windStatusEl = document.getElementById('weather-wind-status');
  const humidStatusEl = document.getElementById('weather-humid-status');
  const rainStatusEl = document.getElementById('weather-rain-status');

  const cranePill = document.getElementById('k3-crane-pill');
  const craneDesc = document.getElementById('k3-crane-desc');
  const concretePill = document.getElementById('k3-concrete-pill');
  const concreteDesc = document.getElementById('k3-concrete-desc');
  const heightPill = document.getElementById('k3-height-pill');
  const heightDesc = document.getElementById('k3-height-desc');

  const advisoryBox = document.getElementById('k3-advisory-box');
  const advisoryTitle = document.getElementById('k3-advisory-title');
  const advisoryText = document.getElementById('k3-advisory-text');

  const btnNormal = document.getElementById('btn-sim-normal');
  const btnStorm = document.getElementById('btn-sim-storm');

  let currentMode = 'normal'; // 'normal' | 'storm'

  const siteData = {
    jakarta: {
      normal: { temp: "31°C", wind: 14, humid: "72%", rain: "0.0 mm/h", tempStatus: "Indeks Panas Aman", windStatus: "Batas Kritis: 38 km/h", humidStatus: "Optimal untuk Curing", rainStatus: "Kondisi Kering / Cerah" },
      storm: { temp: "24°C", wind: 54, humid: "96%", rain: "48.5 mm/h", tempStatus: "Penurunan Suhu Cepat", windStatus: "🚨 ANGIN BADAI KRITIS", humidStatus: "Kelembaban Ekstrem", rainStatus: "🚨 HUJAN DERAS & PETIR" }
    },
    ikn: {
      normal: { temp: "29°C", wind: 18, humid: "82%", rain: "0.5 mm/h", tempStatus: "Indeks Panas Tropis", windStatus: "Batas Kritis: 38 km/h", humidStatus: "Kondusif untuk Pengecoran", rainStatus: "Berawan Tipis" },
      storm: { temp: "23°C", wind: 48, humid: "98%", rain: "62.0 mm/h", tempStatus: "Curah Hujan Tinggi", windStatus: "🚨 ANGIN GUST 48 KM/H", humidStatus: "Saturasi Air Tanah Penuh", rainStatus: "🚨 HUJAN BADAI TROPIS" }
    },
    surabaya: {
      normal: { temp: "34°C", wind: 22, humid: "65%", rain: "0.0 mm/h", tempStatus: "Suhu Lapangan Tinggi", windStatus: "Batas Kritis: 38 km/h", humidStatus: "Curing Tambahan Diperlukan", rainStatus: "Cerah Panas" },
      storm: { temp: "26°C", wind: 58, humid: "92%", rain: "55.0 mm/h", tempStatus: "Penurunan Drastis", windStatus: "🚨 BADAI PESISIR 58 KM/H", humidStatus: "Gelombang Tinggi", rainStatus: "🚨 HUJAN LEBAT DERMAGA" }
    },
    bali: {
      normal: { temp: "30°C", wind: 20, humid: "74%", rain: "0.0 mm/h", tempStatus: "Indeks Nyaman", windStatus: "Batas Kritis: 38 km/h", humidStatus: "Optimal untuk Finishing", rainStatus: "Cerah Berangin" },
      storm: { temp: "24°C", wind: 50, humid: "95%", rain: "42.0 mm/h", tempStatus: "Angin Tebing Kencang", windStatus: "🚨 ANGIN TEBING KRITIS", humidStatus: "Kabut Tebal", rainStatus: "🚨 BADAI ANGIN PANTAI" }
    }
  };

  function renderState() {
    const lang = localStorage.getItem('contractor_lang') || 'id';
    const siteKey = siteSelect ? siteSelect.value : 'jakarta';
    const currentSite = siteData[siteKey] || siteData.jakarta;
    const telemetry = currentSite[currentMode];

    // 1. Update Telemetry Numbers
    if (tempEl) tempEl.textContent = telemetry.temp;
    if (windEl) windEl.textContent = `${telemetry.wind} km/h`;
    if (humidEl) humidEl.textContent = telemetry.humid;
    if (rainEl) rainEl.textContent = telemetry.rain;

    if (tempStatusEl) tempStatusEl.textContent = telemetry.tempStatus;
    if (windStatusEl) windStatusEl.textContent = telemetry.windStatus;
    if (humidStatusEl) humidStatusEl.textContent = telemetry.humidStatus;
    if (rainStatusEl) rainStatusEl.textContent = telemetry.rainStatus;

    // 2. Update Directives & Advisory
    if (currentMode === 'normal') {
      if (cranePill) {
        cranePill.className = 'k3-status-pill status-safe';
        cranePill.innerHTML = lang === 'en' ? '<i data-lucide="check"></i> PERMIT GRANTED' : '<i data-lucide="check"></i> IZIN DIBERIKAN';
      }
      if (craneDesc) {
        craneDesc.textContent = lang === 'en'
          ? `Wind speed ${telemetry.wind} km/h meets safe lifting standards for heavy rigging up to 24 Tons.`
          : `Kecepatan angin ${telemetry.wind} km/h memenuhi syarat aman pengangkatan beban heavy rigging hingga 24 Ton.`;
      }

      if (concretePill) {
        concretePill.className = 'k3-status-pill status-safe';
        concretePill.innerHTML = lang === 'en' ? '<i data-lucide="check"></i> OPTIMAL POURING' : '<i data-lucide="check"></i> PENGECORAN KONDUSIF';
      }
      if (concreteDesc) {
        concreteDesc.textContent = lang === 'en'
          ? `Rainfall 0 mm ensures optimum water-cement ratio for high-grade K-350 concrete curing.`
          : `Curah hujan ${telemetry.rain} menjaga rasio air-semen (w/c ratio) mutu beton K-350 tetap sempurna.`;
      }

      if (heightPill) {
        heightPill.className = 'k3-status-pill status-safe';
        heightPill.innerHTML = lang === 'en' ? '<i data-lucide="check"></i> WORK PERMIT OPEN' : '<i data-lucide="check"></i> IZIN KERJA TERBUKA';
      }
      if (heightDesc) {
        heightDesc.textContent = lang === 'en'
          ? 'No lightning or high turbulence detected. Mandatory Full Body Harness double lanyard.'
          : 'Tidak terdeteksi petir atau turbulensi. Wajib menggunakan Full Body Harness double lanyard.';
      }

      if (advisoryBox) advisoryBox.className = 'k3-advisory-box';
      if (advisoryTitle) {
        advisoryTitle.textContent = lang === 'en'
          ? 'ACTIVE K3 SOP: ALL SITE ACTIVITIES AUTHORIZED FOR NORMAL OPERATIONS'
          : 'SOP K3 AKTIF: SELURUH AKTIVITAS SITE DIIZINKAN BERJALAN NORMAL';
      }
      if (advisoryText) {
        advisoryText.textContent = lang === 'en'
          ? 'Safety Officers have approved all daily work permits. Ensure morning toolbox meetings are documented and PPE is actively worn.'
          : 'Petugas K3 Lapangan (Safety Officer) telah menyetujui seluruh lembar Work Permit harian. Pastikan toolbox meeting pagi telah dilaksanakan dan perlengkapan APD lengkap terpasang.';
      }
    } else {
      // STORM MODE (CRITICAL ALERT)
      if (cranePill) {
        cranePill.className = 'k3-status-pill status-danger';
        cranePill.innerHTML = lang === 'en' ? '<i data-lucide="alert-octagon"></i> STOP LIFTING' : '<i data-lucide="alert-octagon"></i> STOP OPERASI CRANE';
      }
      if (craneDesc) {
        craneDesc.textContent = lang === 'en'
          ? `CRITICAL: Wind gust ${telemetry.wind} km/h exceeds 38 km/h threshold! Lock slewing brakes to weathervaning mode immediately.`
          : `KRITIS: Hembusan angin ${telemetry.wind} km/h melebihi batas 38 km/h! Kunci rem swing ke mode bebas (weathervaning) segera.`;
      }

      if (concretePill) {
        concretePill.className = 'k3-status-pill status-warning';
        concretePill.innerHTML = lang === 'en' ? '<i data-lucide="alert-triangle"></i> DELAY POURING' : '<i data-lucide="alert-triangle"></i> TUNDA PENGECORAN';
      }
      if (concreteDesc) {
        concreteDesc.textContent = lang === 'en'
          ? 'Heavy rain risk degrades concrete slump and compressive strength. Cover exposed concrete decks with tarpaulin.'
          : 'Curah hujan deras berisiko merusak slump & mutu tekan beton. Tutup plat lantai yang baru dicor dengan terpal pelindung.';
      }

      if (heightPill) {
        heightPill.className = 'k3-status-pill status-danger';
        heightPill.innerHTML = lang === 'en' ? '<i data-lucide="alert-octagon"></i> EVACUATE HEIGHTS' : '<i data-lucide="alert-octagon"></i> EVAKUASI KETINGGIAN';
      }
      if (heightDesc) {
        heightDesc.textContent = lang === 'en'
          ? 'Lightning and high storm gusts active. Evacuate all scaffoldings, mast climbers, and perimeter edges.'
          : 'Bahaya sambaran petir & terpaan badai kencang. Turunkan seluruh pekerja dari scaffolding & tepi perimeter gedung.';
      }

      if (advisoryBox) advisoryBox.className = 'k3-advisory-box advisory-critical';
      if (advisoryTitle) {
        advisoryTitle.textContent = lang === 'en'
          ? 'EMERGENCY PROTOCOL ACTIVATED: SUSPEND OUTDOOR & HIGH-ALTITUDE TASKS'
          : 'PROTOKOL DARURAT K3 AKTIF: HENTIKAN PEKERJAAN LUAR RUANG & KETINGGIAN';
      }
      if (advisoryText) {
        advisoryText.textContent = lang === 'en'
          ? 'Site Alarm Alert: All site supervisors are required to verify ground worker roll call and secure loose construction materials against storm winds.'
          : 'Peringatan Sirine Site: Seluruh pengawas diwajibkan memastikan pekerja berada di shelter aman dan mengikat material ringan agar tidak terbawa angin.';
      }
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  if (siteSelect) {
    siteSelect.addEventListener('change', renderState);
  }

  if (btnNormal) {
    btnNormal.addEventListener('click', () => {
      currentMode = 'normal';
      if (btnNormal) btnNormal.classList.add('active');
      if (btnStorm) btnStorm.classList.remove('active');
      renderState();
    });
  }

  if (btnStorm) {
    btnStorm.addEventListener('click', () => {
      currentMode = 'storm';
      if (btnStorm) btnStorm.classList.add('active');
      if (btnNormal) btnNormal.classList.remove('active');
      renderState();
    });
  }

  renderState();
}

/* ==========================================================================
   4. 3D Model Konstruksi & BIM Structural Layers Explorer (Three.js WebGL)
   ========================================================================== */

class Bim3DConstructionViewer {
  constructor(containerId, canvasId) {
    this.container = document.getElementById(containerId);
    this.canvas = document.getElementById(canvasId);
    if (!this.container || !this.canvas || typeof THREE === 'undefined') return;

    this.currentLayer = 'rebar';
    this.isAutoRotate = true;
    this.isWireframe = false;

    // Orbit & Camera Coordinates
    this.distance = 28;
    this.targetDistance = 28;
    this.azimuth = 0.78;       // ~45 deg
    this.elevation = 0.58;     // ~33 deg isometric
    this.targetAzimuth = 0.78;
    this.targetElevation = 0.58;

    // Mouse / Touch Interaction State
    this.isDragging = false;
    this.previousMouse = { x: 0, y: 0 };
    this.hoverDelta = { x: 0, y: 0 };

    this.init();
  }

  init() {
    const width = this.container.clientWidth || 800;
    const height = this.container.clientHeight || 420;

    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x070A11, 0.012);

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.5, 150);
    this.updateCameraPosition();

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    // 4. Lighting - Balanced Architectural & BIM Key/Fill Lights
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.85);
    this.scene.add(ambientLight);

    const dirLightSun = new THREE.DirectionalLight(0xFFF3E0, 1.8);
    dirLightSun.position.set(30, 45, 25);
    this.scene.add(dirLightSun);

    const dirLightCyanFill = new THREE.DirectionalLight(0x00E5FF, 1.2);
    dirLightCyanFill.position.set(-25, 20, -20);
    this.scene.add(dirLightCyanFill);

    const dirLightWarmRim = new THREE.DirectionalLight(0xFF9800, 1.0);
    dirLightWarmRim.position.set(20, -10, -25);
    this.scene.add(dirLightWarmRim);

    // 5. Materials
    this.createMaterials();

    // 6. Root & Group Structure
    this.modelGroup = new THREE.Group();
    this.modelGroup.position.set(0, -3.5, 0); // Center in viewport
    this.scene.add(this.modelGroup);

    this.datumGroup = new THREE.Group();
    this.structureGroup = new THREE.Group();
    this.rebarGroup = new THREE.Group();
    this.mepGroup = new THREE.Group();
    this.facadeGroup = new THREE.Group();

    this.modelGroup.add(this.datumGroup);
    this.modelGroup.add(this.structureGroup);
    this.modelGroup.add(this.rebarGroup);
    this.modelGroup.add(this.mepGroup);
    this.modelGroup.add(this.facadeGroup);

    // 7. Build BIM Models
    this.buildDatumGrid();
    this.buildStructuralRebarModel();
    this.buildMepModel();
    this.buildFacadeModel();

    // 8. Hotspot 3D Pins
    this.initHotspots();

    // 9. Event Listeners
    this.bindEvents();

    // 10. Set Initial Layer Visibility
    this.setLayer('rebar');

    // 11. Start Animation Loop
    this.clock = new THREE.Clock();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  createMaterials() {
    this.materials = {
      concreteSolid: new THREE.MeshStandardMaterial({
        color: 0x475569,
        roughness: 0.85,
        metalness: 0.1
      }),
      concreteTranslucent: new THREE.MeshStandardMaterial({
        color: 0x334155,
        roughness: 0.6,
        metalness: 0.2,
        transparent: true,
        opacity: 0.35
      }),
      concreteGhost: new THREE.MeshStandardMaterial({
        color: 0x1E293B,
        roughness: 0.9,
        metalness: 0.1,
        transparent: true,
        opacity: 0.12
      }),
      rebarSteel: new THREE.MeshStandardMaterial({
        color: 0xFF7A00,
        roughness: 0.25,
        metalness: 0.9,
        emissive: 0xDD5700,
        emissiveIntensity: 0.2
      }),
      steelWF: new THREE.MeshStandardMaterial({
        color: 0x1E293B,
        roughness: 0.35,
        metalness: 0.85
      }),
      steelWFHighlight: new THREE.MeshStandardMaterial({
        color: 0x0284C7,
        roughness: 0.3,
        metalness: 0.9
      }),
      deckMetal: new THREE.MeshStandardMaterial({
        color: 0x64748B,
        roughness: 0.4,
        metalness: 0.8
      }),
      hvacDuct: new THREE.MeshStandardMaterial({
        color: 0xCBD5E1,
        roughness: 0.25,
        metalness: 0.9
      }),
      firePipe: new THREE.MeshStandardMaterial({
        color: 0xEF4444,
        roughness: 0.3,
        metalness: 0.7
      }),
      waterPipe: new THREE.MeshStandardMaterial({
        color: 0x00E5FF,
        roughness: 0.25,
        metalness: 0.8
      }),
      cableTray: new THREE.MeshStandardMaterial({
        color: 0xF59E0B,
        roughness: 0.35,
        metalness: 0.85
      }),
      facadeGlass: new THREE.MeshStandardMaterial({
        color: 0x38BDF8,
        roughness: 0.08,
        metalness: 0.2,
        transparent: true,
        opacity: 0.38
      }),
      facadeMullion: new THREE.MeshStandardMaterial({
        color: 0x0B0F17,
        roughness: 0.35,
        metalness: 0.9
      }),
      facadeLouver: new THREE.MeshStandardMaterial({
        color: 0xD97706,
        roughness: 0.5,
        metalness: 0.35
      }),
      edgeLine: new THREE.LineBasicMaterial({
        color: 0x00E5FF,
        transparent: true,
        opacity: 0.45
      }),
      gridLine: new THREE.LineBasicMaterial({
        color: 0x1E293B,
        transparent: true,
        opacity: 0.6
      })
    };
  }

  // 1. Datum Floor Blueprint Grid
  buildDatumGrid() {
    const grid = new THREE.GridHelper(26, 26, 0x00E5FF, 0x1E293B);
    grid.position.y = 0;
    this.datumGroup.add(grid);

    // Foundation Pedestals & Footing Pads
    const footingGeo = new THREE.BoxGeometry(2.4, 0.8, 2.4);
    const colPositions = [
      [-5.5, -5.5], [0, -5.5], [5.5, -5.5],
      [-5.5,  5.5], [0,  5.5], [5.5,  5.5]
    ];

    colPositions.forEach(([x, z]) => {
      const pad = new THREE.Mesh(footingGeo, this.materials.concreteSolid);
      pad.position.set(x, 0.4, z);
      this.datumGroup.add(pad);

      // Edge wireframe for CAD look
      const edges = new THREE.EdgesGeometry(footingGeo);
      const line = new THREE.LineSegments(edges, this.materials.edgeLine);
      pad.add(line);
    });
  }

  // Helper: Create I-Beam (Wide Flange)
  createWFBeam(length, depth = 0.5, width = 0.32, flangeT = 0.05, webT = 0.04) {
    const beam = new THREE.Group();
    const topGeo = new THREE.BoxGeometry(width, flangeT, length);
    const botGeo = new THREE.BoxGeometry(width, flangeT, length);
    const webGeo = new THREE.BoxGeometry(webT, depth - flangeT * 2, length);

    const top = new THREE.Mesh(topGeo, this.materials.steelWF);
    top.position.y = depth / 2 - flangeT / 2;
    const bot = new THREE.Mesh(botGeo, this.materials.steelWF);
    bot.position.y = -depth / 2 + flangeT / 2;
    const web = new THREE.Mesh(webGeo, this.materials.steelWF);

    beam.add(top);
    beam.add(bot);
    beam.add(web);

    // Bolt Connection Plates at Ends
    const plateGeo = new THREE.BoxGeometry(width + 0.04, depth + 0.04, 0.08);
    const plate1 = new THREE.Mesh(plateGeo, this.materials.steelWFHighlight);
    plate1.position.z = length / 2;
    const plate2 = new THREE.Mesh(plateGeo, this.materials.steelWFHighlight);
    plate2.position.z = -length / 2;
    beam.add(plate1);
    beam.add(plate2);

    return beam;
  }

  // 2. Structural & Rebar Model
  buildStructuralRebarModel() {
    const colPositions = [
      [-5.5, -5.5], [0, -5.5], [5.5, -5.5],
      [-5.5,  5.5], [0,  5.5], [5.5,  5.5]
    ];
    const totalHeight = 12.6; // 3 stories
    const colSize = 0.9;

    // Columns with Rebar Cages
    colPositions.forEach(([cx, cz]) => {
      // Outer Concrete Casing (Translucent in rebar mode)
      const colGeo = new THREE.BoxGeometry(colSize, totalHeight, colSize);
      const colMesh = new THREE.Mesh(colGeo, this.materials.concreteTranslucent);
      colMesh.position.set(cx, totalHeight / 2 + 0.8, cz);
      this.structureGroup.add(colMesh);
      colMesh.name = 'columnConcrete';

      const edges = new THREE.EdgesGeometry(colGeo);
      const edgeLine = new THREE.LineSegments(edges, this.materials.edgeLine);
      colMesh.add(edgeLine);

      // Internal Rebar Steel Cage (8 Longitudinal Bars + Stirrup Ties)
      const rebarCage = new THREE.Group();
      rebarCage.position.set(cx, totalHeight / 2 + 0.8, cz);
      const barGeo = new THREE.CylinderGeometry(0.032, 0.032, totalHeight, 8);

      const barOffsets = [
        [-0.32, -0.32], [0, -0.32], [0.32, -0.32],
        [-0.32,  0.32], [0,  0.32], [0.32,  0.32],
        [-0.32,  0   ],             [0.32,  0   ]
      ];

      barOffsets.forEach(([bx, bz]) => {
        const bar = new THREE.Mesh(barGeo, this.materials.rebarSteel);
        bar.position.set(bx, 0, bz);
        rebarCage.add(bar);
      });

      // Horizontal Stirrup Rings (Sengkang)
      const stirrupGeo = new THREE.BoxGeometry(0.72, 0.025, 0.72);
      const stirrupEdges = new THREE.EdgesGeometry(stirrupGeo);
      for (let y = -totalHeight / 2 + 0.4; y <= totalHeight / 2 - 0.4; y += 0.65) {
        const stirrupLine = new THREE.LineSegments(stirrupEdges, new THREE.LineBasicMaterial({ color: 0xFBBF24, linewidth: 2 }));
        stirrupLine.position.set(0, y, 0);
        rebarCage.add(stirrupLine);
      }

      this.rebarGroup.add(rebarCage);
    });

    // Floor Slabs & WF Steel Framing at 3 Levels (Y = 4.8, 8.8, 12.8)
    const floorLevels = [4.8, 8.8, 12.8];
    floorLevels.forEach((fy, idx) => {
      // Cast Concrete Floor Slab
      const slabGeo = new THREE.BoxGeometry(13.6, 0.28, 13.6);
      const slabMesh = new THREE.Mesh(slabGeo, this.materials.concreteTranslucent);
      slabMesh.position.set(0, fy, 0);
      this.structureGroup.add(slabMesh);
      slabMesh.name = 'floorSlab';

      const slabEdge = new THREE.LineSegments(new THREE.EdgesGeometry(slabGeo), this.materials.edgeLine);
      slabMesh.add(slabEdge);

      // Rebar Wiremesh on top of slab
      const wiremesh = new THREE.GridHelper(13, 16, 0xFF7A00, 0xEA580C);
      wiremesh.position.set(0, fy + 0.15, 0);
      this.rebarGroup.add(wiremesh);

      // Steel WF Beams framing columns (X-axis beams)
      [-5.5, 5.5].forEach(bz => {
        const beamX = this.createWFBeam(11.0);
        beamX.rotation.y = Math.PI / 2;
        beamX.position.set(0, fy - 0.3, bz);
        this.structureGroup.add(beamX);
      });

      // Steel WF Beams framing columns (Z-axis beams)
      [-5.5, 0, 5.5].forEach(bx => {
        const beamZ = this.createWFBeam(11.0);
        beamZ.position.set(bx, fy - 0.3, 0);
        this.structureGroup.add(beamZ);
      });
    });

    // Reinforced Concrete Lift/Stair Core
    const coreGeo = new THREE.BoxGeometry(3.6, totalHeight, 3.6);
    const coreMesh = new THREE.Mesh(coreGeo, this.materials.concreteTranslucent);
    coreMesh.position.set(0, totalHeight / 2 + 0.8, 0);
    this.structureGroup.add(coreMesh);
    coreMesh.name = 'coreWall';

    const coreEdge = new THREE.LineSegments(new THREE.EdgesGeometry(coreGeo), this.materials.edgeLine);
    coreMesh.add(coreEdge);
  }

  // 3. MEP (Mechanical, Electrical, Plumbing, HVAC) Model
  buildMepModel() {
    const floorLevels = [4.8, 8.8];

    floorLevels.forEach((fy) => {
      // 3.1 HVAC Main Rectangular Air Duct (Galvanized Metal)
      const mainDuctGeo = new THREE.BoxGeometry(1.2, 0.55, 10.5);
      const mainDuct = new THREE.Mesh(mainDuctGeo, this.materials.hvacDuct);
      mainDuct.position.set(2.4, fy - 0.65, 0);
      this.mepGroup.add(mainDuct);

      // Branch Ducts with 4-way Ceiling Diffusers
      [-3.5, 0, 3.5].forEach(dz => {
        const branchGeo = new THREE.BoxGeometry(3.2, 0.38, 0.5);
        const branchDuct = new THREE.Mesh(branchGeo, this.materials.hvacDuct);
        branchDuct.position.set(0.6, fy - 0.65, dz);
        this.mepGroup.add(branchDuct);

        // Diffuser Grille
        const diffGeo = new THREE.BoxGeometry(0.7, 0.08, 0.7);
        const diffuser = new THREE.Mesh(diffGeo, this.materials.hvacDuct);
        diffuser.position.set(-1.0, fy - 0.88, dz);
        this.mepGroup.add(diffuser);
      });

      // 3.2 Fire Sprinkler Piping (NFPA Red Pipes)
      const firePipeGeo = new THREE.CylinderGeometry(0.05, 0.05, 10.8, 8);
      const fireMain = new THREE.Mesh(firePipeGeo, this.materials.firePipe);
      fireMain.position.set(-2.8, fy - 0.75, 0);
      this.mepGroup.add(fireMain);

      // Branch Sprinklers
      [-4.0, -1.5, 1.5, 4.0].forEach(pz => {
        const branchFireGeo = new THREE.CylinderGeometry(0.035, 0.035, 4.5, 8);
        const branchFire = new THREE.Mesh(branchFireGeo, this.materials.firePipe);
        branchFire.rotation.z = Math.PI / 2;
        branchFire.position.set(-0.8, fy - 0.75, pz);
        this.mepGroup.add(branchFire);

        // Brass Sprinkler Nozzle
        const nozzleGeo = new THREE.CylinderGeometry(0.04, 0.02, 0.12, 6);
        const nozzle = new THREE.Mesh(nozzleGeo, this.materials.cableTray);
        nozzle.position.set(1.2, fy - 0.85, pz);
        this.mepGroup.add(nozzle);
      });

      // 3.3 Domestic Water & Chilled Piping (Cyan Blue)
      const waterPipeGeo = new THREE.CylinderGeometry(0.065, 0.065, 11.2, 8);
      const waterPipe = new THREE.Mesh(waterPipeGeo, this.materials.waterPipe);
      waterPipe.position.set(-3.2, fy - 0.6, 0);
      this.mepGroup.add(waterPipe);

      // 3.4 Industrial Electrical Cable Trays (Yellow)
      const trayGeo = new THREE.BoxGeometry(0.65, 0.12, 10.5);
      const cableTray = new THREE.Mesh(trayGeo, this.materials.cableTray);
      cableTray.position.set(-1.8, fy - 0.6, 0);
      this.mepGroup.add(cableTray);
    });

    // Rooftop Mechanical Package (AHU & Chiller Unit)
    const ahuBoxGeo = new THREE.BoxGeometry(3.5, 1.8, 2.4);
    const ahuBox = new THREE.Mesh(ahuBoxGeo, this.materials.hvacDuct);
    ahuBox.position.set(2.5, 14.0, -2.5);
    this.mepGroup.add(ahuBox);

    // Fan Grilles on AHU
    const fanGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.1, 16);
    const fan1 = new THREE.Mesh(fanGeo, this.materials.steelWF);
    fan1.position.set(1.8, 15.0, -2.5);
    const fan2 = new THREE.Mesh(fanGeo, this.materials.steelWF);
    fan2.position.set(3.2, 15.0, -2.5);
    this.mepGroup.add(fan1);
    this.mepGroup.add(fan2);
  }

  // 4. Architectural Facade & Envelope Model
  buildFacadeModel() {
    const totalH = 12.6;
    const midY = totalH / 2 + 0.8;

    // 4.1 Curtain Wall Glass Panels
    const glassFrontGeo = new THREE.BoxGeometry(13.4, totalH, 0.08);
    const glassFront = new THREE.Mesh(glassFrontGeo, this.materials.facadeGlass);
    glassFront.position.set(0, midY, 6.7);
    this.facadeGroup.add(glassFront);

    const glassSideGeo = new THREE.BoxGeometry(0.08, totalH, 13.4);
    const glassLeft = new THREE.Mesh(glassSideGeo, this.materials.facadeGlass);
    glassLeft.position.set(-6.7, midY, 0);
    const glassRight = new THREE.Mesh(glassSideGeo, this.materials.facadeGlass);
    glassRight.position.set(6.7, midY, 0);
    this.facadeGroup.add(glassLeft);
    this.facadeGroup.add(glassRight);

    // 4.2 Vertical & Horizontal Dark Aluminum Mullions
    for (let x = -6.7; x <= 6.7; x += 2.23) {
      const mullionVGeo = new THREE.BoxGeometry(0.12, totalH, 0.22);
      const mullionV = new THREE.Mesh(mullionVGeo, this.materials.facadeMullion);
      mullionV.position.set(x, midY, 6.75);
      this.facadeGroup.add(mullionV);
    }

    [4.8, 8.8, 12.8].forEach(my => {
      const mullionHGeo = new THREE.BoxGeometry(13.5, 0.18, 0.22);
      const mullionH = new THREE.Mesh(mullionHGeo, this.materials.facadeMullion);
      mullionH.position.set(0, my, 6.75);
      this.facadeGroup.add(mullionH);
    });

    // 4.3 Architectural Sunshade Louvers (Brise-Soleil)
    for (let ly = 5.2; ly <= 8.2; ly += 0.6) {
      const louverGeo = new THREE.BoxGeometry(11.0, 0.06, 0.55);
      const louver = new THREE.Mesh(louverGeo, this.materials.facadeLouver);
      louver.rotation.x = 0.35; // Angled sunshade
      louver.position.set(0, ly, 7.2);
      this.facadeGroup.add(louver);
    }

    // 4.4 Entrance Canopy at Ground Level
    const canopyGeo = new THREE.BoxGeometry(6.0, 0.12, 2.5);
    const canopy = new THREE.Mesh(canopyGeo, this.materials.facadeGlass);
    canopy.position.set(0, 3.8, 7.8);
    this.facadeGroup.add(canopy);

    const canopyFrame = new THREE.LineSegments(new THREE.EdgesGeometry(canopyGeo), this.materials.edgeLine);
    canopy.add(canopyFrame);

    // 4.5 Rooftop Parapet Wall
    const parapetGeo = new THREE.BoxGeometry(13.8, 0.8, 13.8);
    const parapetEdge = new THREE.LineSegments(new THREE.EdgesGeometry(parapetGeo), this.materials.edgeLine);
    parapetEdge.position.set(0, 13.8, 0);
    this.facadeGroup.add(parapetEdge);
  }

  // 5. Layer Switching Controller
  setLayer(layerKey) {
    this.currentLayer = layerKey;
    const hudText = document.getElementById('bim-hud-layer-text');

    if (layerKey === 'rebar') {
      this.structureGroup.visible = true;
      this.rebarGroup.visible = true;
      this.mepGroup.visible = false;
      this.facadeGroup.visible = false;

      this.setStructureMaterials('translucent');
      if (hudText) hudText.textContent = 'BIM LOD 350 • STRUKTUR BETON & REBAR';
    } else if (layerKey === 'mep') {
      this.structureGroup.visible = true;
      this.rebarGroup.visible = false;
      this.mepGroup.visible = true;
      this.facadeGroup.visible = false;

      this.setStructureMaterials('ghost');
      if (hudText) hudText.textContent = 'BIM LOD 350 • MEKANIKAL, ELEKTRIKAL & PLUMBING';
    } else if (layerKey === 'finishing') {
      this.structureGroup.visible = true;
      this.rebarGroup.visible = false;
      this.mepGroup.visible = false;
      this.facadeGroup.visible = true;

      this.setStructureMaterials('solid');
      if (hudText) hudText.textContent = 'BIM LOD 350 • FASAD ARSITEKTUR & KACA';
    } else if (layerKey === 'all') {
      this.structureGroup.visible = true;
      this.rebarGroup.visible = true;
      this.mepGroup.visible = true;
      this.facadeGroup.visible = true;

      this.setStructureMaterials('translucent');
      if (hudText) hudText.textContent = 'BIM LOD 350 • FULL MULTI-DISIPLIN BIM MODEL';
    }

    this.updateHotspotVisibility();
  }

  setStructureMaterials(mode) {
    const mat = mode === 'ghost' ? this.materials.concreteGhost :
                (mode === 'solid' ? this.materials.concreteSolid : this.materials.concreteTranslucent);

    this.structureGroup.traverse(child => {
      if (child.isMesh && (child.name === 'columnConcrete' || child.name === 'floorSlab' || child.name === 'coreWall')) {
        child.material = mat;
      }
    });
  }

  // 6. Hotspots Setup & 3D Tracking
  initHotspots() {
    this.hotspots = [
      {
        id: 'bim-pin-1',
        layer: 'rebar',
        pos: new THREE.Vector3(-5.5, 4.8, 5.5) // WF Beam & Column Rebar Joint
      },
      {
        id: 'bim-pin-2',
        layer: 'rebar',
        pos: new THREE.Vector3(0, 8.8, 0)     // Floor Slab Bondek & Wiremesh
      },
      {
        id: 'bim-pin-3',
        layer: 'mep',
        pos: new THREE.Vector3(2.4, 8.15, 0)   // Main HVAC Duct & Sprinkler
      }
    ];
  }

  updateHotspotPositions() {
    if (!this.container || !this.camera) return;

    this.hotspots.forEach(h => {
      const pinEl = document.getElementById(h.id);
      if (!pinEl) return;

      // Transform local coordinate to world coordinate
      const worldPos = h.pos.clone().applyMatrix4(this.modelGroup.matrixWorld);
      worldPos.project(this.camera);

      // Check if coordinate is in front of camera
      if (worldPos.z < 1.0) {
        const x = ((worldPos.x + 1) / 2) * 100;
        const y = ((-worldPos.y + 1) / 2) * 100;

        if (x >= 4 && x <= 96 && y >= 4 && y <= 96) {
          pinEl.style.left = `${x.toFixed(1)}%`;
          pinEl.style.top = `${y.toFixed(1)}%`;
          pinEl.style.display = 'flex';
        } else {
          pinEl.style.display = 'none';
        }
      } else {
        pinEl.style.display = 'none';
      }
    });
  }

  updateHotspotVisibility() {
    this.hotspots.forEach(h => {
      const pinEl = document.getElementById(h.id);
      if (!pinEl) return;
      const isVisible = (this.currentLayer === 'all' || this.currentLayer === h.layer || (this.currentLayer === 'finishing' && h.id === 'bim-pin-1'));
      pinEl.style.opacity = isVisible ? '1' : '0.4';
    });
  }

  // 7. Interactive Event Listeners ("ketika mengarahkan")
  bindEvents() {
    // Mouse / Touch Drag Orbiting
    const onPointerDown = (e) => {
      this.isDragging = true;
      this.previousMouse = {
        x: e.clientX || (e.touches && e.touches[0].clientX),
        y: e.clientY || (e.touches && e.touches[0].clientY)
      };
    };

    const onPointerMove = (e) => {
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      if (!clientX || !clientY) return;

      if (this.isDragging) {
        const deltaX = clientX - this.previousMouse.x;
        const deltaY = clientY - this.previousMouse.y;

        this.targetAzimuth -= deltaX * 0.008;
        this.targetElevation = Math.max(0.1, Math.min(Math.PI / 2.1, this.targetElevation + deltaY * 0.008));

        this.previousMouse = { x: clientX, y: clientY };
      } else {
        // Subtle Hover Parallax when directing cursor across viewport
        const rect = this.container.getBoundingClientRect();
        const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
        const normY = ((clientY - rect.top) / rect.height) * 2 - 1;

        this.hoverDelta.x = normX * 0.15;
        this.hoverDelta.y = normY * 0.10;
      }
    };

    const onPointerUp = () => {
      this.isDragging = false;
    };

    this.container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    this.container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Mouse Wheel Zoom
    this.container.addEventListener('wheel', (e) => {
      e.preventDefault();
      this.targetDistance = Math.max(16, Math.min(42, this.targetDistance + e.deltaY * 0.03));
    }, { passive: false });

    // Toolbar Buttons
    const autoRotateBtn = document.getElementById('bim-btn-autorotate');
    if (autoRotateBtn) {
      autoRotateBtn.addEventListener('click', () => {
        this.isAutoRotate = !this.isAutoRotate;
        autoRotateBtn.classList.toggle('active', this.isAutoRotate);
      });
    }

    const wireframeBtn = document.getElementById('bim-btn-wireframe');
    if (wireframeBtn) {
      wireframeBtn.addEventListener('click', () => {
        this.isWireframe = !this.isWireframe;
        wireframeBtn.classList.toggle('active', this.isWireframe);
        Object.values(this.materials).forEach(m => {
          if (m.wireframe !== undefined && !m.isLineBasicMaterial) {
            m.wireframe = this.isWireframe;
          }
        });
      });
    }

    const resetBtn = document.getElementById('bim-btn-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.targetAzimuth = 0.78;
        this.targetElevation = 0.58;
        this.targetDistance = 28;
      });
    }

    const zoomInBtn = document.getElementById('bim-btn-zoomin');
    if (zoomInBtn) {
      zoomInBtn.addEventListener('click', () => {
        this.targetDistance = Math.max(16, this.targetDistance - 4);
      });
    }

    const zoomOutBtn = document.getElementById('bim-btn-zoomout');
    if (zoomOutBtn) {
      zoomOutBtn.addEventListener('click', () => {
        this.targetDistance = Math.min(42, this.targetDistance + 4);
      });
    }

    // Resize Handler
    window.addEventListener('resize', () => this.onResize());
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    if (width === 0 || height === 0) return;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  updateCameraPosition() {
    // Smooth Interpolation / Damping (Lerp)
    this.azimuth += (this.targetAzimuth - this.azimuth) * 0.08;
    this.elevation += (this.targetElevation - this.elevation) * 0.08;
    this.distance += (this.targetDistance - this.distance) * 0.08;

    const curAzimuth = this.azimuth + this.hoverDelta.x;
    const curElevation = this.elevation + this.hoverDelta.y;

    const x = this.distance * Math.sin(curAzimuth) * Math.cos(curElevation);
    const y = this.distance * Math.sin(curElevation);
    const z = this.distance * Math.cos(curAzimuth) * Math.cos(curElevation);

    this.camera.position.set(x, y, z);
    this.camera.lookAt(0, 3.5, 0);
  }

  animate() {
    requestAnimationFrame(this.animate);

    // Auto-Rotate Turntable
    if (this.isAutoRotate && !this.isDragging) {
      this.targetAzimuth += 0.0035;
    }

    this.updateCameraPosition();
    this.updateHotspotPositions();

    this.renderer.render(this.scene, this.camera);
  }
}

function initBimViewer() {
  const layerBtns = document.querySelectorAll('.bim-layer-btn');
  const specTitle = document.getElementById('bim-spec-title');
  const specDesc = document.getElementById('bim-spec-desc');
  const specStandard = document.getElementById('bim-spec-standard');
  const pins = document.querySelectorAll('.bim-hotspot-pin');

  // Instantiate Three.js 3D BIM Viewer
  let bim3D = null;
  if (typeof THREE !== 'undefined' && document.getElementById('bim-3d-canvas')) {
    bim3D = new Bim3DConstructionViewer('bim-viewer-container', 'bim-3d-canvas');
    window.bim3DViewer = bim3D;
    window.tourResize = () => bim3D && bim3D.onResize();
  }

  const layers = {
    rebar: {
      title: "Layer 01: Struktur Beton Bertulang & Pembesian Rebar",
      desc: "Kolom baja tulangan ulir D19-D25 dengan sengkang D10-100mm, mutu beton ready-mix K-350 slump 12±2 cm tahan gempa zona 4.",
      standard: "STANDAR: SNI 2847:2019 & SNI 1729:2020 (Beton Struktural & Baja Gedung)"
    },
    mep: {
      title: "Layer 02: Instalasi Plumbing MEP & Cable Tray Elektrikal",
      desc: "Jalur pipa PPR PN-10 air bersih, ducting HVAC central galvanized spiral, serta kabel FRC tahan api 3 jam untuk proteksi gedung.",
      standard: "STANDAR: NFPA 13 & SNI 03-6575 (Tata Kelola Mekanikal-Elektrikal)"
    },
    finishing: {
      title: "Layer 03: Fasad Arsitektural Kaca & Travertine Finishing",
      desc: "Dinding curtain wall double glazing 12mm Low-E kedap suara, panel louvers sunshade aerofoil komposit, dan kanopi entrance.",
      standard: "STANDAR: Green Building Council Indonesia & ISO 9001:2015"
    },
    all: {
      title: "Layer 04: Full Integrated Multi-Discipline BIM 3D Model",
      desc: "Model koordinasi federasi BIM terintegrasi mencakup Arsitektur, Struktur, dan MEP dengan clash detection LOD 350 siap tender.",
      standard: "STANDAR: ISO 19650 (Building Information Modelling)"
    }
  };

  layerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      layerBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const layerKey = btn.getAttribute('data-layer') || 'rebar';
      const data = layers[layerKey] || layers.rebar;

      if (bim3D) {
        bim3D.setLayer(layerKey);
      }

      if (specTitle) specTitle.textContent = data.title;
      if (specDesc) specDesc.textContent = data.desc;
      if (specStandard) specStandard.textContent = data.standard;
    });
  });

  pins.forEach(pin => {
    pin.addEventListener('click', () => {
      pins.forEach(p => p.classList.remove('active'));
      pin.classList.add('active');

      const pinTitle = pin.getAttribute('data-title');
      const pinDesc = pin.getAttribute('data-desc');
      const pinStd = pin.getAttribute('data-std');

      if (specTitle && pinTitle) specTitle.textContent = pinTitle;
      if (specDesc && pinDesc) specDesc.textContent = pinDesc;
      if (specStandard && pinStd) specStandard.textContent = pinStd;
    });
  });

  // Re-render lucide icons inside BIM toolbar
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

/* ==========================================================================
   5. Equipment Fleet Capacity Matrix with Filter & Interactive Dispatch Modal
   ========================================================================== */
function initFleetMatrix() {
  const filterBtns = document.querySelectorAll('.fleet-filter-btn');
  const rows = document.querySelectorAll('.fleet-table tbody tr');
  const searchInput = document.getElementById('fleet-search-input');
  const mobilizeBtns = document.querySelectorAll('.btn-mobilize-action');
  const modal = document.getElementById('modal-fleet-mobilize');
  
  let currentUnit = {
    code: 'TC-01',
    name: 'Potain Tower Crane MR 418',
    capacity: '24 Ton / Jangkauan 60m',
    location: 'Site Proyek Jakarta Pusat',
    status: 'READY FOR DEPLOYMENT'
  };

  // Category Filtering
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.getAttribute('data-cat') || 'all';

      rows.forEach(row => {
        const rowCat = row.getAttribute('data-cat');
        if (cat === 'all' || rowCat === cat) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });

  // Search input filtering
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(term) ? '' : 'none';
      });
    });
  }

  // Set default mobilization date to tomorrow
  const dateInput = document.getElementById('fleet-target-date');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().split('T')[0];
  }

  // Quick Chips for Project Site Destination
  const quickChips = document.querySelectorAll('.fleet-chip');
  const targetSiteInput = document.getElementById('fleet-target-site');
  quickChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const site = chip.getAttribute('data-site');
      if (targetSiteInput && site) {
        targetSiteInput.value = site;
        targetSiteInput.focus();
      }
    });
  });

  // Open Mobilization Modal with Dynamic Data
  mobilizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tr = btn.closest('tr');
      const unitCode = btn.getAttribute('data-unit-code') || (tr ? tr.querySelector('code')?.textContent : 'UNIT-01');
      const unitName = btn.getAttribute('data-unit-name') || (tr ? tr.querySelector('strong')?.textContent : 'Alat Berat Proyek');
      const capacity = btn.getAttribute('data-capacity') || (tr ? tr.children[2]?.textContent : '-');
      const location = btn.getAttribute('data-location') || (tr ? tr.children[3]?.textContent : 'Workshop Pusat');
      const status = btn.getAttribute('data-status') || (tr ? tr.querySelector('.status-pill-ready, .status-pill-deployed')?.textContent : 'READY');

      currentUnit = { code: unitCode, name: unitName, capacity, location, status };

      // Update Modal DOM
      const modalCode = document.getElementById('fleet-modal-unit-code');
      const modalName = document.getElementById('fleet-modal-unit-name');
      const modalCap = document.getElementById('fleet-modal-capacity');
      const modalLoc = document.getElementById('fleet-modal-location');
      const modalBadge = document.getElementById('fleet-modal-status-badge');
      const modalHeaderTitle = document.getElementById('fleet-modal-header-title');

      if (modalCode) modalCode.textContent = unitCode;
      if (modalName) modalName.textContent = unitName;
      if (modalCap) modalCap.textContent = capacity;
      if (modalLoc) modalLoc.textContent = location;
      
      if (modalBadge) {
        modalBadge.textContent = status;
        if (status.includes('READY')) {
          modalBadge.className = 'status-pill-ready';
        } else {
          modalBadge.className = 'status-pill-deployed';
        }
      }

      const currentLang = localStorage.getItem('contractor_lang') || 'id';

      if (modalHeaderTitle) {
        if (currentLang === 'en') {
          modalHeaderTitle.textContent = status.includes('READY') 
            ? 'Equipment Mobilization Request' 
            : 'Request Booking & Unit Reservation';
        } else {
          modalHeaderTitle.textContent = status.includes('READY') 
            ? 'Permintaan Mobilisasi Unit' 
            : 'Request Booking & Reservasi Unit';
        }
      }

      // Reset Views: Show Form, Hide Success
      const formView = document.getElementById('fleet-mobilize-form-view');
      const successView = document.getElementById('fleet-mobilize-success-view');
      if (formView) formView.style.display = 'block';
      if (successView) successView.style.display = 'none';

      if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }

      if (window.lucide) {
        window.lucide.createIcons();
      }
    });
  });

  // Handle Form Submit -> Process Dispatch Ticket
  const dispatchForm = document.getElementById('fleet-mobilize-form');
  const submitBtn = document.getElementById('btn-submit-fleet-dispatch');

  if (dispatchForm) {
    dispatchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const currentLang = localStorage.getItem('contractor_lang') || 'id';
      const targetSite = document.getElementById('fleet-target-site')?.value || (currentLang === 'en' ? 'Client Project Site' : 'Site Proyek Klien');
      const targetDate = document.getElementById('fleet-target-date')?.value || (currentLang === 'en' ? 'Immediate' : 'Segera');
      const duration = document.getElementById('fleet-duration-select')?.value || '3 Bulan';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = currentLang === 'en'
          ? '<i data-lucide="loader" class="spin"></i> Processing Digital Dispatch...'
          : '<i data-lucide="loader" class="spin"></i> Memproses Surat Jalan Digital...';
        if (window.lucide) window.lucide.createIcons();
      }

      setTimeout(() => {
        const ticketId = '#DISP-2026-' + Math.floor(1000 + Math.random() * 9000);
        const ticketIdEl = document.getElementById('fleet-ticket-id');
        const ticketSummaryEl = document.getElementById('fleet-ticket-summary');

        if (ticketIdEl) ticketIdEl.textContent = ticketId;
        if (ticketSummaryEl) {
          if (currentLang === 'en') {
            ticketSummaryEl.innerHTML = `
              Unit: <strong>${currentUnit.name}</strong> (${currentUnit.code})<br>
              Capacity: <strong>${currentUnit.capacity}</strong><br>
              Destination: <strong>${targetSite}</strong><br>
              Est. Arrival: <strong>1x24 Working Hours (From ${targetDate})</strong>
            `;
          } else {
            ticketSummaryEl.innerHTML = `
              Unit: <strong>${currentUnit.name}</strong> (${currentUnit.code})<br>
              Kapasitas: <strong>${currentUnit.capacity}</strong><br>
              Tujuan: <strong>${targetSite}</strong><br>
              Estimasi Tiba: <strong>1x24 Jam Kerja (Mulai ${targetDate})</strong>
            `;
          }
        }

        const formView = document.getElementById('fleet-mobilize-form-view');
        const successView = document.getElementById('fleet-mobilize-success-view');
        if (formView) formView.style.display = 'none';
        if (successView) successView.style.display = 'block';

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = currentLang === 'en'
            ? '<i data-lucide="send" style="width: 16px; height: 16px;"></i> Confirm Dispatch'
            : '<i data-lucide="send" style="width: 16px; height: 16px;"></i> Konfirmasi Disposisi';
        }

        if (window.lucide) window.lucide.createIcons();

        // Show High-Tech Toast Notification
        showContractorToast({
          type: 'success',
          title: currentLang === 'en' ? 'Dispatch Sent to Workshop!' : 'Disposisi Terkirim ke Workshop!',
          message: currentLang === 'en'
            ? `Digital dispatch permit ${ticketId} for ${currentUnit.name} has been registered to Workshop & Logistics.`
            : `Surat jalan digital ${ticketId} untuk ${currentUnit.name} telah didaftarkan ke Kepala Workshop & Logistik.`,
          duration: 5000
        });
      }, 600);
    });
  }

  // Handle WhatsApp Direct Dispatch
  const waBtn = document.getElementById('btn-wa-fleet-dispatch');
  if (waBtn) {
    waBtn.addEventListener('click', () => {
      const currentLang = localStorage.getItem('contractor_lang') || 'id';
      const targetSite = document.getElementById('fleet-target-site')?.value || (currentLang === 'en' ? 'Main Project Site' : 'Site Proyek Utama');
      const targetDate = document.getElementById('fleet-target-date')?.value || (currentLang === 'en' ? 'Tomorrow' : 'Besok');
      const duration = document.getElementById('fleet-duration-select')?.value || '3 Bulan';

      const messageText = currentLang === 'en'
        ? `Hello Contractor.Hub Workshop & Logistics Team,%0A%0AI would like to request equipment mobilization:%0A%0A📌 *EQUIPMENT DETAILS:*%0A- Code: ${currentUnit.code}%0A- Name: ${currentUnit.name}%0A- Capacity: ${currentUnit.capacity}%0A- Origin: ${currentUnit.location}%0A%0A🏗️ *PROJECT SITE DETAILS:*%0A- Destination: ${targetSite}%0A- Target Date: ${targetDate}%0A- Duration: ${duration}%0A%0APlease confirm unit readiness and transport dispatch permit. Thank you!`
        : `Halo Tim Workshop & Logistik Contractor.Hub,%0A%0ASaya ingin mengajukan permohonan mobilisasi armada konstruksi:%0A%0A📌 *DATA UNIT ALAT BERAT:*%0A- Kode Unit: ${currentUnit.code}%0A- Nama Unit: ${currentUnit.name}%0A- Kapasitas: ${currentUnit.capacity}%0A- Lokasi Asal: ${currentUnit.location}%0A%0A🏗️ *DATA SITE PROYEK:*%0A- Lokasi Tujuan: ${targetSite}%0A- Rencana Mobilisasi: ${targetDate}%0A- Estimasi Durasi: ${duration}%0A%0AMohon konfirmasi ketersediaan rute pengawalan & surat jalan. Terima kasih!`;

      window.open(`https://wa.me/6281234567890?text=${messageText}`, '_blank');

      showContractorToast({
        type: 'info',
        title: currentLang === 'en' ? 'Opening Logistics WhatsApp' : 'Membuka WhatsApp Logistik',
        message: currentLang === 'en'
          ? `Dispatch inquiry for ${currentUnit.name} is ready to send via WhatsApp.`
          : `Pesan disposisi untuk ${currentUnit.name} siap dikirim ke Kepala Workshop via WhatsApp.`,
        duration: 4000
      });
    });
  }

  // Handle Copy Ticket ID
  const copyBtn = document.getElementById('btn-copy-ticket-code');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const currentLang = localStorage.getItem('contractor_lang') || 'id';
      const ticketId = document.getElementById('fleet-ticket-id')?.textContent || '#DISP-2026-8891';
      navigator.clipboard.writeText(ticketId).then(() => {
        showContractorToast({
          type: 'info',
          title: currentLang === 'en' ? 'Ticket No. Copied' : 'Nomor Tiket Tersalin',
          message: currentLang === 'en'
            ? `${ticketId} has been copied to clipboard.`
            : `${ticketId} telah disalin ke clipboard untuk pelacakan alokasi.`,
          duration: 3500
        });
      });
    });
  }
}

/* ==========================================================================
   Global Rich Contractor Toast Notification System
   ========================================================================== */
function showContractorToast({ title = 'Notifikasi', message = '', type = 'info', duration = 4500, action = null }) {
  let container = document.getElementById('contractor-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'contractor-toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `contractor-toast toast-${type}`;

  const iconName = type === 'success' ? 'check-circle' : type === 'warning' ? 'alert-triangle' : 'zap';
  const now = new Date();
  const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';

  toast.innerHTML = `
    <div class="toast-icon">
      <i data-lucide="${iconName}" style="width: 20px; height: 20px;"></i>
    </div>
    <div class="toast-body">
      <div class="toast-header-row">
        <div class="toast-title">${title}</div>
        <div class="toast-time">${timeStr}</div>
      </div>
      <div class="toast-message">${message}</div>
      ${action ? `<button class="toast-action-btn" id="toast-act-btn">${action.label}</button>` : ''}
    </div>
    <button class="toast-close-btn" aria-label="Tutup notifikasi">
      <i data-lucide="x" style="width: 16px; height: 16px;"></i>
    </button>
    <div class="toast-progress" style="animation-duration: ${duration}ms;"></div>
  `;

  container.appendChild(toast);

  if (window.lucide) {
    window.lucide.createIcons({ root: toast });
  }

  // Action button listener
  if (action && action.onClick) {
    const actBtn = toast.querySelector('#toast-act-btn');
    if (actBtn) {
      actBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        action.onClick();
        dismiss();
      });
    }
  }

  // Close button listener
  const closeBtn = toast.querySelector('.toast-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => dismiss());
  }

  // Auto Dismiss
  const timer = setTimeout(() => {
    dismiss();
  }, duration);

  function dismiss() {
    clearTimeout(timer);
    toast.classList.add('toast-hiding');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 320);
  }
}

// Expose globally
window.showContractorToast = showContractorToast;

/* ==========================================================================
   6. Blueprint CAD Viewer Modal Helper
   ========================================================================== */
function initBlueprintViewer() {
  // Placeholder for extra CAD inspection interactions
}

/* ==========================================================================
   7. Material Swatches Swapper
   ========================================================================== */
function initMaterialSwatches() {
  // Available for material palette interactions
}

