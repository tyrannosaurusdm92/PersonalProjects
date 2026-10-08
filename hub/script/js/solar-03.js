
(function(){
  const pageJump=document.getElementById('bd-page-jump');
  if(pageJump){pageJump.addEventListener('change',e=>{if(e.target.value) location.href=e.target.value;});}
  const earthEl=document.getElementById('bd-earth-time'), azaEl=document.getElementById('bd-belavados-time'), regionSel=document.getElementById('bd-timezone-select');
  try{const saved=localStorage.getItem('azaraRegion');if(saved&&regionSel&&[...regionSel.options].some(o=>o.value===saved))regionSel.value=saved;}catch(e){}
  if(regionSel){regionSel.addEventListener('change',()=>{try{localStorage.setItem('azaraRegion',regionSel.value)}catch(e){} tick();});}
  function tick(){
    const now=new Date();
    if(earthEl){earthEl.textContent=new Intl.DateTimeFormat(undefined,{weekday:'long',year:'numeric',month:'short',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',timeZoneName:'short'}).format(now);}
    const p=azaraNow(now);
    const region=regionSel?regionSel.value:"Belavadös";
    const moon=moonDominanceForHour(p.hourIndex);
    if(azaEl){azaEl.textContent=`${p.weekday}, ${p.month} ${p.dayOfMonth} • Day ${p.dayNumber}/240 • ${p.notation} ${String(p.minute).padStart(2,'0')}:${String(p.second).padStart(2,'0')} • ${moon} • ${region}`;}
  }
  tick();setInterval(tick,1000);
})();
