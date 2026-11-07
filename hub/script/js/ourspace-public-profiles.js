/* Public OurSpace profile viewer. Read-only AI Brain public bridge; no keys, tokens or account access. */
(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    var trex=document.getElementById('trexSite');
    var publicRoot=document.getElementById('ourspacePublic');
    var mainTab=document.getElementById('trexSiteTab');
    var menuButton=document.getElementById('ourspaceMenuButton');
    var dropdown=document.getElementById('ourspaceDropdown');
    var content=document.getElementById('ourspacePublishedContent');
    var status=document.getElementById('ourspacePublicStatus');
    var refresh=document.getElementById('ourspacePublicRefresh');
    var master=document.getElementById('masterNav');
    var handle=document.getElementById('masterDragHandle');
    var toggle=document.getElementById('masterToggle');
    if(!trex||!publicRoot||!mainTab||!menuButton||!dropdown||!content||!master)return;

    // Public endpoint only. A browser can inspect a public endpoint URL, never a backend secret.
    var publicEndpoint='https://script.google.com/macros/s/AKfycbwhdSPEHXi81Z-72xCYNkuX7bti8LYMwQPnjOB-DliseOftVNnkCJuK-cfO1cAZGRf0/exec';
    var selected=null,epoch=0,sequence=0;
    var choices=Array.prototype.slice.call(dropdown.querySelectorAll('[data-ourspace-person]'));

    function setMenu(open) {
      dropdown.hidden=!open;
      menuButton.setAttribute('aria-expanded',String(open));
    }
    function setStatus(message){status.textContent=message;}
    function setTabs(mode) {
      mainTab.setAttribute('aria-selected',String(mode==='trex'));
      menuButton.setAttribute('aria-selected',String(mode==='ourspace'));
      choices.forEach(function(b){b.setAttribute('aria-current',String(mode==='ourspace'&&b.dataset.ourspacePerson===selected));});
    }
    function showTrex(){
      ++epoch;
      selected=null;
      publicRoot.hidden=true;
      trex.hidden=false;
      document.body.classList.remove('osp-active');
      setTabs('trex');
      setMenu(false);
    }
    function validURL(value){
      if(typeof value!=='string'||!/^https?:\/\//i.test(value.trim()))return '';
      try{var url=new URL(value.trim());return /^https?:$/.test(url.protocol)?url.href:'';}catch(_){return '';}
    }
    function element(tag,cls,text){
      var el=document.createElement(tag);
      if(cls)el.className=cls;
      if(text!==undefined&&text!==null)el.textContent=String(text);
      return el;
    }
    function addParagraph(parent,value,cls){
      if(typeof value==='string'&&value.trim())parent.appendChild(element('p',cls,value.slice(0,3000)));
    }
    function addImage(parent,src,alt,cls){
      var url=validURL(src);
      if(!url)return false;
      var img=element('img',cls);
      img.src=url;img.alt=String(alt||'Published image').slice(0,150);img.loading='lazy';
      img.referrerPolicy='no-referrer';
      parent.appendChild(img);return true;
    }
    function externalLink(label,url,cls){
      var safe=validURL(url);
      if(!safe)return null;
      var a=element('a',cls,label||'Open published link');
      a.href=safe;a.target='_blank';a.rel='noopener noreferrer';
      return a;
    }
    function panel(title){
      var s=element('section','osp-panel');
      s.appendChild(element('h2','',title));
      return s;
    }
    function addCards(section,items){
      (Array.isArray(items)?items:[]).slice(0,80).forEach(function(item){
        var data=item&&typeof item==='object'?item:{title:String(item)};
        var card=element('div','osp-card');
        var heading=String(data.title||data.name||data.label||'').slice(0,180);
        if(heading)card.appendChild(element('h3','',heading));
        addParagraph(card,data.description||data.bio||data.summary||data.body);
        addImage(card,data.imageUrl||data.image||data.posterUrl,heading,'osp-card-image');
        var a=externalLink('Open',data.url||data.link);
        if(a)card.appendChild(a);
        if(card.childNodes.length)section.appendChild(card);
      });
    }
    function render(record,key){
      content.replaceChildren();
      if(!record||record.ok!==true||record.published!==true||!record.profile||record.profile.profileKey!==key){
        content.appendChild(element('section','osp-panel osp-notice','This profile is not currently published.'));
        return;
      }
      var p=record.profile,theme=key==='jasper'?'osp-jasper':'osp-william';
      var container=element('article','osp-profile '+theme);
      container.dataset.profileKey=key;

      var hero=element('header','osp-hero');
      var banner=element('div','osp-banner');
      addImage(banner,p.bannerUrl,'Published profile banner','osp-banner-image');
      hero.appendChild(banner);
      var identity=element('div','osp-identity');
      var avatar=element('div','osp-avatar');
      if(!addImage(avatar,p.avatarUrl,'Published profile photo','osp-avatar-image')){
        avatar.appendChild(element('span','',key==='jasper'?'J':'W'));
      }
      identity.appendChild(avatar);
      var identityText=element('div','osp-identity-copy');
      identityText.appendChild(element('p','osp-eyebrow',key==='jasper'?"Squishy's Cottage · OurSpace":'Dino Nerdzone · OurSpace'));
      identityText.appendChild(element('h1','',String(p.displayName||(key==='jasper'?'Jasper':'William')).slice(0,120)));
      addParagraph(identityText,p.headline,'osp-headline');
      identity.appendChild(identityText);
      hero.appendChild(identity);container.appendChild(hero);

      var grid=element('div','osp-grid');
      if(typeof p.bio==='string'&&p.bio.trim()){
        var about=panel('About');addParagraph(about,p.bio);grid.appendChild(about);
      }
      if(Array.isArray(p.interests)&&p.interests.length){
        var interests=panel('Interests'),chips=element('div','osp-chips');
        p.interests.slice(0,40).forEach(function(x){if(typeof x==='string'&&x.trim())chips.appendChild(element('span','osp-chip',x.slice(0,120)));});
        if(chips.childNodes.length){interests.appendChild(chips);grid.appendChild(interests);}
      }
      if(Array.isArray(p.projects)&&p.projects.length){
        var projects=panel('Projects');addCards(projects,p.projects);if(projects.childNodes.length>1)grid.appendChild(projects);
      }
      if(Array.isArray(p.links)&&p.links.length){
        var links=panel('Shared links'),list=element('div','osp-link-list');
        p.links.slice(0,200).forEach(function(item){
          if(!item||typeof item!=='object')return;
          var a=externalLink(String(item.name||item.title||item.label||'Published link').slice(0,160),item.url||item.link,'osp-link');
          if(!a)return;
          var itemBox=element('div','osp-link-item');
          itemBox.appendChild(a);addParagraph(itemBox,item.description,'osp-small');list.appendChild(itemBox);
        });
        if(list.childNodes.length){links.appendChild(list);grid.appendChild(links);}
      }
      var donations=Array.isArray(p.donationMethods)?p.donationMethods:[];
      if(donations.length || (p.creatorDonation&&typeof p.creatorDonation==='object')){
        var give=panel('Donation and support');
        addCards(give,donations);
        if(p.creatorDonation&&typeof p.creatorDonation==='object'){
          var donationLink=externalLink(String(p.creatorDonation.label||'Support the creator').slice(0,100),p.creatorDonation.url||p.creatorDonation.donationUrl,'osp-link');
          if(donationLink)give.appendChild(donationLink);
        }
        if(give.childNodes.length>1)grid.appendChild(give);
      }
      var tracks=p.musicPlayer&&Array.isArray(p.musicPlayer.items)?p.musicPlayer.items:[];
      var song=p.favoriteSong&&typeof p.favoriteSong==='object'?p.favoriteSong:null;
      if(tracks.length || song){
        var music=panel('Music');
        if(song&&song.title){
          var fav=element('p','osp-favorite-song','Favorite song: '+String(song.title).slice(0,160));
          if(song.artist)fav.appendChild(document.createTextNode(' — '+String(song.artist).slice(0,100)));
          music.appendChild(fav);
          var favLink=externalLink('Listen to favorite song',song.url||song.link);
          if(favLink)music.appendChild(favLink);
        }
        tracks.slice(0,80).forEach(function(x){
          if(!x||typeof x!=='object')return;
          var item=element('div','osp-media-item');
          item.appendChild(element('h3','',String(x.title||'Published track').slice(0,160)));
          if(x.artist)addParagraph(item,String(x.artist).slice(0,120),'osp-small');
          var safe=validURL(x.url);
          if(safe){
            var audio=element('audio','osp-audio');
            audio.controls=true;audio.preload='none';audio.src=safe;
            item.appendChild(audio);
            var link=externalLink('Open audio',safe);
            if(link)item.appendChild(link);
          }
          music.appendChild(item);
        });
        if(music.childNodes.length>1)grid.appendChild(music);
      }
      var visuals=p.visualPlayer&&Array.isArray(p.visualPlayer.items)?p.visualPlayer.items:[];
      if(visuals.length){
        var media=panel('Gallery and videos'),gallery=element('div','osp-gallery');
        visuals.slice(0,80).forEach(function(x){
          if(!x||typeof x!=='object')return;
          var item=element('figure','osp-visual');
          var kind=String(x.kind||'').toLowerCase(),safe=validURL(x.url);
          if(kind==='image')addImage(item,safe,x.title||'Published photo','osp-gallery-image');
          if(kind==='video'&&safe){var video=element('video','osp-video');video.controls=true;video.preload='metadata';video.src=safe;var poster=validURL(x.posterUrl);if(poster)video.poster=poster;item.appendChild(video);}
          if(!item.childNodes.length){var asset=externalLink('Open published media',safe);if(asset)item.appendChild(asset);}
          if(item.childNodes.length){var cap=element('figcaption','',String(x.title||'Published media').slice(0,160));item.appendChild(cap);gallery.appendChild(item);}
        });
        if(gallery.childNodes.length){media.appendChild(gallery);grid.appendChild(media);}
      }
      if(!grid.childNodes.length){
        var empty=panel('Published profile');
        empty.appendChild(element('p','', 'No additional sections have been shared publicly yet.'));
        grid.appendChild(empty);
      }
      container.appendChild(grid);
      container.appendChild(element('p','osp-privacy-note','Only information deliberately published in OurSpace appears here. This is a read-only profile.'));
      content.appendChild(container);
    }
    function getPublicProfiles(){
      return new Promise(function(resolve,reject){
        var callback='__ourspacePublicBridge'+(++sequence),script=document.createElement('script'),settled=false;
        var timeout=setTimeout(function(){finish(new Error('The public profile connection timed out.'));},18000);
        function finish(error,data){
          if(settled)return;settled=true;clearTimeout(timeout);
          script.remove();try{delete window[callback];}catch(_){window[callback]=undefined;}
          if(error)reject(error);else resolve(data);
        }
        window[callback]=function(data){finish(null,data);};
        script.onerror=function(){finish(new Error('Published profiles could not be loaded.'));};
        script.async=true;
        script.src=publicEndpoint+'?action=ourspace.publicProfiles&callback='+encodeURIComponent(callback)+'&_='+Date.now();
        document.head.appendChild(script);
      });
    }
    function selectPerson(key){
      if(key!=='jasper'&&key!=='william')return;
      selected=key;var ticket=++epoch;
      trex.hidden=true;publicRoot.hidden=false;
      document.body.classList.add('osp-active');
      setTabs('ourspace');setMenu(false);
      content.replaceChildren();
      setStatus('Loading '+(key==='jasper'?"Jasper's":"William's")+' published profile…');
      getPublicProfiles().then(function(data){
        if(ticket!==epoch||selected!==key)return;
        var rec=data&&data.profiles&&data.profiles[key];
        // Failure and unpublished responses fail closed; never use local/private data.
        if(!rec||rec.reason==='source-unavailable'||!data||data.view!=='ourspace-public-profiles'){
          content.replaceChildren(element('section','osp-panel osp-notice','The published profile is temporarily unavailable.'));
          setStatus('Could not verify the published profile.');return;
        }
        render(rec,key);
        setStatus(rec.published?'Showing currently published information.':'This profile is not published.');
      }).catch(function(){
        if(ticket!==epoch)return;
        content.replaceChildren(element('section','osp-panel osp-notice','The published profile is temporarily unavailable.'));
        setStatus('Could not contact the public profile bridge.');
      });
      window.scrollTo({top:0,behavior:'auto'});
    }
    mainTab.addEventListener('click',showTrex);
    menuButton.addEventListener('click',function(){setMenu(dropdown.hidden);});
    choices.forEach(function(button){button.addEventListener('click',function(){selectPerson(button.dataset.ourspacePerson);});});
    refresh.addEventListener('click',function(){if(selected)selectPerson(selected);});
    document.addEventListener('click',function(e){if(!document.getElementById('ourspaceTopTabs').contains(e.target))setMenu(false);});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')setMenu(false);});
    setTabs('trex');

    // Give the original collapsible T-Rex master nav a draggable handle.
    // Do not replace its existing navigation, collapse behavior, or hashes.
    var storeKey='trex.master.nav.position.v1',dragging=null,suppressClick=false;
    function place(x,y){
      var r=master.getBoundingClientRect(),w=r.width||58,h=Math.max(58,Math.min(r.height||58,window.innerHeight-12));
      var left=Math.max(0,Math.min(x,window.innerWidth-w-4));
      var top=Math.max(0,Math.min(y,window.innerHeight-h-4));
      master.classList.add('trex-master-positioned');
      master.style.left=left+'px';master.style.top=top+'px';
    }
    function start(e){
      if(e.button!==0&&e.pointerType!=='touch')return;
      if(e.target!==handle&&e.target!==toggle&&e.target.closest('#masterDragHandle')!==handle)return;
      var r=master.getBoundingClientRect();
      dragging={x:e.clientX,y:e.clientY,left:r.left,top:r.top,id:e.pointerId,moved:false};
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    function move(e){
      if(!dragging||e.pointerId!==dragging.id)return;
      var dx=e.clientX-dragging.x,dy=e.clientY-dragging.y;
      if(Math.hypot(dx,dy)>6)dragging.moved=true;
      if(dragging.moved){e.preventDefault();place(dragging.left+dx,dragging.top+dy);}
    }
    function end(e){
      if(!dragging||e.pointerId!==dragging.id)return;
      var moved=dragging.moved;dragging=null;
      try{e.currentTarget.releasePointerCapture(e.pointerId);}catch(_){}
      if(moved){suppressClick=true;var r=master.getBoundingClientRect();try{localStorage.setItem(storeKey,JSON.stringify({x:r.left,y:r.top}));}catch(_){}}
    }
    [handle,toggle].forEach(function(h){if(!h)return;h.addEventListener('pointerdown',start);h.addEventListener('pointermove',move);h.addEventListener('pointerup',end);h.addEventListener('pointercancel',function(){dragging=null;});});
    toggle.addEventListener('click',function(e){if(suppressClick){suppressClick=false;e.preventDefault();e.stopImmediatePropagation();}},true);
    handle.addEventListener('dblclick',function(){master.classList.remove('trex-master-positioned');master.style.left='';master.style.top='';try{localStorage.removeItem(storeKey);}catch(_){}});
    try{var saved=JSON.parse(localStorage.getItem(storeKey)||'null');if(saved&&Number.isFinite(saved.x)&&Number.isFinite(saved.y))place(saved.x,saved.y);}catch(_){}
    window.addEventListener('resize',function(){if(master.classList.contains('trex-master-positioned')){var r=master.getBoundingClientRect();place(r.left,r.top);}});
  });
})();
