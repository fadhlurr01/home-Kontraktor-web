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
   4. Mobile Menu Drawer & Quick Dock
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-toggle-btn');
  const drawer = document.querySelector('.mobile-drawer');
  const closeBtns = document.querySelectorAll('.drawer-close-trigger');
  const dockItems = document.querySelectorAll('.mobile-quick-dock .quick-dock-item');

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

  // Quick Dock item click state
  dockItems.forEach(item => {
    item.addEventListener('click', () => {
      dockItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // Scroll spy for Quick Dock
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 200;
    const heroSec = document.getElementById('hero');
    const portSec = document.getElementById('portofolio');
    const widgSec = document.getElementById('widgets');

    if (dockItems.length >= 3) {
      if (widgSec && scrollPos >= widgSec.offsetTop) {
        dockItems.forEach(i => i.classList.remove('active'));
        if (dockItems[2]) dockItems[2].classList.add('active');
      } else if (portSec && scrollPos >= portSec.offsetTop) {
        dockItems.forEach(i => i.classList.remove('active'));
        if (dockItems[1]) dockItems[1].classList.add('active');
      } else if (heroSec) {
        dockItems.forEach(i => i.classList.remove('active'));
        if (dockItems[0]) dockItems[0].classList.add('active');
      }
    }
  }, { passive: true });
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
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
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
