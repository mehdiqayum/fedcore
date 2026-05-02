/* ── Navbar scroll + mobile menu ─────────────────────────── */
(function () {
  const header = document.querySelector('header.site-header');
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav a');

  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* Mark active nav link */
  const page = location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.mobile-nav a').forEach(a => {
    const href = a.getAttribute('href').replace(/\/$/, '') || '/';
    if (href === page) a.classList.add('active');
  });
})();

/* ── Scroll-reveal via IntersectionObserver ──────────────── */
(function () {
  const selectors = '.reveal, .reveal-left, .reveal-right';
  const els = document.querySelectorAll(selectors);
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
})();

/* ── Accordion (FAQ) ──────────────────────────────────────── */
(function () {
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      /* collapse all */
      document.querySelectorAll('.accordion-trigger').forEach(t => {
        t.setAttribute('aria-expanded', 'false');
        const c = t.nextElementSibling;
        if (c) c.style.maxHeight = '0';
      });
      if (!expanded) {
        trigger.setAttribute('aria-expanded', 'true');
        const content = trigger.nextElementSibling;
        if (content) content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
})();

/* ── Testimonials Carousel ────────────────────────────────── */
(function () {
  const track = document.querySelector('.carousel-track');
  if (!track) return;
  const slides = track.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.carousel-btn-prev');
  const nextBtn = document.querySelector('.carousel-btn-next');
  let current = 0;

  function goTo(idx) {
    current = (idx + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

  /* Auto-advance */
  setInterval(() => goTo(current + 1), 6000);
})();

/* ── Scroll-to-top ────────────────────────────────────────── */
(function () {
  const btn = document.querySelector('.scroll-top-btn');
  if (btn) btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ── Contact Form Validation ──────────────────────────────── */
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  function showError(id, msg) {
    const el = document.getElementById(id);
    if (el) { el.textContent = msg; el.classList.add('visible'); }
  }
  function clearError(id) {
    const el = document.getElementById(id);
    if (el) { el.textContent = ''; el.classList.remove('visible'); }
  }
  function val(id) { return form.querySelector(`[name="${id}"]`)?.value.trim() || ''; }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    const fields = ['name', 'email', 'company', 'subject', 'message'];
    fields.forEach(f => clearError(`err-${f}`));

    if (val('name').length < 2) { showError('err-name', 'Name is required'); valid = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val('email'))) { showError('err-email', 'Invalid email address'); valid = false; }
    if (val('company').length < 2) { showError('err-company', 'Company name is required'); valid = false; }
    if (val('subject').length < 2) { showError('err-subject', 'Subject is required'); valid = false; }
    if (val('message').length < 10) { showError('err-message', 'Message must be at least 10 characters'); valid = false; }

    if (valid) {
      const success = document.getElementById('contact-success');
      if (success) success.classList.add('visible');
      form.reset();
      setTimeout(() => success?.classList.remove('visible'), 6000);
    }
  });
})();

/* ── Talent Form Validation ───────────────────────────────── */
(function () {
  const form = document.getElementById('talent-form');
  if (!form) return;

  function showError(id, msg) {
    const el = document.getElementById(id);
    if (el) { el.textContent = msg; el.classList.add('visible'); }
  }
  function clearError(id) {
    const el = document.getElementById(id);
    if (el) { el.textContent = ''; el.classList.remove('visible'); }
  }
  function val(id) { return form.querySelector(`[name="${id}"]`)?.value.trim() || ''; }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    ['name', 'email', 'expertise', 'message'].forEach(f => clearError(`err-t-${f}`));

    if (val('name').length < 2) { showError('err-t-name', 'Name is required'); valid = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val('email'))) { showError('err-t-email', 'Invalid email address'); valid = false; }
    if (val('expertise').length < 2) { showError('err-t-expertise', 'Please specify your expertise'); valid = false; }
    if (val('message').length < 10) { showError('err-t-message', 'Please tell us a bit about your background'); valid = false; }

    if (valid) {
      const success = document.getElementById('talent-success');
      if (success) success.classList.add('visible');
      form.reset();
      setTimeout(() => success?.classList.remove('visible'), 6000);
    }
  });
})();
