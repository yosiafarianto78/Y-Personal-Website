
gsap.registerPlugin(ScrollTrigger);

// ── NOISE ──
(function(){
  const c=document.getElementById('noise'),ctx=c.getContext('2d');
  function resize(){c.width=window.innerWidth;c.height=window.innerHeight;}
  resize(); window.addEventListener('resize',resize);
  function draw(){const img=ctx.createImageData(c.width,c.height),d=img.data;for(let i=0;i<d.length;i+=4){const v=Math.random()*255|0;d[i]=d[i+1]=d[i+2]=v;d[i+3]=255;}ctx.putImageData(img,0,0);requestAnimationFrame(draw);}
  draw();
})();

// ── PRELOADER ──
(function(){
  const text='Welcome, thanks for comming!',typed=document.getElementById('preloader-typed'),bar=document.getElementById('preloader-bar'),pct=document.getElementById('preloader-pct'),loader=document.getElementById('preloader');
  let i=0,p=0;
  if(sessionStorage.getItem('loaded')){loader.style.display='none';return;}
  const ti=setInterval(()=>{if(i<text.length){typed.textContent+=text[i++];}else clearInterval(ti);},60);
  const bi=setInterval(()=>{if(p<100){p+=Math.random()*4+1;if(p>100)p=100;bar.style.width=p+'%';pct.textContent=String(Math.floor(p)).padStart(3,'0')+'%';}else{clearInterval(bi);setTimeout(()=>{gsap.to(loader,{yPercent:-100,duration:0.8,ease:'power3.inOut',onComplete(){loader.style.display='none';sessionStorage.setItem('loaded','1');}});},400);}},80);
})();

// ── CURSOR ──
const dot=document.getElementById('cursor-dot'),ring=document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';});
(function lerp(){rx+=(mx-rx)*0.12;ry+=(my-ry)*0.12;ring.style.left=Math.round(rx)+'px';ring.style.top=Math.round(ry)+'px';requestAnimationFrame(lerp);})();
document.querySelectorAll('a,button,.bento-card,.mosaic-slice,.strip-thumb,.strip-more,.lb-thumb,.arsenal-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave',()=>document.body.classList.remove('cursor-hover'));
});

// ── NAV ──
const nav=document.getElementById('nav'),counter=document.getElementById('section-counter');
const sections=document.querySelectorAll('section');
const counters=['01','02','03','04','05'];
window.addEventListener('scroll',()=>{
  nav.classList.toggle('scrolled',window.scrollY>80);
  let cur=0;
  sections.forEach((s,i)=>{if(window.scrollY>=s.offsetTop-200)cur=i;});
  counter.textContent=counters[cur]+' / 05';
  document.querySelectorAll('.nav-links a').forEach((a,i)=>a.classList.toggle('active',i===cur));
});

// ── MAGNETIC SOCIAL ──
document.querySelectorAll('.social-btn').forEach(btn=>{
  btn.addEventListener('mousemove',e=>{const r=btn.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;gsap.to(btn,{x:(e.clientX-cx)*0.25,y:(e.clientY-cy)*0.25,duration:0.4,ease:'power2.out'});});
  btn.addEventListener('mouseleave',()=>gsap.to(btn,{x:0,y:0,duration:0.6,ease:'elastic.out(1,0.4)'}));
});

// ── SPOTLIGHT ──
document.querySelectorAll('.bento-card').forEach(card=>{
  card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect();card.style.setProperty('--mx',(e.clientX-r.left)+'px');card.style.setProperty('--my',(e.clientY-r.top)+'px');});
});

// ── WAVEFORM ──
const wf=document.getElementById('waveform');
if(wf){for(let i=0;i<28;i++){const b=document.createElement('div');b.className='wave-bar';const h=6+Math.random()*40;b.style.setProperty('--h',h+'px');b.style.animationDelay=(Math.random()*1.2)+'s';b.style.animationDuration=(0.8+Math.random()*0.8)+'s';b.style.opacity=0.3+Math.random()*0.5;wf.appendChild(b);}}


