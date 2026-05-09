// ── QUIZ ─────────────────────────────────
const QUIZ_DATA = [
  { q:'Apa singkatan dari KIP Kuliah?', sub:'Pilih jawaban yang paling tepat', opts:['Kartu Informasi Pendidikan Kuliah','Kartu Indonesia Pintar Kuliah','Kredit Insentif Pendidikan Kuliah','Kartu Identitas Pelajar Kuliah'], ans:1 },
  { q:'Tahun berapa SPM Foundation resmi berdiri?', sub:'Berdasarkan informasi di profil ini', opts:['2022','2023','2024','2025','2026'], ans:2 },
  { q:'Berapa jumlah founder SPM Foundation?', sub:'Berdasarkan biodata yang tersedia', opts:['4 orang','5 orang','6 orang','7 orang'], ans:2 },
  { q:'Beasiswa mana yang khusus untuk studi lanjut S2/S3?', sub:'Pilih yang paling sesuai', opts:['KIP Kuliah','LPDP','Beasiswa Unggulan S1','Bidikmisi'], ans:1 },
  { q:'Kapan SPM Community berganti nama menjadi SPM Foundation?', sub:'Berdasarkan sejarah komunitas ini', opts:['Juli 2024','September 2024','Oktober 2024','November 2024'], ans:3 },
];

let curQ = 0, score = 0, answered = false;

const QUIZ_SHELL = `
  <div class="quiz-progress"><div class="quiz-prog-fill" id="quizProg" style="width:0"></div></div>
  <div class="quiz-question" id="quizQ"></div>
  <div class="quiz-sub" id="quizSub"></div>
  <div class="quiz-options" id="quizOpts"></div>
  <div class="quiz-nav">
    <span class="quiz-counter" id="quizCtr"></span>
    <button class="btn-solid" id="quizNext" onclick="nextQ()" style="display:none;padding:10px 24px">Lanjut →</button>
  </div>`;

function renderQ() {
  const d = QUIZ_DATA[curQ];
  document.getElementById('quizQ').textContent   = d.q;
  document.getElementById('quizSub').textContent = d.sub;
  document.getElementById('quizCtr').textContent = (curQ + 1) + ' / ' + QUIZ_DATA.length;
  document.getElementById('quizProg').style.width = (curQ / QUIZ_DATA.length * 100) + '%';
  document.getElementById('quizNext').style.display = 'none';
  answered = false;

  const optsEl = document.getElementById('quizOpts');
  optsEl.innerHTML = '';
  d.opts.forEach((o, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt';
    btn.innerHTML = `<span class="quiz-opt-num">${String.fromCharCode(65 + i)}</span>${o}`;
    btn.onclick = () => selectAnswer(i);
    optsEl.append(btn);
  });
}

function selectAnswer(idx) {
  if (answered) return;
  answered = true;
  const d = QUIZ_DATA[curQ];
  document.querySelectorAll('.quiz-opt').forEach((o, i) => {
    o.onclick = null;
    if (i === d.ans)               o.classList.add('correct');
    else if (i === idx && idx !== d.ans) o.classList.add('wrong');
  });
  if (idx === d.ans) score++;
  document.getElementById('quizNext').style.display = 'inline-block';
}

function nextQ() {
  curQ++;
  if (curQ >= QUIZ_DATA.length) { showResult(); return; }
  renderQ();
}

function showResult() {
  document.getElementById('quizProg').style.width = '100%';
  const pct = Math.round(score / QUIZ_DATA.length * 100);
  const msg = pct >= 80
    ? 'Luar Biasa! Kamu sangat siap mendaftar beasiswa! 🎉'
    : pct >= 60
      ? 'Bagus! Sedikit lagi kamu akan sangat siap! 💪'
      : 'Terus semangat belajar! SPM Foundation siap membantumu! 📚';

  document.getElementById('quizContent').innerHTML = `
    <div class="quiz-result">
      <div class="quiz-result-score">${pct}<small style="font-size:2rem">%</small></div>
      <div class="quiz-result-lbl">${score} dari ${QUIZ_DATA.length} jawaban benar</div>
      <p style="font-size:15px;color:var(--gray4);margin-bottom:2rem">${msg}</p>
      <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap">
        <button class="btn-solid" onclick="resetQuiz()">Ulangi Quiz</button>
        <button class="btn-outline" onclick="document.getElementById('program').scrollIntoView({behavior:'smooth'})">Lihat Program Kami</button>
      </div>
    </div>`;
}

function resetQuiz() {
  curQ = 0; score = 0;
  document.getElementById('quizContent').innerHTML = QUIZ_SHELL;
  renderQ();
}

renderQ();