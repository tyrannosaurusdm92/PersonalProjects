/* One complete Onyx memory folder, one poem, and one Baby Mine recording per viewing.
   Photographs dissolve gently; videos play inline with ORIGINAL SOUND and automatically
   return to the next photograph when the entire clip finishes. */
(function(){
'use strict';
const data=window.ONYX_DATA;
if(!data||!Array.isArray(data.assetGroups)||!data.assetGroups.length||!data.poems?.length)return;
const $=id=>document.getElementById(id);
const refs={
 stage:$('photo-stage'),layers:[$('layer-0'),$('layer-1')],
 videoLayer:$('video-layer'),video:$('memory-video'),unlock:$('video-unlock'),
 wash:$('photo-transition'),scrub:$('scrub'),toggle:$('toggle-btn'),
 playPath:$('play-icon'),intro:$('intro'),outro:$('outro'),
 panel:$('poem-panel'),body:$('poem-body'),title:$('poem-title'),
 date:$('poem-date'),page:$('poem-page'),dedication:$('dedication'),
 dedicationText:$('dedication-text')
};
const audio=new Audio();audio.preload='auto';audio.preservesPitch=true;audio.loop=true;
const PHOTO_SECONDS=9,VIDEO_ESTIMATE=15,BASE_VOLUME=.91,VIDEO_MUSIC_VOLUME=.15,END_FADE_SECONDS=3.5;
const clamp=(value,a,b)=>Math.min(b,Math.max(a,value));
const fmt=t=>{t=Math.max(0,Math.floor(t));return String(Math.floor(t/60)).padStart(2,'0')+':'+String(t%60).padStart(2,'0')};
const shuffle=items=>{const arr=items.slice();for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]]}return arr};
const chapters=data.poems.map(poem=>({
 ...poem,
 pages:poem.text.trim().split(/\n\s*\n/).map(stanza=>stanza.trim()).filter(Boolean)
}));
let slides=[],chosenChapter=null,selectedGroup='',currentIndex=-1,localTime=0,lastFrame=0;
let started=false,playing=false,finished=false,ending=false,scrubbing=false,musicMuted=false;
let endStarted=0,endFadeStartVolume=0,photoToken=0,frontLayer=1,videoOffset=0,poemKey='',preloaded=new Map(),toastTimer=0;
let errorSkipPending=false;