// ── RAG VISUAL ──
(function(){
  const wrap = document.getElementById('rag-visual');
  if (!wrap) return;
  const nodes = ['Docs','Vector DB','LLM','Answer'];
  nodes.forEach((label, i) => {
    const node = document.createElement('div');
    node.className = 'rag-node';
    node.textContent = label;
    wrap.appendChild(node);
    if (i < nodes.length - 1) {
      const arrow = document.createElement('div');
      arrow.className = 'rag-arrow';
      wrap.appendChild(arrow);
    }
  });
  let active = 0;
  const allNodes = wrap.querySelectorAll('.rag-node');
  const allArrows = wrap.querySelectorAll('.rag-arrow');
  setInterval(() => {
    allNodes.forEach(n => n.classList.remove('lit'));
    allArrows.forEach(a => a.classList.remove('lit'));
    allNodes[active].classList.add('lit');
    if (active < allArrows.length) allArrows[active].classList.add('lit');
    active = (active + 1) % allNodes.length;
  }, 700);
})();
// ── FRAUD LOG ──
(function(){
  const wrap = document.getElementById('fraud-chart');
  if (!wrap) return;
  wrap.removeAttribute('width');
  wrap.removeAttribute('height');
  wrap.removeAttribute('viewBox');
  wrap.outerHTML = '<div class="fraud-log card-visual" id="fraud-log" style="margin-top:3px;height:70px;"></div>';

  const container = document.getElementById('fraud-log');
  if (!container) return;
  container.innerHTML = '<div class="fraud-log"></div>';
  const log = container.querySelector('.fraud-log');

  const entries = [
    { text: '1 · CLM-4421 · CATEGORY-A · Yosia Herson Farianto   ✓ CLEAN',      cls: 'fraud-log-ok'   },
    { text: '2 · CLM-4422 · CATEGORY-B · Yosia Farianto Herson   ✓ CLEAN',      cls: 'fraud-log-ok'   },
    { text: '3 · CLM-4423 · CATEGORY-C · Herson Farianto Yosia  ⚠ SUSPICIOUS', cls: 'fraud-log-warn' },
    { text: '4 · CLM-4424 · CATEGORY-A · Yosia Farianto Herson  ✓ CLEAN',      cls: 'fraud-log-ok'   },
    { text: '5 · CLM-4425 · CATEGORY-B · Farianto Herson Yosia  ✓ CLEAN',      cls: 'fraud-log-ok'   },
    { text: '6 · CLM-4426 · CATEGORY-C · Yosia Farianto Herson   ⚠ SUSPICIOUS', cls: 'fraud-log-warn' },
    { text: '7 · CLM-4427 · CATEGORY-A · Farianto Herson Yosia   ✓ CLEAN',      cls: 'fraud-log-ok'   },
  ];

  let lineIdx = 0;
  const MAX_LINES = 3;

  function addLine() {
    const entry = entries[lineIdx % entries.length];
    lineIdx++;

    const div = document.createElement('div');
    div.className = `fraud-log-line ${entry.cls}`;
    div.textContent = entry.text;
    log.appendChild(div);

    requestAnimationFrame(() => div.classList.add('show'));

    // keep max lines visible
    while (log.children.length > MAX_LINES) {
      log.removeChild(log.firstChild);
    }
  }

  addLine();
  setInterval(addLine, 900);
})();
// ── OCR LINES ──
(function(){
  const lines = document.querySelectorAll('.ocr-line');
  if (!lines.length) return;
  const fills = [0.85, 0.60, 0.75, 0.45];
  function runScan() {
    lines.forEach(l => { l.classList.remove('filled'); void l.offsetWidth; });
    lines.forEach((l, i) => {
      l.style.setProperty('--fill', fills[i]);
      setTimeout(() => l.classList.add('filled'), i * 180);
    });
  }
  runScan();
  setInterval(runScan, 3200);

})();

