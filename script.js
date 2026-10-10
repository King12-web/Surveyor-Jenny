
// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const links = navLinks.querySelectorAll('a');
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => navObserver.observe(s));

// Reveal on scroll
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Gallery lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
document.querySelectorAll('.gallery-imgs button, .project img').forEach(el => {
  el.addEventListener('click', () => {
    const img = el.tagName === 'IMG' ? el : el.querySelector('img');
    lightboxImg.src = img.src; lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
  });
});
lightbox.addEventListener('click', () => lightbox.classList.remove('open'));
document.addEventListener('keydown', e => { if (e.key === 'Escape') lightbox.classList.remove('open'); });

// Contact form (demo only — swap for Formspree/Web3Forms)
document.getElementById('contactForm').addEventListener('submit', e => {
  if (e.target.getAttribute('action') === '#') {
    e.preventDefault();
    document.getElementById('formNote').style.display = 'block';
    e.target.reset();
  }
});

document.getElementById('year').textContent = new Date().getFullYear();