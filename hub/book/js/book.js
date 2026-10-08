(() => {
"use strict";
const library = window.WRITING_LIBRARY || {works:[], counts:{poems:0,short_stories:0,works:0,characters:0}};
const $ = id => document.getElementById(id);
const els = {
  shell:$('appShell'), book:$('book'), outer:$('bookOuter'), cover:$('closedCover'), open:$('openBookBtn'), left:$('leftPage'), right:$('rightPage'), sheet:$('turnSheet'), status:$('pageStatus'),
  mini:$('miniIndex'), count:$('indexCount'), search:$('searchInput'), audio:$('pageFlipAudio'), sound:$('soundBtn'), zoomLabel:$('zoomLabel'),
  coverBtn:$('coverBtn'), contentsBtn:$('contentsBtn'), prev:$('prevBtn'), next:$('nextBtn'), prevB:$('prevBottomBtn'), nextB:$('nextBottomBtn'), zoomOut:$('zoomOutBtn'), zoomIn:$('zoomInBtn'), zoomFit:$('zoomFitBtn')
};
const mqSingle = window.matchMedia('(max-width: 700px)');
const state = {
  pages:[], cursor:0, open:false, turning:false, drag:null, search:'',
  zoom:clamp(Number(readSetting('writing-book-zoom','1')) || 1,.55,1.9),
  sound:readSetting('writing-book-sound','on') !== 'off',
  single:mqSingle.matches, workStarts:new Map(), workRanges:new Map(), focusWorkId:null, fitWidth:0, resizeRaf:0
};

function readSetting(k,f){try{return localStorage.getItem(k) || f}catch{return f}}
function writeSetting(k,v){try{localStorage.setItem(k,String(v))}catch{}}
function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
function escapeHtml(v=''){return String(v).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]))}
function metaDate(w){const bits=[]; if(w.date_written) bits.push(`Written ${w.date_written}`); if(w.date_revised) bits.push(`Revised ${w.date_revised}`); return bits.join(' • ')}
function titleOf(w){return w.display_title || w.title || 'Untitled'}
/* Every page is tested against the actual rendered text area, not against a
   character quota. Word boundaries remain exact source substrings. */