// ── BARCA GOAL ANIMATION ──
(function(){
  const wrap = document.getElementById('barca-bars');
  if (!wrap) return;
  wrap.className = 'goal-wrap';
  wrap.innerHTML = `
    <div class="goal-scene">
      <div class="goal-ground"></div>
      <div class="goal-text" id="goal-text">⚡ GOAL! ⚡</div>
      <div class="goal-striker" id="goal-striker">
        <img src="https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg" width="24" height="24">
      </div>
      <div class="goal-ball" id="goal-ball">⚽</div>
      <div class="goal-post"></div>
      <div class="goal-keeper" id="goal-keeper">
        <img src="https://upload.wikimedia.org/wikipedia/sco/5/56/Real_Madrid_CF.svg" width="24" height="24">
      </div>
    </div>
  `;

  const striker  = wrap.querySelector('#goal-striker');
  const ball     = wrap.querySelector('#goal-ball');
  const keeper   = wrap.querySelector('#goal-keeper');
  const goalText = wrap.querySelector('#goal-text');

  function runSequence() {
    // reset
    striker.style.left    = '18%';
    striker.style.transform = 'scaleX(1)';
    ball.style.left       = '30%';
    ball.style.bottom     = '20px';
    ball.style.opacity    = '1';
    keeper.style.bottom   = '13px';
    keeper.style.transform = 'scaleX(1)';
    goalText.style.opacity = '0';
    goalText.classList.remove('glitch');

    // phase 1: striker runs toward ball (0ms)
    setTimeout(() => {
      striker.style.left = '26%';
    }, 500);

    // phase 2: striker kicks — rotate on kick (600ms)
    setTimeout(() => {
      striker.style.transform = 'scaleX(1) rotate(-20deg)';
    }, 600);

    // phase 3: ball launches toward goal (700ms)
    setTimeout(() => {
      striker.style.transform = 'scaleX(1) rotate(0deg)';
      ball.style.left   = '90%';
      ball.style.bottom = '15px';
    }, 750);

    // phase 4: keeper jumps wrong way (800ms)
    setTimeout(() => {
      keeper.style.bottom    = '36px';
      keeper.style.transform = 'scaleX(-1) rotate(20deg)';
    }, 900);

    // phase 5: GOAL! (1200ms)
    setTimeout(() => {
      ball.style.opacity = '0.3';
      goalText.style.opacity = '1';
      goalText.classList.add('glitch');
    }, 1200);

    // phase 6: keeper drops in despair (1600ms)
    setTimeout(() => {
      keeper.style.bottom    = '13px';
      keeper.style.transform = 'scaleX(-1) rotate(0deg)';
    }, 1700);

    // phase 7: reset after celebration (3200ms)
    setTimeout(() => {
      goalText.style.opacity = '0';
      goalText.classList.remove('glitch');
    }, 2800);
  }

  runSequence();
  setInterval(runSequence, 4000);
})();
// ── RPA BOT ──
(function(){
  const wrap = document.getElementById('rpa-flow');
  if (!wrap) return;
  wrap.innerHTML = '';

  wrap.style.cssText += 'display:flex;align-items:center;justify-content:center;gap:0;padding:0 8px;';

  wrap.innerHTML = `
    <div class="rpa-input-stack" id="rpa-input"></div>
    <div class="rpa-pipe">
      <div class="rpa-pipe-line" id="rpa-pipe-line"></div>
      <div class="rpa-packet" id="rpa-packet"></div>
    </div>
    <div class="rpa-core-wrap">
      <div class="rpa-bot-core" id="rpa-core"> [■_■] </div>
      <div class="rpa-status" id="rpa-status">IDLE</div>
      <div class="rpa-progress-wrap"><div class="rpa-progress" id="rpa-progress"></div></div>
    </div>
    <div class="rpa-pipe">
      <div class="rpa-pipe-line" id="rpa-pipe-line2"></div>
      <div class="rpa-packet rpa-packet-out" id="rpa-packet2"></div>
    </div>
    <div class="rpa-output-stack" id="rpa-output"></div>
  `;

  const inputs  = ['Input','Data','Audio','Email','Data','HTTP API'];
  const outputs = ['Output','Report','VTT','Summary','System','Response'];
  const eyes    = [' [■_■] ',' [·_·] ',' [▪_▪] ',' [^_^] ',' [■_■] '];

  const inputEl    = wrap.querySelector('#rpa-input');
  const outputEl   = wrap.querySelector('#rpa-output');
  const coreEl     = wrap.querySelector('#rpa-core');
  const statusEl   = wrap.querySelector('#rpa-status');
  const progressEl = wrap.querySelector('#rpa-progress');
  const packetIn   = wrap.querySelector('#rpa-packet');
  const packetOut  = wrap.querySelector('#rpa-packet2');

  let taskIdx = 0;

  function runTask() {
    const inp = inputs[taskIdx % inputs.length];
    const out = outputs[taskIdx % outputs.length];
    taskIdx++;

    // set input label
    inputEl.innerHTML = `<div class="rpa-task-label">${inp}</div>`;

    // packet flies in
    statusEl.textContent = 'READING';
    coreEl.textContent = eyes[1];
    packetIn.style.opacity = '1';
    packetIn.style.transform = 'translateX(0px)';
    setTimeout(() => { packetIn.style.transform = 'translateX(40px)'; packetIn.style.opacity = '0'; }, 50);

    // processing
    setTimeout(() => {
      statusEl.textContent = 'PROCESSING';
      coreEl.textContent = eyes[2];
      let pct = 0;
      progressEl.style.width = '0%';
      const pi = setInterval(() => {
        pct += 8 + Math.random() * 10;
        if (pct >= 100) { pct = 100; clearInterval(pi); }
        progressEl.style.width = pct + '%';
      }, 100);
    }, 500);

    // done — output
    setTimeout(() => {
      statusEl.textContent = 'DONE';
      coreEl.textContent = eyes[3];
      outputEl.innerHTML = `<div class="rpa-task-label rpa-task-out">${out}</div>`;
      packetOut.style.opacity = '1';
      packetOut.style.transform = 'translateX(0px)';
      setTimeout(() => { packetOut.style.transform = 'translateX(40px)'; packetOut.style.opacity = '0'; }, 50);
    }, 1500);

    // idle
    setTimeout(() => {
      statusEl.textContent = 'IDLE';
      coreEl.textContent = eyes[0];
      inputEl.innerHTML  = '';
      outputEl.innerHTML = '';
      progressEl.style.width = '0%';
    }, 2400);
  }

  runTask();
  setInterval(runTask, 3200);
})();
// ── ARSENAL FREQ ──
document.querySelectorAll('.arsenal-freq-fill').forEach(bar=>{
  const target=bar.dataset.width;
  const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){setTimeout(()=>{bar.style.width=target+'%';},200);obs.unobserve(e.target);}});},{threshold:0.3});
  obs.observe(bar);
});

