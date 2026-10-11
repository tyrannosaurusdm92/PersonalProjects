/* Family birthday montage — three small offline audio files, with smooth crossfades. */
(function(){
 'use strict';
 const data=window.MOM_DATA;
 if(!data || !Array.isArray(data.photos) || !data.audio?.segments?.length || !data.tracks) return;
 const $=id=>document.getElementById(id);
 const segmentsAudio=data.audio.segments;
 const players=segmentsAudio.map(segment=>{
   const audio=new Audio(segment.src);
   audio.preload='auto';
   audio.volume=.92;
   return audio;
 });
 const stage=$('photo-stage'),layers=[$('layer-0'),$('layer-1')],wash=$('photo-transition');
 const intro=$('intro'),outro=$('outro'),scrub=$('scrub'),toggle=$('toggle-btn'),playPath=$('play-icon');
 const playIcon='M8 5v14l11-7z',pauseIcon='M7 5h4v14H7zm7 0h4v14h-4z';
 const duration=data.audio.duration;
 const targetVolume=.92;
 let order=[],segments=[],activeLayer=1,activeClip=-1,visibleToken=0;
 let started=false,finished=false,scrubbing=false,playing=false,muted=false,previousTrack=-1;
 let activeIndex=0,transition=null,session=0,preparing=false;
 const cached=new Map();
 const specialHold=new Set([0,1,3,4,5,6,7,135,137,140,141,143,144,147,148,150,151,152,154,155,157]);
 const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
 const fmt=v=>{v=Math.max(0,Math.floor(Number(v)||0));return String(Math.floor(v/60)).padStart(2,'0')+':'+String(v%60).padStart(2,'0');};
 const globalTime=()=>clamp(segmentsAudio[activeIndex].start + (Number(players[activeIndex].currentTime)||0),0,duration);
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
   const photo=segments[index],newLayerIndex=1-activeLayer;
   const incoming=layers[newLayerIndex],outgoing=layers[activeLayer],foreground=incoming.querySelector('.photo-front'),background=incoming.querySelector('.photo-backdrop');
   const token=++visibleToken;
   incoming.classList.remove('is-active');incoming.setAttribute('aria-hidden','true');
   incoming.dataset.direction=index%2?'left':'right';
   const imageSrc=photo.src;
   foreground.src=imageSrc;foreground.alt='';background.style.backgroundImage=`url("${imageSrc.replace(/"/g,'%22')}")`;
   const display=()=>{
     if(token!==visibleToken)return;
     incoming.classList.add('is-active');incoming.setAttribute('aria-hidden','false');
     outgoing.classList.remove('is-active');outgoing.setAttribute('aria-hidden','true');activeLayer=newLayerIndex;
     if(started && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){wash.classList.remove('run');void wash.offsetWidth;wash.classList.add('run');}
   };
   if(typeof foreground.decode==='function'){foreground.decode().then(display,display);}else if(foreground.complete)display();else{foreground.onload=display;foreground.onerror=display;}
   stage.setAttribute('aria-label','Family photograph');
   for(let i=1;i<=3;i++){const next=segments[index+i];if(next)warm(next.src);}
 }
 function trackFor(t){let i=0;for(let n=data.tracks.length-1;n>=0;n--)if(t>=data.tracks[n].start){i=n;break;}return i;}
 function publishTime(force=false){
   const t=globalTime();
   if(!scrubbing){scrub.value=String(t);scrub.style.setProperty('--played',((t/duration)*100).toFixed(3)+'%');$('elapsed').textContent=fmt(t);$('remaining').textContent=fmt(duration-t);}
   const track=trackFor(t);
   if(track!==previousTrack){previousTrack=track;$('track-number').textContent=String(track+1).padStart(2,'0')+' / '+String(data.tracks.length).padStart(2,'0');$('song-label').textContent=data.tracks[track].name;}
   const index=indexForTime(t);
   if(force||index!==activeClip)highlightPhoto(index,force);
   const energy=window.MOM_AUDIO_ENERGY;let level=48;
   if(energy && Array.isArray(energy.values) && energy.values.length){level=energy.values[Math.min(energy.values.length-1,Math.max(0,Math.floor(t/(energy.interval||.25))))];}
   window.MOM_MONTAGE_RUNTIME={time:t,energy:level,playing};
 }
 function stopPlayers(){session++;for(const a of players){a.pause();a.volume=targetVolume;}transition=null;preparing=false;}
 function setPlayerTime(index,global){
   const audio=players[index];const local=clamp(global-segmentsAudio[index].start,0,Math.max(0,segmentsAudio[index].duration-.05));
   try{audio.currentTime=local;}catch(e){}
 }
 function setTransitionVolumes(t){
   if(!transition)return;
   const {outgoing,incoming,start,end}=transition;
   const progress=clamp((t-start)/(end-start),0,1);
   players[outgoing].volume=targetVolume*(1-progress);
   players[incoming].volume=targetVolume*progress;
   // Keep the two overlapping copies of the already-mixed soundtrack aligned.
   if(progress>0&&progress<1){
     const difference=segmentsAudio[outgoing].start+players[outgoing].currentTime-t;
     if(Math.abs(difference)>.16){setPlayerTime(outgoing,t);}
   }
   if(progress>=1){players[outgoing].pause();players[outgoing].volume=targetVolume;players[incoming].volume=targetVolume;transition=null;}
 }
 async function transitionIfDue(t){
   if(!playing||transition||preparing||activeIndex>=players.length-1)return;
   const next=activeIndex+1,segment=segmentsAudio[next];
   if(t+0.001<segment.start)return;
   const oldIndex=activeIndex,oldPlayer=players[oldIndex],newPlayer=players[next];
   preparing=true;
   const generation=session;
   setPlayerTime(next,t);
   newPlayer.volume=0;
   try{
     await newPlayer.play();
     if(generation!==session||!playing){newPlayer.pause();return;}
     activeIndex=next;
     transition={outgoing:oldIndex,incoming:next,start:segment.start,end:segmentsAudio[oldIndex].end};
     setTransitionVolumes(globalTime());
   }catch(e){
     // If autoplay is interrupted, retain the currently playing audio and retry.
     if(generation===session){newPlayer.pause();}
   }finally{if(generation===session)preparing=false;}
 }
 function setPosition(t){
   const target=clamp(t,0,Math.max(0,duration-.08));
   stopPlayers();
   let selected=0;
   for(let i=segmentsAudio.length-1;i>=0;i--){if(target>=segmentsAudio[i].start){selected=i;break;}}
   activeIndex=selected;setPlayerTime(selected,target);
   if(started&&!finished&&playing){players[selected].play().catch(()=>{playing=false;updatePlay();});}
   publishTime(true);
 }
 function start(){
   const newRun=!started||finished;
   if(newRun){
     stopPlayers();started=true;finished=false;playing=false;activeIndex=0;
     shuffleDeck();setPlayerTime(0,0);activeLayer=1;highlightPhoto(0,true);
     outro.classList.remove('show');outro.setAttribute('aria-hidden','true');
   }
   intro.classList.add('hidden');
   const current=players[activeIndex];
   current.play().then(()=>{playing=true;updatePlay();}).catch(()=>{playing=false;updatePlay();intro.classList.remove('hidden');});
 }
 function togglePlayback(){
   if(!started||finished){start();return;}
   if(playing){for(const a of players)a.pause();playing=false;updatePlay();}
   else{
     players[activeIndex].play().then(()=>{
       if(transition)players[transition.outgoing].play().catch(()=>{});
       playing=true;updatePlay();
     }).catch(()=>{intro.classList.remove('hidden');});
   }
 }
 function end(){for(const a of players)a.pause();finished=true;playing=false;updatePlay();scrub.value=String(duration);scrub.style.setProperty('--played','100%');$('elapsed').textContent=fmt(duration);$('remaining').textContent='00:00';outro.classList.add('show');outro.setAttribute('aria-hidden','false');}
 function seekAbsolute(t){
   if(!started){start();return;}
   const wasPlaying=playing;
   if(finished){finished=false;outro.classList.remove('show');outro.setAttribute('aria-hidden','true');}
   playing=wasPlaying;
   setPosition(t);
 }
 $('begin-btn').addEventListener('click',start);
 $('replay-btn').addEventListener('click',()=>{stopPlayers();finished=true;start();});
 toggle.addEventListener('click',togglePlayback);
 $('back-btn').addEventListener('click',()=>seekAbsolute(globalTime()-10));
 $('next-btn').addEventListener('click',()=>seekAbsolute(globalTime()+10));
 scrub.addEventListener('pointerdown',()=>scrubbing=true);
 scrub.addEventListener('input',()=>{scrubbing=true;const value=Number(scrub.value);$('elapsed').textContent=fmt(value);$('remaining').textContent=fmt(duration-value);scrub.style.setProperty('--played',((value/duration)*100).toFixed(3)+'%');});
 function commitSeek(){if(scrubbing){scrubbing=false;seekAbsolute(Number(scrub.value));}}
 scrub.addEventListener('change',commitSeek);scrub.addEventListener('pointerup',commitSeek);
 const sound=$('sound-btn');sound.addEventListener('click',()=>{muted=!muted;players.forEach(a=>a.muted=muted);sound.textContent=muted?'Muted':'Sound';sound.setAttribute('aria-label',muted?'Unmute audio':'Mute audio');});
 const fs=$('fullscreen-btn');fs.addEventListener('click',()=>{if(!document.fullscreenElement){$('experience').requestFullscreen?.().catch(()=>{});}else document.exitFullscreen?.().catch(()=>{});});
 document.addEventListener('fullscreenchange',()=>{fs.setAttribute('aria-label',document.fullscreenElement?'Exit fullscreen':'Enter fullscreen');});
 document.addEventListener('keydown',e=>{
   if(e.altKey||e.ctrlKey||e.metaKey||e.target?.matches?.('input,textarea,select,button'))return;
   if(e.key===' '||e.key.toLowerCase()==='k'){e.preventDefault();togglePlayback();}
   else if(e.key==='ArrowLeft'){e.preventDefault();seekAbsolute(globalTime()-10);}
   else if(e.key==='ArrowRight'){e.preventDefault();seekAbsolute(globalTime()+10);}
   else if(e.key.toLowerCase()==='m')sound.click();
   else if(e.key.toLowerCase()==='f')fs.click();
 });
 players.forEach((audio,index)=>{
   audio.addEventListener('ended',()=>{
     if(!finished&&started&&index===activeIndex){
       if(index===players.length-1)end();
       else if(!preparing)transitionIfDue(globalTime());
     }
   });
   audio.addEventListener('error',()=>{
     if(index===activeIndex){$('song-label').textContent='Audio unavailable';playing=false;updatePlay();}
   });
   audio.addEventListener('timeupdate',()=>{
     if(started&&!finished&&playing){const t=globalTime();if(transition)setTransitionVolumes(t);else transitionIfDue(t);}
   });
 });
 function tick(){
   if(started&&!finished){
     const t=globalTime();
     if(transition)setTransitionVolumes(t);
     else transitionIfDue(t);
     publishTime();
   }
   requestAnimationFrame(tick);
 }
 duration>0&&shuffleDeck();highlightPhoto(0,true);publishTime(true);scrub.max=String(duration);updatePlay();requestAnimationFrame(tick);
})();
