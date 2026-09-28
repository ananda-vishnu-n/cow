document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  const setHeaderState = () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 12);
  };
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  if (toggle && mobileMenu) {
    const closeMenu = () => {
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('is-open');
    };
    toggle.addEventListener('click', () => {
      const open = !mobileMenu.classList.contains('is-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      mobileMenu.classList.toggle('is-open', open);
    });
    mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('click', (event) => {
      if (!mobileMenu.contains(event.target) && !toggle.contains(event.target)) closeMenu();
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-page-link]').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  initGallery();
  initContactForm();
});

function initGallery() {
  const items = Array.from(document.querySelectorAll('.gallery-item'));
  const filters = Array.from(document.querySelectorAll('.filter-btn'));
  const lightbox = document.querySelector('.lightbox');
  if (!items.length) return;

  let visibleItems = items.slice();
  let currentIndex = 0;
  const lightboxImage = lightbox?.querySelector('[data-lightbox-image]');
  const lightboxCaption = lightbox?.querySelector('[data-lightbox-caption]');
  const closeBtn = lightbox?.querySelector('.lightbox-close');
  const prevBtn = lightbox?.querySelector('.lightbox-prev');
  const nextBtn = lightbox?.querySelector('.lightbox-next');

  const setVisibility = (category) => {
    visibleItems = items.filter((item) => category === 'all' || (item.dataset.category || '').split(/\s+/).includes(category));
    items.forEach((item) => {
      item.hidden = !visibleItems.includes(item);
    });
  };

  filters.forEach((button) => {
    button.addEventListener('click', () => {
      filters.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      setVisibility(button.dataset.filter || 'all');
    });
  });

  const openLightbox = (item) => {
    if (!lightbox || !lightboxImage) return;
    currentIndex = Math.max(0, visibleItems.indexOf(item));
    const image = item.querySelector('img');
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    if (lightboxCaption) lightboxCaption.textContent = item.dataset.caption || image.alt || '';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    closeBtn?.focus();
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
  };

  const stepLightbox = (direction) => {
    if (!visibleItems.length) return;
    currentIndex = (currentIndex + direction + visibleItems.length) % visibleItems.length;
    openLightbox(visibleItems[currentIndex]);
  };

  items.forEach((item) => item.addEventListener('click', () => openLightbox(item)));
  closeBtn?.addEventListener('click', closeLightbox);
  prevBtn?.addEventListener('click', () => stepLightbox(-1));
  nextBtn?.addEventListener('click', () => stepLightbox(1));
  lightbox?.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });

  document.addEventListener('keydown', (event) => {
    if (!lightbox?.classList.contains('is-open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') stepLightbox(-1);
    if (event.key === 'ArrowRight') stepLightbox(1);
  });
}

function initContactForm() {
  const form = document.querySelector('#contact-form');
  const message = document.querySelector('#form-message');
  if (!form || !message) return;

  const showMessage = (text, type) => {
    message.textContent = text;
    message.className = `form-message is-visible ${type}`;
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = form.fullName.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const subject = form.subject.value.trim();
    const body = form.message.value.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const phoneDigits = phone.replace(/\D/g, '');

    const errors = [];
    if (name.length < 2) errors.push('Please enter your full name.');
    if (!emailOk) errors.push('Please enter a valid email address.');
    if (phoneDigits.length < 10 || phoneDigits.length > 15) errors.push('Please enter a valid phone number.');
    if (subject.length < 3) errors.push('Please enter a subject.');
    if (body.length < 20) errors.push('Please write at least 20 characters in your message.');

    if (errors.length) {
      showMessage(errors.join(' '), 'error');
      return;
    }

    showMessage('Thanks for reaching out. This demo form is validated locally and is not connected to email yet.', 'success');
    form.reset();
  });
}