// ── SCROLL REVEALS ──
gsap.utils.toArray('.reveal').forEach((el,i)=>{
  gsap.fromTo(el,{opacity:0,y:24},{opacity:1,y:0,duration:0.8,ease:'cubic-bezier(0.16,1,0.3,1)',scrollTrigger:{trigger:el,start:'top 88%',toggleActions:'play none none none'},delay:(i%4)*0.06});
});

// ── PHOTO PREVIEW DATA ──
const photoData = {
  sport:  { title: 'On the Court',  total: 8, files: ['1_sport','2_sport','3_sport','4_sport','5_sport','6_sport','7_sport','8_sport'] },
  office: { title: 'On the Office', total: 7, files: ['1_office','2_office','3_office','4_office','5_office','6_office','7_office'] }
};
const THUMB_SHOW = 3;

function buildPreview(category) {
  const data = photoData[category];
  const container = document.getElementById('preview-' + category);
  if (!container) return;
  container.innerHTML = '';

  for (let i = 0; i < Math.min(THUMB_SHOW, data.total); i++) {
    const th = document.createElement('div');
    th.className = 'preview-thumb';
    const img = document.createElement('img');
    img.src = `./img/kinetic/${data.files[i]}.jpg`;
    img.alt = data.files[i];
    img.onerror = function() {
      img.style.display = 'none';
      const ph = document.createElement('span');
      ph.className = 'preview-thumb-ph';
      ph.textContent = i + 1;
      th.appendChild(ph);
    };
    th.appendChild(img);
    const idx = i;
    th.addEventListener('click', e => { e.stopPropagation(); openLightbox(category, idx); });
    container.appendChild(th);
  }

  if (data.total > THUMB_SHOW) {
    const more = document.createElement('div');
    more.className = 'preview-more';
    const remaining = data.total - THUMB_SHOW;
    more.innerHTML = `<span class="preview-more-num">+${remaining}</span><span class="preview-more-label">more</span>`;
    more.addEventListener('click', e => { e.stopPropagation(); openLightbox(category, THUMB_SHOW); });
    container.appendChild(more);
  }
}

