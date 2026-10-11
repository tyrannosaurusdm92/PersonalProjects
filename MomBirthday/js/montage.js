/* Family birthday montage — one pre-crossfaded offline soundtrack, one complete shuffled photo deck. */
(function(){
 'use strict';
 const data=window.MOM_DATA;
 if(!data || !Array.isArray(data.photos) || !data.audio || !data.tracks){return;}
 const $=id=>document.getElementById(id);
 const audio=new Audio(data.audio.src);
 audio.preload='auto';audio.volume=.92;
 const stage=$('photo-stage'),layers=[$('layer-0'),$('layer-1')],wash=$('photo-transition');
 const intro=$('intro'),outro=$('outro'),scrub=$('scrub'),toggle=$('toggle-btn'),playPath=$('play-icon');
 const playIcon='M8 5v14l11-7z',pauseIcon='M7 5h4v14H7zm7 0h4v14h-4z';
 const durationFallback=data.audio.duration;
 let duration=durationFallback;
 let order=[],segments=[],activeLayer=1,activeClip=-1,visibleToken=0;
 let started=false,finished=false,scrubbing=false,playing=false,muted=false,previousTrack=-1;
 const cached=new Map();
 const specialHold=new Set([0,1,3,4,5,6,7,135,137,140,141,143,144,147,148,150,151,152,154,155,157]);
 const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
 const fmt=v=>{v=Math.max(0,Math.floor(Number(v)||0));return String(Math.floor(v/60)).padStart(2,'0')+':'+String(v%60).padStart(2,'0');};
 function updatePlay(){playPath.setAttribute('d',playing?pauseIcon:playIcon);toggle.setAttribute('aria-label',playing?'Pause':'Play');toggle.title=playing?'Pause':'Play';}
 function warm(src){if(cached.has(src))return;const img=new Image();img.src=src;img.decoding='async';cached.set(src,img);if(cached.size>18)cached.delete(cached.keys().next().value);}
 function shuffleDeck(){
   order=data.photos.slice();
   for(let i=order.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[order[i],order[j]]=[order[j],order[i]];}
   const weights=order.map(p=>{const natural=.86+Math.random()*.36;return natural*(specialHold.has(p.id)?1.42:1);});
   const scale=duration/weights.reduce((a,b)=>a+b,0);
   let t=0;segments=order.map((p,i)=>{const start=t;t+=weights[i]*scale;return {...p,start,duration:weights[i]*scale};});
   if(segments.length)segments[segments.length-1].duration=duration-segments[segments.length-1].start;
   activeClip=-1;visibleToken++;previousTrack=-1;
   for(const layer of layers){layer.classList.remove('is-active');layer.setAttribute('aria-hidden','true');}
 }
 function indexForTime(t){let lo=0,hi=segments.length-1;while(lo<hi){const m=(lo+hi+1)>>1;if(segments[m].start<=t)lo=m;else hi=m-1;}return lo;}
 function highlightPhoto(index,force=false){
   if(index<0||index>=segments.length||(!force&&index===activeClip))return;
   activeClip=index;
   const photo=segments[index];const newLayerIndex=1-activeLayer;
   const incoming=layers[newLayerIndex],outgoing=layers[activeLayer],foreground=incoming.querySelector('.photo-front'),background=incoming.querySelector('.photo-backdrop');
   const token=++visibleToken;
   incoming.classList.remove('is-active');incoming.setAttribute('aria-hidden','true');
   incoming.dataset.direction=index%2?'left':'right';
   const imageSrc=photo.src;
   foreground.src=imageSrc;foreground.alt='';background.style.backgroundImage=`url("${imageSrc.replace(/"/g,'%22')}")`;
   const display=()=>{
     if(token!==visibleToken)return;
     incoming.classList.add('is-active');incoming.setAttribute('aria-hidden','false');
     outgoing.classList.remove('is-active');outgoing.setAttribute('aria-hidden','true');
     activeLayer=newLayerIndex;
     if(started && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){wash.classList.remove('run');void wash.offsetWidth;wash.classList.add('run');}
   };
   if(typeof foreground.decode==='function'){foreground.decode().then(display,display);}else if(foreground.complete)display();else{foreground.onload=display;foreground.onerror=display;}
   stage.setAttribute('aria-label','Family photograph');
   for(let i=1;i<=3;i++){const next=segments[index+i];if(next)warm(next.src);}
 }
 function trackFor(t){let i=0;for(let n=data.tracks.length-1;n>=0;n--)if(t>=data.tracks[n].start){i=n;break;}return i;}
 function publishTime(force=false){
   const t=clamp(Number.isFinite(audio.currentTime)?audio.currentTime:0,0,duration);
   if(!scrubbing){scrub.value=String(t);scrub.style.setProperty('--played',((t/duration)*100).toFixed(3)+'%');$('elapsed').textContent=fmt(t);$('remaining').textContent=fmt(duration-t);}
   const track=trackFor(t);
   if(track!==previousTrack){previousTrack=track;$('track-number').textContent=String(track+1).padStart(2,'0')+' / '+String(data.tracks.length).padStart(2,'0');$('song-label').textContent=data.tracks[track].name;}
   const index=indexForTime(t);
   if(force||index!==activeClip)highlightPhoto(index,force);
   const energy=window.MOM_AUDIO_ENERGY;
   let level=48;
   if(energy && Array.isArray(energy.values) && energy.values.length){level=energy.values[Math.min(energy.values.length-1,Math.max(0,Math.floor(t/(energy.interval||.25))))];}
   window.MOM_MONTAGE_RUNTIME={time:t,energy:level,playing};
 }
 function setDuration(d){if(!Number.isFinite(d)||d<=0)return;duration=d;scrub.max=String(d);if(segments.length){const oldEnd=segments[segments.length-1].start+segments[segments.length-1].duration;const f=d/oldEnd;segments.forEach(s=>{s.start*=f;s.duration*=f;});}publishTime(true);}
 function start(){
   if(!started || finished){
     started=true;finished=false;duration=Number.isFinite(audio.duration)?audio.duration:durationFallback;
     shuffleDeck();audio.currentTime=0;activeLayer=1;highlightPhoto(0,true);
     outro.classList.remove('show');outro.setAttribute('aria-hidden','true');
   }
   intro.classList.add('hidden');
   const p=audio.play();
   if(p&&typeof p.catch==='function')p.catch(()=>{playing=false;updatePlay();intro.classList.remove('hidden');});
 }
 function togglePlayback(){
   if(!started||finished){start();return;}
   if(audio.paused){const p=audio.play();if(p&&p.catch)p.catch(()=>{intro.classList.remove('hidden');});}
   else audio.pause();
 }
 function end(){finished=true;playing=false;updatePlay();scrub.value=String(duration);scrub.style.setProperty('--played','100%');$('elapsed').textContent=fmt(duration);$('remaining').textContent='00:00';outro.classList.add('show');outro.setAttribute('aria-hidden','false');}
 function seekAbsolute(t){
   if(!started){start();return;}
   const value=clamp(t,0,Math.max(0,duration-.1));
   if(finished){finished=false;outro.classList.remove('show');outro.setAttribute('aria-hidden','true');}
   try{audio.currentTime=value;}catch(e){}
   publishTime(true);
 }
 $('begin-btn').addEventListener('click',start);
 $('replay-btn').addEventListener('click',()=>{audio.pause();start();});
 toggle.addEventListener('click',togglePlayback);
 $('back-btn').addEventListener('click',()=>seekAbsolute(audio.currentTime-10));
 $('next-btn').addEventListener('click',()=>seekAbsolute(audio.currentTime+10));
 scrub.addEventListener('pointerdown',()=>scrubbing=true);
 scrub.addEventListener('input',()=>{scrubbing=true;const value=Number(scrub.value);$('elapsed').textContent=fmt(value);$('remaining').textContent=fmt(duration-value);scrub.style.setProperty('--played',((value/duration)*100).toFixed(3)+'%');});
 function commitSeek(){if(scrubbing){scrubbing=false;seekAbsolute(Number(scrub.value));}}
 scrub.addEventListener('change',commitSeek);scrub.addEventListener('pointerup',commitSeek);
 const sound=$('sound-btn');sound.addEventListener('click',()=>{muted=!muted;audio.muted=muted;sound.textContent=muted?'Muted':'Sound';sound.setAttribute('aria-label',muted?'Unmute audio':'Mute audio');});
 const fs=$('fullscreen-btn');fs.addEventListener('click',()=>{if(!document.fullscreenElement){$('experience').requestFullscreen?.().catch(()=>{});}else document.exitFullscreen?.().catch(()=>{});});
 document.addEventListener('fullscreenchange',()=>{fs.setAttribute('aria-label',document.fullscreenElement?'Exit fullscreen':'Enter fullscreen');});
 document.addEventListener('keydown',e=>{
   if(e.altKey||e.ctrlKey||e.metaKey||e.target?.matches?.('input,textarea,select,button'))return;
   if(e.key===' '||e.key.toLowerCase()==='k'){e.preventDefault();togglePlayback();}
   else if(e.key==='ArrowLeft'){e.preventDefault();seekAbsolute(audio.currentTime-10);}
   else if(e.key==='ArrowRight'){e.preventDefault();seekAbsolute(audio.currentTime+10);}
   else if(e.key.toLowerCase()==='m')sound.click();
   else if(e.key.toLowerCase()==='f')fs.click();
 });
 audio.addEventListener('loadedmetadata',()=>setDuration(audio.duration));
 audio.addEventListener('play',()=>{playing=true;updatePlay();});
 audio.addEventListener('pause',()=>{playing=false;updatePlay();});
 audio.addEventListener('ended',end);
 audio.addEventListener('error',()=>{$('song-label').textContent='Audio unavailable';playing=false;updatePlay();});
 audio.addEventListener('seeked',()=>publishTime(true));
 document.addEventListener('visibilitychange',()=>{if(document.hidden && started){/* Audio plays like a keepsake soundtrack when switching away. */}});
 let last=0;function tick(t){if(started&&!finished && t-last>=60){publishTime();last=t;}requestAnimationFrame(tick);}requestAnimationFrame(tick);
 duration=durationFallback;shuffleDeck();highlightPhoto(0,true);publishTime(true);scrub.max=String(duration);updatePlay();
})();
