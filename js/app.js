/* ============================================================
   DR. PABLO DE LA GARZA CHALITA — APP JS
   ============================================================ */

/* ── TESTIMONIALS DATA ──────────────────────────────────────── */
const TESTIMONIALS = [
  {
    name: 'Dulce Maria',
    initials: 'DM',
    time: 'Hace 3 días',
    text: 'Excelente atención, muy profesional, súper amable y atento siempre al pendiente de mi hija y atendió a todas nuestras dudas. Nos dio mucha tranquilidad y todo salió perfecto. Muy agradecidos con su trato y atención.'
  },
  {
    name: 'Gaby Saade',
    initials: 'GS',
    time: 'Hace 22 semanas',
    text: 'Excelente médico. Muy profesional, humano y atento. Estuvo al pendiente de nuestro hijo antes, durante y después del procedimiento. Nos explicó todo con claridad y nos dio mucha tranquilidad. Muy agradecidos.'
  },
  {
    name: 'Pita Ramírez Ramos',
    initials: 'PR',
    time: 'Hace 6 semanas',
    text: 'Excelente trato. El doctor fue muy profesional en todo momento y explicó cada detalle con claridad, lo cual me dio mucha confianza. Estoy muy agradecida por la atención que recibí en todo momento.'
  },
  {
    name: 'Belinda Sanchez',
    initials: 'BS',
    time: 'Hace 4 semanas',
    text: 'Excelente atención. Muy profesional, amable y paciente. Explica todo con claridad y transmite mucha confianza desde el primer momento de la consulta.'
  },
  {
    name: 'Frida Barcenas',
    initials: 'FB',
    time: 'Hace 17 semanas',
    text: 'Gran atención por parte del doctor, antes, durante y después del procedimiento. Tenía mucho miedo de la reacción de mi cuerpo a la anestesia, pero todo salió muy bien, no tuve ninguna molestia.'
  },
  {
    name: 'Martha Guerrero',
    initials: 'MG',
    time: 'Hace 3 semanas',
    text: 'Mi mamá, de 88 años y con Alzheimer, fue atendida por el Dr. Pablo de la Garza en una intervención odontológica. El trato fue excepcional, con toda la paciencia y profesionalismo que una situación así requiere.'
  },
  {
    name: 'Lourdes Alfaro',
    initials: 'LA',
    time: 'Hace 15 semanas',
    text: 'Quiero recomendar ampliamente al Dr. Pablo de la Garza. Durante todo mi procedimiento demostró un alto nivel de profesionalismo y conocimiento. Me explicó cada paso y eso me dio mucha seguridad.'
  },
  {
    name: 'Susana Lumbreras',
    initials: 'SL',
    time: 'Hace 4 semanas',
    text: 'Excelente atención antes y después del tratamiento. El Dr. Pablo y la Dra. Miriam Fernández muy atentos y al pendiente de la recuperación en todo momento. Totalmente recomendados.'
  },
  {
    name: 'Karen Rivas',
    initials: 'KR',
    time: 'Hace 9 semanas',
    text: 'Excelente atención de inicio a fin del procedimiento. Sin duda volveríamos a recurrir a sus servicios de ser necesario. Instalaciones impecables y atención de primer nivel.'
  },
  {
    name: 'Sandra Demencia',
    initials: 'SD',
    time: 'Hace 14 semanas',
    text: 'Excelente persona y con buen trato hacia el paciente. 100% recomendable. Tiene mucha humildad y sabe lo que hace. Su trabajo te genera confianza como familiar del paciente.'
  }
];

/* ── DOM READY ──────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initTestimonials();
  initFAQ();
  initForm();
  initNavbarScroll();
  initScrollAnimations();
  initBlog();
});

/* ── SCROLL ANIMATIONS ──────────────────────────────────────── */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  function observeAll() {
    document.querySelectorAll(
      '.anim-fade-up, .anim-fade-in, .anim-fade-left, .anim-fade-right, .anim-scale'
    ).forEach(el => {
      if (!el.classList.contains('visible')) observer.observe(el);
    });
  }

  observeAll();
  // Re-run when pages switch so new page elements get observed
  window._observeAnimations = observeAll;
}