buildPreview('sport');
buildPreview('office');

// clicking the slice background (not thumbs) opens lightbox at photo 0
document.querySelectorAll('.mosaic-slice').forEach(slice => {
  slice.addEventListener('click', () => {
    const cat = slice.dataset.category;
    openLightbox(cat, 0);
  });
});

// ── LIGHTBOX ──
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbPlaceholder = document.getElementById('lb-placeholder');
const lbPlaceholderText = document.getElementById('lb-placeholder-text');
const lbTitle = document.getElementById('lb-title');
const lbCounter = document.getElementById('lb-counter');
const lbThumbs = document.getElementById('lb-thumbs');
const lbClose = document.getElementById('lb-close');
const lbPrev = document.getElementById('lb-prev');
const lbNext = document.getElementById('lb-next');

let lbCategory = null;
let lbIndex = 0;

function openLightbox(category, index) {
  lbCategory = category;
  lbIndex = index;
  renderLightbox();
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function renderLightbox() {
  const data = photoData[lbCategory];
  const file = data.files[lbIndex];
  const src = `./img/kinetic/${file}.jpg`;

  // Main image
  lbImg.style.display = 'block';
  lbPlaceholder.style.display = 'none';
  lbImg.src = '';
  lbImg.onerror = function() {
    lbImg.style.display = 'none';
    lbPlaceholder.style.display = 'flex';
    lbPlaceholderText.textContent = `[ ${file}.jpg ]`;
  };
  lbImg.onload = function() {
    lbImg.style.display = 'block';
    lbPlaceholder.style.display = 'none';
  };
  lbImg.src = src;

  lbTitle.textContent = data.title;
  lbCounter.textContent = `${String(lbIndex + 1).padStart(2,'0')} / ${String(data.total).padStart(2,'0')}`;

  // Thumbs
  lbThumbs.innerHTML = '';
  data.files.forEach((f, i) => {
    const th = document.createElement('div');
    th.className = 'lb-thumb' + (i === lbIndex ? ' active' : '');
    const img = document.createElement('img');
    img.src = `./img/kinetic/${f}.jpg`;
    img.alt = f;
    img.onerror = function() {
      img.style.display = 'none';
      const ph = document.createElement('span');
      ph.className = 'lb-thumb-ph';
      ph.textContent = f;
      th.appendChild(ph);
    };
    th.appendChild(img);
    th.addEventListener('click', () => { lbIndex = i; renderLightbox(); });
    lbThumbs.appendChild(th);
  });
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
lbPrev.addEventListener('click', e => { e.stopPropagation(); const data = photoData[lbCategory]; lbIndex = (lbIndex - 1 + data.total) % data.total; renderLightbox(); });
lbNext.addEventListener('click', e => { e.stopPropagation(); const data = photoData[lbCategory]; lbIndex = (lbIndex + 1) % data.total; renderLightbox(); });
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') { lbIndex = (lbIndex - 1 + photoData[lbCategory].total) % photoData[lbCategory].total; renderLightbox(); }
  if (e.key === 'ArrowRight') { lbIndex = (lbIndex + 1) % photoData[lbCategory].total; renderLightbox(); }
});

