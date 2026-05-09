// ── KALKULATOR BEASISWA ──────────────────
function calcUpdate() {
  const nilai      = parseFloat(document.getElementById('cNilai').value)      || 0;
  const penghasilan = parseFloat(document.getElementById('cPenghasilan').value) || 0;
  const status     = parseInt(document.getElementById('cStatus').value)        || 1;
  const prestasi   = parseInt(document.getElementById('cPrestasi').value)      || 1;

  // Skor profil
  let skor = Math.min(nilai, 100) * 0.4
           + Math.max(0, (10 - penghasilan) / 10) * 25
           + status * 10
           + prestasi * 8;
  skor = Math.round(Math.min(skor, 100));

  // Peluang KIPK
  let kipk = 0;
  if (nilai >= 80) kipk += 30; else if (nilai >= 70) kipk += 20;
  kipk += penghasilan < 3 ? 35 : penghasilan < 6 ? 20 : penghasilan < 10 ? 10 : 0;
  kipk += status === 3 ? 25 : status === 2 ? 15 : 5;
  kipk += prestasi === 3 ? 10 : prestasi === 2 ? 6 : 2;
  kipk = Math.round(Math.min(kipk, 98));

  // Peluang LPDP
  let lpdp = 0;
  if (nilai >= 85) lpdp += 35; else if (nilai >= 80) lpdp += 25; else if (nilai >= 75) lpdp += 15;
  lpdp += prestasi === 3 ? 30 : prestasi === 2 ? 18 : 8;
  lpdp += status === 3 ? 10 : status === 2 ? 6 : 3;
  lpdp = Math.round(Math.min(lpdp, 95));

  document.getElementById('cResPerluang').textContent = kipk + '%';
  document.getElementById('cResLPDP').textContent     = lpdp + '%';
  document.getElementById('cResSkor').textContent     = skor;
}

calcUpdate();