/* ── MULTI-PAGE NAVIGATION ──────────────────────────────────── */
function initNav() {
  const pages = document.querySelectorAll('.page');
  const navTabs = document.querySelectorAll('.nav-tab');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  function showPage(pageId) {
    pages.forEach(p => p.classList.remove('active'));
    navTabs.forEach(t => t.classList.remove('active'));

    const target = document.getElementById('page-' + pageId);
    if (target) {
      target.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (pageId === 'blog') showBlogIndex();
      // Re-observe animated elements on the newly visible page
      setTimeout(() => {
        if (window._observeAnimations) window._observeAnimations();
      }, 50);
    }

    navTabs.forEach(t => {
      if (t.dataset.page === pageId) t.classList.add('active');
    });

    if (mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  }

  // All elements with data-page attribute
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-page]');
    if (el) {
      e.preventDefault();
      showPage(el.dataset.page);
    }
  });

  // Hamburger
  hamburger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
  });

  // Close mobile menu on outside click
  document.addEventListener('click', e => {
    if (!e.target.closest('#navbar')) {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ── NAVBAR SCROLL ──────────────────────────────────────────── */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });
}

/* ── TESTIMONIALS CAROUSEL ──────────────────────────────────── */
function initTestimonials() {
  const track = document.getElementById('testimonials-track');
  const dotsContainer = document.getElementById('t-dots');
  const prevBtn = document.getElementById('t-prev');
  const nextBtn = document.getElementById('t-next');
  if (!track) return;

  let current = 0;
  let autoTimer = null;

  // Build cards
  TESTIMONIALS.forEach((t, i) => {
    const card = document.createElement('div');
    card.className = 'testimonial-card' + (i === 0 ? ' active' : '');
    card.innerHTML = `
      <div class="t-card-inner">
        <div class="t-stars">
          <span class="t-star">★</span><span class="t-star">★</span>
          <span class="t-star">★</span><span class="t-star">★</span><span class="t-star">★</span>
        </div>
        <p class="t-quote">"${t.text}"</p>
        <div class="t-author">
          <div class="t-avatar">${t.initials}</div>
          <div>
            <div class="t-name">${t.name}</div>
            <div class="t-meta">Google · ${t.time}</div>
          </div>
        </div>
      </div>`;
    track.appendChild(card);
  });

  // Build dots
  TESTIMONIALS.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 't-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Testimonial ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  const cards = track.querySelectorAll('.testimonial-card');
  const dots = dotsContainer.querySelectorAll('.t-dot');

  function goTo(idx) {
    cards[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (idx + TESTIMONIALS.length) % TESTIMONIALS.length;
    cards[current].classList.add('active');
    dots[current].classList.add('active');
    resetAuto();
  }

  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 5500);
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));
  resetAuto();
}

/* ── FAQ ACCORDION ──────────────────────────────────────────── */
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-q').addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close siblings in same list
      const parent = item.parentElement;
      parent.querySelectorAll('.faq-item.open').forEach(o => o.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

/* ── CONTACT FORM ───────────────────────────────────────────── */
function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.disabled = true;
    btn.textContent = 'Enviando...';
    setTimeout(() => {
      showToast('Solicitud enviada. Le contactaremos pronto.');
      form.reset();
      btn.disabled = false;
      btn.textContent = 'Enviar Solicitud';
    }, 1200);
  });
}

/* ── BLOG ───────────────────────────────────────────────────── */
function initBlog() {
  document.addEventListener('click', e => {
    const card = e.target.closest('[data-blog]');
    if (card) {
      e.preventDefault();
      showBlogArticle(card.dataset.blog);
    }
    const back = e.target.closest('[data-blog-back]');
    if (back) {
      e.preventDefault();
      showBlogIndex();
    }
  });
}

function showBlogArticle(id) {
  const index = document.getElementById('blog-index');
  if (index) index.style.display = 'none';
  document.querySelectorAll('.blog-article').forEach(a => { a.style.display = 'none'; });
  const article = document.getElementById('blog-article-' + id);
  if (article) {
    article.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => { if (window._observeAnimations) window._observeAnimations(); }, 50);
  }
}

function showBlogIndex() {
  document.querySelectorAll('.blog-article').forEach(a => { a.style.display = 'none'; });
  const index = document.getElementById('blog-index');
  if (index) index.style.display = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── TOAST ──────────────────────────────────────────────────── */
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}
