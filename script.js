// ═══════════════════════════════════════
// CURSOR
// ═══════════════════════════════════════
const dot=document.getElementById('cur-dot'),ring=document.getElementById('cur-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{
  mx=e.clientX;my=e.clientY;
  dot.style.left=mx+'px';dot.style.top=my+'px';
});
setInterval(()=>{
  rx+=(mx-rx)*.15;ry+=(my-ry)*.15;
  ring.style.left=rx+'px';ring.style.top=ry+'px';
},16);
document.querySelectorAll('a,button,.prog-card,.founder-card,.partner-card,.news-item,.news-main,.tl-crd,.dk-card,.misi-row,.testi-card,.rm-card,.faq-q,.klink').forEach(el=>{
  el.addEventListener('mouseenter',()=>document.body.classList.add('hover-cta'));
  el.addEventListener('mouseleave',()=>document.body.classList.remove('hover-cta'));
});

// ═══════════════════════════════════════
// PRELOADER
// ═══════════════════════════════════════
(function(){
  const pre=document.getElementById('pre'),pct=document.getElementById('pct'),bf=document.getElementById('barFill');
  let p=0;
  const t=setInterval(()=>{
    p+=Math.random()*15+5;
    if(p>=100){p=100;clearInterval(t);setTimeout(()=>{pre.classList.add('gone');startHeroAnim()},500)}
    const v=Math.min(Math.round(p),100);
    pct.textContent=v;
    bf.style.width=v+'%';
  },80);
})();

// ═══════════════════════════════════════
// HERO ANIMATION
// ═══════════════════════════════════════
function startHeroAnim(){
  const words=['hw1','hw2','hw3','hw4'];
  words.forEach((id,i)=>{
    const el=document.getElementById(id);
    if(el){setTimeout(()=>{el.style.transform='translateY(0)'},300+i*200)}
  });
  setTimeout(()=>{
    document.getElementById('heroDesc')?.classList.add('vis');
    document.getElementById('heroBtns')?.classList.add('vis');
    document.getElementById('heroSoc')?.classList.add('vis');
    document.getElementById('heroCard')?.classList.add('vis');
  },600);
}

// ═══════════════════════════════════════
// SCROLL
// ═══════════════════════════════════════
const pbar=document.getElementById('pbar'),fbUp=document.getElementById('fbUp');
window.addEventListener('scroll',()=>{
  const h=document.documentElement,s=window.scrollY,t=h.scrollHeight-h.clientHeight;
  pbar.style.width=(s/t*100)+'%';
  fbUp.classList.toggle('vis',s>400);
  document.getElementById('nav').classList.toggle('solid',s>20);
  // nav active
  document.querySelectorAll('section[id]').forEach(sec=>{
    const r=sec.getBoundingClientRect();
    if(r.top<=100&&r.bottom>100){
      document.querySelectorAll('.nav-menu a').forEach(a=>a.classList.remove('active'));
      const a=document.querySelector(`.nav-menu a[href="#${sec.id}"]`);
      if(a)a.classList.add('active');
    }
  });
  // timeline
  const tl=document.getElementById('tlFill'),tw=document.querySelector('.timeline-wrap');
  if(tl&&tw){
    const r=tw.getBoundingClientRect();
    const filled=Math.max(0,Math.min(window.innerHeight-r.top,r.height));
    tl.style.height=filled+'px';
  }
  // stat bars
  document.querySelectorAll('.stat-bar-fill:not(.done)').forEach(b=>{
    const r=b.getBoundingClientRect();
    if(r.top<window.innerHeight-50){
      b.style.width=b.dataset.w+'%';
      b.classList.add('done');
    }
  });
});

// ═══════════════════════════════════════
// REVEAL
// ═══════════════════════════════════════
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}});
},{threshold:.1});
document.querySelectorAll('.rw').forEach(el=>io.observe(el));

// ═══════════════════════════════════════
// COUNTER
// ═══════════════════════════════════════
function animCount(el,target){
  const dur=2000,step=16,total=dur/step;
  let fr=0;
  const t=setInterval(()=>{
    fr++;const v=Math.round(target*(fr/total));
    if(fr>=total){el.textContent=target.toLocaleString('id-ID')+(target>=1000?'+':'');clearInterval(t);return}
    el.textContent=v.toLocaleString('id-ID');
  },step);
}
const cio=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      animCount(e.target,parseInt(e.target.dataset.c));
      cio.unobserve(e.target);
    }
  });
},{threshold:.4});
document.querySelectorAll('[data-c]').forEach(el=>cio.observe(el));