function toast(message){
 const el=$('status');el.textContent=message;el.classList.add('show');
 clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),6000);
}
function preloadPhoto(src){
 if(!src||preloaded.has(src))return;
 const image=new Image();image.decoding='async';image.src=src;preloaded.set(src,image);
 if(preloaded.size>14)preloaded.delete(preloaded.keys().next().value);
}
function makeDeck(){
 const group=data.assetGroups[Math.floor(Math.random()*data.assetGroups.length)];
 selectedGroup=group.name;
 const pictures=shuffle(group.photos),movies=shuffle(group.videos);
 const ordered=[];let p=0;
 // Every photo and video in ONE folder appears once; the final memory is a video.
 movies.forEach((movie,j)=>{
  const stop=Math.round((j+1)*pictures.length/movies.length);
  while(p<stop)ordered.push({type:'photo',src:pictures[p++],duration:PHOTO_SECONDS});
  ordered.push({type:'video',src:movie,duration:VIDEO_ESTIMATE,estimated:true});
 });
 while(p<pictures.length)ordered.push({type:'photo',src:pictures[p++],duration:PHOTO_SECONDS});
 slides=ordered;
 chosenChapter=chapters[Math.random()<.20?0:1]; // 20% Sept. 2024, 80% Nov. 2026
 const soundtrack=data.soundtracks[Math.floor(Math.random()*data.soundtracks.length)];
 audio.pause();audio.src=soundtrack.src;audio.loop=true;audio.volume=BASE_VOLUME;audio.muted=musicMuted;audio.load();
 $('audio-artist').textContent=soundtrack.artist;
 $('chapter-eyebrow').textContent='Our years together · 2016–2026';
 preloaded.clear();poemKey='';refs.stage.classList.remove('has-poem');
 refs.video.pause();refs.video.removeAttribute('src');refs.video.load();
 refs.videoLayer.classList.remove('is-active');refs.videoLayer.setAttribute('aria-hidden','true');
 refs.unlock.hidden=true;refs.layers.forEach(el=>{el.classList.remove('is-active');el.setAttribute('aria-hidden','true')});
 frontLayer=1;currentIndex=-1;localTime=0;photoToken++;errorSkipPending=false;
 if(!movies.length)toast('This folder contains no videos; showing all of its photographs.');
}
const totalDuration=()=>slides.reduce((sum,item)=>sum+item.duration,0);
const position=()=>slides.slice(0,Math.max(0,currentIndex)).reduce((sum,item)=>sum+item.duration,0)+localTime;
function syncIcon(){
 refs.playPath.setAttribute('d',playing?'M7 5h4v14H7zm7 0h4v14h-4z':'M8 5v14l11-7z');
 refs.toggle.setAttribute('aria-label',playing?'Pause':'Play');
 refs.toggle.title=playing?'Pause':'Play';
 $('pulse').classList.toggle('active',playing);
}
function setDedication(index){
 refs.stage.classList.remove('has-poem');poemKey='';
 const phrase=index<=0?'The day I found my forever friend.':
 index<slides.length*.55?'Everywhere we went, home meant you.':'Your paws are written across my heart.';
 if(refs.dedicationText.textContent!==phrase)refs.dedicationText.textContent=phrase;
 refs.dedication.classList.add('show');
}
function updatePoem(){
 if(currentIndex<0||!chosenChapter)return;
 const begin=Math.max(2,Math.floor(slides.length*.07));
 const stop=Math.min(slides.length-2,Math.ceil(slides.length*.94));
 if(currentIndex<begin||currentIndex>=stop){setDedication(currentIndex);return}
 const pageIndex=Math.min(chosenChapter.pages.length-1,Math.floor(
   (currentIndex-begin)/(stop-begin)*chosenChapter.pages.length
 ));
 refs.dedication.classList.remove('show');
 refs.stage.classList.add('has-poem');
 const key=chosenChapter.title+':'+pageIndex;
 if(key===poemKey)return;poemKey=key;
 refs.title.textContent=chosenChapter.title;
 refs.date.textContent=chosenChapter.dateLine||chosenChapter.written;
 refs.page.textContent=String(pageIndex+1).padStart(2,'0')+' / '+String(chosenChapter.pages.length).padStart(2,'0');
 refs.body.textContent=chosenChapter.pages[pageIndex];
}
function revealPhoto(item){
 const token=++photoToken,incoming=refs.layers[1-frontLayer],outgoing=refs.layers[frontLayer];
 const img=incoming.querySelector('.photo-front'),back=incoming.querySelector('.photo-backdrop');
 incoming.classList.remove('is-active');incoming.setAttribute('aria-hidden','true');
 incoming.dataset.direction=currentIndex%2?'left':'right';
 img.src=item.src;img.alt='A treasured photograph of Onyx';
 back.style.backgroundImage='url("'+item.src.replace(/"/g,'%22')+'")';
 const show=()=>{
  if(token!==photoToken||slides[currentIndex]!==item)return;
  incoming.classList.add('is-active');incoming.setAttribute('aria-hidden','false');
  outgoing.classList.remove('is-active');outgoing.setAttribute('aria-hidden','true');
  frontLayer=1-frontLayer;
  refs.videoLayer.classList.remove('is-active');refs.videoLayer.setAttribute('aria-hidden','true');
  refs.unlock.hidden=true;
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
   refs.wash.classList.remove('run');void refs.wash.offsetWidth;refs.wash.classList.add('run');
  }
 };
 img.onerror=()=>{if(token===photoToken){toast('A photograph could not load. Moving to the next memory.');nextSlide()}};
 if(img.decode)img.decode().then(show,()=>{if(img.complete&&img.naturalWidth)show()});
 else if(img.complete&&img.naturalWidth)show();else img.onload=show;
 for(let j=1;j<=3;j++){const upcoming=slides[currentIndex+j];if(upcoming?.type==='photo')preloadPhoto(upcoming.src)}
 refs.stage.setAttribute('aria-label','Photograph of Onyx');
}
function playVideo(){
 if(!started||!playing||finished||ending||slides[currentIndex]?.type!=='video')return;
 refs.video.muted=false;refs.video.volume=1;
 const attempt=refs.video.play();
 if(attempt?.catch)attempt.catch(error=>{
  if(slides[currentIndex]?.type!=='video'||!playing)return;
  refs.videoLayer.classList.add('is-active');refs.videoLayer.setAttribute('aria-hidden','false');
  refs.unlock.hidden=false;
  toast('Your browser needs a tap to allow video playback with sound.');
 });
}
function revealVideo(item,offset){
 photoToken++;
 refs.unlock.hidden=true;
 videoOffset=offset;
 refs.videoLayer.classList.remove('is-active');refs.videoLayer.setAttribute('aria-hidden','false');
 refs.video.pause();refs.video.muted=false;refs.video.volume=1;
 refs.video.src=item.src;refs.video.load();
 const next=slides[currentIndex+1];if(next?.type==='photo')preloadPhoto(next.src);
 if(currentIndex===slides.length-1)audio.loop=false;
 if(playing)playVideo();
 refs.stage.setAttribute('aria-label','Video memory of Onyx, playing with original sound');
}
function activate(index,offset=0){
 if(!slides.length||finished)return;
 if(index>=slides.length){complete();return}
 const item=slides[index];currentIndex=index;
 localTime=clamp(offset,0,Math.max(.01,item.duration-.01));
 if(item.type==='video'){revealVideo(item,localTime)}
 else {
  refs.video.pause();
  revealPhoto(item);
 }
 updatePoem();syncIcon();updateClock();
}
function nextSlide(){if(finished||ending)return;activate(currentIndex+1,0)}
function complete(){
 if(ending||finished)return;
 playing=false;ending=true;endStarted=performance.now();endFadeStartVolume=audio.volume;
 refs.video.pause();syncIcon();
}
function finishOutro(){
 ending=false;finished=true;playing=false;audio.pause();audio.volume=0;
 refs.outro.classList.add('show');refs.outro.setAttribute('aria-hidden','false');
 refs.scrub.value=String(totalDuration());refs.scrub.style.setProperty('--played','100%');
 $('remaining').textContent='00:00';syncIcon();
}
function pause(){
 if(!started||!playing||ending)return;
 playing=false;audio.pause();refs.video.pause();syncIcon();updateClock();
}
function resume(){
 if(!started||finished||ending)return;
 playing=true;lastFrame=performance.now();
 audio.play().catch(()=>toast('Select Play again if your browser prevents music playback.'));
 if(slides[currentIndex]?.type==='video')playVideo();
 refs.intro.classList.add('hidden');syncIcon();
}
function start(){
 if(started&&!finished)return resume();
 started=true;playing=true;finished=false;ending=false;lastFrame=performance.now();
 makeDeck();
 refs.outro.classList.remove('show');refs.outro.setAttribute('aria-hidden','true');
 refs.intro.classList.add('hidden');
 activate(0,0);
 audio.play().catch(()=>toast('Your browser prevented music playback; select Play to enable audio.'));
 syncIcon();
}
function seek(target){
 if(!started){start();return}
 if(ending||finished)return;
 let t=clamp(target,0,Math.max(0,totalDuration()-.01));
 let next=slides.length-1,offset=0;
 for(let i=0;i<slides.length;i++){
  if(t<slides[i].duration||i===slides.length-1){next=i;offset=t;break}
  t-=slides[i].duration;
 }
 const wasPlaying=playing;
 if(slides[next]?.type==='video'&&next===currentIndex){
  localTime=offset;
  if(refs.video.readyState>=1){try{refs.video.currentTime=offset}catch(_){}}
  else videoOffset=offset;
 }else activate(next,offset);
 if(wasPlaying&&!playing)resume();
 updatePoem();updateClock();
}
function updateClock(){
 if(!started||scrubbing)return;
 const total=totalDuration(),pos=clamp(position(),0,total);
 refs.scrub.max=String(total);refs.scrub.value=String(pos);
 refs.scrub.style.setProperty('--played',(total?pos/total*100:0).toFixed(3)+'%');
 $('elapsed').textContent=fmt(pos);$('remaining').textContent=fmt(total-pos);
 window.ONYX_RUNTIME={time:pos,playing,energy:44+12*Math.sin(pos*.11)+8*Math.sin(pos*.024)};
}
refs.video.addEventListener('loadedmetadata',()=>{
 const item=slides[currentIndex];
 if(!item||item.type!=='video'||!Number.isFinite(refs.video.duration))return;
 item.duration=Math.max(.1,refs.video.duration);
 item.estimated=false;
 if(videoOffset>0){try{refs.video.currentTime=clamp(videoOffset,0,Math.max(0,item.duration-.05))}catch(_){}}
 videoOffset=0;updateClock();
});
refs.video.addEventListener('playing',()=>{
 if(slides[currentIndex]?.type!=='video')return;
 refs.videoLayer.classList.add('is-active');
 refs.videoLayer.setAttribute('aria-hidden','false');
 refs.unlock.hidden=true;
});
refs.video.addEventListener('ended',()=>{
 if(slides[currentIndex]?.type!=='video'||finished||ending)return;
 localTime=slides[currentIndex].duration;
 nextSlide();
});
refs.video.addEventListener('error',()=>{
 if(slides[currentIndex]?.type!=='video'||errorSkipPending)return;
 errorSkipPending=true;
 toast('This video could not be loaded by the browser; continuing to the next memory.');
 setTimeout(()=>{errorSkipPending=false;if(slides[currentIndex]?.type==='video')nextSlide()},900);
});
refs.unlock.addEventListener('click',()=>{playVideo()});
$('begin-btn').addEventListener('click',start);
$('replay-btn').addEventListener('click',()=>{started=false;playing=false;finished=true;start()});
refs.toggle.addEventListener('click',()=>{if(!started||finished)start();else if(playing)pause();else resume()});
$('back-btn').addEventListener('click',()=>seek(position()-10));
$('next-btn').addEventListener('click',()=>seek(position()+10));
refs.scrub.addEventListener('pointerdown',()=>{scrubbing=true});
refs.scrub.addEventListener('input',()=>{
 scrubbing=true;const t=Number(refs.scrub.value),total=totalDuration();
 $('elapsed').textContent=fmt(t);$('remaining').textContent=fmt(total-t);
 refs.scrub.style.setProperty('--played',(total?t/total*100:0).toFixed(3)+'%');
});
function commitSeek(){if(!scrubbing)return;scrubbing=false;seek(Number(refs.scrub.value))}
refs.scrub.addEventListener('change',commitSeek);refs.scrub.addEventListener('pointerup',commitSeek);
$('sound-btn').addEventListener('click',()=>{
 musicMuted=!musicMuted;audio.muted=musicMuted;
 $('sound-btn').textContent=musicMuted?'Music muted':'Music on';
 $('sound-btn').setAttribute('aria-label',musicMuted?'Unmute background music':'Mute background music');
});
const fs=$('fullscreen-btn');
fs.addEventListener('click',()=>{
 if(!document.fullscreenElement)$('experience').requestFullscreen?.().catch(()=>{});
 else document.exitFullscreen?.().catch(()=>{});
});
document.addEventListener('fullscreenchange',()=>fs.setAttribute('aria-label',document.fullscreenElement?'Exit fullscreen':'Enter fullscreen'));
document.addEventListener('keydown',event=>{
 if(event.altKey||event.ctrlKey||event.metaKey||event.target?.matches?.('input,textarea,select,button'))return;
 const k=event.key.toLowerCase();
 if(k===' '||k==='k'){event.preventDefault();refs.toggle.click()}
 else if(k==='arrowleft'){event.preventDefault();seek(position()-10)}
 else if(k==='arrowright'){event.preventDefault();seek(position()+10)}
 else if(k==='m')$('sound-btn').click();
 else if(k==='f')fs.click();
});
audio.addEventListener('error',()=>toast('The selected Baby Mine recording could not load. Verify assets/audio in GitHub.'));
document.addEventListener('visibilitychange',()=>{if(document.hidden&&playing)pause()});
function frame(now){
 const delta=Math.min(.5,Math.max(0,(now-(lastFrame||now))/1000));lastFrame=now;
 if(started&&!finished){
  if(playing&&slides[currentIndex]?.type==='photo'){
   localTime+=delta;
   if(localTime>=slides[currentIndex].duration)nextSlide();
  }else if(slides[currentIndex]?.type==='video'&&refs.video.readyState>=1){
   localTime=refs.video.currentTime||0;
  }
  if(ending){
   const fraction=clamp((now-endStarted)/(END_FADE_SECONDS*1000),0,1);
   audio.volume=Math.max(0,endFadeStartVolume*(1-fraction));
   if(fraction>=1)finishOutro();
  }else{
   const item=slides[currentIndex];
   let goal=item?.type==='video'?VIDEO_MUSIC_VOLUME:BASE_VOLUME;
   if(item?.type==='video'&&currentIndex===slides.length-1){
    const remaining=Math.max(0,item.duration-localTime);
    goal*=clamp(remaining/10,0,1);
   }
   audio.volume+=clamp(goal-audio.volume,-.017,.017);
  }
  updateClock();
 }
 requestAnimationFrame(frame);
}
syncIcon();requestAnimationFrame(frame);
})();