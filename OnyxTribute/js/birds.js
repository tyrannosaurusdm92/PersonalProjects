/* Seven original bird sprite sheets. Random, sparse encounters instead of a permanent flock.
   Species weights are relative selection probabilities when an encounter happens.
   Every video gets a 28% chance of ONE bird; photos get a 48% chance, occasionally two.
   Bird flight stays within the actual visible media area, never over the poem panel. */
(function(){
 'use strict';
 const canvas=document.getElementById('birds');
 const stage=document.getElementById('photo-stage');
 const poem=document.getElementById('poem-panel');
 const ctx=canvas?.getContext('2d');
 if(!canvas||!stage||!ctx||matchMedia('(prefers-reduced-motion: reduce)').matches)return;

 const catalog=[
  {name:'robin',weight:30},
  {name:'finch',weight:20},
  {name:'hummingbird',weight:15},
  {name:'dove',weight:12},
  {name:'bluejay',weight:10},
  {name:'cardinal',weight:8},
  {name:'sparrow',weight:5}
 ];
 const images=new Map(catalog.map(({name})=>{
  const image=new Image();
  image.decoding='async';
  image.src='assets/images/birds/'+name+'.png';
  return [name,image];
 }));
 const rand=(min=0,max=1)=>min+Math.random()*(max-min);
 function chooseSpecies(){
  let ticket=rand(0,catalog.reduce((sum,item)=>sum+item.weight,0));
  for(const type of catalog){ticket-=type.weight;if(ticket<0)return type.name}
  return catalog[catalog.length-1].name;
 }
 let width=1,height=1,dpr=1,last=0,lastKey='',encounter=null,sceneTime=0;
 function resize(){
  const bounds=canvas.getBoundingClientRect();
  width=Math.max(1,bounds.width);height=Math.max(1,bounds.height);
  dpr=Math.min(2,window.devicePixelRatio||1);
  canvas.width=Math.round(width*dpr);
  canvas.height=Math.round(height*dpr);
  ctx.setTransform(dpr,0,0,dpr,0,0);
 }
 function mediaBounds(){
  if(!stage.classList.contains('has-poem')||!poem)return {x:0,y:0,w:width,h:height};
  const canvasRect=canvas.getBoundingClientRect();
  const panelRect=poem.getBoundingClientRect();
  if(matchMedia('(max-width: 740px)').matches){
   return {x:0,y:0,w:width,h:Math.max(1,Math.min(height,panelRect.top-canvasRect.top-8))};
  }
  return {x:0,y:0,w:Math.max(1,Math.min(width,panelRect.left-canvasRect.left-15)),h:height};
 }
 function startEncounter(runtime){
  // Each memory is considered independently; no birds is a deliberate and common result.
  encounter=[];
  sceneTime=0;
  const video=runtime.slideType==='video';
  if(Math.random()> (video ? 0.28 : 0.48))return;
  const count=video?1:(Math.random()<.16?2:1);
  for(let i=0;i<count;i++){
   const direction=Math.random()<.5?-1:1;
   encounter.push({
    species:chooseSpecies(),direction,
    delay:rand(.4,1.7)+(i?rand(3.2,4.4):0),
    flight:rand(5.1,8.2),
    altitude:rand(.12,.42)+(i ? 0.13 : 0),
    scale:rand(.75,1.1),
    phase:rand(0,30),
    sway:rand(0,Math.PI*2),
    alpha:rand(.48,.68)
   });
  }
 }
 function drawBird(b,elapsed,rect){
  const image=images.get(b.species);
  if(!image?.complete||!image.naturalWidth||!image.naturalHeight)return;
  const progress=(elapsed-b.delay)/b.flight;
  if(progress<0||progress>1)return;
  const size=Math.min(66,Math.max(24,rect.w*.062))*b.scale;
  const x=b.direction>0?rect.x-size+(rect.w+size*2)*progress:
   rect.x+rect.w+size-(rect.w+size*2)*progress;
  const y=rect.y+(b.altitude+Math.sin(progress*8+b.sway)*.028)*rect.h;
  if(y<size*.5||y>rect.y+rect.h-size*.5)return;
  // The supplied sprite atlas has 6 columns x 5 rows (30 animation frames).
  const frame=Math.floor((elapsed-b.delay)*14+b.phase)%30;
  const cellW=image.naturalWidth/6,cellH=image.naturalHeight/5;
  const column=frame%6,row=Math.floor(frame/6);
  ctx.save();
  ctx.globalAlpha=b.alpha;
  ctx.translate(x,y);
  if(b.direction<0)ctx.scale(-1,1);
  ctx.rotate(Math.sin(progress*9+b.sway)*.055);
  ctx.drawImage(image,column*cellW,row*cellH,cellW,cellH,
   -size/2,-size/2,size,size);
  ctx.restore();
 }
 function tick(now){
  requestAnimationFrame(tick);
  if(now-last<33)return;
  const delta=Math.min(.15,Math.max(0,(now-(last||now))/1000));
  last=now;
  ctx.clearRect(0,0,width,height);
  const runtime=window.ONYX_RUNTIME;
  if(!runtime||runtime.slideIndex==null)return;
  const key=runtime.slideIndex+':'+runtime.slideType;
  if(lastKey!==key){lastKey=key;startEncounter(runtime)}
  if(!runtime.playing||!encounter?.length)return;
  sceneTime+=delta;
  const rect=mediaBounds();
  ctx.save();
  ctx.beginPath();ctx.rect(rect.x,rect.y,rect.w,rect.h);ctx.clip();
  for(const bird of encounter)drawBird(bird,sceneTime,rect);
  ctx.restore();
 }
 resize();
 addEventListener('resize',resize,{passive:true});
 requestAnimationFrame(tick);
})();