// ═══════════════════════════════════════
// HERO CANVAS
// ═══════════════════════════════════════
(function(){
  const cv=document.getElementById('heroCanvas');
  if(!cv)return;
  const ctx=cv.getContext('2d');
  let W,H,pts=[];
  function init(){
    W=cv.width=cv.offsetWidth;H=cv.height=cv.offsetHeight;
    pts=Array.from({length:70},()=>({
      x:Math.random()*W,y:Math.random()*H,
      vx:(Math.random()-.5)*.5,vy:(Math.random()-.5)*.5,
      r:Math.random()*2+.5,
      c:['rgba(255,217,61','rgba(6,182,212','rgba(132,204,22','rgba(168,85,247','rgba(255,107,107'][Math.floor(Math.random()*5)]
    }));
  }
  function draw(){
    ctx.clearRect(0,0,W,H);
    pts.forEach((p,i)=>{
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0||p.x>W)p.vx*=-1;
      if(p.y<0||p.y>H)p.vy*=-1;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=p.c+',.7)';ctx.fill();
      for(let j=i+1;j<pts.length;j++){
        const q=pts[j],dx=p.x-q.x,dy=p.y-q.y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<120){ctx.strokeStyle=p.c+','+(1-d/120)*.12+')';ctx.lineWidth=.5;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke()}
      }
    });
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize',init);init();draw();
})();

// ═══════════════════════════════════════
// HERO BARS
// ═══════════════════════════════════════
(function(){
  const c=document.getElementById('chartBars');
  if(!c)return;
  const data=[10,22,35,50,64,78,90,100];
  const months=['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu'];
  const colors=['rgba(6,182,212','rgba(132,204,22','rgba(255,217,61','rgba(168,85,247','rgba(255,107,107','rgba(6,182,212','rgba(132,204,22','rgba(255,217,61'];
  data.forEach((v,i)=>{
    const w=document.createElement('div');w.className='bar-wrap';
    const b=document.createElement('div');b.className='bar-fill';
    b.style.cssText=`background:${colors[i]},.8);height:0;transition:height 1s cubic-bezier(.34,1.56,.64,1) ${i*.1+.5}s`;
    const m=document.createElement('div');m.className='bar-mo';m.textContent=months[i];
    w.append(b,m);c.append(w);
    setTimeout(()=>b.style.height=(v*0.6)+'px',200);
  });
})();

// ═══════════════════════════════════════
// NAV
// ═══════════════════════════════════════
function toggleNav(){document.getElementById('navMenu').classList.toggle('open')}
document.querySelectorAll('.nav-menu a').forEach(a=>a.addEventListener('click',()=>document.getElementById('navMenu').classList.remove('open')));

// ═══════════════════════════════════════
// SMOOTH SCROLL
// ═══════════════════════════════════════
function scrollTo(sel){const el=document.querySelector(sel);if(el)el.scrollIntoView({behavior:'smooth'})}
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const t=document.querySelector(a.getAttribute('href'));
    if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}
  });
});

// ═══════════════════════════════════════
// TOAST
// ═══════════════════════════════════════
function toast(title,msg,color){
  const nt=document.getElementById('notif-toast');
  document.getElementById('notif-icon').textContent=title.includes('⚠')?'⚠️':'✅';
  document.getElementById('notif-title').textContent=title;
  document.getElementById('notif-msg').textContent=msg;
  nt.style.borderLeftColor=color||'var(--sky)';
  nt.classList.add('show');
  setTimeout(()=>nt.classList.remove('show'),4000);
}

// ═══════════════════════════════════════
// MODAL
// ═══════════════════════════════════════
function openModal(id){document.getElementById(id).classList.add('open')}
function closeModal(id){document.getElementById(id).classList.remove('open')}
document.querySelectorAll('.modal-overlay').forEach(m=>m.addEventListener('click',function(e){if(e.target===this)this.classList.remove('open')}));