function tokenEnds(source) {
  const ends=[0]; const re=/\S+\s*|\s+/g; let hit;
  while((hit=re.exec(source))) ends.push(re.lastIndex);
  if(ends[ends.length-1]!==source.length) ends.push(source.length);
  return ends;
}
let measurePageNode=null;
function ensurePageProbe() {
  if(measurePageNode && measurePageNode.parentNode===els.book) return measurePageNode;
  const probe=document.createElement('section');
  probe.className='page book-measure-probe';
  probe.setAttribute('aria-hidden','true');
  els.book.appendChild(probe); measurePageNode=probe; return probe;
}
function pageFits(page,index=0) {
  const probe=ensurePageProbe(); probe.innerHTML=pageMarkup(page,index);
  const scroll=probe.querySelector('.page-scroll');
  if(!scroll) return true;
  // Allow a one-pixel browser rounding difference, never discard overflow.
  return scroll.clientHeight>0 && scroll.scrollHeight<=scroll.clientHeight+1
    && scroll.scrollWidth<=scroll.clientWidth+1;
}
function paginateWork(work) {
  const source=String(work.content??''); const ends=tokenEnds(source);
  if(source.length===0) return [{kind:'work',work,chunk:'',startOffset:0,endOffset:0,part:1,parts:1,label:titleOf(work)}];
  const pages=[];
  let pos=0, startToken=0;
  while(pos<source.length) {
    const part=pages.length+1;
    const make=(end)=>({kind:'work',work,chunk:source.slice(pos,end),startOffset:pos,endOffset:end,part,parts:0,label:titleOf(work)});
    // Estimate a comfortable amount of text from the current page geometry.
    // Usually one browser measurement is sufficient; exact overflow checks
    // then tighten only pages that need it (especially long poem lines).
    const pageWidth=els.book.clientWidth/(state.single?1:2);
    const pageHeight=els.book.clientHeight;
    const font=clamp(pageWidth*.032,12.5,17);
    const margin=clamp(pageWidth*.064,14,40);
    const usableWidth=Math.max(60,pageWidth-2*margin);
    const usableHeight=Math.max(95,pageHeight-clamp(pageWidth*.061,20,40)-clamp(pageWidth*.071,27,47)-
      (part===1?Math.max(105, font*6):Math.max(42,font*2.7)));
    const density=work.work_type==='poem'?.78:.94;
    const wanted=Math.max(50,Math.floor((usableWidth/(font*.52))*(usableHeight/(font*1.5))*density));
    let low=startToken+1,high=ends.length-1;
    while(low<high){const mid=(low+high)>>1;if(ends[mid]<pos+wanted)low=mid+1;else high=mid;}
    const guess=Math.max(startToken+1,Math.min(ends.length-1,low));
    let best=guess;
    if(!pageFits(make(ends[guess]))){
      best=startToken;let from=startToken+1,to=guess-1;
      while(from<=to){const mid=(from+to)>>1;
        if(pageFits(make(ends[mid]))){best=mid;from=mid+1;}else to=mid-1;}
    }
    // At very small sizes, a single unusually tall token still remains
    // available via the page's own scrollable reading surface.
    if(best===startToken) best=Math.min(startToken+1,ends.length-1);
    let end=ends[best];
    if(end<=pos) end=Math.min(source.length,pos+1);
    pages.push(make(end)); pos=end;startToken=best;
  }
  pages.forEach((page,i)=>{page.part=i+1;page.parts=pages.length;});
  return pages;
}
function paginateContents(group,label) {
  const items=library.works.filter(w=>w.work_type===group);
  if(!items.length)return [];
  const pages=[]; let start=0;
  while(start<items.length) {
    let end=start+1;
    for(;end<=items.length;end++) {
      const trial={kind:'toc',group,label,items:items.slice(start,end),tocPart:1,tocParts:1};
      if(!pageFits(trial)) break;
    }
    end=Math.max(start+1,end-1);
    pages.push({kind:'toc',group,label,items:items.slice(start,end)}); start=end;
  }
  pages.forEach((page,i)=>{page.tocPart=i+1;page.tocParts=pages.length;});
  return pages;
}
function buildPages(){
  if(!state.open)return;
  const pages=[{kind:'title',label:'Title Page'},{kind:'about',label:'About This Collection'}];
  pages.push(...paginateContents('poem','Poetry Contents'));
  pages.push(...paginateContents('short_story','Short Stories Contents'));
  const starts=new Map(),ranges=new Map();
  for(const work of library.works){
    const start=pages.length; starts.set(work.id,start);
    const workPages=paginateWork(work);
    pages.push(...workPages);
    ranges.set(work.id,{start,end:pages.length-1});
  }
  if(pages.length%2) pages.push({kind:'blank',label:'Endpaper'});
  state.workStarts=starts;state.workRanges=ranges;state.pages=pages;
  // The final numbers are now populated; the index may be redrawn normally.
}
function readingAnchor(){
  if(!state.pages.length)return {index:0};
  const indices=state.single?[state.cursor]:[state.cursor,state.cursor+1];
  const shown=indices.map(i=>state.pages[i]).filter(Boolean);
  const page=shown.find(p=>p.kind==='work' && p.work.id===state.focusWorkId)
    || shown.find(p=>p.kind==='work') || shown[0];
  if(page?.kind==='work')return {workId:page.work.id,offset:page.startOffset||0};
  return {kind:page?.kind,index:state.cursor,group:page?.group};
}
function restoreReadingAnchor(anchor){
  if(anchor.workId){
    const range=state.workRanges.get(anchor.workId);
    if(range){
      let index=range.start;
      while(index<range.end && state.pages[index].endOffset<=anchor.offset)index++;
      state.cursor=normalizedCursor(index);state.focusWorkId=anchor.workId;return;
    }
  }
  if(anchor.kind==='toc'){
    const index=state.pages.findIndex(p=>p.kind==='toc' && p.group===anchor.group);
    state.cursor=normalizedCursor(index>=0?index:2);return;
  }
  state.cursor=normalizedCursor(anchor.index||0);
}
function updateBookGeometry(){
  if(!state.open)return false;
  const outerWidth=els.outer.clientWidth || window.innerWidth;
  const outerHeight=els.outer.clientHeight || Math.max(480,window.innerHeight-150);
  const single=window.innerWidth<=900 || outerWidth<820;
  const changed=single!==state.single;
  state.single=single;els.shell.classList.toggle('reader-single',single);
  const ratio=single?668/1047:1336/1047;
  const availableWidth=Math.max(180,outerWidth-34);
  const availableHeight=Math.max(360,outerHeight-80);
  const baseline=Math.max(195,Math.min(1120,availableWidth,availableHeight*ratio));
  state.fitWidth=baseline;
  const width=Math.round(baseline*state.zoom*100)/100;
  els.book.style.width=`${width}px`;
  const pageWidth=width/(single?1:2);
  const variable=(key,value)=>els.book.style.setProperty(key,`${Math.round(value*100)/100}px`);
  const margin=clamp(pageWidth*.064,14,40);
  variable('--reader-pad-x',margin);
  variable('--reader-pad-y',clamp(pageWidth*.061,20,40));
  variable('--reader-pad-bottom',clamp(pageWidth*.071,27,47));
  variable('--reader-story-font',clamp(pageWidth*.032,12.5,17));
  variable('--reader-poem-font',clamp(pageWidth*.032,12.5,17));
  variable('--reader-title-font',clamp(pageWidth*.054,17.5,31));
  variable('--reader-head-font',clamp(pageWidth*.024,9.5,12));
  variable('--reader-meta-font',clamp(pageWidth*.03,12,16));
  variable('--reader-number-font',clamp(pageWidth*.025,10,13));
  variable('--reader-cover-title',clamp(pageWidth*.079,25,52));
  variable('--reader-cover-subtitle',clamp(pageWidth*.043,16,32));
  return changed;
}
function reflowBook(){
  state.resizeRaf=0;
  if(!state.open||state.turning)return;
  const anchor=readingAnchor();
  updateBookGeometry();buildPages();restoreReadingAnchor(anchor);
  renderIndex();renderCurrent();
}
function queueReflow(){
  if(!state.open || state.turning || state.resizeRaf)return;
  state.resizeRaf=requestAnimationFrame(reflowBook);
}
function enterBook(){
  if(!state.open){state.open=true;els.shell.classList.add('is-open');}
  updateBookGeometry();buildPages();
  renderIndex();
}
function currentStep(){return state.single?1:2}
function normalizedCursor(i){i=clamp(i,0,Math.max(0,state.pages.length-1)); return state.single?i:i-(i%2)}
function pageNumber(index){return index+1}
function pageWork(index){const p=state.pages[index]; return p&&p.kind==='work'?p.work:null}
function pageMarkup(page,index){
  if(!page) return '<div class="page-inner"><div class="blank-page"></div></div>';
  const num=`<div class="page-number">${pageNumber(index)}</div>`;
  if(page.kind==='title') return `<div class="page-inner"><div class="title-page"><div><div class="title-mark">✦</div><h2>William Saville</h2><h3>Poetry &amp; Short Stories</h3><p class="byline">A collection of ${library.counts.poems} poems and ${library.counts.short_stories} short stories</p></div></div>${num}<div class="page-corner-hint"></div></div>`;
  if(page.kind==='about') return `<div class="page-inner"><div class="page-scroll front-note"><h2>About This Collection</h2><div class="ornament"></div><p>This book gathers the complete poetry and short-story writing supplied with this edition into one parchment-style reading volume.</p><div class="stats"><div><strong>${library.counts.poems}</strong>Poems</div><div><strong>${library.counts.short_stories}</strong>Short Stories</div><div><strong>${library.counts.works}</strong>Total Works</div></div><p>Use the Contents panel or search box to jump directly to a work. Turn pages with the buttons, arrow keys, or by dragging the outer edge of a page toward the binding.</p><p>The page-turn sound can be switched on or off from the toolbar.</p></div>${num}<div class="page-corner-hint"></div></div>`;
  if(page.kind==='toc'){
    const works=page.items || library.works.filter(w=>w.work_type===page.group); const heading=page.group==='poem'?'Poetry':'Short Stories'; const sectionNote=page.tocParts>1?` <span>(${page.tocPart} of ${page.tocParts})</span>`:'';
    return `<div class="page-inner"><div class="page-scroll contents-page"><div class="running-head"><span>Contents</span><span>${heading}</span></div><h2>${heading}${sectionNote}</h2><div class="ornament"></div>${works.map(w=>`<div class="toc-row"><button type="button" data-work-jump="${escapeHtml(w.id)}">${escapeHtml(titleOf(w))}</button><span class="dots"></span><span>${pageNumber(state.workStarts.get(w.id))}</span></div>${w.date_written?`<div class="toc-date">${escapeHtml(w.date_written)}</div>`:''}`).join('')}</div>${num}<div class="page-corner-hint"></div></div>`;
  }
  if(page.kind==='blank') return `<div class="page-inner"><div class="blank-page">Finis</div>${num}<div class="page-corner-hint"></div></div>`;
  const w=page.work; const head=`<div class="running-head"><span>${w.work_type==='poem'?'Poetry':'Short Story'}</span><span>${escapeHtml(titleOf(w))}</span></div>`;
  const title=page.part===1?`<h2 class="work-title">${escapeHtml(titleOf(w))}</h2><div class="work-meta">${escapeHtml(metaDate(w))}</div><div class="ornament"></div>`:`<div class="continued">${escapeHtml(titleOf(w))} — continued</div>`;
  let body='';
  if(w.work_type==='poem') body=`<div class="poem-body">${escapeHtml(page.chunk)}</div>`;
  else body=`<div class="story-body">${page.chunk.split(/\n\n/).map(p=>`<p>${escapeHtml(p)}</p>`).join('')}</div>`;
  return `<div class="page-inner"><div class="page-scroll">${head}${title}${body}</div>${num}<div class="page-corner-hint"></div></div>`;
}
function renderCurrent(){
  if(!state.open) return;
  state.cursor=normalizedCursor(state.cursor);
  if(state.single){
    els.left.innerHTML=''; els.right.innerHTML=pageMarkup(state.pages[state.cursor],state.cursor);
    els.left.style.display='none'; els.right.style.display='block';
  }else{
    els.left.style.display='block'; els.right.style.display='block';
    els.left.innerHTML=pageMarkup(state.pages[state.cursor],state.cursor);
    els.right.innerHTML=pageMarkup(state.pages[state.cursor+1],state.cursor+1);
  }
  bindPageJumps(); updateStatus(); updateButtons(); updateIndexCurrent(); applyTurnCursors();
}
function bindPageJumps(){document.querySelectorAll('[data-work-jump]').forEach(btn=>btn.addEventListener('click',()=>goToWork(btn.dataset.workJump)))}
function visibleWork(){const candidates=[pageWork(state.cursor),pageWork(state.cursor+1)].filter(Boolean);return candidates.find(w=>w.id===state.focusWorkId)||candidates[0]||null}
function updateStatus(){
  const last=Math.min(state.pages.length,state.cursor+currentStep()); const first=state.cursor+1; const w=visibleWork(); els.status.textContent=`Page${last>first?'s':''} ${first}${last>first?'–'+last:''} of ${state.pages.length}${w?' • '+titleOf(w):''}`;
}
function updateButtons(){const step=currentStep(); const hasPrev=state.cursor>0,hasNext=state.cursor+step<state.pages.length; [els.prev,els.prevB].forEach(b=>b.disabled=!hasPrev||state.turning); [els.next,els.nextB].forEach(b=>b.disabled=!hasNext||state.turning)}
function applyTurnCursors(){els.left.classList.toggle('turn-ready-prev',!state.single&&state.cursor>0); els.right.classList.toggle('turn-ready-next',state.cursor+currentStep()<state.pages.length); if(state.single) els.right.classList.toggle('turn-ready-prev',state.cursor>0)}
function renderIndex(){
  const term=state.search; const matches=library.works.filter(w=>!term || [titleOf(w),w.date_written,w.date_revised,w.content].filter(Boolean).join(' ').toLowerCase().includes(term));
  const group=(type,name)=>{const rows=matches.filter(w=>w.work_type===type); if(!rows.length)return''; return `<section class="index-group"><h3>${name}</h3>${rows.map(w=>`<button class="index-link" type="button" data-index-work="${escapeHtml(w.id)}">${escapeHtml(titleOf(w))}<small>${escapeHtml(w.date_written||'Undated')}</small></button>`).join('')}</section>`};
  els.mini.innerHTML=group('poem','Poetry')+group('short_story','Short Stories') || '<p>No writing matched your search.</p>'; els.count.textContent=`${matches.length} of ${library.works.length} works`;
  els.mini.querySelectorAll('[data-index-work]').forEach(b=>b.addEventListener('click',()=>goToWork(b.dataset.indexWork))); updateIndexCurrent();
}
function updateIndexCurrent(){const w=visibleWork(); els.mini.querySelectorAll('[data-index-work]').forEach(b=>b.classList.toggle('is-current',!!w&&b.dataset.indexWork===w.id))}
function goToWork(id){if(!state.open)enterBook();const p=state.workStarts.get(id); if(Number.isInteger(p)){state.focusWorkId=id;state.cursor=normalizedCursor(p);renderCurrent()}}
function openBook(){state.focusWorkId=null;enterBook();state.cursor=0;renderCurrent()}
function closeBook(){if(state.turning)return;state.open=false;els.shell.classList.remove('is-open');els.status.textContent='Closed cover';updateButtons()}
function goContents(){if(!state.open)openBook(); state.focusWorkId=null; const first=state.pages.findIndex(p=>p.kind==='toc'); state.cursor=normalizedCursor(first>=0?first:0); renderCurrent()}
function playFlipSound(progress=0){if(!state.sound)return; try{els.audio.pause();els.audio.currentTime=Math.min(.16,Math.max(0,progress*.10));els.audio.volume=.48;const p=els.audio.play();if(p&&p.catch)p.catch(()=>{})}catch{}}
function setSound(on){state.sound=!!on;writeSetting('writing-book-sound',state.sound?'on':'off');els.sound.textContent=`Sound: ${state.sound?'On':'Off'}`;els.sound.setAttribute('aria-pressed',state.sound?'true':'false')}
function setZoom(v){state.zoom=clamp(Math.round(v*100)/100,.55,1.9);writeSetting('writing-book-zoom',state.zoom);document.documentElement.style.setProperty('--book-zoom',state.zoom);els.zoomLabel.textContent=`${Math.round(state.zoom*100)}%`;queueReflow()}
function getTargetCursor(dir){return normalizedCursor(state.cursor+(dir==='next'?currentStep():-currentStep()))}
function canTurn(dir){return dir==='next'?state.cursor+currentStep()<state.pages.length:state.cursor>0}
function prepareTurn(dir){
  if(state.turning||!canTurn(dir))return null; const target=getTargetCursor(dir); state.turning=true;updateButtons(); els.book.classList.add('is-turning'); els.sheet.className=`turn-sheet active ${dir}`;
  const front=els.sheet.querySelector('.sheet-front'),back=els.sheet.querySelector('.sheet-back');
  if(state.single){front.innerHTML=pageMarkup(state.pages[state.cursor],state.cursor);back.innerHTML=pageMarkup(state.pages[target],target);els.right.innerHTML=pageMarkup(state.pages[target],target)}
  else if(dir==='next'){
    front.innerHTML=pageMarkup(state.pages[state.cursor+1],state.cursor+1); back.innerHTML=pageMarkup(state.pages[target],target); els.left.innerHTML=pageMarkup(state.pages[state.cursor],state.cursor); els.right.innerHTML=pageMarkup(state.pages[target+1],target+1)
  }else{
    front.innerHTML=pageMarkup(state.pages[state.cursor],state.cursor); back.innerHTML=pageMarkup(state.pages[target+1],target+1); els.left.innerHTML=pageMarkup(state.pages[target],target); els.right.innerHTML=pageMarkup(state.pages[state.cursor+1],state.cursor+1)
  }
  applyTurnProgress(dir,0); return {dir,target,front,back};
}
function applyTurnProgress(dir,p){
  p=clamp(p,0,1); const curl=Math.pow(Math.sin(Math.PI*p),.88); const sign=dir==='next'?-1:1; const angle=sign*180*p; const lift=46*Math.pow(curl,1.45); const droop=sign*(1.35*Math.sin(Math.PI*p)+.28*Math.sin(2*Math.PI*p)); const skew=sign*.65*curl; const squeeze=1-.025*curl;
  const st=els.sheet.style;
  st.setProperty('--progress',p.toFixed(4)); st.setProperty('--curl',curl.toFixed(4));
  st.setProperty('--shadow-x',`${((.5-p)*18).toFixed(2)}px`); st.setProperty('--shadow-blur',`${(14+curl*30).toFixed(2)}px`); st.setProperty('--shadow-alpha',(0.20+curl*0.42).toFixed(3));
  st.setProperty('--paper-hi',(0.06+curl*0.18).toFixed(3)); st.setProperty('--paper-dark',(curl*0.16).toFixed(3)); st.setProperty('--paper-dark-back',(curl*0.18).toFixed(3));
  st.setProperty('--face-hi',(curl*0.26).toFixed(3)); st.setProperty('--face-dark',(curl*0.34).toFixed(3));
  st.setProperty('--ridge-a-opacity',(curl*0.95).toFixed(3)); st.setProperty('--ridge-b-opacity',(curl*0.70).toFixed(3)); st.setProperty('--ridge-a-offset',`${(2+curl*12).toFixed(2)}%`); st.setProperty('--ridge-b-offset',`${(18+curl*19).toFixed(2)}%`); st.setProperty('--ridge-skew',`${(curl*1.1).toFixed(3)}deg`);
  st.setProperty('--edge-width',`${(9+curl*24).toFixed(2)}px`); st.setProperty('--edge-opacity',(0.35+curl*0.65).toFixed(3)); st.setProperty('--edge-blur',`${(8+curl*18).toFixed(2)}px`); st.setProperty('--edge-shadow-alpha',(0.15+curl*0.24).toFixed(3)); st.setProperty('--edge-radius',`${(4+curl*18).toFixed(2)}px`);
  st.transform=`translateZ(${lift.toFixed(2)}px) rotateY(${angle.toFixed(3)}deg) rotateZ(${droop.toFixed(3)}deg) skewY(${skew.toFixed(3)}deg) scaleX(${squeeze.toFixed(4)})`;
}
function heavyEase(t){t=clamp(t,0,1); if(t<.46){const x=t/.46;return .5*Math.pow(x,1.55)}const x=(t-.46)/.54;return .5+.5*(1-Math.pow(1-x,1.85))}
function finishTurn(ctx,commit){
  if(commit){state.cursor=ctx.target;state.focusWorkId=null;} els.sheet.className='turn-sheet';els.sheet.style.transform='';els.sheet.style.removeProperty('--progress');els.sheet.style.removeProperty('--curl');els.sheet.querySelector('.sheet-front').innerHTML='';els.sheet.querySelector('.sheet-back').innerHTML='';els.book.classList.remove('is-turning');state.turning=false;state.drag=null;renderCurrent();
}
function animateFrom(ctx,from,to,duration,commit){
  const start=performance.now(); if(to===1&&from<.15)playFlipSound(from);
  function frame(now){const raw=clamp((now-start)/duration,0,1); const e=to===1?heavyEase(raw):1-heavyEase(1-raw); const p=from+(to-from)*e;applyTurnProgress(ctx.dir,p);if(raw<1)requestAnimationFrame(frame);else finishTurn(ctx,commit)} requestAnimationFrame(frame)
}
function turn(dir){const ctx=prepareTurn(dir);if(!ctx)return;playFlipSound(0);animateFrom(ctx,0,1,1420,true)}
function dragStart(ev){
  if(state.turning||!state.open||ev.button!==0||ev.target.closest('button,input,a,select,textarea,[data-resize-edge]'))return;
  const rect=(state.single?els.right:(ev.currentTarget)).getBoundingClientRect(); let dir=null;
  if(state.single){const local=ev.clientX-rect.left;if(local>rect.width*.57)dir='next';else if(local<rect.width*.43)dir='prev'}else dir=ev.currentTarget===els.right?'next':'prev';
  if(!dir||!canTurn(dir))return; const ctx=prepareTurn(dir); if(!ctx)return; const source=state.single?els.right:ev.currentTarget; source.setPointerCapture(ev.pointerId);state.drag={ctx,startX:ev.clientX,lastX:ev.clientX,lastT:performance.now(),progress:0,velocity:0,source,pointerId:ev.pointerId,sounded:false};ev.preventDefault()
}
function dragMove(ev){const d=state.drag;if(!d||ev.pointerId!==d.pointerId)return;const rect=d.source.getBoundingClientRect();const delta=d.ctx.dir==='next'?d.startX-ev.clientX:ev.clientX-d.startX;const p=clamp(delta/Math.max(1,rect.width),0,1);const now=performance.now();d.velocity=(p-d.progress)/Math.max(1,now-d.lastT);d.progress=p;d.lastT=now;d.lastX=ev.clientX;if(p>.045&&!d.sounded){playFlipSound(p);d.sounded=true}applyTurnProgress(d.ctx.dir,p);ev.preventDefault()}
function dragEnd(ev){const d=state.drag;if(!d||ev.pointerId!==d.pointerId)return;const commit=d.progress>.27||d.velocity>.0016;const remaining=Math.abs((commit?1:0)-d.progress);animateFrom(d.ctx,d.progress,commit?1:0,Math.max(260,920*remaining),commit)}
/* Savanski-inspired eight-edge resizing, kept proportional so the two book
   pages never become stretched paper. New space always triggers reflow. */
