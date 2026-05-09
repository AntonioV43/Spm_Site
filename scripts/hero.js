// ── HERO ANIMATION ───────────────────────
function startHeroAnim() {
  ['hw1','hw2','hw3','hw4'].forEach((id, i) => {
    const el = document.getElementById(id);
    if (el) setTimeout(() => { el.style.transform = 'translateY(0)'; }, 300 + i * 200);
  });
  setTimeout(() => {
    ['heroDesc','heroBtns','heroSoc','heroCard'].forEach(id =>
      document.getElementById(id)?.classList.add('vis')
    );
  }, 600);
}

// ── HERO CANVAS ──────────────────────────
(function () {
  const cv = document.getElementById('heroCanvas');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  let W, H, pts = [];
  const COLORS = [
    'rgba(255,217,61','rgba(6,182,212','rgba(132,204,22',
    'rgba(168,85,247','rgba(255,107,107'
  ];

  function init() {
    W = cv.width  = cv.offsetWidth;
    H = cv.height = cv.offsetHeight;
    pts = Array.from({ length: 70 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .5, vy: (Math.random() - .5) * .5,
      r: Math.random() * 2 + .5,
      c: COLORS[Math.floor(Math.random() * COLORS.length)]
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.c + ',.7)'; ctx.fill();
      for (let j = i + 1; j < pts.length; j++) {
        const q = pts[j], dx = p.x - q.x, dy = p.y - q.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 120) {
          ctx.strokeStyle = p.c + ',' + (1 - d / 120) * .12 + ')';
          ctx.lineWidth = .5;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      }
    });
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize', init);
  init(); draw();
})();

// ── HERO BARS ────────────────────────────
(function () {
  const c = document.getElementById('chartBars');
  if (!c) return;
  const data   = [10, 22, 35, 50, 64, 78, 90, 100];
  const months = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu'];
  const colors = [
    'rgba(6,182,212','rgba(132,204,22','rgba(255,217,61','rgba(168,85,247',
    'rgba(255,107,107','rgba(6,182,212','rgba(132,204,22','rgba(255,217,61'
  ];
  data.forEach((v, i) => {
    const w = document.createElement('div'); w.className = 'bar-wrap';
    const b = document.createElement('div'); b.className = 'bar-fill';
    b.style.cssText = `background:${colors[i]},.8);height:0;transition:height 1s cubic-bezier(.34,1.56,.64,1) ${i * .1 + .5}s`;
    const m = document.createElement('div'); m.className = 'bar-mo'; m.textContent = months[i];
    w.append(b, m); c.append(w);
    setTimeout(() => b.style.height = (v * 0.6) + 'px', 200);
  });
})();