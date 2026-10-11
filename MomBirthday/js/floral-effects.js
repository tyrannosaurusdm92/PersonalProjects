/* Handmade lavender, lilac and white-rose petal fall inspired by the supplied flower repositories. */
(function(){
 'use strict';
 const host=document.getElementById('petal-field');
 if(!host)return;
 const motion=window.matchMedia('(prefers-reduced-motion:reduce)');
 if(motion.matches)return;
 let seed=1963*1011;
 const rand=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 const flowers=['rose','lavender','lilac'];
 const fragment=document.createDocumentFragment();
 for(let i=0;i<28;i++){
   const petal=document.createElement('span');
   const flower=flowers[i%flowers.length];
   petal.className='falling-petal '+flower;
   const shape=document.createElement('span');shape.className='petal-form';petal.appendChild(shape);
   const size=(flower==='rose'?13:flower==='lavender'?11:10)+rand()*7;
   petal.style.setProperty('--size',size.toFixed(1)+'px');
   petal.style.setProperty('--x',(rand()*100).toFixed(2)+'vw');
   petal.style.setProperty('--drift',((rand()-.5)*17).toFixed(2)+'vw');
   petal.style.setProperty('--wobble',((rand()-.5)*7).toFixed(2)+'vw');
   petal.style.setProperty('--fall-duration',(27+rand()*19).toFixed(2)+'s');
   petal.style.setProperty('--turn-duration',(7+rand()*9).toFixed(2)+'s');
   petal.style.setProperty('--delay',(-rand()*46).toFixed(2)+'s');
   petal.style.setProperty('--spin-delay',(-rand()*16).toFixed(2)+'s');
   petal.style.setProperty('--alpha',(.42+rand()*.27).toFixed(2));
   fragment.appendChild(petal);
 }
 for(let i=0;i<54;i++){
   const dot=document.createElement('span');dot.className='purple-dust';
   dot.style.setProperty('--x',(rand()*100).toFixed(2)+'vw');
   dot.style.setProperty('--y',(rand()*100).toFixed(2)+'vh');
   dot.style.setProperty('--dot',(1.3+rand()*3).toFixed(2)+'px');
   dot.style.setProperty('--float',((rand()-.5)*21).toFixed(1)+'px');
   dot.style.setProperty('--duration',(13+rand()*17).toFixed(2)+'s');
   dot.style.setProperty('--delay',(-rand()*20).toFixed(2)+'s');
   dot.style.setProperty('--alpha',(.10+rand()*.29).toFixed(2));
   fragment.appendChild(dot);
 }
 host.appendChild(fragment);
})();