// ═══════════════════════════════════════
// PROGRAM MODAL
// ═══════════════════════════════════════
const progs=[
  {icon:'🏆',color:'#0F172A',title:'Pembinaan Pejuang KIP Kuliah',desc:'Program bimbingan komprehensif bagi calon mahasiswa baru untuk memahami proses pendaftaran, seleksi, dan strategi lolos beasiswa KIP Kuliah (KIPK). Mencakup pendampingan pemilihan jurusan sesuai minat dan kemampuan, pelatihan penyusunan esai beasiswa, dan mentoring intensif.',details:['📋 Panduan Pendaftaran KIPK Step by Step','✍️ Pelatihan Penyusunan Esai','👤 Mentoring 1-on-1 dengan Penerima Aktif','🏫 Konsultasi Pemilihan Jurusan','🎯 Simulasi Seleksi & Wawancara','📊 Analisis Profil Beasiswa']},
  {icon:'💬',color:'#D97706',title:'Sharing Session',desc:'Sesi berbagi rutin yang menghadirkan penerima beasiswa aktif, alumni sukses, dan tokoh inspiratif dari berbagai universitas terkemuka di Indonesia. Peserta mendapatkan wawasan nyata tentang pengalaman kuliah dengan beasiswa dan tips menghadapi seleksi.',details:['🎙️ Narasumber Penerima Beasiswa Aktif','🎓 Sesi Tanya Jawab Langsung','📹 Rekaman Tersedia untuk Anggota','🌐 Online & Offline Event','🔔 Notifikasi via Instagram & WhatsApp']},
  {icon:'📚',color:'#0891B2',title:'Info Beasiswa Lengkap',desc:'Menyediakan informasi akurat dan terkini tentang berbagai beasiswa dalam dan luar negeri: KIP Kuliah, LPDP, Beasiswa Unggulan Kemendikbud, serta beasiswa internasional dari berbagai negara. Setiap informasi dilengkapi dengan persyaratan detail dan timeline pendaftaran.',details:['🇮🇩 KIP Kuliah / KIPK Lengkap','💼 LPDP Dalam & Luar Negeri','⭐ Beasiswa Unggulan Kemendikbud','🌍 Beasiswa Internasional 20+ Negara','📅 Update Timeline Rutin Setiap Hari']},
  {icon:'🗺️',color:'#7C3AED',title:'Panduan Jurusan & Kampus',desc:'Membantu pelajar dalam memilih jurusan dan universitas yang tepat sesuai minat, bakat, dan target karir. Menyediakan informasi sistem seleksi masuk PTN dan PTS, serta gambaran peluang karir setelah lulus dari berbagai bidang studi.',details:['🏛️ Info Seleksi PTN & PTS Terlengkap','📊 Peluang Karir per Jurusan','🧭 Konsultasi Pilihan Studi','📈 Passing Grade & Statistik Terkini','🎯 Strategi Masuk Kampus Impian']},
  {icon:'🌐',color:'#DC2626',title:'Jaringan Beasiswa Internasional',desc:'Membangun kerja sama strategis dengan lembaga dan organisasi pemberi beasiswa dalam dan luar negeri untuk memperluas akses anggota komunitas. Program ini juga menyediakan pelatihan eksklusif dan membangun jaringan alumni mahasiswa penerima beasiswa yang saling mendukung.',details:['🌏 Network Alumni 20+ Negara','🤝 Kemitraan Lembaga Beasiswa','🏆 Pelatihan Eksklusif Persiapan','📜 Sertifikat & Rekognisi Resmi','💡 Info Beasiswa Hidden Gems']},
];
function openProgModal(idx){
  const p=progs[idx];
  document.getElementById('mProgContent').innerHTML=`
    <div style="font-size:3.5rem;text-align:center;margin-bottom:1rem">${p.icon}</div>
    <h3 style="font-family:var(--font-h);color:${p.color};margin-bottom:.5rem;font-size:1.4rem">${p.title}</h3>
    <p style="font-size:13.5px;color:var(--gray4);line-height:1.75;margin-bottom:1.5rem">${p.desc}</p>
    <div style="background:var(--off);border-radius:14px;padding:1.25rem;margin-bottom:1.5rem">
      <div style="font-family:var(--font-m);font-size:10px;font-weight:700;color:var(--gray4);letter-spacing:1px;text-transform:uppercase;margin-bottom:.75rem">Yang Kamu Dapatkan</div>
      ${p.details.map(d=>`<div style="font-size:13.5px;color:var(--navy);font-weight:600;padding:.3rem 0">${d}</div>`).join('')}
    </div>
    <button class="btn-send" style="background:${p.color}" onclick="closeModal('mProgram');document.getElementById('kontak').scrollIntoView({behavior:'smooth'})">📩 Hubungi Kami untuk Info Lebih →</button>
  `;
  openModal('mProgram');
}