// ── PROJECT DATA ──
const projects = [
  {
    title: 'Voice-to-Text Engine',
    category: 'AI-Speech', catClass: 'cat-secure',
    stack: 'Whisper · Qwen via Ollama · Python',
    desc: 'Engineered a localized inference pipeline for secure audio processing. Transcribes audio natively via OpenAI\'s Whisper and delivers structured content summarization using a local Qwen LLM via Ollama, ensuring zero cloud dependencies and absolute data privacy.',
    arch: './img/architecture/arch_1.png',
    link: null
  },
  {
    title: 'Fraud Detection System',
    category: 'AI-ML', catClass: 'cat-ml',
    stack: 'Python · XGBoost · Flask',
    desc: 'Developed a supervised machine learning pipeline utilizing XGBoost and Autoencoder models. Features specialized engineering tailored for behavioral anomaly detection and transaction amount distributions, fully deployed via a high-performance Flask API.',
    arch: './img/architecture/arch_2.png',
    link: null
  },
  {
    title: 'OCR Engine',
    category: 'AI-Vision', catClass: 'cat-secure',
    stack: 'Azure · Ollama · Qwen · Python · Power Apps',
    desc: 'Architected an automated OCR engine designed to streamline customer onboarding. Processes and extracts key customer attributes from high-volume, multi-format sources (10+ complex PDFs and images per profile) into structured database inputs.',
    arch: './img/architecture/arch_3.png',
    link: null
  },
  {
    title: 'Internal RAG Knowledge Base',
    category: 'AI-GenAI', catClass: 'cat-secure',
    stack: 'Azure · Ollama · Python · Power Apps · JavaScript',
    desc: 'Implemented an enterprise-grade Retrieval-Augmented Generation (RAG) system. Features secure document ingestion using Azure Blob Storage, semantic indexing via Azure AI Search, and LLM orchestration through Azure AI Foundry for advanced reasoning and contextual insights.',
    arch: './img/architecture/arch_4.png',
    link: null
  },
  {
    title: 'Blaugrana Analytics Dashboard',
    category: 'Data-Visualization', catClass: 'cat-ml',
    stack: 'Python · Streamlit · Plotly',
    desc: '"In a way I\'m probably immortal." — Johan Cruyff. Built an advanced sports analytics platform that scrapes data from public data registries (FC Barcelona & Real Madrid FC), normalizes complex match events, and transforms them into actionable business-ready growth insights through an interactive Streamlit dashboard.',
    arch: './img/architecture/arch_5.png',
    link: 'https://blaugrana-dashboard.streamlit.app/'
  },
  {
    title: 'Cross-Platform Enterprise Automation',
    category: 'Automation', catClass: 'cat-rpa',
    stack: 'Power Automate · SQL Server · Python · VBA · AI Builder',
    desc: 'Designed and deployed an end-to-end automation ecosystem across enterprise legacy systems. Orchestrates both attended and unattended RPA workflows using Microsoft Power Automate to eliminate manual bottlenecks and optimize data synchronization.',
    arch: './img/architecture/arch_6.png',
    link: null
  }
];


