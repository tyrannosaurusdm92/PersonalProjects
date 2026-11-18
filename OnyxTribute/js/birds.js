/* Birds for Onyx: a lively, gently scattered sky.
   Each memory randomly features ONLY 2–3 of the seven original species,
   weighted toward common visitors. Several individual birds remain in flight
   throughout photos AND videos, but each bird occupies a separate flight lane.
   Long videos occasionally choose a fresh palette after the current birds leave. */
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
 const chooseWeighted=(pool)=>{
  let ticket=rand(0,pool.reduce((sum,item)=>sum+item.weight,0));
  for(const item of pool){ticket-=item.weight;if(ticket<0)return item.name}
  return pool[pool.length-1].name;
 };
 function choosePalette(){
  const pool=catalog.slice();
  const count=Math.random()<.45?2:3;
  const result=[];
  while(result.length<count&&pool.length){
   const species=chooseWeighted(pool);
   result.push(species);
   pool.splice(pool.findIndex(item=>item.name===species),1);
  }
  return result;
 }

 let width=1,height=1,dpr=1,last=0,sceneKey='',lastSlideElapsed=0;
 let sceneTime=0,activeBirds=[],palette=[],introQueue=[];
 let nextSpawnAt=0,rotateAt=0,rotationPending=false,spawnNumber=0;

 function resize(){
  const bounds=canvas.getBoundingClientRect();
  width=Math.max(1,bounds.width);
  height=Math.max(1,bounds.height);
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
 function laneCount(rect){
  // Room for several birds without overlapping one another vertically.
  if(rect.h<310||rect.w<400)return 3;
  if(rect.h<470||rect.w<650)return 4;
  if(rect.h<680||rect.w<1050)return 5;
  return 6;
 }
 function startPalette(){
  palette=choosePalette();
  rotationPending=false;
  introQueue=palette.map((species,index)=>({species,at:sceneTime+.12+index*.75}));
  nextSpawnAt=sceneTime+2.25;
  rotateAt=sceneTime+rand(24,37);
 }
 function startScene(){
  sceneTime=0;
  activeBirds=[];
  introQueue=[];
  spawnNumber=0;
  startPalette();
 }
 function spawnBird(species,rect){
  const capacity=laneCount(rect);
  const occupied=new Set(activeBirds.map(b=>b.lane));
  const options=Array.from({length:capacity},(_,i)=>i).filter(lane=>!occupied.has(lane));
  if(!options.length)return false;
  // Randomize the lane, but never put two birds in the same lane at once.
  const lane=options[Math.floor(rand(0,options.length))];
  const direction=Math.random()<.5?-1:1;
  activeBirds.push({
   species,lane,direction,age:0,
   flight:rand(7.6,12),
   scale:rand(.73,1.08),
   phase:rand(0,30),
   sway:rand(0,Math.PI*2),
   alpha:rand(.67,.86),
   drift:rand(-.009,.009),
   serial:spawnNumber++
  });
  return true;
 }
 function nextSpecies(){
  // All chosen species are eligible; prefer any that have appeared less often.
  const counts=new Map(palette.map(name=>[name,0]));
  for(const bird of activeBirds)counts.set(bird.species,(counts.get(bird.species)||0)+1);
  const min=Math.min(...palette.map(name=>counts.get(name)||0));
  const choices=palette.filter(name=>(counts.get(name)||0)===min);
  return choices[Math.floor(rand(0,choices.length))];
 }
 function drawBird(b,rect){
  const image=images.get(b.species);
  if(!image?.complete||!image.naturalWidth||!image.naturalHeight)return;
  const progress=b.age/b.flight;
  if(progress<0||progress>1)return;
  const size=Math.min(72,Math.max(28,rect.w*.062))*b.scale;
  const x=b.direction>0?rect.x-size+(rect.w+size*2)*progress:
   rect.x+rect.w+size-(rect.w+size*2)*progress;
  const bands=laneCount(rect);
  const altitude=(.13+(b.lane/Math.max(1,bands-1))*.70)+b.drift;
  const y=rect.y+(altitude+Math.sin(progress*7+b.sway)*.012)*rect.h;
  const frame=Math.floor(b.age*14+b.phase)%30;
  const cellW=image.naturalWidth/6,cellH=image.naturalHeight/5;
  ctx.save();
  // Subtle fade at the edges; no abrupt entrance or exit.
  ctx.globalAlpha=b.alpha*Math.min(1,progress*8,(1-progress)*8);
  ctx.translate(x,y);
  if(b.direction<0)ctx.scale(-1,1);
  ctx.rotate(Math.sin(progress*9+b.sway)*.05);
  ctx.drawImage(image,(frame%6)*cellW,Math.floor(frame/6)*cellH,
   cellW,cellH,-size/2,-size/2,size,size);
  ctx.restore();
 }
 function tick(now){
  requestAnimationFrame(tick);
  if(now-last<33)return;
  const delta=Math.min(.12,Math.max(0,(now-(last||now))/1000));
  last=now;
  ctx.clearRect(0,0,width,height);
  const runtime=window.ONYX_RUNTIME;
  if(!runtime||runtime.slideIndex==null||runtime.slideIndex<0)return;
  const key=runtime.slideIndex+':'+runtime.slideType;
  const elapsed=Number(runtime.slideElapsed)||0;
  if(key!==sceneKey||elapsed+1<lastSlideElapsed){
   sceneKey=key;
   startScene();
  }
  lastSlideElapsed=elapsed;
  if(!runtime.playing)return;
  sceneTime+=delta;
  const rect=mediaBounds();

  // Seed every memory with birds from all 2–3 selected species, then keep
  // inviting individual birds at irregular intervals throughout the scene.
  while(introQueue.length&&sceneTime>=introQueue[0].at){
   const next=introQueue.shift();
   if(!spawnBird(next.species,rect))introQueue.unshift({...next,at:sceneTime+.35});
   if(introQueue.length&&introQueue[0].at>sceneTime)break;
  }

  for(const bird of activeBirds)bird.age+=delta;
  activeBirds=activeBirds.filter(b=>b.age<b.flight);

  // On long videos, wait until one generation has flown out before changing
  // species. This prevents all seven species from appearing together.
  if(sceneTime>=rotateAt)rotationPending=true;
  if(rotationPending&&activeBirds.length===0){
   startPalette();
  }
  if(!rotationPending&&sceneTime>=nextSpawnAt){
   if(activeBirds.length<laneCount(rect)){
    spawnBird(nextSpecies(),rect);
   }
   nextSpawnAt=sceneTime+rand(1.05,1.9);
  }

  ctx.save();
  ctx.beginPath();ctx.rect(rect.x,rect.y,rect.w,rect.h);ctx.clip();
  for(const bird of activeBirds)drawBird(bird,rect);
  ctx.restore();
 }
 resize();
 addEventListener('resize',resize,{passive:true});
 requestAnimationFrame(tick);
})();