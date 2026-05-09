// ── SCROLL EFFECTS ───────────────────────
const pbar = document.getElementById('pbar');
const fbUp  = document.getElementById('fbUp');
const nav   = document.getElementById('nav');

window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const s = window.scrollY;
  const t = h.scrollHeight - h.clientHeight;

  pbar.style.width = (s / t * 100) + '%';
  fbUp.classList.toggle('vis', s > 400);
  nav.classList.toggle('solid', s > 20);

  // Active nav link
  document.querySelectorAll('section[id]').forEach(sec => {
    const r = sec.getBoundingClientRect();
    if (r.top <= 100 && r.bottom > 100) {
      document.querySelectorAll('.nav-menu a').forEach(a => a.classList.remove('active'));
      document.querySelector(`.nav-menu a[href="#${sec.id}"]`)?.classList.add('active');
    }
  });

  // Timeline fill
  const tl = document.getElementById('tlFill');
  const tw  = document.querySelector('.timeline-wrap');
  if (tl && tw) {
    const r = tw.getBoundingClientRect();
    tl.style.height = Math.max(0, Math.min(window.innerHeight - r.top, r.height)) + 'px';
  }

  // Stat bars
  document.querySelectorAll('.stat-bar-fill:not(.done)').forEach(b => {
    if (b.getBoundingClientRect().top < window.innerHeight - 50) {
      b.style.width = b.dataset.w + '%';
      b.classList.add('done');
    }
  });
});

// ── REVEAL ON SCROLL ─────────────────────
const revealIO = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revealIO.unobserve(e.target); } });
}, { threshold: .1 });
document.querySelectorAll('.rw').forEach(el => revealIO.observe(el));

// ── COUNTER ANIMATION ────────────────────
function animCount(el, target) {
  const steps = 2000 / 16;
  let fr = 0;
  const t = setInterval(() => {
    fr++;
    el.textContent = Math.round(target * (fr / steps)).toLocaleString('id-ID');
    if (fr >= steps) {
      el.textContent = target.toLocaleString('id-ID') + (target >= 1000 ? '+' : '');
      clearInterval(t);
    }
  }, 16);
}

const countIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animCount(e.target, parseInt(e.target.dataset.c));
      countIO.unobserve(e.target);
    }
  });
}, { threshold: .4 });
document.querySelectorAll('[data-c]').forEach(el => countIO.observe(el));