// ═══════════════════════════════════════
// KONTAK FORM
// ═══════════════════════════════════════
function submitKontak(){
  const n=document.getElementById('kNama').value.trim();
  const e=document.getElementById('kEmail').value.trim();
  const p=document.getElementById('kPesan').value.trim();
  if(!n||!e||!p){toast('⚠️ Form Belum Lengkap','Mohon isi semua kolom yang diperlukan.','#E6A500');return}
  toast('📨 Pesan Terkirim!','Kami akan merespons dalam 1×24 jam. Terima kasih!');
  ['kNama','kEmail','kPesan'].forEach(id=>{document.getElementById(id).value=''});
}

// ═══════════════════════════════════════
// NEWSLETTER
// ═══════════════════════════════════════
function submitNL(){
  const e=document.getElementById('nlEmail').value.trim();
  if(!e){return}
  toast('📬 Subscribe Berhasil!','Info beasiswa terbaru akan dikirim ke email kamu.');
  document.getElementById('nlEmail').value='';
}

// ═══════════════════════════════════════
// FAQ ACCORDION
// ═══════════════════════════════════════
function toggleFaq(el){
  const item=el.closest('.faq-item');
  const ans=item.querySelector('.faq-a');
  const inner=item.querySelector('.faq-a-inner');
  const isOpen=item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i=>{
    i.classList.remove('open');
    i.querySelector('.faq-a').style.maxHeight='0';
    i.querySelector('.faq-a').style.paddingBottom='0';
  });
  if(!isOpen){
    item.classList.add('open');
    ans.style.maxHeight=inner.scrollHeight+24+'px';
  }
}

// ═══════════════════════════════════════
// QUIZ
// ═══════════════════════════════════════
const quizData=[
  {q:'Apa singkatan dari KIP Kuliah?',sub:'Pilih jawaban yang paling tepat',opts:['Kartu Informasi Pendidikan Kuliah','Kartu Indonesia Pintar Kuliah','Kredit Insentif Pendidikan Kuliah','Kartu Identitas Pelajar Kuliah'],ans:1},
  {q:'Tahun berapa SPM Foundation resmi berdiri?',sub:'Berdasarkan informasi di profil ini',opts:['2022','2023','2024','2025','2026'],ans:2},
  {q:'Berapa jumlah founder SPM Foundation?',sub:'Berdasarkan biodata yang tersedia',opts:['4 orang','5 orang','6 orang','7 orang'],ans:2},
  {q:'Beasiswa mana yang khusus untuk studi lanjut S2/S3?',sub:'Pilih yang paling sesuai',opts:['KIP Kuliah','LPDP','Beasiswa Unggulan S1','Bidikmisi'],ans:1},
  {q:'Kapan SPM Community berganti nama menjadi SPM Foundation?',sub:'Berdasarkan sejarah komunitas ini',opts:['Juli 2024','September 2024','Oktober 2024','November 2024'],ans:3},
];
let curQ=0,score=0,answered=false;

function renderQ(){
  const d=quizData[curQ];
  document.getElementById('quizQ').textContent=d.q;
  document.getElementById('quizSub').textContent=d.sub;
  document.getElementById('quizCtr').textContent=(curQ+1)+' / '+quizData.length;
  document.getElementById('quizProg').style.width=((curQ/quizData.length)*100)+'%';
  document.getElementById('quizNext').style.display='none';
  answered=false;
  const optsEl=document.getElementById('quizOpts');
  optsEl.innerHTML='';
  d.opts.forEach((o,i)=>{
    const btn=document.createElement('button');
    btn.className='quiz-opt';
    btn.innerHTML=`<span class="quiz-opt-num">${String.fromCharCode(65+i)}</span>${o}`;
    btn.onclick=()=>selectAnswer(i);
    optsEl.append(btn);
  });
}

