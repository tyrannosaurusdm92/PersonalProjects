/* Memorial experience: timed photo dissolves and two complete poems, built on the MomBirthday playback pattern.
 * The sole audio source is the ORIGINAL Betty Noyes MP3 already present under OnyxTribute/audio.
 * Song repeats at its natural speed to fill the 13:37 birthday-length presentation.
 */
(function(){'use strict';
 const data=window.ONYX_DATA;if(!data||!Array.isArray(data.photos)||!data.photos.length||!data.poems?.length)return;
 const $=id=>document.getElementById(id),D=data.lengthSeconds;
 const audio=new Audio(data.audio);audio.preload='metadata';audio.volume=.91;audio.loop=false;audio.preservesPitch=true;
 const refs={stage:$('photo-stage'),layers:[$('layer-0'),$('layer-1')],wash:$('photo-transition'),scrub:$('scrub'),toggle:$('toggle-btn'),playPath:$('play-icon'),intro:$('intro'),outro:$('outro'),panel:$('poem-panel'),body:$('poem-body'),title:$('poem-title'),date:$('poem-date'),page:$('poem-page'),dedication:$('dedication'),dedicationText:$('dedication-text')};
 const playPath='M8 5v14l11-7z',pausePath='M7 5h4v14H7zm7 0h4v14h-4z';
 const clean=s=>String(s||'').trim();const clamp=(n,min,max)=>Math.min(max,Math.max(min,n));const fmt=t=>{t=Math.max(0,Math.floor(t));return String(Math.floor(t/60)).padStart(2,'0')+':'+String(t%60).padStart(2,'0')};
 const photoDeck=data.photos.slice(),videoDeck=(data.videos||[]).slice();let slides=[],photoIndex=-1,frontLayer=1,photoToken=0,poemKey='',cached=new Map(),videoActive=false,videoCursor=-1,waitingForSong=false,targetMusic=.91;let elapsed=0,anchor=0,playing=false,started=false,finished=false,scrubbing=false,muted=false,loading=false,lastAudioError=false,alertTimeout=0;
 const chapters=data.poems.map(poem=>{const pages=poem.text.trim().split(/\n\s*\n/g).map(stanza=>stanza.split(/\n/).map(clean).filter(Boolean).join('\n')).filter(Boolean);return{...poem,pages}});
 const playlist=[{start:52,end:455,chapter:0},{start:472,end:775,chapter:1}];
 function toast(message){const el=$('status');el.textContent=message;el.classList.add('show');clearTimeout(alertTimeout);alertTimeout=setTimeout(()=>el.classList.remove('show'),5200)}
 function time(){return clamp(playing?elapsed+(performance.now()-anchor)/1000:elapsed,0,D)}
 function audioSeek(t){if(audio.readyState<1||!Number.isFinite(audio.duration)||audio.duration<=0)return;const v=t%audio.duration;try{if(Math.abs(audio.currentTime-v)>.2)audio.currentTime=v}catch(_){}}
 function syncIcon(){refs.playPath.setAttribute('d',playing?pausePath:playPath);refs.toggle.setAttribute('aria-label',playing?'Pause':'Play');refs.toggle.title=playing?'Pause':'Play';$('pulse').classList.toggle('active',playing)}
 function preload(src){if(cached.has(src))return;const img=new Image();img.decoding='async';img.src=src;cached.set(src,img);if(cached.size>16)cached.delete(cached.keys().next().value)}
 // Shuffle without reusing photographs or clips. Two pre-adoption photos always open the memoir.
 function shuffle(items){const a=items.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
 function freshDeck(){
   closeVideo();waitingForSong=false;targetMusic=.91;
   const early=photoDeck.filter(p=>p.preAdoption);
   const older=shuffle(photoDeck.filter(p=>p.era==='older'&&!p.preAdoption));
   const newer=shuffle(photoDeck.filter(p=>p.era==='newer'));
   const chosen=[...early,...older.slice(0,43),...newer.slice(0,93)];
   const videos=shuffle(videoDeck),slotSize=chosen.length/(videos.length+1);
   let mixed=[],v=0;
   for(let i=0;i<chosen.length;i++){
     mixed.push({...chosen[i],type:'photo'});
     if(v<videos.length&&i+1>=Math.round((v+1)*slotSize)){
       mixed.push({...videos[v],type:'video'});v++;
     }
   }
   const step=D/mixed.length;
   slides=mixed.map((item,i)=>({...item,start:i*step}));
   frontLayer=1;photoIndex=-1;photoToken++;
   refs.layers.forEach(el=>{el.classList.remove('is-active');el.setAttribute('aria-hidden','true')});
 }
 function photoFor(t){return Math.min(slides.length-1,Math.max(0,Math.floor(t/D*slides.length)))}
 function drawPhoto(i,force){if(i===photoIndex&&!force||!slides[i])return;photoIndex=i;
  if(slides[i].type==='video'){showVideo(i);return;}const incoming=refs.layers[1-frontLayer],outgoing=refs.layers[frontLayer],fore=incoming.querySelector('.photo-front'),back=incoming.querySelector('.photo-backdrop');const src=slides[i].src,token=++photoToken;
  incoming.classList.remove('is-active');incoming.setAttribute('aria-hidden','true');incoming.dataset.direction=i%2?'left':'right';fore.src=src;fore.alt=slides[i].alt;back.style.backgroundImage=`url("${src.replace(/"/g,'%22')}")`;
  const display=()=>{if(token!==photoToken)return;incoming.classList.add('is-active');incoming.setAttribute('aria-hidden','false');outgoing.classList.remove('is-active');outgoing.setAttribute('aria-hidden','true');frontLayer=1-frontLayer;if(started&&!matchMedia('(prefers-reduced-motion:reduce)').matches){refs.wash.classList.remove('run');void refs.wash.offsetWidth;refs.wash.classList.add('run')}};
  if(fore.decode){fore.decode().then(display,display)}else if(fore.complete){display()}else{fore.onload=display;fore.onerror=display}
  refs.stage.setAttribute('aria-label','Photograph of Onyx');for(let j=1;j<=3;j++)if(slides[i+j])preload(slides[i+j].src)
 }
 function closeVideo(){
   if(!videoActive)return;
   $('memory-video').src='about:blank';
   $('video-overlay').classList.remove('show');
   $('video-overlay').setAttribute('aria-hidden','true');
   refs.stage.classList.remove('showing-video');
   videoActive=false;videoCursor=-1;targetMusic=.91;
 }
 function showVideo(i){
   if(videoActive&&videoCursor===i)return;
   closeVideo();videoActive=true;videoCursor=i;elapsed=slides[i].start+.001;playing=false;
   refs.stage.classList.remove('has-poem');refs.dedication.classList.remove('show');poemKey='';
   refs.stage.classList.add('showing-video');
   $('video-title').textContent='Onyx on film · '+(i+1)+' / '+slides.length;
   $('memory-video').src=slides[i].preview;
   $('video-overlay').classList.add('show');
   $('video-overlay').setAttribute('aria-hidden','false');
   targetMusic=.13;syncIcon();
 }
 function chapterAt(t){for(const section of playlist){if(t>=section.start&&t<section.end){const chapter=chapters[section.chapter];const i=Math.min(chapter.pages.length-1,Math.floor((t-section.start)/(section.end-section.start)*chapter.pages.length));return{chapter,chapterIndex:section.chapter,pageIndex:i}}}return null}
 function showPoem(page){refs.dedication.classList.remove('show');refs.stage.classList.add('has-poem');const key=page.chapterIndex+':'+page.pageIndex;if(poemKey===key)return;poemKey=key;refs.panel.classList.add('changing');const chapter=page.chapter;refs.title.textContent=chapter.title;refs.date.textContent=chapter.dateLine||('Written '+chapter.written);refs.page.textContent=String(page.pageIndex+1).padStart(2,'0')+' / '+String(chapter.pages.length).padStart(2,'0');
  // Display one original poetic stanza per card, preserving 4- and 5-line stanzas.
  refs.body.textContent=chapter.pages[page.pageIndex];refs.panel.classList.remove('changing');
 }
 function showDedication(t){refs.stage.classList.remove('has-poem');poemKey='';let text='';if(t<24)text='The day I found my forever friend.';else if(t<52)text='A royal heart wrapped in midnight fur.';else if(t<472)text='Everywhere we went, home meant you.';else text='Your paws are written across my heart.';if(refs.dedicationText.textContent!==text)refs.dedicationText.textContent=text;refs.dedication.classList.add('show')}
 function paint(force){
  if(!slides.length)return;
  const t=time(),index=photoFor(t);drawPhoto(index,force);
  if(!videoActive){const chapter=chapterAt(t);if(chapter)showPoem(chapter);else showDedication(t)}
  if(!scrubbing){refs.scrub.value=String(t);refs.scrub.style.setProperty('--played',(t/D*100).toFixed(3)+'%');$('elapsed').textContent=fmt(t);$('remaining').textContent=fmt(D-t)}
  window.ONYX_RUNTIME={time:t,playing,energy:44+12*Math.sin(t*.11)+8*Math.sin(t*.024)};
  // Do not truncate the final repeat mid-song. Hold the last photo until Baby Mine ends by itself.
  if(t>=D-.04&&!finished&&!videoActive&&!waitingForSong){waitingForSong=true;elapsed=D;playing=false;syncIcon()}
  if(waitingForSong&&audio.ended&&!finished)end();
 }
 function pause(){if(videoActive){toast('Use the video player controls, then choose Continue tribute.');return}if(playing){elapsed=time();playing=false;audio.pause();syncIcon();paint(false)}}
 async function resume(){if(videoActive||waitingForSong||loading)return;loading=true;if(audio.readyState>=1)audioSeek(elapsed);try{await audio.play();anchor=performance.now();playing=true;started=true;lastAudioError=false;refs.intro.classList.add('hidden');syncIcon()}catch(err){playing=false;syncIcon();refs.intro.classList.remove('hidden');toast('Playback needs a click on the play button, or the audio file could not load.');}finally{loading=false}}
 async function begin(){if(finished||!started){finished=false;started=true;elapsed=0;freshDeck();paint(true);refs.outro.classList.remove('show');refs.outro.setAttribute('aria-hidden','true')}await resume()}
 function toggle(){if(videoActive){toast('Play this video with its original sound, then choose Continue tribute.');return}if(!started||finished){begin();return}if(playing){pause()}else{resume()}}
 function seek(t){
   if(!started){begin();return}
   closeVideo();waitingForSong=false;
   const v=clamp(t,0,D-.04),wasPlaying=playing;
   if(playing){elapsed=time();audio.pause();playing=false}
   finished=false;refs.outro.classList.remove('show');refs.outro.setAttribute('aria-hidden','true');
   elapsed=v;audioSeek(v);if(wasPlaying)resume();else syncIcon();paint(true);
 }
 function end(){closeVideo();elapsed=D;playing=false;finished=true;waitingForSong=false;audio.pause();syncIcon();refs.outro.classList.add('show');refs.outro.setAttribute('aria-hidden','false');refs.scrub.value=String(D);refs.scrub.style.setProperty('--played','100%');$('elapsed').textContent=fmt(D);$('remaining').textContent='00:00'}
 $('video-continue').addEventListener('click',()=>{
   if(!videoActive)return;
   const index=videoCursor,next=slides[index+1];
   closeVideo();elapsed=next?Math.min(D-.04,next.start+.02):D-.04;
   anchor=performance.now();playing=true;started=true;refs.intro.classList.add('hidden');
   syncIcon();paint(true);
 });
 $('begin-btn').addEventListener('click',begin);$('replay-btn').addEventListener('click',()=>{audio.pause();playing=false;finished=true;begin()});refs.toggle.addEventListener('click',toggle);$('back-btn').addEventListener('click',()=>seek(time()-10));$('next-btn').addEventListener('click',()=>seek(time()+10));
 refs.scrub.max=String(D);refs.scrub.addEventListener('pointerdown',()=>scrubbing=true);refs.scrub.addEventListener('input',()=>{scrubbing=true;const t=Number(refs.scrub.value);$('elapsed').textContent=fmt(t);$('remaining').textContent=fmt(D-t);refs.scrub.style.setProperty('--played',(t/D*100).toFixed(3)+'%')});function commit(){if(scrubbing){scrubbing=false;seek(Number(refs.scrub.value))}}refs.scrub.addEventListener('change',commit);refs.scrub.addEventListener('pointerup',commit);
 $('sound-btn').addEventListener('click',()=>{muted=!muted;audio.muted=muted;$('sound-btn').textContent=muted?'Music muted':'Music on';$('sound-btn').setAttribute('aria-label',muted?'Unmute background music':'Mute background music')});
 const fs=$('fullscreen-btn');fs.addEventListener('click',()=>{if(!document.fullscreenElement)$('experience').requestFullscreen?.().catch(()=>{});else document.exitFullscreen?.().catch(()=>{})});document.addEventListener('fullscreenchange',()=>fs.setAttribute('aria-label',document.fullscreenElement?'Exit fullscreen':'Enter fullscreen'));
 document.addEventListener('keydown',e=>{if(e.altKey||e.ctrlKey||e.metaKey||e.target?.matches?.('input,textarea,select,button'))return;if(e.key===' '||e.key.toLowerCase()==='k'){e.preventDefault();toggle()}else if(e.key==='ArrowLeft'){e.preventDefault();seek(time()-10)}else if(e.key==='ArrowRight'){e.preventDefault();seek(time()+10)}else if(e.key.toLowerCase()==='m')$('sound-btn').click();else if(e.key.toLowerCase()==='f')fs.click()});
 audio.addEventListener('ended',()=>{
  if(finished||!started)return;
  if(waitingForSong||(!videoActive&&time()>=D-.04)){end();return}
  // Repeat only complete performances; the final performance finishes naturally.
  audio.currentTime=0;audio.play().catch(()=>toast('Select Play to resume the song.'));
 });
 audio.addEventListener('loadedmetadata',()=>{if(started&&!videoActive&&!waitingForSong)audioSeek(time())});audio.addEventListener('error',()=>{
  // If the downloaded ZIP is opened outside GitHub, load the SAME existing song directly from the repo.
  if(lastAudioError)return;lastAudioError=true;
  if(!audio.src.includes('raw.githubusercontent.com')){audio.src='https://raw.githubusercontent.com/tyrannosaurusdm92/PersonalProjects/main/OnyxTribute/'+encodeURI(data.audio);audio.load();toast('Using the original Baby Mine file from the OnyxTribute repository.')}else{pause();toast('The original Baby Mine audio could not be loaded. Check the preserved OnyxTribute/audio file.')}
 });
 document.addEventListener('visibilitychange',()=>{if(document.hidden&&playing)pause()});
 function tick(){
   if(Math.abs(audio.volume-targetMusic)>.004)audio.volume+=(targetMusic-audio.volume)*.075;
   else if(audio.volume!==targetMusic)audio.volume=targetMusic;
   if(started&&!finished)paint(false);
   requestAnimationFrame(tick)
 }freshDeck();paint(true);syncIcon();requestAnimationFrame(tick);
})();
