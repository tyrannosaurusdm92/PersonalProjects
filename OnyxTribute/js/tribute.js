/* Memorial experience: timed photo dissolves and two complete poems, built on the MomBirthday playback pattern.
 * The sole audio source is the ORIGINAL Betty Noyes MP3 already present under OnyxTribute/audio.
 * Song repeats at its natural speed to fill the 13:37 birthday-length presentation.
 */
(function(){'use strict';
 const data=window.ONYX_DATA;if(!data||!Array.isArray(data.photos)||!data.photos.length||!data.poems?.length)return;
 const $=id=>document.getElementById(id),D=data.lengthSeconds;
 const audio=new Audio(data.audio);audio.preload='metadata';audio.volume=.91;audio.loop=true;audio.preservesPitch=true;
 const refs={stage:$('photo-stage'),layers:[$('layer-0'),$('layer-1')],wash:$('photo-transition'),scrub:$('scrub'),toggle:$('toggle-btn'),playPath:$('play-icon'),intro:$('intro'),outro:$('outro'),panel:$('poem-panel'),body:$('poem-body'),title:$('poem-title'),date:$('poem-date'),page:$('poem-page'),dedication:$('dedication'),dedicationText:$('dedication-text')};
 const playPath='M8 5v14l11-7z',pausePath='M7 5h4v14H7zm7 0h4v14h-4z';
 const assetSrc=(path)=>window.ONYX_MEDIA?.[path]||path;
 const clean=s=>String(s||'').trim();const clamp=(n,min,max)=>Math.min(max,Math.max(min,n));const fmt=t=>{t=Math.max(0,Math.floor(t));return String(Math.floor(t/60)).padStart(2,'0')+':'+String(t%60).padStart(2,'0')};
 const photoDeck=data.photos.slice();let slides=[],photoIndex=-1,frontLayer=1,photoToken=0,poemKey='',cached=new Map();let elapsed=0,anchor=0,playing=false,started=false,finished=false,scrubbing=false,muted=false,loading=false,lastAudioError=false,alertTimeout=0;
 const chapters=data.poems.map(poem=>{const stanzas=poem.text.split(/\n\s*\n/).map(clean).filter(Boolean);const pages=[];for(let i=0;i<stanzas.length;i+=2)pages.push(stanzas.slice(i,i+2).join('\n\n'));return{...poem,pages}});
 const playlist=[{start:52,end:455,chapter:0},{start:472,end:775,chapter:1}];
 function toast(message){const el=$('status');el.textContent=message;el.classList.add('show');clearTimeout(alertTimeout);alertTimeout=setTimeout(()=>el.classList.remove('show'),5200)}
 function time(){return clamp(playing?elapsed+(performance.now()-anchor)/1000:elapsed,0,D)}
 function audioSeek(t){if(audio.readyState<1||!Number.isFinite(audio.duration)||audio.duration<=0)return;const v=t%audio.duration;try{if(Math.abs(audio.currentTime-v)>.2)audio.currentTime=v}catch(_){}}
 function syncIcon(){refs.playPath.setAttribute('d',playing?pausePath:playPath);refs.toggle.setAttribute('aria-label',playing?'Pause':'Play');refs.toggle.title=playing?'Pause':'Play';$('pulse').classList.toggle('active',playing)}
 function preload(src){if(cached.has(src))return;const img=new Image();img.decoding='async';img.src=assetSrc(src);cached.set(src,img);if(cached.size>16)cached.delete(cached.keys().next().value)}
 function freshDeck(){const items=photoDeck.slice();for(let i=items.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[items[i],items[j]]=[items[j],items[i]]}const step=D/items.length;slides=items.map((p,i)=>({...p,start:i*step}));frontLayer=1;photoIndex=-1;photoToken++;refs.layers.forEach(el=>{el.classList.remove('is-active');el.setAttribute('aria-hidden','true')})}
 function photoFor(t){return Math.min(slides.length-1,Math.max(0,Math.floor(t/D*slides.length)))}
 function drawPhoto(i,force){if(i===photoIndex&&!force||!slides[i])return;photoIndex=i;const incoming=refs.layers[1-frontLayer],outgoing=refs.layers[frontLayer],fore=incoming.querySelector('.photo-front'),back=incoming.querySelector('.photo-backdrop');const src=assetSrc(slides[i].src),token=++photoToken;
  incoming.classList.remove('is-active');incoming.setAttribute('aria-hidden','true');incoming.dataset.direction=i%2?'left':'right';fore.src=src;fore.alt=slides[i].alt;back.style.backgroundImage=`url("${src.replace(/"/g,'%22')}")`;
  const display=()=>{if(token!==photoToken)return;incoming.classList.add('is-active');incoming.setAttribute('aria-hidden','false');outgoing.classList.remove('is-active');outgoing.setAttribute('aria-hidden','true');frontLayer=1-frontLayer;if(started&&!matchMedia('(prefers-reduced-motion:reduce)').matches){refs.wash.classList.remove('run');void refs.wash.offsetWidth;refs.wash.classList.add('run')}};
  if(fore.decode){fore.decode().then(display,display)}else if(fore.complete){display()}else{fore.onload=display;fore.onerror=display}
  refs.stage.setAttribute('aria-label','Photograph of Onyx');for(let j=1;j<=3;j++)if(slides[i+j])preload(slides[i+j].src)
 }
 function chapterAt(t){for(const section of playlist){if(t>=section.start&&t<section.end){const chapter=chapters[section.chapter];const i=Math.min(chapter.pages.length-1,Math.floor((t-section.start)/(section.end-section.start)*chapter.pages.length));return{chapter,chapterIndex:section.chapter,pageIndex:i}}}return null}
 function showPoem(page){refs.dedication.classList.remove('show');refs.stage.classList.add('has-poem');const key=page.chapterIndex+':'+page.pageIndex;if(poemKey===key)return;poemKey=key;refs.panel.classList.add('changing');const chapter=page.chapter;refs.title.textContent=chapter.title;refs.date.textContent='Written '+chapter.written;refs.page.textContent=String(page.pageIndex+1).padStart(2,'0')+' / '+String(chapter.pages.length).padStart(2,'0');
  // Update exactly one poem page at a time, with no deletion of original words.
  refs.body.textContent=chapter.pages[page.pageIndex];refs.panel.classList.remove('changing');
 }
 function showDedication(t){refs.stage.classList.remove('has-poem');poemKey='';let text='';if(t<24)text='The day I found my forever friend.';else if(t<52)text='A royal heart wrapped in midnight fur.';else if(t<472)text='Everywhere we went, home meant you.';else text='Your paws are written across my heart.';if(refs.dedicationText.textContent!==text)refs.dedicationText.textContent=text;refs.dedication.classList.add('show')}
 function paint(force){if(!slides.length)return;const t=time();const index=photoFor(t);drawPhoto(index,force);const chapter=chapterAt(t);if(chapter)showPoem(chapter);else showDedication(t);if(!scrubbing){refs.scrub.value=String(t);refs.scrub.style.setProperty('--played',(t/D*100).toFixed(3)+'%');$('elapsed').textContent=fmt(t);$('remaining').textContent=fmt(D-t)}window.ONYX_RUNTIME={time:t,playing,energy:44+12*Math.sin(t*.11)+8*Math.sin(t*.024)};if(t>=D-.04&&!finished)end()}
 function pause(){if(playing){elapsed=time();playing=false;audio.pause();syncIcon();paint(false)}}
 async function resume(){if(loading)return;loading=true;if(audio.readyState>=1)audioSeek(elapsed);try{await audio.play();anchor=performance.now();playing=true;started=true;lastAudioError=false;refs.intro.classList.add('hidden');syncIcon()}catch(err){playing=false;syncIcon();refs.intro.classList.remove('hidden');toast('Playback needs a click on the play button, or the audio file could not load.');}finally{loading=false}}
 async function begin(){if(finished||!started){finished=false;started=true;elapsed=0;freshDeck();paint(true);refs.outro.classList.remove('show');refs.outro.setAttribute('aria-hidden','true')}await resume()}
 function toggle(){if(!started||finished){begin();return}if(playing){pause()}else{resume()}}
 function seek(t){if(!started){begin();return}let v=clamp(t,0,D-.04);const wasPlaying=playing;if(playing){elapsed=time();audio.pause();playing=false}finished=false;refs.outro.classList.remove('show');refs.outro.setAttribute('aria-hidden','true');elapsed=v;audioSeek(v);if(wasPlaying)resume();else syncIcon();paint(true)}
 function end(){elapsed=D;playing=false;finished=true;audio.pause();syncIcon();refs.outro.classList.add('show');refs.outro.setAttribute('aria-hidden','false');refs.scrub.value=String(D);refs.scrub.style.setProperty('--played','100%');$('elapsed').textContent=fmt(D);$('remaining').textContent='00:00'}
 $('begin-btn').addEventListener('click',begin);$('replay-btn').addEventListener('click',()=>{audio.pause();playing=false;finished=true;begin()});refs.toggle.addEventListener('click',toggle);$('back-btn').addEventListener('click',()=>seek(time()-10));$('next-btn').addEventListener('click',()=>seek(time()+10));
 refs.scrub.max=String(D);refs.scrub.addEventListener('pointerdown',()=>scrubbing=true);refs.scrub.addEventListener('input',()=>{scrubbing=true;const t=Number(refs.scrub.value);$('elapsed').textContent=fmt(t);$('remaining').textContent=fmt(D-t);refs.scrub.style.setProperty('--played',(t/D*100).toFixed(3)+'%')});function commit(){if(scrubbing){scrubbing=false;seek(Number(refs.scrub.value))}}refs.scrub.addEventListener('change',commit);refs.scrub.addEventListener('pointerup',commit);
 $('sound-btn').addEventListener('click',()=>{muted=!muted;audio.muted=muted;$('sound-btn').textContent=muted?'Muted':'Sound';$('sound-btn').setAttribute('aria-label',muted?'Unmute audio':'Mute audio')});
 const fs=$('fullscreen-btn');fs.addEventListener('click',()=>{if(!document.fullscreenElement)$('experience').requestFullscreen?.().catch(()=>{});else document.exitFullscreen?.().catch(()=>{})});document.addEventListener('fullscreenchange',()=>fs.setAttribute('aria-label',document.fullscreenElement?'Exit fullscreen':'Enter fullscreen'));
 document.addEventListener('keydown',e=>{if(e.altKey||e.ctrlKey||e.metaKey||e.target?.matches?.('input,textarea,select,button'))return;if(e.key===' '||e.key.toLowerCase()==='k'){e.preventDefault();toggle()}else if(e.key==='ArrowLeft'){e.preventDefault();seek(time()-10)}else if(e.key==='ArrowRight'){e.preventDefault();seek(time()+10)}else if(e.key.toLowerCase()==='m')$('sound-btn').click();else if(e.key.toLowerCase()==='f')fs.click()});
 audio.addEventListener('loadedmetadata',()=>{if(started)audioSeek(time())});audio.addEventListener('error',()=>{
  // If the downloaded ZIP is opened outside GitHub, load the SAME existing song directly from the repo.
  if(lastAudioError)return;lastAudioError=true;
  if(!audio.src.includes('raw.githubusercontent.com')){audio.src='https://raw.githubusercontent.com/tyrannosaurusdm92/PersonalProjects/main/OnyxTribute/'+encodeURI(data.audio);audio.load();toast('Using the original Baby Mine file from the OnyxTribute repository.')}else{pause();toast('The original Baby Mine audio could not be loaded. Check the preserved OnyxTribute/audio file.')}
 });
 document.addEventListener('visibilitychange',()=>{if(document.hidden&&playing)pause()});
 function tick(){if(started&&!finished)paint(false);requestAnimationFrame(tick)}freshDeck();paint(true);syncIcon();requestAnimationFrame(tick);
})();
