
document.addEventListener('DOMContentLoaded',function(){
  'use strict';
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const pageTitles={"home":"Home","about":"About Me","love":"Jasper & Home","writing":"Writing & Music","projects":"Projects","azara":"Aza'ra Project","azara-solar-system":"Solar System","azara-constellations":"Constellations","azara-language-building":"Language Building","interests":"Things I Love","links":"Connect"};
  const validPages=Object.keys(pageTitles);
  const masterNav=$('#masterNav');
  const masterToggle=$('#masterToggle');
  const jumpNav=$('#jumpNav');
  const jumpToggle=$('#jumpToggle');
  const jumpList=$('#jumpList');
  const jumpTitle=$('#jumpTitle');
  const currentPageLabel=$('#currentPageLabel');
  const searchInput=$('#masterSearch');
  const searchButton=$('#masterSearchButton');
  const searchResults=$('#searchResults');
  const PROJECT_KEY='williamProjectLinksV1';
  const AZARA_KEY='williamAzaraDraftsV1';
  const AZARA_SUBPAGES=['azara-solar-system','azara-constellations','azara-language-building'];
  const azaraMenuToggle=$('#azaraMenuToggle');
  const azaraSubmenu=$('#azaraSubmenu');
  function readPublishedAzara(){
    try{
      const parsed=JSON.parse($('#savedAzaraPages')?.textContent||'{}');
      return parsed && typeof parsed==='object' ? parsed : {};
    }catch(e){return {};}
  }
  function readAzaraWork(){
    const embedded=readPublishedAzara();
    let local={};
    try{local=JSON.parse(localStorage.getItem(AZARA_KEY)||'{}')||{};}catch(e){}
    const state={};
    AZARA_SUBPAGES.forEach(id=>{
      const published=embedded[id] && embedded[id].published===true;
      const publicHTML=published && typeof embedded[id].html==='string' ? embedded[id].html : '';
      const saved=local[id] && typeof local[id]==='object' ? local[id] : null;
      state[id]={
        published: saved ? saved.published===true : !!published,
        publishedHtml: saved && typeof saved.publishedHtml==='string' ? saved.publishedHtml : publicHTML,
        draftHtml: saved && typeof saved.draftHtml==='string' ? saved.draftHtml : publicHTML
      };
    });
    return state;
  }
  const azaraWork=readAzaraWork();
  function saveAzaraWork(){
    try{localStorage.setItem(AZARA_KEY,JSON.stringify(azaraWork));return true;}
    catch(e){
      const status=$('#adminAzaraResult');
      if(status)status.textContent='Local draft storage is unavailable or full. Use Save Updated HTML for published pages.';
      return false;
    }
  }
  function isPageVisible(page){
    return !AZARA_SUBPAGES.includes(page) || !!azaraWork[page]?.published;
  }
  function setAzaraMenu(open){
    azaraSubmenu.hidden=!open;
    azaraMenuToggle.setAttribute('aria-expanded',String(open));
  }
  function renderAzaraPages(){
    AZARA_SUBPAGES.forEach(id=>{
      const state=azaraWork[id];
      const view=$(`[data-page-view="${id}"]`);
      const link=$(`[data-azara-nav-page="${id}"]`);
      if(view){
        const module=view.classList.contains('azara-fixed-page');
        const content=module?view.querySelector('[data-azara-draft-content]'):view;
        if(content) content.innerHTML=state.published?state.publishedHtml:'';
        view.classList.toggle('is-published',state.published);
        if(module){
          const frame=view.querySelector('iframe[data-viewer-src]');
          if(frame){
            if(state.published && view.classList.contains('active') && !frame.getAttribute('src')) frame.src=frame.dataset.viewerSrc;
            if(!state.published && frame.hasAttribute('src')) frame.removeAttribute('src');
          }
        }
      }
      if(link)link.hidden=!state.published;
    });
    const active=$('.page.active')?.dataset.pageView;
    if(active && !isPageVisible(active))showPage('azara',{updateHash:!document.body.classList.contains('admin-mode'),scroll:false});
  }
  function populateAzaraAdmin(){
    AZARA_SUBPAGES.forEach(id=>{
      const editor=$(`[data-azara-editor="${id}"]`);
      const status=$(`[data-azara-status="${id}"]`);
      if(editor)editor.value=azaraWork[id].draftHtml;
      if(status)status.textContent=azaraWork[id].published?'Published • visible to visitors':'Private • hidden from visitors';
    });
  }
  function doAzaraAction(page,action){
    if(!AZARA_SUBPAGES.includes(page))return;
    const editor=$(`[data-azara-editor="${page}"]`);
    if(!editor)return;
    const item=azaraWork[page];
    item.draftHtml=editor.value;
    if(action==='publish'){
      item.publishedHtml=item.draftHtml;
      item.published=true;
    }else if(action==='unpublish'){
      item.published=false;
    }
    saveAzaraWork();
    renderAzaraPages();
    populateAzaraAdmin();
    const msg=$('#adminAzaraResult');
    if(msg)msg.textContent=pageTitles[page]+(action==='draft'?' draft saved locally.':action==='publish'?' published in this browser. Export the updated HTML to publish to your site.':' hidden from visitors in this browser. Export the updated HTML to update your site.');
  }

  function setCollapsed(nav,toggle,collapsed){
    nav.classList.toggle('collapsed',collapsed);
    toggle.setAttribute('aria-expanded',String(!collapsed));
  }

  function buildJumpNav(page){
    jumpList.innerHTML='';
    const view=$(`[data-page-view="${page}"]`);
    const targets=$$('.jump-target',view);
    jumpTitle.textContent=pageTitles[page]+' • Jump';
    targets.forEach((el,i)=>{
      const btn=document.createElement('button');
      btn.type='button';
      btn.className='jump-link';
      btn.textContent=el.dataset.jump||el.querySelector('h2')?.textContent||('Section '+(i+1));
      btn.addEventListener('click',()=>{
        el.scrollIntoView({behavior:'smooth',block:'start'});
        setCollapsed(jumpNav,jumpToggle,true);
      });
      jumpList.appendChild(btn);
    });
  }

  function showPage(page,options={}){
    if(!validPages.includes(page)) page='home';
    if(!isPageVisible(page)) page='azara';
    $$('[data-page-view]').forEach(v=>v.classList.toggle('active',v.dataset.pageView===page));
    const activeViewer=$(`[data-page-view="${page}"] iframe[data-viewer-src]`);
    if(activeViewer && !activeViewer.getAttribute('src')) activeViewer.src=activeViewer.dataset.viewerSrc;
    $$('.master-link').forEach(a=>a.classList.toggle('active',a.dataset.page===page));
    const isAzara=page==='azara'||AZARA_SUBPAGES.includes(page);
    azaraMenuToggle.classList.toggle('active',isAzara);
    if(isAzara)setAzaraMenu(true);
    document.body.classList.remove(...validPages.map(p=>'page-'+p));
    document.body.classList.add(isAzara?'page-azara':'page-'+page);
    document.body.classList.toggle('azara-viewer-active',page==='azara-solar-system'||page==='azara-constellations');
    currentPageLabel.textContent=pageTitles[page];
    buildJumpNav(page);
    if(options.updateHash!==false && !document.body.classList.contains('admin-mode')) history.replaceState(null,'','#'+page);
    if(options.scroll!==false) window.scrollTo({top:0,behavior:options.instant?'auto':'smooth'});
    if(options.focusMain) $('#main').focus({preventScroll:true});
  }

  function pageFromHash(){
    const raw=(location.hash||'#home').slice(1).split('/')[0].toLowerCase();
    if(!validPages.includes(raw))return 'home';
    return isPageVisible(raw)?raw:'azara';
  }

  window.addEventListener('message',event=>{
    const frames=$$('.azara-fixed-page iframe');
    if(!frames.some(f=>f.contentWindow===event.source)) return;
    const routes={solar:'azara-solar-system',constellations:'azara-constellations'};
    const dest=event.data && event.data.type==='azara-nav' ? routes[event.data.page] : null;
    if(dest&&isPageVisible(dest)) showPage(dest,{focusMain:true});
  });
  azaraMenuToggle.addEventListener('click',()=>setAzaraMenu(azaraSubmenu.hidden));
  masterToggle.addEventListener('click',()=>setCollapsed(masterNav,masterToggle,!masterNav.classList.contains('collapsed')));
  jumpToggle.addEventListener('click',()=>setCollapsed(jumpNav,jumpToggle,!jumpNav.classList.contains('collapsed')));

  $$('.master-link').forEach(a=>a.addEventListener('click',e=>{
    e.preventDefault();
    showPage(a.dataset.page,{focusMain:true});
    if(innerWidth<1250)setCollapsed(masterNav,masterToggle,true);
  }));
  $$('.page-link').forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.pageTarget,{focusMain:true})));

  function collectSearchMatches(q){
    const needle=q.trim().toLowerCase();
    if(!needle)return[];
    const matches=[];
    $$('[data-page-view]').forEach(view=>{
      const page=view.dataset.pageView;
      if(!isPageVisible(page))return;
      const searchable=$$('.searchable',view);
      if(AZARA_SUBPAGES.includes(page) && view.textContent.trim())searchable.unshift(view);
      searchable.forEach(el=>{
        const txt=(el.textContent||'').replace(/\s+/g,' ').trim();
        if(txt.toLowerCase().includes(needle)){
          const heading=el.querySelector('h1,h2,h3')?.textContent?.trim()||pageTitles[page];
          const idx=txt.toLowerCase().indexOf(needle);
          const start=Math.max(0,idx-55);
          const snippet=(start>0?'…':'')+txt.slice(start,start+145)+(txt.length>start+145?'…':'');
          matches.push({page,heading,snippet,el});
        }
      });
    });
    return matches.slice(0,20);
  }
  function escapeHTML(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));}
  function renderSearch(){
    const q=searchInput.value.trim();
    const matches=collectSearchMatches(q);
    searchResults.innerHTML='';
    if(!q){searchResults.classList.remove('show');return;}
    searchResults.classList.add('show');
    if(!matches.length){searchResults.textContent='No matches found.';return;}
    matches.forEach(m=>{
      const btn=document.createElement('button');
      btn.type='button'; btn.className='search-result';
      btn.innerHTML='<strong>'+escapeHTML(pageTitles[m.page]+' • '+m.heading)+'</strong><br><span>'+escapeHTML(m.snippet)+'</span>';
      btn.addEventListener('click',()=>{
        showPage(m.page,{scroll:false});
        requestAnimationFrame(()=>{
          m.el.classList.add('search-hit');
          m.el.scrollIntoView({behavior:'smooth',block:'center'});
          setTimeout(()=>m.el.classList.remove('search-hit'),1900);
        });
        searchResults.classList.remove('show');
      });
      searchResults.appendChild(btn);
    });
  }
  searchButton.addEventListener('click',renderSearch);
  searchInput.addEventListener('input',()=>searchInput.value.trim().length>=2?renderSearch():searchResults.classList.remove('show'));
  searchInput.addEventListener('keydown',e=>{if(e.key==='Enter')renderSearch();if(e.key==='Escape')searchResults.classList.remove('show');});

  function readLinks(){
    let embedded={};
    const data=$('#savedProjectLinks');
    if(data){try{embedded=JSON.parse(data.textContent||'{}')}catch(e){}}
    try{return Object.assign({},embedded,JSON.parse(localStorage.getItem(PROJECT_KEY)||'{}'))}catch(e){return embedded}
  }
  function validURL(value){
    try{const u=new URL(value);return (u.protocol==='https:'||u.protocol==='http:')?u.href:''}catch(e){return ''}
  }
  function renderProjectLinks(){
    const links=readLinks();
    $$('[data-project-action]').forEach(box=>{
      const id=box.dataset.projectAction;
      const url=validURL(links[id]||'');
      box.innerHTML='';
      if(url){
        const a=document.createElement('a');
        a.className='button project-live-link'; a.href=url; a.target='_blank'; a.rel='noopener noreferrer'; a.textContent='Check It Out';
        box.appendChild(a);
      }else{
        const span=document.createElement('span'); span.className='project-status'; span.textContent='In Progress'; box.appendChild(span);
      }
    });
  }
  function populateAdmin(){
    const links=readLinks();
    $$('[data-admin-project]').forEach(input=>input.value=links[input.dataset.adminProject]||'');
  }
  function openAdmin(){
    document.body.classList.add('admin-mode');
    populateAdmin();
    populateAzaraAdmin();
  }
  function closeAdmin(){
    document.body.classList.remove('admin-mode');
    history.replaceState(null,'','#'+pageFromHash());
  }
  function saveAdmin(){
    const next={};
    $$('[data-admin-project]').forEach(input=>{
      const u=validURL(input.value.trim());
      if(u)next[input.dataset.adminProject]=u;
    });
    try{localStorage.setItem(PROJECT_KEY,JSON.stringify(next));}catch(e){/* Export can still work when local storage is disabled. */}
    renderProjectLinks();
    populateAdmin();
  }
  function exportHTML(){
    saveAdmin();
    const links=readLinks();
    const clone=document.documentElement.cloneNode(true);
    clone.querySelector('body')?.classList.remove('admin-mode');
    const old=clone.querySelector('#savedProjectLinks');
    if(old)old.remove();
    const data=clone.ownerDocument.createElement('script');
    data.id='savedProjectLinks'; data.type='application/json'; data.textContent=JSON.stringify(links).replace(/</g,'\\u003c');
    clone.querySelector('body').appendChild(data);
    const existing=clone.querySelector('#savedAzaraPages');
    if(existing)existing.remove();
    const published={};
    AZARA_SUBPAGES.forEach(id=>{
      if(azaraWork[id].published)published[id]={published:true,html:azaraWork[id].publishedHtml};
    });
    const azaraData=clone.ownerDocument.createElement('script');
    azaraData.id='savedAzaraPages';azaraData.type='application/json';
    azaraData.textContent=JSON.stringify(published).replace(/</g,'\\u003c');
    clone.querySelector('body').appendChild(azaraData);
    clone.querySelectorAll('[data-azara-editor]').forEach(el=>{el.value='';el.textContent='';});
    clone.querySelectorAll('.azara-subpage-view:not(.azara-fixed-page)').forEach(el=>{el.innerHTML='';el.classList.remove('active','is-published');});
    clone.querySelectorAll('[data-azara-draft-content]').forEach(el=>{el.innerHTML='';});
    clone.querySelectorAll('.azara-fixed-page iframe').forEach(el=>{el.removeAttribute('src');});
    const blob=new Blob(['<!DOCTYPE html>\n'+clone.outerHTML],{type:'text/html;charset=utf-8'});
    const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='william.html'; a.click();
    setTimeout(()=>URL.revokeObjectURL(a.href),1000);
  }

  $$('[data-azara-action]').forEach(button=>button.addEventListener('click',()=>doAzaraAction(button.dataset.azaraPage,button.dataset.azaraAction)));
  $('#adminSave')?.addEventListener('click',saveAdmin);
  $('#adminExport')?.addEventListener('click',exportHTML);
  $('#adminClose')?.addEventListener('click',()=>{document.body.classList.remove('admin-mode');history.replaceState(null,'','#projects');showPage('projects',{updateHash:false,scroll:false});});
  $('#adminClear')?.addEventListener('click',()=>{localStorage.removeItem(PROJECT_KEY);$$('[data-admin-project]').forEach(i=>i.value='');renderProjectLinks();});

  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){
      if(document.body.classList.contains('admin-mode')){document.body.classList.remove('admin-mode');history.replaceState(null,'','#projects');showPage('projects',{updateHash:false,scroll:false});}
      else {setCollapsed(jumpNav,jumpToggle,true);if(innerWidth<1250)setCollapsed(masterNav,masterToggle,true);}
    }
  });
  window.addEventListener('hashchange',()=>{
    if(location.hash.toLowerCase()==='#admin'){openAdmin();return;}
    document.body.classList.remove('admin-mode');
    showPage(pageFromHash(),{updateHash:false,instant:true});
  });

  if(innerWidth<1250)setCollapsed(masterNav,masterToggle,true);
  renderProjectLinks();
  renderAzaraPages();
  if(location.hash.toLowerCase()==='#admin'){
    showPage('projects',{updateHash:false,instant:true,scroll:false});
    openAdmin();
  }else{
    showPage(pageFromHash(),{updateHash:false,instant:true,scroll:false});
  }
});
