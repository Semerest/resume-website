const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');

const savedTheme = localStorage.getItem('theme');

if (themeToggle) {
  if (savedTheme === 'light') {
    body.classList.add('theme-light');
    themeToggle.textContent = 'Тёмная тема';
  } else {
    body.classList.remove('theme-light');
    themeToggle.textContent = 'Светлая тема';
  }

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('theme-light');

    const isLight = body.classList.contains('theme-light');

    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    themeToggle.textContent = isLight ? 'Тёмная тема' : 'Светлая тема';
  });
}

const animatedItems = document.querySelectorAll(
  '.section, .card, .feature, .project, .result, .step, .skill-group'
);

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  { threshold: 0.12 }
);

animatedItems.forEach(item => {
  item.classList.add('fade-in');
  observer.observe(item);
});

const navLinks = document.querySelectorAll('.nav a');
const trackedSections = Array.from(navLinks)
  .map(link => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

function updateActiveNav() {
  const scrollPosition = window.scrollY + 140;
  let activeId = '';

  trackedSections.forEach(section => {
    if (section.offsetTop <= scrollPosition) {
      activeId = section.id;
    }
  });

  const bottomReached = window.innerHeight + window.scrollY >= document.body.offsetHeight - 80;

  if (bottomReached) {
    activeId = 'contacts';
  }

  navLinks.forEach(link => {
    link.classList.toggle('is-active', link.getAttribute('href') === `#${activeId}`);
  });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

const scrollTopButton = document.querySelector('.scroll-top');

if (scrollTopButton) {
  window.addEventListener('scroll', () => {
    scrollTopButton.classList.toggle('is-visible', window.scrollY > 500);
  });
}

const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox__image');
const lightboxClose = document.querySelector('.lightbox__close');
const lightboxLinks = document.querySelectorAll('[data-lightbox]');

function openLightbox(src, alt) {
  if (!lightbox || !lightboxImage) {
    return;
  }

  lightboxImage.src = src;
  lightboxImage.alt = alt || 'Изображение проекта';

  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  body.classList.add('lightbox-open');
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) {
    return;
  }

  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  body.classList.remove('lightbox-open');

  lightboxImage.src = '';
  lightboxImage.alt = '';
}

lightboxLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();

    const image = link.querySelector('img');
    openLightbox(link.getAttribute('href'), image ? image.alt : '');
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeLightbox();
  }
});