/* Onyx tribute: bird-flight engine ported from the ORIGINAL attached
   CAT-astrophic Cuteness game (mosswood_forest-birds.js / birds.js).
   Original movement: PRNG, damping, sinusoidal altitude, wing beats,
   gliding, landing, perched pose, and takeoff. Original atlas renderer:
   6 columns, 256px cells, 33 VALID frames per species:
   1–28 flight, 29–33 landing/perching. Cells 34–36 are empty.
   The tribute only adapts the world/camera and number of visitors.
   The existing OnyxBirdDice module chooses the 2–3 allowed species
   BEFORE each video; no second species roll occurs within a video.
   No game engine, cats, collision system or controls are imported. */
(function () {
  'use strict';
  const canvas=document.getElementById('birds');
  const stage=document.getElementById('photo-stage');
  const poem=document.getElementById('poem-panel');
  const ctx=canvas&&canvas.getContext('2d');
  if(!ctx||!stage||matchMedia('(prefers-reduced-motion: reduce)').matches)return;

  // Exact compact spatial mathematics and PRNG from the game's
  // mosswood_forest-util.js; no external runtime dependencies.
  const U={
    TAU:Math.PI*2,
    clamp:(x,lo,hi)=>Math.min(hi,Math.max(lo,x)),
    lerp:(a,b,t)=>a+(b-a)*t,
    smoother:t=>t*t*t*(t*(t*6-15)+10),
    modulo:(a,n)=>((a%n)+n)%n
  };
  U.damp=(actual,target,lambda,dt)=>U.lerp(actual,target,1-Math.exp(-lambda*dt));
  U.wrapDelta=(a,b,limit)=>U.modulo(a-b+limit/2,limit)-limit/2;
  class PRNG {
    constructor(seed){this.seed=(seed>>>0)||1234567}
    next(){
      this.seed+=0x6d2b79f5;
      let t=this.seed;
      t=Math.imul(t^t>>>15,t|1);
      t^=t+Math.imul(t^t>>>7,t|61);
      return ((t^t>>>14)>>>0)/0x100000000;
    }
    between(a,b){return U.lerp(a,b,this.next())}
    int(a,b){return Math.floor(this.between(a,b+1))}
    bool(p=.5){return this.next()<p}
  }
  const SIZE={bluejay:1.02,cardinal:.92,sparrow:.72,finch:.75,
    dove:1.12,robin:.86,hummingbird:.63};
  const BIRD_VISUAL_SCALE=.75;
  const speciesNames=Object.keys(SIZE);
  const weight={robin:30,finch:20,hummingbird:15,dove:12,
    bluejay:10,cardinal:8,sparrow:5};
  const images=new Map(speciesNames.map(name=>{
    const img=new Image();
    img.decoding='async';
    img.src='assets/images/birds/'+name+'.png';
    return [name,img];
  }));
  const world={
    // Toroidal positioning functions from the game stay intact.
    // A large abstract world prevents a screen-edge wrap teleport.
    length:10000000,
    config:{birds:{perchChance:.12}},
    nearestTree(){return null},
    groundHeight(){return .77}
  };
  const manager={world,emitChirp(){}};

  // Directly adapted from the game's Bird class: the full original
  // flight/glide/landing/perching/takeoff state machine, not a generic
  // spritesheet loop or path animation.
  class Bird {
    constructor(config){
      this.manager=manager;this.world=world;
      this.id=config.id;this.seed=config.seed;
      this.rng=new PRNG(config.seed);
      this.species=config.species;
      this.x=U.modulo(config.x,this.world.length);
      this.altitude=config.altitude;
      this.baseAltitude=this.altitude;
      this.targetAltitude=this.altitude;
      this.speed=config.speed;this.direction=config.direction;
      this.depth=config.depth;this.scale=config.scale;
      this.flapFps=config.flapFps;this.phase=config.phase;
      this.time=this.rng.between(0,20);
      this.state='flight';
      this.stateTime=this.rng.between(0,14);
      this.lifeTime=0;this.duration=this.rng.between(7,18);
      this.attention=this.rng.next();
      this.flock=config.flock;this.flockIndex=config.flockIndex;
      this.bobbing=this.rng.between(1.8,4.2);
      this.pitch=0;this.wingFrame=1;
      this.resting=false;this.perch=null;
      this.landTarget=null;this.landingStart=null;
      this.lastAltitude=this.altitude;
      this.glideDuration=0;
      this.chirpCooldown=this.rng.between(3,18);
      this.blinkDuration=0;
      this.blinkTimer=this.rng.between(2,14);
      this.speedTarget=this.speed;
      this.waitForFlight=0;this.climb=0;
      this.pattern=this.rng.int(0,4);
      this.isSilhouette=this.depth<.47;
      this.lastRendered=false;
      this.swoop=null;
      this.lane=config.lane;
    }
    changeState(state,min,max){
      this.state=state;this.stateTime=0;
      this.duration=this.rng.between(min,max);
      if(state==='perched')this.resting=true;
      if(state==='flight')this.resting=false;
    }
    choosePerch(){
      const tree=this.world.nearestTree(this.x,125);
      if(tree&&this.rng.bool(.76)){
        const branchX=tree.x+this.rng.between(-14,14)*tree.size;
        return {x:U.modulo(branchX,this.world.length),
          altitude:-1,tree,branch:this.rng.between(.4,.65)};
      }
      const ground=this.world.groundHeight(this.x);
      return {x:this.x+this.rng.between(-10,10),
        altitude:ground-.025,tree:null,branch:0};
    }
    getPerchAltitude(perch){
      if(!perch)return this.altitude;
      if(perch.tree){
        const base=this.world.groundHeight(perch.tree.x);
        return U.clamp(base-.26*perch.tree.size*perch.branch,.12,.8);
      }
      return U.clamp(perch.altitude,.14,.78);
    }
    startLanding(){
      this.landTarget=this.choosePerch();
      this.landingStart={x:this.x,altitude:this.altitude};
      this.changeState('landing',1.15,2.7);
    }
    takeOff(){
      this.resting=false;this.perch=null;this.landTarget=null;
      this.direction=this.rng.bool(.72)?this.direction:-this.direction;
      this.targetAltitude=this.rng.between(.17,.53);
      this.changeState('takeoff',.75,1.7);
      this.speedTarget=this.rng.between(24,58);
    }
    update(dt,environment,leader=null){
      this.lifeTime+=dt;this.time+=dt;
      this.stateTime+=dt;
      this.chirpCooldown-=dt;
      this.blinkTimer-=dt;
      const climate=environment.weather;
      const sky=environment.light;
      const turbulence=U.clamp(climate.wind,0,1.8);
      const flightBoost=climate.rain>.55?1.15:1;
      if(this.chirpCooldown<=0){
        this.chirpCooldown=this.rng.between(7,32);
        if(this.rng.bool(.68)&&!environment.paused)
          this.manager.emitChirp(this);
      }
      if(this.blinkTimer<=0){
        this.blinkDuration=.13;
        this.blinkTimer=this.rng.between(3,13);
      }
      this.blinkDuration=Math.max(0,this.blinkDuration-dt);
      if(this.state==='swoop'){
        const dive=this.swoop;
        if(!dive){this.takeOff();return}
        dive.elapsed+=dt;
        const fraction=Math.min(1,dive.elapsed/dive.duration);
        this.altitude=dive.start+(dive.target-dive.start)*Math.sin(fraction*Math.PI);
        this.x=U.modulo(this.x+this.direction*this.speed*.38*dt,this.world.length);
        this.pitch=fraction<.5?.21:-.18;
        this.wingFrame=1+Math.floor(this.time*this.flapFps)%28;
        if(fraction>=1){this.swoop=null;this.takeOff()}
        return;
      }
      if(this.state==='perched'){
        if(this.perch){
          this.x=U.modulo(this.perch.x,this.world.length);
          this.altitude=this.getPerchAltitude(this.perch);
        }
        this.pitch=0;this.wingFrame=33;
        if(this.stateTime>this.duration||climate.rain>.78)this.takeOff();
        return;
      }
      if(this.state==='landing'){
        const target=this.landTarget;
        if(!target){this.changeState('flight',6,13);return}
        const t=U.smoother(U.clamp(this.stateTime/this.duration,0,1));
        const dx=U.wrapDelta(target.x,this.landingStart.x,this.world.length);
        this.x=U.modulo(this.landingStart.x+dx*t,this.world.length);
        const high=this.getPerchAltitude(target);
        this.altitude=U.lerp(this.landingStart.altitude,high,t)+Math.sin(t*Math.PI)*-.03;
        this.pitch=.10*Math.sin(t*Math.PI);
        this.wingFrame=29+Math.min(4,Math.floor(t*5));
        if(this.stateTime>=this.duration){
          this.perch=target;this.changeState('perched',2.5,11);
          this.altitude=high;this.x=U.modulo(target.x,this.world.length);
        }
        return;
      }
      if(this.state==='takeoff'){
        this.altitude=U.damp(this.altitude,this.targetAltitude,1.75,dt);
        this.x=U.modulo(this.x+this.direction*this.speedTarget*.6*dt,this.world.length);
        this.pitch=-.16;
        this.wingFrame=1+Math.floor(this.time*this.flapFps*1.35)%8;
        if(this.stateTime>=this.duration)this.changeState('flight',6,17);
        return;
      }
      if(this.state==='gliding'){
        this.x=U.modulo(this.x+this.direction*this.speed*.86*dt,this.world.length);
        this.altitude+=Math.sin(this.time*.8+this.phase)*dt*.004;
        this.pitch=Math.sin(this.time*.6)*.055;
        this.wingFrame=4;
        if(this.stateTime>this.duration)this.changeState('flight',5,13);
        return;
      }
      const target=this.baseAltitude+Math.sin(this.time*.12+this.phase)*.055+
        Math.sin(this.time*.31+this.id*.71)*.018;
      this.targetAltitude=U.clamp(target,.11,.7);
      this.altitude=U.damp(this.altitude,this.targetAltitude,1.1,dt);
      if(leader&&leader!==this&&leader.state!=='perched'){
        const leadY=leader.altitude+(this.flockIndex%2?-.02:.025);
        this.altitude=U.damp(this.altitude,leadY,.13,dt);
        const spacing=(this.flockIndex+1)*this.rng.between(8,12);
        const targetX=U.modulo(leader.x-leader.direction*spacing,this.world.length);
        const off=U.wrapDelta(targetX,this.x,this.world.length);
        this.speedTarget=this.speed+U.clamp(off*.075,-16,16);
      }else this.speedTarget=this.speed;
      this.speed=U.damp(this.speed,this.speedTarget,2.2,dt);
      const perturb=Math.sin(this.time*.78+this.phase)*3.4+
        Math.sin(this.time*.25+this.id)*2.1;
      this.x=U.modulo(this.x+this.direction*(this.speed*flightBoost+perturb)*dt,this.world.length);
      this.altitude=U.clamp(this.altitude+.0006*Math.sin(this.time*1.6)*turbulence,.10,.76);
      this.pitch=U.clamp((this.altitude-this.lastAltitude)*15,-.2,.2);
      this.lastAltitude=this.altitude;
      this.wingFrame=1+Math.floor((this.time+this.phase)*this.flapFps)%28;
      if(this.stateTime>=this.duration){
        const perchChance=(this.world.config.birds.perchChance||.18)*
          (climate.rain>.42?.30:1)*(sky.night>.6?.75:1);
        if(this.rng.bool(perchChance))this.startLanding();
        else if(this.rng.bool(.28))this.changeState('gliding',1.3,4.4);
        else{
          if(this.rng.bool(.1))this.direction*=-1;
          this.changeState('flight',5,17);
        }
      }
    }
    screenPosition(camera){
      const x=U.wrapDelta(this.x,camera.x,this.world.length);
      let y=this.altitude*camera.height+
        Math.sin(this.time*this.bobbing+this.phase)*
        (this.state==='perched'?.2:1.6);
      if(this.state==='perched'&&this.perch?.tree)y+=50;
      else if(this.state==='landing'&&this.landTarget?.tree)
        y+=50*U.smoother(U.clamp(this.stateTime/Math.max(this.duration,.001),0,1));
      return {x,y};
    }
    draw(context,camera,light,assets){
      const {x,y}=this.screenPosition(camera);
      const s=this.scale*(.42+this.depth*.42);
      const frameSize=52*s*(SIZE[this.species]||1)*1.25*BIRD_VISUAL_SCALE;
      if(x<-70||x>camera.width+70||y<-50||y>camera.height+50){
        this.lastRendered=false;return;
      }
      const image=assets.bird(this.species);
      if(!image||!image.complete||!image.naturalWidth)return;
      this.lastRendered=true;
      context.save();
      context.translate(Math.round(x),Math.round(y));
      if(this.direction<0)context.scale(-1,1);
      context.rotate(this.pitch);
      context.imageSmoothingEnabled=false;
      const dw=Math.max(1,Math.round(frameSize));
      // ORIGINAL renderer uses positions 1..33, and 6 columns of 256px.
      // Do not show the three intentionally EMPTY final atlas cells.
      const frame=Math.max(1,Math.min(33,this.wingFrame))-1;
      const sx=(frame%6)*256,sy=Math.floor(frame/6)*256;
      if(light.night>.25)
        context.filter='brightness('+(1-light.night*.10)+') saturate('+(1-light.night*.03)+')';
      context.drawImage(image,sx,sy,256,256,
        -Math.floor(dw/2),-Math.floor(dw/2),dw,dw);
      context.filter='none';
      context.restore();
    }
  }

  const rand=(a=0,b=1)=>a+Math.random()*(b-a);
  const normalize=key=>String(key).toLowerCase().replace(/[^a-z]/g,'');
  function weightedPalette(){
    const pool=speciesNames.slice(),selected=[];
    const count=Math.random()<.45?2:3;
    while(selected.length<count&&pool.length){
      let roll=rand(0,pool.reduce((n,key)=>n+weight[key],0));
      let selectedName=pool[pool.length-1];
      for(const name of pool){roll-=weight[name];if(roll<0){selectedName=name;break}}
      selected.push(selectedName);
      pool.splice(pool.indexOf(selectedName),1);
    }
    return selected;
  }
  function chooseSpecies(runtime){
    if(runtime.slideType==='video'){
      const selected=window.OnyxBirdDice?.getSelectedKeys?.()||[];
      const allowed=[...new Set(selected.map(normalize))].filter(name=>images.has(name));
      if(allowed.length>=2&&allowed.length<=3)return allowed;
    }
    return weightedPalette();
  }

  let width=1,height=1,dpr=1,last=0,sceneKey='',lastSlideElapsed=0;
  let birds=[],palette=[],idCounter=0,sceneAge=0,nextSpawnAt=0;
  let nextSpeciesIndex=0;
  const environment={weather:{wind:.26,rain:0},light:{night:0},paused:false};

  function resize(){
    const bounds=canvas.getBoundingClientRect();
    width=Math.max(1,bounds.width);height=Math.max(1,bounds.height);
    dpr=Math.min(2,window.devicePixelRatio||1);
    canvas.width=Math.round(width*dpr);
    canvas.height=Math.round(height*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  function mediaBounds(){
    if(!stage.classList.contains('has-poem')||!poem)
      return {x:0,y:0,w:width,h:height};
    const view=canvas.getBoundingClientRect(),panel=poem.getBoundingClientRect();
    if(matchMedia('(max-width: 740px)').matches)
      return {x:0,y:0,w:width,
        h:Math.max(1,Math.min(height,panel.top-view.top-8))};
    return {x:0,y:0,
      w:Math.max(1,Math.min(width,panel.left-view.left-15)),h:height};
  }
  function laneCount(rect){
    if(rect.h<310||rect.w<400)return 3;
    if(rect.h<470||rect.w<650)return 4;
    if(rect.h<680||rect.w<1050)return 5;
    return 6;
  }
  function spawnBird(species,rect,initial){
    if(!images.has(species))return false;
    const camera={x:0,width:rect.w,height:rect.h};
    const used=new Set(birds.map(b=>b.lane));
    const options=Array.from({length:laneCount(rect)},(_,i)=>i)
      .filter(i=>!used.has(i));
    if(!options.length)return false;
    const lane=options[Math.floor(rand(0,options.length))];
    const direction=Math.random()<.5?-1:1;
    const x=initial?rand(rect.w*.08,rect.w*.92):
      (direction>0?-65:rect.w+65);
    const scaleRatio=U.clamp(rect.w/1000,.7,1.65);
    const seed=(Math.floor(Math.random()*0x7fffffff)||1);
    const rng=new PRNG(seed);
    const count=laneCount(rect);
    const bird=new Bird({
      id:idCounter++,seed,species,x,
      altitude:.17+(lane/Math.max(1,count-1))*.49,
      direction,speed:rng.between(18,53)*scaleRatio,
      scale:rng.between(.66,1.5),depth:rng.between(.55,1.14),
      flapFps:rng.between(6.5,11.5),phase:rng.between(0,U.TAU),
      flock:idCounter,flockIndex:0,lane
    });
    birds.push(bird);
    return true;
  }
  function startScene(runtime){
    birds=[];idCounter=0;sceneAge=0;
    palette=chooseSpecies(runtime);
    nextSpeciesIndex=0;
    const rect=mediaBounds();
    // Every selected species gets its own ORIGINAL game Bird, no duplicates
    // of different species and no artificially clustered synchronized flock.
    palette.forEach(species=>spawnBird(species,rect,true));
    nextSpawnAt=rand(.9,1.5);
  }
  function nextSpecies(){
    const selected=palette[nextSpeciesIndex%palette.length];
    nextSpeciesIndex++;
    return selected;
  }
  function tick(now){
    requestAnimationFrame(tick);
    if(now-last<33)return;
    const dt=Math.min(.12,Math.max(0,(now-(last||now))/1000));
    last=now;
    ctx.clearRect(0,0,width,height);
    const runtime=window.ONYX_RUNTIME;
    if(!runtime||runtime.slideIndex==null||runtime.slideIndex<0)return;
    const key=runtime.slideIndex+':'+runtime.slideType;
    const elapsed=Number(runtime.slideElapsed)||0;
    if(key!==sceneKey||elapsed+1<lastSlideElapsed){
      sceneKey=key;startScene(runtime);
    }
    lastSlideElapsed=elapsed;
    if(!runtime.playing)return;
    sceneAge+=dt;
    const rect=mediaBounds();
    const camera={x:0,width:rect.w,height:rect.h};
    for(const bird of birds)bird.update(dt,environment,null);
    // Replenish the same dice-selected species whenever a bird finishes
    // crossing the viewport; avoid accidentally introducing a new species.
    birds=birds.filter(b=>{
      const pos=b.screenPosition(camera);
      return b.lifeTime<45&&pos.x>-115&&pos.x<rect.w+115;
    });
    if(sceneAge>=nextSpawnAt){
      if(birds.length<laneCount(rect))
        spawnBird(nextSpecies(),rect,false);
      nextSpawnAt=sceneAge+rand(1.3,2.5);
    }
    ctx.save();
    ctx.beginPath();ctx.rect(rect.x,rect.y,rect.w,rect.h);ctx.clip();
    ctx.translate(rect.x,rect.y);
    // Same two-pass near/far draw order as the attached game's BirdManager.
    const assets={bird:name=>images.get(name)};
    for(let pass=0;pass<2;pass++){
      for(const bird of birds){
        if(pass===0&&bird.depth>.83)continue;
        if(pass===1&&bird.depth<=.83)continue;
        bird.draw(ctx,camera,environment.light,assets);
      }
    }
    ctx.restore();
  }
  resize();
  addEventListener('resize',resize,{passive:true});
  requestAnimationFrame(tick);
})();