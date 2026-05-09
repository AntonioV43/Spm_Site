// ── PRELOADER ────────────────────────────
(function () {
  const pre = document.getElementById('pre');
  const pct = document.getElementById('pct');
  const bf  = document.getElementById('barFill');
  let p = 0;

  const t = setInterval(() => {
    p += Math.random() * 15 + 5;
    if (p >= 100) {
      p = 100;
      clearInterval(t);
      setTimeout(() => { pre.classList.add('gone'); startHeroAnim(); }, 500);
    }
    const v = Math.min(Math.round(p), 100);
    pct.textContent  = v;
    bf.style.width   = v + '%';
  }, 80);
})();