function selectAnswer(idx){
  if(answered)return;
  answered=true;
  const d=quizData[curQ];
  const opts=document.querySelectorAll('.quiz-opt');
  opts.forEach((o,i)=>{
    o.onclick=null;
    if(i===d.ans)o.classList.add('correct');
    else if(i===idx&&idx!==d.ans)o.classList.add('wrong');
  });
  if(idx===d.ans)score++;
  document.getElementById('quizNext').style.display='inline-block';
}

function nextQ(){
  curQ++;
  if(curQ>=quizData.length){showResult();return}
  renderQ();
}

function showResult(){
  document.getElementById('quizProg').style.width='100%';
  const pct=Math.round((score/quizData.length)*100);
  let msg='';
  if(pct>=80)msg='Luar Biasa! Kamu sangat siap mendaftar beasiswa! 🎉';
  else if(pct>=60)msg='Bagus! Sedikit lagi kamu akan sangat siap! 💪';
  else msg='Terus semangat belajar! SPM Foundation siap membantumu! 📚';
  document.getElementById('quizContent').innerHTML=`
    <div class="quiz-result">
      <div class="quiz-result-score">${pct}<small style="font-size:2rem">%</small></div>
      <div class="quiz-result-lbl">${score} dari ${quizData.length} jawaban benar</div>
      <p style="font-size:15px;color:var(--gray4);margin-bottom:2rem">${msg}</p>
      <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap">
        <button class="btn-solid" onclick="curQ=0;score=0;renderQ();document.getElementById('quizContent').innerHTML='<div class=\\'quiz-progress\\'><div class=\\'quiz-prog-fill\\' id=\\'quizProg\\' style=\\'width:0\\'></div></div><div class=\\'quiz-question\\' id=\\'quizQ\\'></div><div class=\\'quiz-sub\\' id=\\'quizSub\\'></div><div class=\\'quiz-options\\' id=\\'quizOpts\\'></div><div class=\\'quiz-nav\\'><span class=\\'quiz-counter\\' id=\\'quizCtr\\'></span><button class=\\'btn-solid\\' id=\\'quizNext\\' onclick=\\'nextQ()\\' style=\\'display:none;padding:10px 24px\\'>Lanjut →</button></div>';curQ=0;score=0;renderQ()">Ulangi Quiz</button>
        <button class="btn-outline" onclick="document.getElementById('program').scrollIntoView({behavior:'smooth'})">Lihat Program Kami</button>
      </div>
    </div>
  `;
}

renderQ();

// ═══════════════════════════════════════
// KALKULATOR
// ═══════════════════════════════════════
function calcUpdate(){
  const nilai=parseFloat(document.getElementById('cNilai').value)||0;
  const penghasilan=parseFloat(document.getElementById('cPenghasilan').value)||0;
  const status=parseInt(document.getElementById('cStatus').value)||1;
  const prestasi=parseInt(document.getElementById('cPrestasi').value)||1;

  let skor=0;
  skor+=Math.min(nilai,100)*0.4;
  skor+=Math.max(0,(10-penghasilan)/10)*25;
  skor+=status*10;
  skor+=prestasi*8;
  skor=Math.round(Math.min(skor,100));

  let kipk=0;
  if(nilai>=80)kipk+=30;
  else if(nilai>=70)kipk+=20;
  kipk+=penghasilan<3?35:penghasilan<6?20:penghasilan<10?10:0;
  kipk+=status===3?25:status===2?15:5;
  kipk+=prestasi===3?10:prestasi===2?6:2;
  kipk=Math.round(Math.min(kipk,98));

  let lpdp=0;
  if(nilai>=85)lpdp+=35;
  else if(nilai>=80)lpdp+=25;
  else if(nilai>=75)lpdp+=15;
  lpdp+=prestasi===3?30:prestasi===2?18:8;
  lpdp+=status===3?10:status===2?6:3;
  lpdp=Math.round(Math.min(lpdp,95));

  document.getElementById('cResPerluang').textContent=kipk+'%';
  document.getElementById('cResLPDP').textContent=lpdp+'%';
  document.getElementById('cResSkor').textContent=skor;
}
calcUpdate();

// ═══════════════════════════════════════
// TICKER CLONE
// ═══════════════════════════════════════
(function(){
  const t=document.getElementById('ticker');
  if(t){t.innerHTML+=t.innerHTML}
})();