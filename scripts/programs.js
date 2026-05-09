// ── PROGRAM MODAL ────────────────────────
const PROGS = [
  {
    icon: '🏆', color: '#0F172A',
    title: 'Pembinaan Pejuang KIP Kuliah',
    desc: 'Program bimbingan komprehensif bagi calon mahasiswa baru untuk memahami proses pendaftaran, seleksi, dan strategi lolos beasiswa KIP Kuliah (KIPK). Mencakup pendampingan pemilihan jurusan sesuai minat dan kemampuan, pelatihan penyusunan esai beasiswa, dan mentoring intensif.',
    details: ['📋 Panduan Pendaftaran KIPK Step by Step','✍️ Pelatihan Penyusunan Esai','👤 Mentoring 1-on-1 dengan Penerima Aktif','🏫 Konsultasi Pemilihan Jurusan','🎯 Simulasi Seleksi & Wawancara','📊 Analisis Profil Beasiswa']
  },
  {
    icon: '💬', color: '#D97706',
    title: 'Sharing Session',
    desc: 'Sesi berbagi rutin yang menghadirkan penerima beasiswa aktif, alumni sukses, dan tokoh inspiratif dari berbagai universitas terkemuka di Indonesia.',
    details: ['🎙️ Narasumber Penerima Beasiswa Aktif','🎓 Sesi Tanya Jawab Langsung','📹 Rekaman Tersedia untuk Anggota','🌐 Online & Offline Event','🔔 Notifikasi via Instagram & WhatsApp']
  },
  {
    icon: '📚', color: '#0891B2',
    title: 'Info Beasiswa Lengkap',
    desc: 'Informasi akurat dan terkini tentang berbagai beasiswa dalam dan luar negeri: KIP Kuliah, LPDP, Beasiswa Unggulan Kemendikbud, serta beasiswa internasional.',
    details: ['🇮🇩 KIP Kuliah / KIPK Lengkap','💼 LPDP Dalam & Luar Negeri','⭐ Beasiswa Unggulan Kemendikbud','🌍 Beasiswa Internasional 20+ Negara','📅 Update Timeline Rutin Setiap Hari']
  },
  {
    icon: '🗺️', color: '#7C3AED',
    title: 'Panduan Jurusan & Kampus',
    desc: 'Membantu pelajar memilih jurusan dan universitas yang tepat sesuai minat, bakat, dan target karir.',
    details: ['🏛️ Info Seleksi PTN & PTS Terlengkap','📊 Peluang Karir per Jurusan','🧭 Konsultasi Pilihan Studi','📈 Passing Grade & Statistik Terkini','🎯 Strategi Masuk Kampus Impian']
  },
  {
    icon: '🌐', color: '#DC2626',
    title: 'Jaringan Beasiswa Internasional',
    desc: 'Kerja sama strategis dengan lembaga dan organisasi pemberi beasiswa dalam dan luar negeri untuk memperluas akses anggota komunitas.',
    details: ['🌏 Network Alumni 20+ Negara','🤝 Kemitraan Lembaga Beasiswa','🏆 Pelatihan Eksklusif Persiapan','📜 Sertifikat & Rekognisi Resmi','💡 Info Beasiswa Hidden Gems']
  },
];

function openProgModal(idx) {
  const p = PROGS[idx];
  document.getElementById('mProgContent').innerHTML = `
    <div style="font-size:3.5rem;text-align:center;margin-bottom:1rem">${p.icon}</div>
    <h3 style="font-family:var(--font-h);color:${p.color};margin-bottom:.5rem;font-size:1.4rem">${p.title}</h3>
    <p style="font-size:13.5px;color:var(--gray4);line-height:1.75;margin-bottom:1.5rem">${p.desc}</p>
    <div style="background:var(--off);border-radius:14px;padding:1.25rem;margin-bottom:1.5rem">
      <div style="font-family:var(--font-m);font-size:10px;font-weight:700;color:var(--gray4);letter-spacing:1px;text-transform:uppercase;margin-bottom:.75rem">Yang Kamu Dapatkan</div>
      ${p.details.map(d => `<div style="font-size:13.5px;color:var(--navy);font-weight:600;padding:.3rem 0">${d}</div>`).join('')}
    </div>
    <button class="btn-send" style="background:${p.color}" onclick="closeModal('mProgram');document.getElementById('kontak').scrollIntoView({behavior:'smooth'})">📩 Hubungi Kami untuk Info Lebih →</button>
  `;
  openModal('mProgram');
}