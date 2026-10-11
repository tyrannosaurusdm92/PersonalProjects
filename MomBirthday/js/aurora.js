/* Broader amethyst/lilac aurora atmosphere inspired by AuroraSim's motion language,
 * rebuilt natively for this tribute with layered curtains, edge glow, dust and wave motion.
 */
(function () {
 'use strict';
 const canvas=document.getElementById('aurora');
 const ctx=canvas && canvas.getContext('2d',{alpha:false});
 if(!ctx) return;
 const motionQuery=window.matchMedia('(prefers-reduced-motion: reduce)');
 const colors=[[153,102,204],[112,66,159],[152,103,197],[218,112,214],[158,123,181],[143,94,185],[127,90,240],[201,160,255],[184,118,224],[111,45,168],[191,166,255],[223,205,255]];
 const motes=[];
 let width=0,height=0,ratio=1,lastTime=-1,seed=16363,canAnimate=!motionQuery.matches;
 function random(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;}
 function initMotes(){
   motes.length=0;
   for(let i=0;i<110;i++){
     motes.push({x:random(),y:random(),radius:0.45+random()*1.9,phase:random()*9,drift:(random()-.5)*.004,speed:.0016+random()*.0055,c:colors[Math.floor(random()*colors.length)],alpha:.08+random()*.24});
   }
 }
 function resize(){
   ratio=Math.min(1.8,window.devicePixelRatio||1);width=Math.max(1,window.innerWidth);height=Math.max(1,window.innerHeight);
   canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);lastTime=-1;
 }
 function mix(c,alpha){return `rgba(${c[0]},${c[1]},${c[2]},${alpha.toFixed(3)})`;}
 function drawRibbon(t, band, energy){
   const c=colors[band%colors.length];
   const baseY=height*(.08+band*.082);
   const amplitude=height*(.026+band*.0045)*(canAnimate?1:.7)*(1+energy*.15);
   const depth=height*(.085+band*.017);
   const phase=t*(.1+band*.018)+band*.77;
   const segment=18;
   const pts=[];
   for(let x=-segment;x<=width+segment;x+=segment){
      const local=x/Math.max(1,width);
      const wave=Math.sin(local*7.8+phase)*.62 + Math.sin(local*14.8-phase*.42)*.23 + Math.sin(local*3.9+phase*.21)*.31;
      pts.push([x,baseY+wave*amplitude]);
   }
   const glow=ctx.createLinearGradient(0,baseY-depth*.5,0,baseY+depth);
   const strength=(.08+energy*.08)*(1-band*.055);
   glow.addColorStop(0,mix(c,0));
   glow.addColorStop(.16,mix(c,strength*.16));
   glow.addColorStop(.44,mix(c,strength));
   glow.addColorStop(.68,mix(c,strength*.26));
   glow.addColorStop(1,mix(c,0));
   ctx.beginPath();
   ctx.moveTo(pts[0][0],pts[0][1]-depth*.42);
   for(const [x,y] of pts) ctx.lineTo(x,y-depth*.42);
   for(let i=pts.length-1;i>=0;i--) ctx.lineTo(pts[i][0],pts[i][1]+depth);
   ctx.closePath();
   ctx.fillStyle=glow;ctx.fill();
   if(band<5){
      ctx.beginPath();pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));
      ctx.lineWidth=1.2+energy*1.05;ctx.strokeStyle=mix(c,.08+energy*.1);ctx.shadowColor=mix(c,.26);ctx.shadowBlur=18;ctx.stroke();ctx.shadowBlur=0;
   }
 }
 function drawEdgeBloom(energy){
   const blooms=[
     {x:-width*.05,y:height*.5,r1:width*.25,r2:height*.96,a:.12+energy*.1,c:colors[9]},
     {x:width*1.05,y:height*.5,r1:width*.25,r2:height*.96,a:.11+energy*.08,c:colors[6]},
     {x:width*.5,y:-height*.05,r1:width*.95,r2:height*.2,a:.09+energy*.06,c:colors[7]},
     {x:width*.5,y:height*1.05,r1:width*.95,r2:height*.18,a:.08+energy*.05,c:colors[3]}
   ];
   for(const e of blooms){
     const g=ctx.createRadialGradient(e.x,e.y,0,e.x,e.y,Math.max(e.r1,e.r2));
     g.addColorStop(0,mix(e.c,e.a));g.addColorStop(.42,mix(e.c,e.a*.42));g.addColorStop(1,mix(e.c,0));
     ctx.save();ctx.translate(e.x,e.y);ctx.scale(e.r1/Math.max(e.r1,e.r2),e.r2/Math.max(e.r1,e.r2));ctx.beginPath();ctx.arc(0,0,Math.max(e.r1,e.r2),0,Math.PI*2);ctx.closePath();ctx.fillStyle=g;ctx.fill();ctx.restore();
   }
 }
 function drawDust(t, energy, runtime){
   for(const m of motes){
     if(canAnimate && runtime.playing){
       m.y-=m.speed*.0017; m.x+=Math.sin(t*.11+m.phase)*.000006+m.drift*.0001;
       if(m.y<-.03){m.y=1.03;m.x=random();}
       if(m.x<-.05)m.x=1.05; if(m.x>1.05)m.x=-.05;
     }
     const x=m.x*width, y=m.y*height;
     const a=m.alpha*(.55+energy*.4)*(.52+.48*Math.sin(t*.47+m.phase));
     ctx.beginPath();ctx.fillStyle=mix(m.c,a);ctx.arc(x,y,m.radius,0,Math.PI*2);ctx.fill();
   }
 }
 function render(time){
   const runtime=window.MOM_MONTAGE_RUNTIME||{};
   const energy=Math.min(1,Math.max(0,(runtime.energy||48)/100));
   const t=canAnimate?time*.001:0;
   if(canAnimate && time-lastTime<34){requestAnimationFrame(render);return;}
   lastTime=time;
   const bg=ctx.createLinearGradient(0,0,width,height);
   bg.addColorStop(0,'#140a24');bg.addColorStop(.36,'#251036');bg.addColorStop(.7,'#130a1f');bg.addColorStop(1,'#090510');
   ctx.fillStyle=bg;ctx.fillRect(0,0,width,height);
   // Soft nebula base
   ctx.fillStyle='rgba(255,255,255,0)';
   const clouds=[
     [width*.16,height*.24,width*.28,colors[1],.12],[width*.82,height*.18,width*.24,colors[7],.08],[width*.26,height*.74,width*.26,colors[9],.08],[width*.74,height*.69,width*.3,colors[3],.06]
   ];
   for(const [x,y,r,c,a] of clouds){const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,mix(c,a));g.addColorStop(1,mix(c,0));ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();}
   ctx.save();ctx.globalCompositeOperation='screen';
   drawEdgeBloom(energy);
   for(let band=0;band<8;band++) drawRibbon(t, band, energy);
   // Dancing wave threads
   for(let n=0;n<5;n++){
     const c=colors[(n+4)%colors.length];
     const y=height*(.18+n*.13) + Math.sin(t*.33+n)*height*.01;
     ctx.beginPath();
     for(let x=0;x<=width;x+=16){
       const yy=y + Math.sin(x/120 + t*.55 + n)*height*.012 + Math.sin(x/53 - t*.27)*height*.004;
       x===0?ctx.moveTo(x,yy):ctx.lineTo(x,yy);
     }
     ctx.strokeStyle=mix(c,.045+energy*.05);ctx.lineWidth=1.1;ctx.stroke();
   }
   drawDust(t, energy, runtime);
   ctx.restore();
   if(canAnimate)requestAnimationFrame(render);
 }
 initMotes();resize();window.addEventListener('resize',resize,{passive:true});
 const handleMotion=()=>{canAnimate=!motionQuery.matches;resize();if(canAnimate)requestAnimationFrame(render);else render(0);};
 motionQuery.addEventListener?.('change',handleMotion);
 if(canAnimate)requestAnimationFrame(render);else render(0);
})();
