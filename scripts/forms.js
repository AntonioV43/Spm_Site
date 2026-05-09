// ── KONTAK FORM ──────────────────────────
function submitKontak() {
  const n = document.getElementById('kNama').value.trim();
  const e = document.getElementById('kEmail').value.trim();
  const p = document.getElementById('kPesan').value.trim();
  if (!n || !e || !p) {
    toast('⚠️ Form Belum Lengkap', 'Mohon isi semua kolom yang diperlukan.', '#E6A500');
    return;
  }
  toast('📨 Pesan Terkirim!', 'Kami akan merespons dalam 1×24 jam. Terima kasih!');
  ['kNama','kEmail','kPesan'].forEach(id => document.getElementById(id).value = '');
}

// ── NEWSLETTER ───────────────────────────
function submitNL() {
  const e = document.getElementById('nlEmail').value.trim();
  if (!e) return;
  toast('📬 Subscribe Berhasil!', 'Info beasiswa terbaru akan dikirim ke email kamu.');
  document.getElementById('nlEmail').value = '';
}