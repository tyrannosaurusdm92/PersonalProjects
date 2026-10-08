
(function(){
  if(window.__bdWindowBubbleControlsInstalled) return;
  window.__bdWindowBubbleControlsInstalled = true;

  var WINDOW_SELECTOR = '#belavados-site-shell, .viewonly-note, #app > .panel, #app > .legend';
  var STORAGE_PREFIX = 'bdWindowBubble:';
  var managed = [];
  var bubbleStartOffset = 0;

  function safeKey(el, index){
    return STORAGE_PREFIX + (el.id || (el.className || 'window').toString().replace(/\s+/g,'-') + ':' + index);
  }
  function labelFor(el, index){
    if(el.classList.contains('topbar')) return 'Solar Controls';
    if(el.id === 'assetList') return 'Asset List';
    if(el.id === 'info') return 'System Info';
    if(el.classList.contains('legend')) return 'Legend';
    if(el.id === 'belavados-site-shell') return 'Time Tools';
    if(el.classList.contains('viewonly-note')) return 'View Note';
    var heading = el.querySelector && el.querySelector('h1,h2,h3,h4,.title,.panel-title,[aria-label]');
    var txt = (el.getAttribute('aria-label') || el.getAttribute('data-title') || (heading && (heading.textContent || heading.getAttribute('aria-label'))) || el.id || 'Window ' + (index+1));
    return String(txt).trim().replace(/\s+/g,' ').slice(0,34) || ('Window ' + (index+1));
  }
  function clampToViewport(el, x, y){
    var r = el.getBoundingClientRect();
    var w = Math.max(r.width || 58, 58);
    var h = Math.max(r.height || 48, 48);
    var maxX = Math.max(8, window.innerWidth - w - 8);
    var maxY = Math.max(8, window.innerHeight - h - 8);
    return {x: Math.min(Math.max(8, x), maxX), y: Math.min(Math.max(8, y), maxY)};
  }
  function saveState(item){
    try{
      var r = item.el.getBoundingClientRect();
      var br = item.bubble.getBoundingClientRect();
      localStorage.setItem(item.key, JSON.stringify({
        hidden: item.el.classList.contains('bd-window-is-hidden'),
        x: r.left, y: r.top, w: r.width, h: r.height,
        floating: item.el.classList.contains('bd-window-floating'),
        bx: br.left, by: br.top
      }));
    }catch(e){}
  }
  function readState(key){
    try{return JSON.parse(localStorage.getItem(key) || 'null') || {};}
    catch(e){return {};}
  }
  function makeFloating(el, x, y, w, h){
    var r = el.getBoundingClientRect();
    el.classList.add('bd-window-floating');
    el.style.left = (x == null ? r.left : x) + 'px';
    el.style.top = (y == null ? r.top : y) + 'px';
    el.style.width = Math.max(180, w || r.width) + 'px';
    if(h && h > 52) el.style.height = Math.max(52, h) + 'px';
    el.style.right = 'auto';
    el.style.bottom = 'auto';
    el.style.transform = 'none';
  }
  function placeBubble(item, x, y){
    var bx = x, by = y;
    if(bx == null || by == null){
      bx = 14 + (bubbleStartOffset % 5) * 68;
      by = window.innerHeight - 76 - Math.floor(bubbleStartOffset / 5) * 62;
      bubbleStartOffset++;
    }
    var p = clampToViewport(item.bubble, bx, by);
    item.bubble.style.left = p.x + 'px';
    item.bubble.style.top = p.y + 'px';
    item.bubble.style.right = 'auto';
    item.bubble.style.bottom = 'auto';
  }
  function hideWindow(item){
    var r = item.el.getBoundingClientRect();
    if(!item.el.classList.contains('bd-window-floating')) makeFloating(item.el, r.left, r.top, r.width, r.height);
    item.el.classList.add('bd-window-is-hidden');
    item.bubble.classList.add('bd-window-bubble-visible');
    saveState(item);
  }
  function showWindow(item){
    item.el.classList.remove('bd-window-is-hidden');
    item.bubble.classList.remove('bd-window-bubble-visible');
    var d = item.bubble.querySelector('details');
    if(d) d.removeAttribute('open');
    var r = item.el.getBoundingClientRect();
    var p = clampToViewport(item.el, r.left, r.top);
    if(item.el.classList.contains('bd-window-floating')){ item.el.style.left = p.x+'px'; item.el.style.top = p.y+'px'; }
    saveState(item);
  }
  function makeDrag(handle, target, item, isBubble){
    var sx=0, sy=0, ox=0, oy=0, moved=false;
    handle.addEventListener('pointerdown', function(ev){
      moved=false;
      var r = target.getBoundingClientRect();
      sx = ev.clientX; sy = ev.clientY; ox = r.left; oy = r.top;
      if(!isBubble && !target.classList.contains('bd-window-floating')) makeFloating(target, r.left, r.top, r.width, r.height);
      handle.setPointerCapture(ev.pointerId);
      ev.preventDefault(); ev.stopPropagation();
    });
    handle.addEventListener('pointermove', function(ev){
      if(!handle.hasPointerCapture(ev.pointerId)) return;
      var nx = ox + (ev.clientX - sx), ny = oy + (ev.clientY - sy);
      if(Math.abs(ev.clientX-sx) + Math.abs(ev.clientY-sy) > 3) moved = true;
      var p = clampToViewport(target, nx, ny);
      target.style.left = p.x + 'px'; target.style.top = p.y + 'px'; target.style.right='auto'; target.style.bottom='auto'; target.style.transform='none';
      ev.preventDefault(); ev.stopPropagation();
    });
    handle.addEventListener('pointerup', function(ev){
      if(handle.hasPointerCapture(ev.pointerId)) handle.releasePointerCapture(ev.pointerId);
      saveState(item);
      if(moved){ ev.preventDefault(); ev.stopPropagation(); }
    }, true);
  }
  function addControls(el, index){
    if(!el || el.dataset.bdWindowManaged === 'true') return;
    if(el.closest && (el.closest('#bd-global-dropdown-nav') || el.closest('#bd-nav-bubble') || el.closest('#bd-unhide-tray'))) return;
    el.dataset.bdWindowManaged = 'true';
    el.classList.add('bd-window-managed');
    if(getComputedStyle(el).position === 'static') el.style.position = 'relative';
    var key = safeKey(el, index), title = labelFor(el, index), state = readState(key);

    var controls = document.createElement('div');
    controls.className = 'bd-window-controls';
    controls.innerHTML = '<button class="bd-window-control-btn" type="button" title="Hide '+title+'" aria-label="Hide '+title+'">−</button><span class="bd-window-move-handle" title="Move '+title+'" aria-label="Move '+title+'">✥</span>';
    el.appendChild(controls);

    var bubble = document.createElement('div');
    bubble.className = 'bd-window-bubble';
    bubble.setAttribute('aria-label', 'Hidden window bubble for '+title);
    bubble.innerHTML = '<details><summary class="bd-window-bubble-core" title="Open '+title+' bubble">'+title+'</summary><div class="bd-window-bubble-menu"><button type="button">Show '+title+'</button></div></details>';
    document.body.appendChild(bubble);

    var item = {el:el, bubble:bubble, key:key, title:title};
    managed.push(item);
    placeBubble(item, state.bx, state.by);
    if(state.floating) makeFloating(el, state.x, state.y, state.w, state.h);
    if(state.hidden){ el.classList.add('bd-window-is-hidden'); bubble.classList.add('bd-window-bubble-visible'); }

    controls.querySelector('.bd-window-control-btn').addEventListener('click', function(ev){ev.preventDefault();ev.stopPropagation();hideWindow(item);});
    bubble.querySelector('button').addEventListener('click', function(ev){ev.preventDefault();ev.stopPropagation();showWindow(item);});
    makeDrag(controls.querySelector('.bd-window-move-handle'), el, item, false);
    makeDrag(bubble.querySelector('.bd-window-bubble-core'), bubble, item, true);
  }
  function init(){
    document.querySelectorAll(WINDOW_SELECTOR).forEach(addControls);
    var oldHide = document.getElementById('hidePanels');
    if(oldHide){
      oldHide.textContent = 'Hide all windows';
      oldHide.onclick = function(ev){
        ev.preventDefault(); ev.stopPropagation();
        var app = document.getElementById('app');
        if(app) app.classList.remove('hiddenPanels');
        managed.forEach(function(item){
          hideWindow(item);
        });
      };
    }
    var oldShow = document.getElementById('showPanels');
    if(oldShow){
      oldShow.onclick = function(ev){ev.preventDefault(); managed.forEach(showWindow);};
    }
    window.addEventListener('resize', function(){
      managed.forEach(function(item){
        [item.el, item.bubble].forEach(function(el){
          var r = el.getBoundingClientRect();
          if((el.classList.contains('bd-window-floating') || el.classList.contains('bd-window-bubble')) && r.width){
            var p = clampToViewport(el, r.left, r.top);
            el.style.left = p.x+'px'; el.style.top = p.y+'px'; el.style.right='auto'; el.style.bottom='auto';
          }
        });
        saveState(item);
      });
    }, {passive:true});
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
