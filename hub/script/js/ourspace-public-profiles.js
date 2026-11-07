/* Two static top-level site tabs; native OurSpace public-profile iframe.
 * No new top-page hashes, paths, client keys, or account-only profile requests.
 */
(function(){
'use strict';
document.addEventListener('DOMContentLoaded',()=>{
 const trex=document.getElementById('trexSite'),panel=document.getElementById('ourspacePublic');
 const trexTab=document.getElementById('trexSiteTab'),menu=document.getElementById('ourspaceMenuButton');
 const dropdown=document.getElementById('ourspaceDropdown'),content=document.getElementById('ourspacePublishedContent');
 const status=document.getElementById('ourspacePublicStatus'),refresh=document.getElementById('ourspacePublicRefresh');
 const master=document.getElementById('masterNav'),handle=document.getElementById('masterDragHandle');
 const toggle=document.getElementById('masterToggle');
 if(!trex||!panel||!trexTab||!menu||!dropdown||!content||!refresh||!master)return;
 const origin='https://tyrannosaurusdm92.github.io';
 const viewer=origin+'/LifeHelpers/OurSpace/assets/code/public-profile.html';
 const choices=Array.from(dropdown.querySelectorAll('[data-ourspace-person]'));
 let selected='',frame=null;
 function showMenu(open){dropdown.hidden=!open;menu.setAttribute('aria-expanded',String(open));}
 function paintTabs(){
  trexTab.setAttribute('aria-selected',String(!selected));
  menu.setAttribute('aria-selected',String(!!selected));
  choices.forEach(b=>b.setAttribute('aria-current',String(b.dataset.ourspacePerson===selected)));
 }
 function showTrex(){
  selected='';trex.hidden=false;panel.hidden=true;document.body.classList.remove('osp-active');
  // Clear only our public iframe; never touch authenticated OurSpace states.
  if(frame)frame.remove();frame=null;
  paintTabs();showMenu(false);
 }
 function selectPerson(person,force=false){
  if(person!=='jasper'&&person!=='william')return;
  if(selected===person&&!force){showMenu(false);return;}
  selected=person;trex.hidden=true;panel.hidden=false;document.body.classList.add('osp-active');
  paintTabs();showMenu(false);content.replaceChildren();frame=null;
  status.textContent='Loading '+(person==='jasper'?"Jasper's":"William's")+' published OurSpace modules…';
  const next=document.createElement('iframe');frame=next;
  next.id='ourspaceNativeFrame';
  next.title=(person==='jasper'?'Jasper':'William')+' · Read-only published OurSpace profile';
  next.loading='eager';next.referrerPolicy='no-referrer';
  next.setAttribute('sandbox','allow-scripts allow-same-origin');
  // The native iframe owns its scrolling, so its original draggable heart
  // scrollbar remains functional rather than becoming a decorative marker.
  next.style.height='calc(100dvh - 128px)';
  // The path belongs to the GitHub Pages iframe, never the site's visible URL.
  next.src=viewer+'?profile='+encodeURIComponent(person)+(force?'&refresh='+Date.now():'');
  content.appendChild(next);
  window.scrollTo({top:0,behavior:'auto'});
 }
 trexTab.addEventListener('click',showTrex);
 menu.addEventListener('click',()=>showMenu(dropdown.hidden));
 choices.forEach(button=>button.addEventListener('click',()=>selectPerson(button.dataset.ourspacePerson)));
 refresh.addEventListener('click',()=>{if(selected)selectPerson(selected,true)});
 document.addEventListener('click',e=>{if(!document.getElementById('ourspaceTopTabs').contains(e.target))showMenu(false)});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')showMenu(false)});
 window.addEventListener('message',e=>{
  if(e.origin!==origin||!frame||e.source!==frame.contentWindow)return;
  const m=e.data;
  if(!m||m.type!=='ourspace:public-profile-height'||m.profileKey!==selected)return;
  // Do not auto-expand the frame to the full content height: that would
  // eliminate its scroll range and disable the native heart scrollbar.
  status.textContent='Showing '+(selected==='jasper'?"Jasper's":"William's")+' published OurSpace layout and modules.';
 });
 paintTabs();

 // Preserve the existing T-Rex master nav, plus its optional movable handle.
 const storeKey='trex.master.nav.position.v1';let dragging=null,suppressClick=false;
 function place(x,y){
  const rect=master.getBoundingClientRect(),w=rect.width||58,h=Math.max(58,Math.min(rect.height||58,window.innerHeight-12));
  const left=Math.max(0,Math.min(x,window.innerWidth-w-4));
  const top=Math.max(0,Math.min(y,window.innerHeight-h-4));
  master.classList.add('trex-master-positioned');
  master.style.left=left+'px';master.style.top=top+'px';
 }
 function start(e){
  if(e.button!==0&&e.pointerType!=='touch')return;
  if(e.target!==handle&&e.target!==toggle&&e.target.closest('#masterDragHandle')!==handle)return;
  const r=master.getBoundingClientRect();
  dragging={x:e.clientX,y:e.clientY,left:r.left,top:r.top,id:e.pointerId,moved:false};
  e.currentTarget.setPointerCapture(e.pointerId);
 }
 function move(e){
  if(!dragging||e.pointerId!==dragging.id)return;
  const dx=e.clientX-dragging.x,dy=e.clientY-dragging.y;
  if(Math.hypot(dx,dy)>6)dragging.moved=true;
  if(dragging.moved){e.preventDefault();place(dragging.left+dx,dragging.top+dy)}
 }
 function end(e){
  if(!dragging||e.pointerId!==dragging.id)return;
  const moved=dragging.moved;dragging=null;
  try{e.currentTarget.releasePointerCapture(e.pointerId)}catch(_){}
  if(moved){suppressClick=true;const r=master.getBoundingClientRect();
   try{localStorage.setItem(storeKey,JSON.stringify({x:r.left,y:r.top}))}catch(_){}
  }
 }
 [handle,toggle].forEach(h=>{
  if(!h)return;
  h.addEventListener('pointerdown',start);h.addEventListener('pointermove',move);
  h.addEventListener('pointerup',end);h.addEventListener('pointercancel',()=>dragging=null);
 });
 if(handle)handle.addEventListener('dblclick',()=>{
  master.classList.remove('trex-master-positioned');master.style.left='';master.style.top='';
  try{localStorage.removeItem(storeKey)}catch(_){}
 });
 toggle.addEventListener('click',e=>{
  if(suppressClick){suppressClick=false;e.preventDefault();e.stopImmediatePropagation()}
 },true);
 toggle.addEventListener('click',()=>{
  if(master.classList.contains('trex-master-positioned'))requestAnimationFrame(()=>{
    const r=master.getBoundingClientRect();place(r.left,r.top);
  });
 });
 try{const saved=JSON.parse(localStorage.getItem(storeKey)||'null');
  if(saved&&Number.isFinite(saved.x)&&Number.isFinite(saved.y))place(saved.x,saved.y)
 }catch(_){}
 window.addEventListener('resize',()=>{
  if(master.classList.contains('trex-master-positioned')){
   const r=master.getBoundingClientRect();place(r.left,r.top);
  }
 });
});
})();
