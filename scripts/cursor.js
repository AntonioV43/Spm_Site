// ── CURSOR ──────────────────────────────
const dot = document.getElementById('cur-dot');
const ring = document.getElementById('cur-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top  = my + 'px';
});

setInterval(() => {
  rx += (mx - rx) * .15; ry += (my - ry) * .15;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
}, 16);

const HOVER_SELECTORS = [
  'a','button','.prog-card','.founder-card','.partner-card',
  '.news-item','.news-main','.tl-crd','.dk-card','.misi-row',
  '.testi-card','.rm-card','.faq-q','.klink'
].join(',');

document.querySelectorAll(HOVER_SELECTORS).forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('hover-cta'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('hover-cta'));
});