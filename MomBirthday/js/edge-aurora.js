/* Transparent, viewport-edge amethyst aurora: slow curtains, waves and illuminated dust. */
(function(){
 'use strict';
 const canvas=document.getElementById('aurora-edges');
 if(!canvas)return;
 const ctx=canvas.getContext('2d',{alpha:true});
 if(!ctx)return;
 const motion=window.matchMedia('(prefers-reduced-motion:reduce)');
 let width=0,height=0,dpr=1,last=-Infinity;
 let seed=19631011;
 const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 const palette=[[153,102,204],[201,160,255],[182,95,207],[147,112,219],[152,103,197],[224,176,255],[116,66,200],[176,128,225]];
 const dust=Array.from({length:74},()=>({side:random()<.5?0:1,x:random(),y:random(),r:.5+random()*1.5,shift:random()*6.28,speed:.004+random()*.01,color:palette[Math.floor(random()*palette.length)]}));
 function resize(){width=window.innerWidth;height=window.innerHeight;dpr=Math.min(1.5,window.devicePixelRatio||1);canvas.width=Math.max(1,Math.round(width*dpr));canvas.height=Math.max(1,Math.round(height*dpr));ctx.setTransform(dpr,0,0,dpr,0,0);last=-Infinity;}
 const rgba=(c,a)=>`rgba(${c[0]},${c[1]},${c[2]},${Math.max(0,Math.min(1,a)).toFixed(3)})`;
 function ribbon(side,index,t,energy){
   const col=palette[(index*2+side)%palette.length],sign=side===0?1:-1;
   const phase=t*(.30+index*.045)+index*.91+side*.58;
   const depth=width*(.018+index*.012);
   const base=side===0?width*(.005+index*.013):width*(.995-index*.013);
   const points=[];
   for(let y=-20;y<height+20;y+=14){
     const yy=y/Math.max(height,1);
     const wave=Math.sin(yy*8.2+phase)*.75+Math.sin(yy*16.6-phase*.42)*.19+Math.sin(yy*4.7+phase*.22)*.33;
     points.push([base+sign*(wave*width*.012),y]);
   }
   ctx.beginPath();ctx.moveTo(points[0][0],points[0][1]);for(let i=1;i<points.length;i++)ctx.lineTo(points[i][0],points[i][1]);
   ctx.lineWidth=depth*2.2;
   ctx.strokeStyle=rgba(col,(.026+energy*.025)*(1-index*.1));
   ctx.shadowColor=rgba(col,.7);ctx.shadowBlur=depth*1.7;ctx.stroke();ctx.shadowBlur=0;
   ctx.beginPath();ctx.moveTo(points[0][0],points[0][1]);for(let i=1;i<points.length;i++)ctx.lineTo(points[i][0],points[i][1]);
   ctx.lineWidth=1.2;ctx.strokeStyle=rgba(col,.075+energy*.06);ctx.stroke();
 }
 function capGlow(t,energy,bottom){
   const y=bottom?height*.998:height*.002;
   const grad=ctx.createRadialGradient(width*.5,y,0,width*.5,y,width*.65);
   grad.addColorStop(0,rgba(palette[bottom?2:1],.075+energy*.035));
   grad.addColorStop(.35,rgba(palette[bottom?5:4],.024+energy*.02));grad.addColorStop(1,'rgba(0,0,0,0)');
   ctx.save();ctx.translate(width*.5,y);ctx.scale(1,.18);ctx.translate(-width*.5,-y);
   ctx.fillStyle=grad;ctx.beginPath();ctx.arc(width*.5,y,width*.65,0,Math.PI*2);ctx.fill();ctx.restore();
   for(let j=0;j<2;j++){
     const w=height*(.008+j*.008),yy=y+(bottom?-1:1)*(w+Math.sin(t*.3+j)*height*.004);
     ctx.beginPath();for(let x=0;x<=width;x+=20){const v=yy+Math.sin(x/135+t*.33+j)*height*.0032;x?ctx.lineTo(x,v):ctx.moveTo(x,v);}
     ctx.strokeStyle=rgba(palette[bottom?7:1],.045+energy*.045);ctx.lineWidth=1.1;ctx.stroke();
   }
 }
 function render(now){
   if(!motion.matches && now-last<33){requestAnimationFrame(render);return;}
   last=now;
   ctx.clearRect(0,0,width,height);
   const runtime=window.MOM_MONTAGE_RUNTIME||{};
   const energy=Math.min(1,Math.max(0,Number(runtime.energy||45)/100));
   const t=motion.matches?0:now*.001;
   ctx.globalCompositeOperation='screen';
   for(let i=0;i<5;i++){ribbon(0,i,t,energy);ribbon(1,i,t,energy);}
   capGlow(t,energy,false);capGlow(t,energy,true);
   for(const d of dust){
     const edge=d.side===0?1:-1;
     const x=(d.side===0?d.x*.12:1-d.x*.12)*width+Math.sin(t*.22+d.shift)*width*.008*edge;
     const y=((d.y-t*d.speed*.002+1)%1)*height;
     const alpha=(.1+.17*(.5+.5*Math.sin(t*.55+d.shift)))*(.75+energy*.45);
     ctx.fillStyle=rgba(d.color,alpha);ctx.beginPath();ctx.arc(x,y,d.r,0,Math.PI*2);ctx.fill();
   }
   ctx.globalCompositeOperation='source-over';
   if(!motion.matches)requestAnimationFrame(render);
 }
 resize();window.addEventListener('resize',resize,{passive:true});
 motion.addEventListener?.('change',()=>{last=-Infinity;if(motion.matches)render(0);else requestAnimationFrame(render);});
 if(motion.matches)render(0);else requestAnimationFrame(render);
})();