function wireBookResize(){
  const edges=document.querySelectorAll('[data-resize-edge]');
  for(const handle of edges){
    handle.addEventListener('pointerdown',ev=>{
      if(ev.button!==0 || !state.open || state.turning)return;
      ev.preventDefault();ev.stopPropagation();
      const edge=handle.dataset.resizeEdge;
      const initial={x:ev.clientX,y:ev.clientY,width:els.book.getBoundingClientRect().width,
        height:els.book.getBoundingClientRect().height,fit:state.fitWidth};
      handle.setPointerCapture(ev.pointerId);
      els.book.classList.add('reader-resizing');
      const move=e=>{
        const dx=e.clientX-initial.x,dy=e.clientY-initial.y;
        const x=edge.includes('e')?dx:edge.includes('w')?-dx:0;
        const y=edge.includes('s')?dy:edge.includes('n')?-dy:0;
        const aspect=initial.width/Math.max(1,initial.height);
        const change=edge.length===2?(x+y*aspect)/2:edge==='e'||edge==='w'?x:y*aspect;
        setZoom((initial.width+change)/Math.max(1,initial.fit));
      };
      const stop=()=>{els.book.classList.remove('reader-resizing');handle.removeEventListener('pointermove',move);handle.removeEventListener('pointerup',stop);handle.removeEventListener('pointercancel',stop);};
      handle.addEventListener('pointermove',move);
      handle.addEventListener('pointerup',stop);
      handle.addEventListener('pointercancel',stop);
    });
    handle.addEventListener('dblclick',ev=>{ev.preventDefault();ev.stopPropagation();setZoom(1);});
    handle.addEventListener('keydown',ev=>{if(ev.key==='ArrowRight'||ev.key==='ArrowUp'){ev.preventDefault();setZoom(state.zoom+.05)}else if(ev.key==='ArrowLeft'||ev.key==='ArrowDown'){ev.preventDefault();setZoom(state.zoom-.05)}});
  }
}
function bind(){
  els.open.addEventListener('click',openBook);els.coverBtn.addEventListener('click',closeBook);els.contentsBtn.addEventListener('click',goContents);els.prev.addEventListener('click',()=>turn('prev'));els.next.addEventListener('click',()=>turn('next'));els.prevB.addEventListener('click',()=>turn('prev'));els.nextB.addEventListener('click',()=>turn('next'));
  els.sound.addEventListener('click',()=>setSound(!state.sound));els.zoomOut.addEventListener('click',()=>setZoom(state.zoom-.1));els.zoomIn.addEventListener('click',()=>setZoom(state.zoom+.1));els.zoomFit.addEventListener('click',()=>setZoom(1));
  els.search.addEventListener('input',e=>{state.search=e.target.value.trim().toLowerCase();renderIndex()});
  [els.left,els.right].forEach(p=>{p.addEventListener('pointerdown',dragStart);p.addEventListener('pointermove',dragMove);p.addEventListener('pointerup',dragEnd);p.addEventListener('pointercancel',dragEnd)});
  document.addEventListener('keydown',e=>{if(e.target.closest&&e.target.closest('input,textarea,select'))return;if(e.key==='ArrowRight')turn('next');if(e.key==='ArrowLeft')turn('prev');if(e.key==='Home')goContents();if(e.key==='Escape')closeBook();if((e.ctrlKey||e.metaKey)&&['+','=','-','0'].includes(e.key)){e.preventDefault();if(e.key==='-')setZoom(state.zoom-.1);else if(e.key==='0')setZoom(1);else setZoom(state.zoom+.1)}});
  const onWindowChange=()=>queueReflow();window.addEventListener('resize',onWindowChange);
  if('ResizeObserver' in window){const observer=new ResizeObserver(()=>queueReflow());observer.observe(els.outer);}
  if(document.fonts?.ready)document.fonts.ready.then(queueReflow).catch(()=>{});
  wireBookResize();
}
function debugAudit(){
  const seen=new Map(); for(const p of state.pages){if(p.kind==='work'){seen.set(p.work.id,(seen.get(p.work.id)||'')+p.chunk.replace(/\n\n/g,'\n\n'))}} return {pageCount:state.pages.length,workCount:library.works.length,workStarts:Object.fromEntries(state.workStarts),single:state.single}
}
bind();renderIndex();setZoom(state.zoom);setSound(state.sound);updateButtons();
window.__WRITING_BOOK__={state,library,goToWork,openBook,renderCurrent,debugAudit,pageMarkup,reflowBook,pageFits,setZoom};
})();
