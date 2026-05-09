// ── TOAST ────────────────────────────────
function toast(title, msg, color) {
  const nt = document.getElementById('notif-toast');
  document.getElementById('notif-icon').textContent  = title.includes('⚠') ? '⚠️' : '✅';
  document.getElementById('notif-title').textContent = title;
  document.getElementById('notif-msg').textContent   = msg;
  nt.style.borderLeftColor = color || 'var(--sky)';
  nt.classList.add('show');
  setTimeout(() => nt.classList.remove('show'), 4000);
}

// ── MODAL ────────────────────────────────
function openModal(id)  { document.getElementById(id).classList.add('open');    }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

document.querySelectorAll('.modal-overlay').forEach(m =>
  m.addEventListener('click', function (e) { if (e.target === this) this.classList.remove('open'); })
);

// ── TICKER CLONE ─────────────────────────
(function () {
  const t = document.getElementById('ticker');
  if (t) t.innerHTML += t.innerHTML;
})();