// ── EXPAND CARD ──
const overlay=document.getElementById('card-overlay'),expanded=document.getElementById('card-expanded'),closeBtn=document.getElementById('card-close'),expandedInner=document.getElementById('expanded-inner');
let expandedOpen=false;
document.querySelectorAll('.bento-card[data-project]').forEach(card=>{
  card.addEventListener('click',()=>{
    const idx=parseInt(card.dataset.project),p=projects[idx];
    expandedInner.innerHTML = `
    <div class="expanded-category"><span class="card-category ${p.catClass}">[${p.category}]</span></div>
    <div class="expanded-title">${p.title}</div>
    <div class="expanded-stack">${p.stack}</div>
    <div class="expanded-divider"></div>
    <p style="font-size:15px;line-height:1.8;color:#777;margin-bottom:40px;" id="es1">${p.desc}</p>
    <div style="width:100%;border:1px solid var(--border);border-radius:4px;overflow:hidden;margin-bottom:40px;" id="es2">
      <img src="${p.arch}" alt="Architecture" style="width:100%;display:block;" onerror="this.parentElement.innerHTML='<div style=\'height:200px;display:flex;align-items:center;justify-content:center;\'><span style=\'font-family:var(--mono);font-size:11px;letter-spacing:0.15em;color:var(--text-dim);text-transform:uppercase;\'>[ ARCHITECTURE DIAGRAM — COMING SOON ]</span></div>'">
    </div>
    ${p.link ? `<a href="${p.link}" target="_blank" style="display:inline-flex;align-items:center;gap:12px;font-family:var(--mono);font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#000;background:var(--cyan);padding:12px 24px;border-radius:2px;text-decoration:none;transition:opacity 0.2s;" onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'">↗ Open Dashboard</a>` : ''}
  `;
    const rect=card.getBoundingClientRect();
    gsap.set(expanded,{left:rect.left,top:rect.top,width:rect.width,height:rect.height,borderRadius:'4px',display:'block'});
    expanded.classList.add('active');overlay.classList.add('active');closeBtn.classList.add('active');
    document.body.style.overflow='hidden';expandedOpen=true;
    gsap.to(expanded,{left:0,top:0,width:'100%',height:'100%',borderRadius:0,duration:0.7,ease:'cubic-bezier(0.16,1,0.3,1)',onComplete(){['es1','es2','es2'].forEach((id,i)=>{const el=document.getElementById(id);if(el)gsap.to(el,{opacity:1,y:0,duration:0.5,delay:0.1+i*0.1,ease:'power2.out'});});}});
    gsap.to(overlay,{opacity:1,duration:0.4});
  });
});

function closeExpanded(){
  if(!expandedOpen)return;
  document.body.style.overflow='';
  expandedOpen=false;
  overlay.classList.remove('active');
  closeBtn.classList.remove('active');
  gsap.killTweensOf(expanded);
  gsap.killTweensOf(overlay);
  gsap.to(overlay,{opacity:0,duration:0.3});
  gsap.to(expanded,{opacity:0,duration:0.35,ease:'power2.in',onComplete(){
    expanded.classList.remove('active');
    gsap.set(expanded,{display:'none',left:'',top:'',width:'',height:'',borderRadius:'',opacity:1});
  }});
}

closeBtn.addEventListener('click',closeExpanded);
overlay.addEventListener('click',closeExpanded);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&expandedOpen)closeExpanded();});

// ── CONSOLE EASTER EGG ──
console.log('%c YHF.SYS — UNAUTHORIZED ACCESS DETECTED ','color:#00F2FE;font-family:monospace;font-size:14px;font-weight:bold;');
console.log('%c Hey, you\'re the curious type. I like that.\n → yosiafarianto7@gmail.com','color:#666;font-family:monospace;font-size:11px;');

// ── KONAMI CODE ──
let konami=[],konamiCode=[38,38,40,40,37,39,37,39,66,65];
document.addEventListener('keydown',e=>{
  konami.push(e.keyCode);if(konami.length>10)konami.shift();
  if(JSON.stringify(konami)===JSON.stringify(konamiCode)){
    const ov=document.createElement('div');
    ov.style.cssText='position:fixed;inset:0;background:#000;z-index:99999;display:flex;align-items:center;justify-content:center;font-family:monospace;color:#00F2FE;font-size:13px;line-height:2;text-align:left;padding:48px;';
    ov.innerHTML='<pre style="color:#00F2FE;"></pre>';document.body.appendChild(ov);
    const pre=ov.querySelector('pre');
    const lines=['> SYSTEM BOOT SEQUENCE INITIATED','> Loading YHF.kernel.............................. OK','> Mounting automation_stack.img.................. OK','> Initializing RAG_daemon........................ OK','> Connecting to local_ai_node.................... OK','> Loading big_data_analytics.module.............. OK','> fraud_detection.model → accuracy: 87.3%........ OK','> All systems nominal.','> Welcome back, Engineer.','','> [ Press any key to exit ]'];
    let li=0;const lineInt=setInterval(()=>{if(li<lines.length){pre.textContent+=lines[li++]+'\n';}else clearInterval(lineInt);},200);
    const dismiss=()=>{ov.remove();document.removeEventListener('keydown',dismiss);};
    setTimeout(()=>document.addEventListener('keydown',dismiss),500);
  }
});