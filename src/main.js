/* ==========================================================================
   MCubeGlobal - DIGITAL GROWTH AGENCY
   Interactive Client Script, Search Engine, & Modal System
   ========================================================================== */

function initNikilApp() {

  // --------------------------------------------------------------------------
  // 1. CAROUSEL SLIDER LOGIC (INSTANT DIRECT SWITCH)
  // --------------------------------------------------------------------------
  const slideNumber = document.getElementById('slideNumber');
  const slideTitle = document.getElementById('slideTitle');
  const slideQuote = document.getElementById('slideQuote');

  const slideCtaText = document.getElementById('slideCtaText');
  const carouselCounter = document.getElementById('carouselCounter');
  const prevSlideBtn = document.getElementById('prevSlideBtn');
  const nextSlideBtn = document.getElementById('nextSlideBtn');
  const heroSlideImage = document.getElementById('heroSlideImage');

  const slidesData = [
    {
      num: '01',
      title: 'Grow Your Business with Digital Excellence',
      quote: 'From eye-catching designs to powerful marketing campaigns and scalable web solutions, we help businesses attract more customers, increase conversions, and build a lasting online presence.',
      cta: 'Explore Our Services',
      image: 'image1.png'
    },
    {
      num: '02',
      title: 'Creative Designs That Make Your Brand Stand Out',
      quote: 'We create logos, brand identities, social media creatives, marketing materials, and visual experiences that leave a memorable impression and strengthen your brand.',
      cta: 'Explore Creative Design',
      image: 'image2.png'
    },
    {
      num: '03',
      title: 'Performance Marketing That Delivers Real Results',
      quote: 'Drive qualified traffic, generate high-quality leads, and maximize your ROI with strategic Meta Ads, Google Ads, analytics, and conversion-focused campaigns.',
      cta: 'Explore Performance Marketing',
      image: 'image3.png'
    },
    {
      num: '04',
      title: 'Modern Websites & Web Applications Built for Growth',
      quote: 'From responsive business websites to custom web applications, we develop secure, fast, and scalable digital solutions that help your business grow with confidence.',
      cta: 'Explore Web Development',
      image: 'image4.png'
    }
  ];

  let currentSlideIndex = 0;

  function renderSlide(targetIndex) {
    const data = slidesData[targetIndex];
    if (!data) return;

    if (slideNumber) slideNumber.textContent = data.num;
    if (slideTitle) slideTitle.textContent = data.title;
    if (slideQuote) slideQuote.textContent = data.quote;
    if (slideCtaText) slideCtaText.textContent = data.cta;
    if (carouselCounter) carouselCounter.textContent = `${targetIndex + 1}/${slidesData.length}`;

    if (heroSlideImage) {
      heroSlideImage.src = data.image;
      heroSlideImage.onerror = function () {
        this.onerror = null;
        this.src = 'first.png';
      };
    }
  }

  // Lock content area to the tallest slide so card never resizes
  function lockContentHeight() {
    const contentTrack = document.getElementById('heroContentTrack');
    if (!contentTrack) return;

    // Remove any previously set min-height so we measure naturally
    contentTrack.style.minHeight = 'auto';

    let maxHeight = 0;
    const originalIndex = currentSlideIndex;

    // Render each slide, measure, track the tallest
    for (let i = 0; i < slidesData.length; i++) {
      renderSlide(i);
      const h = contentTrack.scrollHeight;
      if (h > maxHeight) maxHeight = h;
    }

    // Restore original slide and lock the height
    renderSlide(originalIndex);
    contentTrack.style.minHeight = maxHeight + 'px';
  }

  // Run after fonts and layout are ready
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => lockContentHeight());
  } else {
    window.addEventListener('load', lockContentHeight);
  }
  // Also recalculate on resize (responsive)
  window.addEventListener('resize', lockContentHeight);

  if (prevSlideBtn) {
    prevSlideBtn.addEventListener('click', () => {
      currentSlideIndex = (currentSlideIndex - 1 + slidesData.length) % slidesData.length;
      renderSlide(currentSlideIndex);
    });
  }

  if (nextSlideBtn) {
    nextSlideBtn.addEventListener('click', () => {
      currentSlideIndex = (currentSlideIndex + 1) % slidesData.length;
      renderSlide(currentSlideIndex);
    });
  }

  // --------------------------------------------------------------------------
  // 2. INTERACTIVE SEARCH ENGINE LOGIC
  // --------------------------------------------------------------------------
  const searchModal = document.getElementById('searchModal');
  const openSearchBtnNav = document.getElementById('openSearchBtnNav');
  const openSearchBtnMegamenu = document.getElementById('openSearchBtnMegamenu');
  const closeSearchBtn = document.getElementById('closeSearchBtn');
  const searchInput = document.getElementById('searchInput');
  const clearSearchInputBtn = document.getElementById('clearSearchInputBtn');
  const searchResultsContainer = document.getElementById('searchResultsContainer');
  const searchTagBtns = document.querySelectorAll('.search-tag-btn');

  const searchableItems = [
    {
      title: '2026 Growth Engineering & Capital Report',
      category: 'Overview / Report',
      description: 'Performance marketing, full-stack code, graphic design, and brand strategy into a single revenue engine.',
      target: '#overview'
    },
    {
      title: 'Performance Marketing & Paid Media Scaling',
      category: 'My 4 Works',
      description: 'Managing paid media across Meta, Google Search, LinkedIn ABM, and Programmatic DSPs.',
      target: '#works'
    },
    {
      title: 'Full-Stack Web Engineering & Server CAPI Telemetry',
      category: 'My 4 Works',
      description: 'Engineering high-speed enterprise web portals, custom landing pages, and Cloud GTM / CAPI pipelines.',
      target: '#works'
    },
    {
      title: 'Institutional Graphic Design & UI/UX Systems',
      category: 'My 4 Works',
      description: 'Prestigious corporate visual design systems, conversion-driven UI/UX layouts, and ad creative sets.',
      target: '#works'
    },
    {
      title: 'Brand Strategy & Enterprise Copywriting',
      category: 'My 4 Works',
      description: 'Category-defining brand positioning, value proposition frameworks, and high-converting enterprise copy.',
      target: '#works'
    },
    {
      title: 'Capital Drag & CAC Calculator',
      category: 'Capital Evaluation',
      description: 'Interactive calculator to evaluate monthly media spend, CAC reduction, and budget drag savings.',
      target: '#calculator'
    },
    {
      title: 'Global Growth Headquarters',
      category: 'Studio',
      description: 'Global growth engineering studio marking single-point fiduciary execution for enterprise clients.',
      target: '#featured-studio'
    },
    {
      title: 'Connect with MCubeGlobal',
      category: 'Contact',
      description: 'Direct 1-on-1 consultation to audit your paid ads, website code, graphic design, or brand strategy.',
      target: '#contact'
    }
  ];

  function openSearch() {
    if (mobileMenu) mobileMenu.classList.add('hidden');
    if (searchModal) {
      searchModal.classList.remove('hidden');
      searchModal.classList.add('flex');
      setTimeout(() => {
        if (searchInput) searchInput.focus();
      }, 50);
    }
  }

  function closeSearch() {
    if (searchModal) {
      searchModal.classList.add('hidden');
      searchModal.classList.remove('flex');
    }
  }

  if (openSearchBtnNav) openSearchBtnNav.addEventListener('click', openSearch);
  if (openSearchBtnMegamenu) openSearchBtnMegamenu.addEventListener('click', openSearch);
  if (closeSearchBtn) closeSearchBtn.addEventListener('click', closeSearch);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSearch();
      closeModal();
    }
  });

  function performSearch(query) {
    if (!searchResultsContainer) return;
    const cleanQuery = query.trim().toLowerCase();

    if (!cleanQuery) {
      if (clearSearchInputBtn) clearSearchInputBtn.classList.add('hidden');
      searchResultsContainer.innerHTML = `<p class="text-sm text-slate-500 font-sans italic">Type keywords above to search across all works, reports, and calculators...</p>`;
      return;
    }

    if (clearSearchInputBtn) clearSearchInputBtn.classList.remove('hidden');

    const filtered = searchableItems.filter(item =>
      item.title.toLowerCase().includes(cleanQuery) ||
      item.category.toLowerCase().includes(cleanQuery) ||
      item.description.toLowerCase().includes(cleanQuery)
    );

    if (filtered.length === 0) {
      searchResultsContainer.innerHTML = `
        <div class="p-4 bg-slate-50 border border-slate-200 rounded text-center text-slate-600 font-sans text-sm">
          No matches found for "<strong>${query}</strong>". Try searching for <em>web dev</em>, <em>paid media</em>, <em>design</em>, or <em>calculator</em>.
        </div>
      `;
      return;
    }

    searchResultsContainer.innerHTML = filtered.map(item => `
      <a href="${item.target}" class="search-result-item block p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded transition-all group">
        <div class="flex items-center justify-between">
          <span class="text-xs font-mono font-semibold text-[#8C5229] uppercase">${item.category}</span>
          <i class="fa-solid fa-arrow-right text-xs text-slate-400 group-hover:text-jpm-blue transition-colors"></i>
        </div>
        <h4 class="font-serif text-lg font-normal text-[#111111] mt-1 group-hover:text-jpm-blue transition-colors">${item.title}</h4>
        <p class="text-xs text-slate-600 font-sans mt-1">${item.description}</p>
      </a>
    `).join('');

    const resultLinks = searchResultsContainer.querySelectorAll('.search-result-item');
    resultLinks.forEach(link => {
      link.addEventListener('click', closeSearch);
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      performSearch(e.target.value);
    });
  }

  if (clearSearchInputBtn) {
    clearSearchInputBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        performSearch('');
        searchInput.focus();
      }
    });
  }

  searchTagBtns.forEach(tagBtn => {
    tagBtn.addEventListener('click', () => {
      const tagText = tagBtn.textContent.trim();
      if (searchInput) {
        searchInput.value = tagText;
        performSearch(tagText);
      }
    });
  });

  // --------------------------------------------------------------------------
  // 3. HERO / CALCULATOR SLIDER ENGINE
  // --------------------------------------------------------------------------
  const heroBudgetSlider = document.getElementById('heroBudgetSlider');
  const heroCacSlider = document.getElementById('heroCacSlider');
  const heroBudgetValue = document.getElementById('heroBudgetValue');
  const heroCacValue = document.getElementById('heroCacValue');
  const heroDragVal = document.getElementById('heroDragVal');
  const heroOptCacVal = document.getElementById('heroOptCacVal');
  const heroIroasVal = document.getElementById('heroIroasVal');

  function formatCurrency(val) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  }

  function updateHeroSimulator() {
    if (!heroBudgetSlider || !heroCacSlider) return;

    const monthlySpend = parseFloat(heroBudgetSlider.value);
    const currentCac = parseFloat(heroCacSlider.value);

    const annualSpend = monthlySpend * 12;
    const dragEfficiencyRate = 0.348;
    const annualDragSaved = annualSpend * dragEfficiencyRate;
    const optimizedCac = currentCac * (1 - dragEfficiencyRate);

    const baseIroas = 3.8;
    const spendBonus = (monthlySpend / 2000000) * 0.7;
    const iRoas = (baseIroas + spendBonus).toFixed(2);

    if (heroBudgetValue) heroBudgetValue.textContent = formatCurrency(monthlySpend) + ' / mo';
    if (heroCacValue) heroCacValue.textContent = formatCurrency(currentCac) + ' / customer';
    if (heroDragVal) heroDragVal.textContent = formatCurrency(annualDragSaved);
    if (heroOptCacVal) heroOptCacVal.textContent = '$' + optimizedCac.toFixed(2);
    if (heroIroasVal) heroIroasVal.textContent = iRoas + 'x';
  }

  if (heroBudgetSlider && heroCacSlider) {
    heroBudgetSlider.addEventListener('input', updateHeroSimulator);
    heroCacSlider.addEventListener('input', updateHeroSimulator);
    updateHeroSimulator();
  }

  // --------------------------------------------------------------------------
  // 4. MODAL & MEGAMENU CONTROLS
  // --------------------------------------------------------------------------
  const auditModal = document.getElementById('auditModal');
  const mobileMenu = document.getElementById('mobileMenu');
  const openModalBtns = document.querySelectorAll('#openAuditModalBtnNav, #openAuditModalBtnCalc, #openAuditModalBtnStudio, .open-audit-btn');
  const closeModalBtn = document.getElementById('closeAuditModalBtn');
  const auditForm = document.getElementById('auditForm');

  function openModal() {
    if (mobileMenu) mobileMenu.classList.add('hidden');
    if (auditModal) auditModal.classList.remove('opacity-0', 'pointer-events-none');
  }

  function closeModal() {
    if (auditModal) auditModal.classList.add('opacity-0', 'pointer-events-none');
  }

  openModalBtns.forEach(btn => {
    if (btn) btn.addEventListener('click', openModal);
  });

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  if (auditModal) {
    auditModal.addEventListener('click', (e) => {
      if (e.target === auditModal) closeModal();
    });
  }

  if (auditForm) {
    auditForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = auditForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Submitting Connection...`;

      setTimeout(() => {
        alert('Thank you. Your request to Connect has been received by MCubeGlobal. A project briefing and NDA will be delivered to your email shortly.');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        auditForm.reset();
        closeModal();
      }, 1200);
    });
  }

  // Mobile Slide Drawer / Megamenu Overlay Menu
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const closeMobileMenuBtn = document.getElementById('closeMobileMenuBtn');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
    });
  }

  if (closeMobileMenuBtn && mobileMenu) {
    closeMobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu) mobileMenu.classList.add('hidden');
    });
  });

}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNikilApp);
} else {
  initNikilApp();
}
