/* ONLY the original seven animated bird sprite sheets extracted from the supplied game HTML. No game engine or other game asset is imported. */
(function(){'use strict';
 const canvas=document.getElementById('birds');if(!canvas)return;const ctx=canvas.getContext('2d');if(!ctx)return;
 const motion=matchMedia('(prefers-reduced-motion:reduce)');if(motion.matches)return;
 const types=['dove','hummingbird','robin','bluejay','finch','cardinal','sparrow'];const images=types.map(name=>{const im=new Image();im.src=(window.ONYX_MEDIA&&window.ONYX_MEDIA['assets/birds/'+name+'.png'])||'assets/birds/'+name+'.png';return im});
 let w=1,h=1,dpr=1,last=0,seed=10262026;const rand=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
 const birds=Array.from({length:11},(_,i)=>({species:i%7,phase:rand()*8,speed:.035+rand()*.065,baseY:.12+rand()*.65,direction:i%3===0?-1:1,start:rand()*1.2-.1,scale:.52+rand()*.67,flap:rand()*28,travel:rand()*10}));
 function resize(){const box=canvas.getBoundingClientRect();w=Math.max(1,box.width);h=Math.max(1,box.height);dpr=Math.min(1.7,devicePixelRatio||1);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0)}
 function tick(time){if(time-last<33){requestAnimationFrame(tick);return}const delta=Math.min(.1,(time-last)/1000||.034);last=time;ctx.clearRect(0,0,w,h);const active=!!window.ONYX_RUNTIME?.playing;
 birds.forEach((b,i)=>{const image=images[b.species];if(!image.complete||!image.naturalWidth)return;
  if(active)b.travel+=delta*b.speed;
  const progress=((b.start+b.travel)%1.38+1.38)%1.38;
  const x=(b.direction===1?progress*1.18-.11:1.11-progress*1.18)*w;
  const y=(b.baseY+Math.sin(time*.0006*(1.1+b.speed*2)+b.phase)*.07+Math.sin(progress*13+b.phase)*.036)*h;
  const size=Math.min(124,Math.max(50,w*.09))*b.scale;
  const frame=active?Math.floor(time*.011+b.flap)%30:Math.floor(b.flap)%30;
  const col=frame%6,row=Math.floor(frame/6),cell=image.naturalWidth/6;
  ctx.save();ctx.globalAlpha=.55+(i%5)*.075;ctx.translate(x,y);if(b.direction<0)ctx.scale(-1,1);ctx.rotate(Math.sin(time*.0009+b.phase)*.09);ctx.drawImage(image,col*cell,row*cell,cell,cell,-size/2,-size/2,size,size);ctx.restore();
 });requestAnimationFrame(tick)}resize();addEventListener('resize',resize,{passive:true});requestAnimationFrame(tick);
})();
