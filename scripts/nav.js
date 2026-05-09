// ── NAV ──────────────────────────────────
function toggleNav() {
  document.getElementById('navMenu').classList.toggle('open');
}
document.querySelectorAll('.nav-menu a').forEach(a =>
  a.addEventListener('click', () => document.getElementById('navMenu').classList.remove('open'))
);

// ── SMOOTH SCROLL ────────────────────────
function scrollTo(sel) {
  document.querySelector(sel)?.scrollIntoView({ behavior: 'smooth' });
}
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});