
(function(){
  "use strict";

  const canvas = document.getElementById("sky");
  const ctx = canvas.getContext("2d");
  const DEG = Math.PI / 180;
  const RAD = 180 / Math.PI;
  const STORAGE_KEY = "belavados-night-sky-time-panel-v2";

  const DEFAULT_COORDINATE_LINES = [{"coordinate_type": "Longitude / Meridian", "kind": "longitude", "degrees": -180, "line": "180° W / −180°", "name": "Thalunesh's Reversed Track"}, {"coordinate_type": "Longitude / Meridian", "kind": "longitude", "degrees": -150, "line": "150° W", "name": "Freyseth's Crossroads Meridian"}, {"coordinate_type": "Longitude / Meridian", "kind": "longitude", "degrees": -120, "line": "120° W", "name": "Nefarokir's Funeral Meridian"}, {"coordinate_type": "Longitude / Meridian", "kind": "longitude", "degrees": -90, "line": "90° W", "name": "Eirzunet's Shadow Meridian"}, {"coordinate_type": "Longitude / Meridian", "kind": "longitude", "degrees": -60, "line": "60° W", "name": "Bastveig's Tidegate Meridian"}, {"coordinate_type": "Longitude / Meridian", "kind": "longitude", "degrees": -30, "line": "30° W", "name": "Horundar's Storm Meridian"}, {"coordinate_type": "Longitude / Meridian", "kind": "longitude", "degrees": 0, "line": "0°", "name": "UTC"}, {"coordinate_type": "Longitude / Meridian", "kind": "longitude", "degrees": 30, "line": "30° E", "name": "Raeshkul's Calculation Meridian"}, {"coordinate_type": "Longitude / Meridian", "kind": "longitude", "degrees": 60, "line": "60° E", "name": "Sokhivar's Sunroad Meridian"}, {"coordinate_type": "Longitude / Meridian", "kind": "longitude", "degrees": 90, "line": "90° E", "name": "Ishtanora's Hearth Meridian"}, {"coordinate_type": "Longitude / Meridian", "kind": "longitude", "degrees": 120, "line": "120° E", "name": "Marduthor's Deepforge Meridian"}, {"coordinate_type": "Longitude / Meridian", "kind": "longitude", "degrees": 150, "line": "150° E", "name": "Valkhamesh's Thunder Meridian"}, {"coordinate_type": "Latitude / Parallel", "kind": "latitude", "degrees": 60, "line": "60° N", "name": "Fleysetl's Northern Underworld Gate"}, {"coordinate_type": "Latitude / Parallel", "kind": "latitude", "degrees": 25, "line": "25° N", "name": "Raeshkul's Thoughtline"}, {"coordinate_type": "Latitude / Parallel", "kind": "latitude", "degrees": 0, "line": "0°", "name": "Equator"}, {"coordinate_type": "Latitude / Parallel", "kind": "latitude", "degrees": -30, "line": "30° S", "name": "Bastveg's Deepwater Passage"}, {"coordinate_type": "Latitude / Parallel", "kind": "latitude", "degrees": -65, "line": "65° S", "name": "Thoryn-Rahek's Southern Underworld Gate"}];

  let playing = true;
  const AZARA_SPEED_ANCHORS=[
  {p:0,key:"paused",label:"Paused",rate:0},
  {p:70,key:"sync",label:"Synced",sync:true},
  {p:150,key:"week",label:"1 Aza'raan week / Earth week",rate:6/(7*86400)},
  {p:240,key:"yearweek",label:"1 Aza'raan year / Earth week",rate:240/(7*86400)},
  {p:330,key:"3yearweek",label:"3 Aza'raan years / Earth week",rate:720/(7*86400)},
  {p:420,key:"10yearweek",label:"10 Aza'raan years / Earth week",rate:2400/(7*86400)},
  {p:500,key:"30yearweek",label:"30 Aza'raan years / Earth week",rate:7200/(7*86400)},
  {p:620,key:"year15m",label:"1 Aza'raan year / 15 Earth min",rate:240/(15*60)},
  {p:720,key:"year5m",label:"1 Aza'raan year / 5 Earth min",rate:240/(5*60)},
  {p:820,key:"year1m",label:"1 Aza'raan year / 1 Earth min",rate:240/60},
  {p:900,key:"year30s",label:"1 Aza'raan year / 30 Earth sec",rate:240/30},
  {p:960,key:"3year30s",label:"3 Aza'raan years / 30 Earth sec",rate:720/30},
  {p:1000,key:"10year30s",label:"10 Aza'raan years / 30 Earth sec",rate:2400/30}
];
function azaraCanonicalRate(){const now=new Date(),y=now.getFullYear(),start=new Date(y,0,1),end=new Date(y+1,0,1),days=Math.round((end-start)/86400000);return 240/(days*86400)}
function azaraResolvedSpeedAnchors(){return AZARA_SPEED_ANCHORS.map(a=>({...a,rate:a.sync?azaraCanonicalRate():a.rate}))}
function azaraSpeedSpec(raw){const p=Math.max(0,Math.min(1000,Number(raw)||0)),A=azaraResolvedSpeedAnchors();for(const a of A){if(Math.abs(p-a.p)<.0001)return{...a,pos:p,exact:true,daysPerSecond:a.rate}}let lo=A[0],hi=A[A.length-1];for(let i=0;i<A.length-1;i++){if(p>A[i].p&&p<A[i+1].p){lo=A[i];hi=A[i+1];break}}const t=(p-lo.p)/(hi.p-lo.p);let rate;if(lo.rate<=0)rate=hi.rate*t;else rate=Math.exp(Math.log(lo.rate)+(Math.log(hi.rate)-Math.log(lo.rate))*t);const secPerYear=rate>0?240/rate:Infinity;const azaWeeksPerEarthWeek=rate*7*86400/6;const azaYearsPerEarthWeek=rate*7*86400/240;let label;if(secPerYear<=120)label=`Custom · 1 Aza'raan year / ${secPerYear.toFixed(secPerYear<10?1:0)} Earth sec`;else if(secPerYear<=7200)label=`Custom · 1 Aza'raan year / ${(secPerYear/60).toFixed(secPerYear<600?1:0)} Earth min`;else if(azaYearsPerEarthWeek>=.75)label=`Custom · ${azaYearsPerEarthWeek.toFixed(azaYearsPerEarthWeek<10?2:1)} Aza'raan years / Earth week`;else if(azaWeeksPerEarthWeek>=.6)label=`Custom · ${azaWeeksPerEarthWeek.toFixed(2)} Aza'raan weeks / Earth week`;else label=`Custom · ${(rate/azaraCanonicalRate()).toFixed(2)}× synced`;return{p,pos:p,key:"custom",label,rate,daysPerSecond:rate,exact:false}}
let simDay = 0;
  let lastFrame = performance.now();
  let hour = null;
  let lat = 40;
  let viewMode = "up";
  let zoom = 1;
  let panX = 0;
  let panY = 0;
  let drag = false;
  let clickMoved = false;
  let lastX = 0;
  let lastY = 0;
  let pointerDownAt = null;

  let prettifyEnabled = true;
  let connectionFieldEnabled = true;
  let showStars = true;
  let showLines = true;
  let showLabels = true;
  let showGrid = true;

  let skyData = {
    metadata: { world:"Aza\'ra", title:"Aza\'ra Night Sky", schema_version:"2.0.0" },
    coordinate_lines: DEFAULT_COORDINATE_LINES.slice(),
    generator: {},
    stars: [],
    constellations: []
  };

  let starIndex = new Map();
  let hoverTargets = [];
  let selectedConstellationId = null;
  let lastDrawnPositions = new Map();

  const GENERATED_NAMES = [
    "The Ashen Crown", "The River Lantern", "The Wyrm Gate", "The Broken Oath", "The Sleeping Forge", "The Foxfire Cup",
    "The Salt Mirror", "The Thorned Road", "The Hollow Bell", "The Ember Quill", "The Mourning Antler", "The Storm Needle",
    "The Veiled Orchard", "The Pilgrim Key", "The Moonless Harp", "The Sable Shield", "The Hearth Spear", "The Deepwell Eye",
    "The Seven Teeth", "The Cyan Knife", "The Oracle's Net", "The Hidden Anvil", "The Last Boat", "The Glass Jackal",
    "The Briar Compass", "The Brass Wing", "The Bone Orchard", "The Quiet Tower", "The Tidebound Mask", "The Lantern Maw",
    "The Dreaming Ram", "The Pale Door", "The Singing Chain", "The Crooked Chalice", "The Rain Serpent", "The Stag of Embers"
  ];

  function escapeHTML(value){
    return String(value ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[ch] || ch));
  }
  function clamp(value, min, max){ return Math.max(min, Math.min(max, value)); }
  function norm360(value){ return ((value % 360) + 360) % 360; }
  function shortestDelta(a, b){ return ((a - b + 540) % 360) - 180; }
  function pad(n){ return String(n).padStart(2,"0"); }

  function hashSeed(seed){
    const text = String(seed ?? "Aza\'ra");
    let h = 2166136261 >>> 0;
    for(let i=0;i<text.length;i++){
      h ^= text.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }
  function seededRandom(seed){
    let a = hashSeed(seed) || 1;
    return function(){
      a |= 0;
      a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function angularDistance(a, b){
    const ra1 = (a.ra_deg ?? a.ra ?? 0) * DEG;
    const ra2 = (b.ra_deg ?? b.ra ?? 0) * DEG;
    const dec1 = (a.dec_deg ?? a.dec ?? 0) * DEG;
    const dec2 = (b.dec_deg ?? b.dec ?? 0) * DEG;
    const sd = Math.sin((dec2 - dec1) / 2);
    const sr = Math.sin((ra2 - ra1) / 2);
    const h = sd * sd + Math.cos(dec1) * Math.cos(dec2) * sr * sr;
    return 2 * Math.asin(Math.min(1, Math.sqrt(h))) * RAD;
  }

  function projectedDistanceForGraph(a, b){
    const x = shortestDelta(a.ra_deg, b.ra_deg) * Math.cos(((a.dec_deg + b.dec_deg) / 2) * DEG);
    const y = a.dec_deg - b.dec_deg;
    return Math.hypot(x, y);
  }

  function lineSegmentsIntersect(a,b,c,d){
    const det = (b.x - a.x) * (d.y - c.y) - (d.x - c.x) * (b.y - a.y);
    if(Math.abs(det) < 1e-9) return false;
    const lambda = ((d.y - c.y) * (d.x - a.x) + (c.x - d.x) * (d.y - a.y)) / det;
    const gamma = ((a.y - b.y) * (d.x - a.x) + (b.x - a.x) * (d.y - a.y)) / det;
    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
  }

  function makeStar(id, ra, dec, luminosity, extra){
    return Object.assign({
      id,
      name:"",
      ra_deg: norm360(ra),
      dec_deg: clamp(dec, -89.8, 89.8),
      luminosity: clamp(luminosity, 0.05, 1),
      magnitude: Number((6 - clamp(luminosity, 0.05, 1) * 5.8).toFixed(2)),
      color:"#eafcff",
      size:null,
      lore:"",
      tags:[]
    }, extra || {});
  }

  function generateStars(settings){
    const rng = seededRandom(settings.seed);
    const count = Math.pow(2, Number(settings.star_density_power || 8));
    const stars = [];
    for(let i=0; i<count; i++){
      const ra = rng() * 360;
      const dec = Math.asin(rng() * 2 - 1) * RAD;
      const luminosity = Math.pow(rng(), 1.8) * 0.95 + 0.05;
      const tint = rng();
      const color = tint > 0.94 ? "#ffe7a6" : tint < 0.08 ? "#bfefff" : "#eafcff";
      stars.push(makeStar("star_" + String(i + 1).padStart(4,"0"), ra, dec, luminosity, { color }));
    }
    stars.sort((a,b) => a.luminosity - b.luminosity);
    return stars;
  }

  function generateConstellationsFromStars(stars, settings){
    const rng = seededRandom(String(settings.seed) + "::constellations");
    const remaining = stars.slice();
    const result = [];
    const maxCount = Number(settings.num_constellations || 12);
    const minSize = Number(settings.min_stars_per_constellation || 6);
    const sizeRange = Number(settings.additional_stars_per_constellation || 4);
    const maxDist = Number(settings.max_link_distance_deg || 26);

    while(result.length < maxCount && remaining.length > 0){
      const picked = [remaining.pop()];
      const lines = [];
      const wanted = minSize + Math.round(rng() * sizeRange);
      let guard = 0;
      while(picked.length < wanted && remaining.length > 0 && guard < 2000){
        guard++;
        const selected = picked[Math.floor(rng() * picked.length)];
        let bestIdx = -1;
        let bestScore = Infinity;
        for(let i=remaining.length - 1; i>=0; i--){
          const star = remaining[i];
          const dist = projectedDistanceForGraph(selected, star);
          if(dist > maxDist) continue;
          const candidateLine = {
            a: {x:selected.ra_deg, y:selected.dec_deg},
            b: {x:selected.ra_deg + shortestDelta(star.ra_deg, selected.ra_deg), y:star.dec_deg}
          };
          let crosses = false;
          for(const con of result){
            for(const edge of con._graphLines || []){
              if(lineSegmentsIntersect(candidateLine.a, candidateLine.b, edge.a, edge.b)) { crosses = true; break; }
            }
            if(crosses) break;
          }
          const score = dist - star.luminosity * 5 + rng() * 2;
          if(!crosses && score < bestScore){ bestScore = score; bestIdx = i; }
        }
        if(bestIdx < 0) break;
        const star = remaining.splice(bestIdx, 1)[0];
        picked.push(star);
        lines.push([selected.id, star.id]);
      }
      if(picked.length >= 2){
        let finalLines = prettifyEnabled || settings.prettify ? prettifyLines(picked, lines) : lines;
        const cIdx = result.length;
        const c = {
          id:"constellation_" + String(cIdx + 1).padStart(3,"0"),
          name: GENERATED_NAMES[cIdx % GENERATED_NAMES.length],
          alternate_names: [],
          stars:picked.map(s => s.id),
          lines: finalLines,
          season:"",
          domain:"",
          summary:"Generated constellation. Replace this with your player-facing lore.",
          lore:"This constellation was generated from the imported generator logic. Edit the JSON hooks to give it a finished Aza\'ra myth.",
          dm_notes:"",
          style:{ line_color:"#ffe7a6", star_color:"", glow:0.9, label:"" },
          interactions:{ clickable:true, focus_zoom:2.4, panel_open:true }
        };
        c._graphLines = finalLines.map(pair => {
          const a = picked.find(s => s.id === pair[0]);
          const b = picked.find(s => s.id === pair[1]);
          return {a:{x:a.ra_deg, y:a.dec_deg}, b:{x:a.ra_deg + shortestDelta(b.ra_deg, a.ra_deg), y:b.dec_deg}};
        });
        result.push(c);
      } else {
        break;
      }
    }
    result.forEach(c => delete c._graphLines);
    return result;
  }

  function prettifyLines(stars, seedLines){
    if(stars.length <= 2) return seedLines.slice();
    const lines = [];
    for(let i=0; i<stars.length; i++){
      let nearest = [];
      for(let j=0; j<stars.length; j++){
        if(i === j) continue;
        nearest.push({id:stars[j].id, d:projectedDistanceForGraph(stars[i], stars[j])});
      }
      nearest.sort((a,b) => a.d - b.d);
      nearest.slice(0,2).forEach(n => {
        const pair = [stars[i].id, n.id].sort();
        if(!lines.some(x => x[0] === pair[0] && x[1] === pair[1])) lines.push(pair);
      });
    }
    return lines.filter(pair => {
      const a = stars.find(s => s.id === pair[0]);
      const b = stars.find(s => s.id === pair[1]);
      const len = projectedDistanceForGraph(a,b);
      return !stars.some(s => !pair.includes(s.id) && projectedDistanceForGraph(s,a) < len && projectedDistanceForGraph(s,b) < len);
    });
  }

  function normalizeImportedData(raw){
    if(!raw || typeof raw !== "object") throw new Error("The JSON file was empty or was not an object.");
    if(Array.isArray(raw)) raw = { constellations: raw };

    const oldGeneratorKeys = ["seed", "num_constellations", "min_constellation_size", "constellation_size_range", "constellation_distance", "star_density"];
    if(oldGeneratorKeys.some(k => Object.prototype.hasOwnProperty.call(raw, k)) && !raw.stars && !raw.constellations){
      const settings = {
        seed: raw.seed || Date.now(),
        star_density_power: Number(raw.star_density ?? 8),
        num_constellations: Number(raw.num_constellations ?? 12),
        min_stars_per_constellation: Number(raw.min_constellation_size ?? 6),
        additional_stars_per_constellation: Number(raw.constellation_size_range ?? 4),
        max_link_distance_deg: Math.round(Math.pow(2, Number(raw.constellation_distance ?? 7.25)) / 8),
        prettify: !!raw.prettify_constellations,
        connection_field: true
      };
      const stars = generateStars(settings);
      const constellations = generateConstellationsFromStars(stars, settings);
      return { metadata: defaultMetadata("Imported legacy generator settings"), coordinate_lines: DEFAULT_COORDINATE_LINES.slice(), generator: settings, stars, constellations };
    }

    let stars = [];
    const byStableKey = new Map();
    function addStar(rawStar, preferredId){
      if(!rawStar) return null;
      const id = String(rawStar.id || rawStar.star_id || rawStar.key || preferredId || ("star_" + String(stars.length + 1).padStart(4,"0")));
      if(byStableKey.has(id)) return byStableKey.get(id);
      const ra = Number(rawStar.ra_deg ?? rawStar.ra ?? rawStar.longitude ?? rawStar.lon ?? rawStar.x ?? 0);
      const dec = Number(rawStar.dec_deg ?? rawStar.dec ?? rawStar.latitude ?? rawStar.lat ?? rawStar.y ?? 0);
      const lum = Number(rawStar.luminosity ?? rawStar.brightness ?? rawStar.mag ?? rawStar.magnitude ?? 0.65);
      const normalized = makeStar(id, ra, dec, Number.isFinite(lum) ? (lum > 1 ? 1 / Math.max(1, lum) : lum) : 0.65, {
        name: rawStar.name || "",
        magnitude: rawStar.magnitude ?? rawStar.mag ?? undefined,
        color: rawStar.color || rawStar.colour || "#eafcff",
        size: rawStar.size ?? null,
        lore: rawStar.lore || rawStar.description || "",
        tags: Array.isArray(rawStar.tags) ? rawStar.tags : []
      });
      stars.push(normalized);
      byStableKey.set(id, normalized);
      return normalized;
    }

    if(Array.isArray(raw.stars)){ raw.stars.forEach((s, i) => addStar(s, "star_" + String(i + 1).padStart(4,"0"))); }

    const constellations = [];
    if(Array.isArray(raw.constellations)){
      raw.constellations.forEach((c, idx) => {
        const cid = String(c.id || c.constellation_id || c.key || ("constellation_" + String(idx + 1).padStart(3,"0")));
        let cStarIds = [];
        if(Array.isArray(c.stars)){
          cStarIds = c.stars.map((entry, sIdx) => {
            if(typeof entry === "string") {
              if(!byStableKey.has(entry)) addStar({id:entry, ra_deg:0, dec_deg:0, luminosity:0.5}, entry);
              return entry;
            }
            const added = addStar(entry, cid + "_star_" + String(sIdx + 1).padStart(3,"0"));
            return added.id;
          });
        }
        let lines = [];
        const rawLines = c.lines || c.edges || c.connections || c.segments;
        if(Array.isArray(rawLines)){
          lines = rawLines.map(edge => {
            if(Array.isArray(edge)) return [String(edge[0]), String(edge[1])];
            return [String(edge.from || edge.a || edge.source), String(edge.to || edge.b || edge.target)];
          }).filter(edge => edge[0] && edge[1]);
        }
        if(lines.length === 0 && cStarIds.length > 1){
          for(let i=0; i<cStarIds.length - 1; i++) lines.push([cStarIds[i], cStarIds[i+1]]);
        }
        constellations.push({
          id: cid,
          name: c.name || c.title || ("Constellation " + (idx + 1)),
          alternate_names: Array.isArray(c.alternate_names) ? c.alternate_names : [],
          stars: cStarIds,
          lines,
          center: c.center || null,
          bounds: c.bounds || null,
          season: c.season || "",
          domain: c.domain || c.deity || c.alignment || "",
          summary: c.summary || c.description || "",
          lore: c.lore || c.myth || c.story || "",
          dm_notes: c.dm_notes || "",
          style: Object.assign({ line_color:"#ffe7a6", star_color:"", glow:0.9, label:"" }, c.style || {}),
          interactions: Object.assign({ clickable:true, focus_zoom:2.4, panel_open:true }, c.interactions || {}),
          visibility: c.visibility || {}
        });
      });
    }

    return {
      metadata: Object.assign(defaultMetadata(raw?.metadata?.title || "Imported Aza\'ra Night Sky"), raw.metadata || {}),
      coordinate_lines: Array.isArray(raw.coordinate_lines) && raw.coordinate_lines.length ? raw.coordinate_lines : DEFAULT_COORDINATE_LINES.slice(),
      generator: raw.generator || {},
      stars,
      constellations
    };
  }

  function defaultMetadata(title){
    return {
      world:"Aza\'ra",
      title: title || "Aza\'ra Night Sky",
      schema_version:"2.0.0",
      generated_by:"Aza\'ra Night Sky Viewer / Constellation Generator",
      notes:"Veil-time sky record: 21-hour day, 240-day year, 8 months of 30 days, and a 6-day week. The Triumvirate of Light is powered by the Veil rather than the dead sun.",
      solar_year_days:240,
      azaraan_year_days:240,
      azaraan_day_hours:21,
      azaraan_week_days:6,
      azaraan_month_days:30,
      calendar_months:[
        {index:1,name:"Thoryn-Rahek",day_range:[0,30]},
        {index:2,name:"Freysethysra",day_range:[30,60]},
        {index:3,name:"Nefarokir",day_range:[60,90]},
        {index:4,name:"Thalunesh",day_range:[90,120]},
        {index:5,name:"Horundar",day_range:[120,150]},
        {index:6,name:"Raeshkul",day_range:[150,180]},
        {index:7,name:"Asethrimir",day_range:[180,210]},
        {index:8,name:"Sokhivar",day_range:[210,240]}
      ]
    };
  }

  function rebuildIndex(){
    starIndex = new Map();
    skyData.stars.forEach(star => starIndex.set(star.id, star));
    skyData.constellations.forEach(c => {
      if(!Array.isArray(c.stars)) c.stars = [];
      if(!Array.isArray(c.lines)) c.lines = [];
      c._computed = computeConstellationMeta(c);
    });
    updateEmbeddedJSON();
    updateLegend();
    resetInfo();
  }

  function computeConstellationMeta(c){
    const stars = c.stars.map(id => starIndex.get(id)).filter(Boolean);
    if(stars.length === 0) return {ra_deg:0, dec_deg:0, radius_deg:0};
    let sx=0, sy=0, sz=0;
    stars.forEach(s => {
      const ra = s.ra_deg * DEG;
      const dec = s.dec_deg * DEG;
      sx += Math.cos(dec) * Math.cos(ra);
      sy += Math.cos(dec) * Math.sin(ra);
      sz += Math.sin(dec);
    });
    const ra = norm360(Math.atan2(sy, sx) * RAD);
    const hyp = Math.hypot(sx, sy);
    const dec = Math.atan2(sz, hyp) * RAD;
    let radius = 0;
    stars.forEach(s => radius = Math.max(radius, angularDistance({ra_deg:ra, dec_deg:dec}, s)));
    return {ra_deg:ra, dec_deg:dec, radius_deg:Number(radius.toFixed(2))};
  }

  const AZARA_SKY_YEAR_DAYS=240;
  const AZARA_SKY_DAY_HOURS=21;
  const AZARA_SKY_MONTHS=["Thoryn-Rahek","Freysethysra","Nefarokir","Thalunesh","Horundar","Raeshkul","Asethrimir","Sokhivar"];
  const AZARA_SKY_WEEKDAYS=["Valkhaday","Nebday","Sigranday","Ishtaday","Marduday","Enkirday"];
  const AZARA_SKY_LEGACY_MONTH_NAMES=["Iskazunet","Bastve’enlil","Hathruna"];
  const AZARA_SKY_LEGACY_WEEKDAY_NAMES=["Anubaday"];
  function azaMod(n,m){ return ((n%m)+m)%m; }
  function monthDay(dayIndex){
    const d=azaMod(Math.floor(dayIndex),AZARA_SKY_YEAR_DAYS);
    return AZARA_SKY_MONTHS[Math.floor(d/30)]+" "+((d%30)+1);
  }
  function veilHourFloat(day, localHour){
    if(localHour===null||localHour===undefined||localHour==="live"||Number.isNaN(Number(localHour))) return azaMod((day-Math.floor(day))*AZARA_SKY_DAY_HOURS,AZARA_SKY_DAY_HOURS);
    return azaMod(Number(localHour),AZARA_SKY_DAY_HOURS);
  }
  // Star projection still uses a 24-hour right-ascension circle, but the driver is Aza'ra's 21-hour Veil day.
  function skyClock(day, localHour){ return veilHourFloat(day,localHour)/AZARA_SKY_DAY_HOURS*24; }
  function currentVeilDayFloat(date=new Date()){
    const y=date.getFullYear();
    const start=new Date(y,0,1,0,0,0,0);
    const end=new Date(y+1,0,1,0,0,0,0);
    return ((date.getTime()-start.getTime())/(end.getTime()-start.getTime()))*AZARA_SKY_YEAR_DAYS;
  }

  simDay=currentVeilDayFloat();

  function projectStar(star){
    const dec = star.dec_deg * DEG;
    const latRad = lat * DEG;
    const lstDeg = norm360(skyClock(simDay, hour) * 15);
    const hourAngle = shortestDelta(lstDeg, star.ra_deg) * DEG;
    let sinAlt = Math.sin(dec) * Math.sin(latRad) + Math.cos(dec) * Math.cos(latRad) * Math.cos(hourAngle);
    sinAlt = clamp(sinAlt, -1, 1);
    let alt = Math.asin(sinAlt);
    const cosAlt = Math.max(0.0001, Math.cos(alt));
    let cosAz = (Math.sin(dec) - Math.sin(alt) * Math.sin(latRad)) / (cosAlt * Math.cos(latRad));
    cosAz = clamp(cosAz, -1, 1);
    const sinAz = -Math.sin(hourAngle) * Math.cos(dec) / cosAlt;
    let az = Math.atan2(sinAz, cosAz);

    if(viewMode === "down"){
      alt = -alt;
      az += Math.PI;
    }
    const altitudeDeg = alt * RAD;
    const domeR = Math.max(window.innerWidth, window.innerHeight) * 0.46 * zoom;
    const r = ((90 - altitudeDeg) / 100) * domeR;
    const centerX = window.innerWidth / 2 + panX;
    const centerY = window.innerHeight / 2 + panY;
    const x = centerX + Math.sin(az) * r;
    const y = centerY - Math.cos(az) * r;
    const visible = altitudeDeg > -12 && r < domeR * 1.08;
    return {x, y, alt:altitudeDeg, az:norm360(az * RAD), visible, r};
  }

  function resize(){
    const ratio = window.devicePixelRatio || 1;
    canvas.width = Math.floor(window.innerWidth * ratio);
    canvas.height = Math.floor(window.innerHeight * ratio);
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.setTransform(ratio,0,0,ratio,0,0);
    draw(performance.now());
  }

  function skyVeilParts(){
    const hf=veilHourFloat(simDay,hour);
    const h=Math.floor(hf)+1;
    const minuteFloat=(hf-Math.floor(hf))*60;
    const minute=Math.floor(minuteFloat);
    const second=Math.floor((minuteFloat-minute)*60);
    const period=h<=7?"Ae":h<=14?"W’i":"La";
    const ph=((h-1)%7)+1;
    return {hourFloat:hf,hour:h,minute,second,period,periodHour:ph,notation:ph+period};
  }
  function updateReadouts(){
    const d=azaMod(Math.floor(simDay),AZARA_SKY_YEAR_DAYS);
    const t=skyVeilParts();
    document.getElementById("dateReadout").textContent = monthDay(simDay) + " · day " + (d + 1) + " / 240";
    document.getElementById("timeReadout").textContent = t.notation + " · " + String(t.minute).padStart(2,"0") + ":" + String(t.second).padStart(2,"0") + " Veil";
    document.getElementById("latReadout").textContent = "Lat " + lat + "°";
    document.getElementById("viewReadout").textContent = "Zoom " + zoom.toFixed(2) + "×";
    if(typeof window.__belavadosUpdateTimePanel === "function") window.__belavadosUpdateTimePanel();
  }

  function drawBackground(){
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    const cx = window.innerWidth / 2 + panX * 0.025;
    const cy = window.innerHeight / 2 + panY * 0.025;
    const radius = Math.max(window.innerWidth, window.innerHeight) * (0.88 + (zoom - 1) * 0.06);
    const base = ctx.createRadialGradient(cx, cy, 20, cx, cy, radius);
    base.addColorStop(0, "#12234c");
    base.addColorStop(0.58, "#071226");
    base.addColorStop(1, "#02040b");
    ctx.fillStyle = base;
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight);

    const glowX = window.innerWidth * (viewMode === "up" ? 0.34 : 0.66) + panX * 0.04;
    const glowY = window.innerHeight * (0.30 + (lat / 80) * 0.06) + panY * 0.04;
    const glow = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, Math.max(120, 280 * zoom));
    glow.addColorStop(0, "rgba(100,233,255,.10)");
    glow.addColorStop(0.45, "rgba(100,233,255,.035)");
    glow.addColorStop(1, "rgba(100,233,255,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
  }

  function draw(now){
    hoverTargets = [];
    lastDrawnPositions = new Map();
    drawBackground();
    if(showGrid) drawCoordinateGrid();
    if(connectionFieldEnabled) drawAmbientConnections();
    if(showLines) drawConstellationLines();
    if(showStars) drawStars();
    if(showLabels) drawLabels();
  }

  function drawCoordinateGrid(){
    const lines = skyData.coordinate_lines || DEFAULT_COORDINATE_LINES;
    ctx.save();
    ctx.lineWidth = 0.8;
    ctx.font = "12px Georgia, serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    lines.forEach(line => {
      const isLon = line.kind === "longitude" || String(line.coordinate_type || "").toLowerCase().includes("longitude");
      const samples = [];
      if(isLon){
        const ra = norm360(Number(line.degrees) + 180);
        for(let dec=-80; dec<=80; dec+=4) samples.push(projectStar({ra_deg:ra, dec_deg:dec}));
      } else {
        const dec = Number(line.degrees);
        for(let ra=0; ra<=360; ra+=5) samples.push(projectStar({ra_deg:ra, dec_deg:dec}));
      }
      ctx.beginPath();
      let started = false;
      for(let i=0;i<samples.length;i++){
        const p = samples[i];
        if(!p.visible){ started = false; continue; }
        if(!started){ ctx.moveTo(p.x,p.y); started=true; } else { ctx.lineTo(p.x,p.y); }
      }
      const alpha = isLon ? 0.18 : 0.22;
      ctx.strokeStyle = isLon ? `rgba(100,233,255,${alpha})` : `rgba(255,231,166,${alpha})`;
      ctx.stroke();

      const labelStar = isLon ? {ra_deg:norm360(Number(line.degrees) + 180), dec_deg:0} : {ra_deg:norm360(skyClock(simDay,hour) * 15), dec_deg:Number(line.degrees)};
      const lp = projectStar(labelStar);
      if(lp.visible && lp.x > 0 && lp.x < window.innerWidth && lp.y > 0 && lp.y < window.innerHeight){
        ctx.fillStyle = isLon ? "rgba(100,233,255,.72)" : "rgba(255,231,166,.72)";
        ctx.shadowColor = isLon ? "rgba(100,233,255,.65)" : "rgba(255,231,166,.65)";
        ctx.shadowBlur = 8;
        ctx.fillText(line.line, lp.x, lp.y);
        hoverTargets.push({type:"coordinate", x:lp.x, y:lp.y, radius:28, data:line});
        ctx.shadowBlur = 0;
      }
    });
    ctx.restore();
  }

  function drawAmbientConnections(){
    if(!skyData.stars.length) return;
    const visible = [];
    const maxVisible = 260;
    for(const s of skyData.stars){
      const p = projectStar(s);
      if(p.visible && p.x > -30 && p.x < window.innerWidth + 30 && p.y > -30 && p.y < window.innerHeight + 30) visible.push({s,p});
      if(visible.length >= maxVisible) break;
    }
    ctx.save();
    ctx.lineWidth = 0.45;
    for(let i=0; i<visible.length; i++){
      const a = visible[i];
      for(let j=i+1; j<Math.min(visible.length, i+16); j++){
        const b = visible[j];
        const d = Math.hypot(a.p.x-b.p.x, a.p.y-b.p.y);
        const threshold = 90 * Math.sqrt(zoom);
        if(d < threshold){
          const op = (1 - d / threshold) * 0.12;
          ctx.strokeStyle = `rgba(100,233,255,${op})`;
          ctx.beginPath(); ctx.moveTo(a.p.x,a.p.y); ctx.lineTo(b.p.x,b.p.y); ctx.stroke();
        }
      }
    }
    ctx.restore();
  }

  function drawConstellationLines(){
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for(const c of skyData.constellations){
      const active = c.id === selectedConstellationId;
      const lineColor = c?.style?.line_color || "#ffe7a6";
      for(const edge of c.lines || []){
        const a = starIndex.get(String(edge[0]));
        const b = starIndex.get(String(edge[1]));
        if(!a || !b) continue;
        const pa = projectStar(a);
        const pb = projectStar(b);
        if(!pa.visible && !pb.visible) continue;
        ctx.shadowColor = lineColor;
        ctx.shadowBlur = active ? 22 : 10 * Number(c?.style?.glow ?? 0.9);
        ctx.strokeStyle = hexToRgba(lineColor, active ? 0.92 : 0.56);
        ctx.lineWidth = active ? 2.1 : 1.05;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
        const mx = (pa.x + pb.x)/2;
        const my = (pa.y + pb.y)/2;
        hoverTargets.push({type:"constellation", x:mx, y:my, radius:14 + (active ? 8 : 0), data:c});
      }
    }
    ctx.restore();
  }

  function drawStars(){
    ctx.save();
    for(const s of skyData.stars){
      const p = projectStar(s);
      lastDrawnPositions.set(s.id, p);
      if(!p.visible) continue;
      const size = Number(s.size) || (0.8 + s.luminosity * 2.9);
      const alpha = clamp(0.25 + s.luminosity * 0.82, 0.25, 1);
      ctx.fillStyle = hexToRgba(s.color || "#eafcff", alpha);
      ctx.shadowColor = s.color || "#eafcff";
      ctx.shadowBlur = 8 + s.luminosity * 16;
      ctx.beginPath();
      ctx.arc(p.x, p.y, size * Math.sqrt(zoom), 0, Math.PI * 2);
      ctx.fill();
      if(s.luminosity > 0.86){
        ctx.lineWidth = 0.6;
        ctx.strokeStyle = hexToRgba(s.color || "#eafcff", 0.5);
        ctx.beginPath();
        ctx.moveTo(p.x - size * 2.2, p.y); ctx.lineTo(p.x + size * 2.2, p.y);
        ctx.moveTo(p.x, p.y - size * 2.2); ctx.lineTo(p.x, p.y + size * 2.2);
        ctx.stroke();
      }
      hoverTargets.push({type:"star", x:p.x, y:p.y, radius:Math.max(7, size * 3), data:s});
    }
    ctx.restore();
  }

  function drawLabels(){
    ctx.save();
    ctx.font = "13px Georgia, serif";
    ctx.textBaseline = "middle";
    for(const c of skyData.constellations){
      const center = c.center || c._computed || {ra_deg:0, dec_deg:0};
      const p = projectStar(center);
      if(!p.visible) continue;
      const active = c.id === selectedConstellationId;
      const text = c?.style?.label || c.name || c.id;
      ctx.textAlign = "center";
      ctx.lineWidth = 4;
      ctx.strokeStyle = "rgba(2,4,12,.78)";
      ctx.strokeText(text, p.x, p.y - 18);
      ctx.fillStyle = active ? "#ffffff" : "#ffe7a6";
      ctx.shadowColor = active ? "#64e9ff" : "#ffe7a6";
      ctx.shadowBlur = active ? 15 : 7;
      ctx.fillText(text, p.x, p.y - 18);
      const width = ctx.measureText(text).width;
      hoverTargets.push({type:"constellation", x:p.x, y:p.y - 18, radius:Math.max(18, width/2), data:c});
    }
    ctx.restore();
  }

  function hexToRgba(color, alpha){
    if(!color) return `rgba(234,252,255,${alpha})`;
    if(color.startsWith("rgb")) return color.replace(/rgba?\(([^)]+)\)/, (m, body) => {
      const parts = body.split(',').slice(0,3).map(x => x.trim());
      return `rgba(${parts.join(',')},${alpha})`;
    });
    const hex = color.replace('#','').trim();
    const full = hex.length === 3 ? hex.split('').map(c => c+c).join('') : hex.padEnd(6,'f').slice(0,6);
    const r = parseInt(full.slice(0,2),16), g = parseInt(full.slice(2,4),16), b = parseInt(full.slice(4,6),16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  function setInfo(title, bodyRows, subtitle, actionsHTML){
    const rows = bodyRows.map(row => "<tr><td>" + escapeHTML(row[0]) + "</td><td>" + row[1] + "</td></tr>").join("");
    document.getElementById("info").innerHTML =
      "<h2>" + escapeHTML(title) + "</h2>" +
      '<div class="sub">' + subtitle + '</div>' +
      "<table>" + rows + "</table>" + (actionsHTML || "");
  }

  function resetInfo(){
    setInfo(
      skyData?.metadata?.title || "Aza\'ra Night Sky",
      [
        ["Stars loaded", String(skyData.stars.length)],
        ["Constellations", String(skyData.constellations.length)],
        ["Named coordinate lines", String((skyData.coordinate_lines || []).length)],
        ["Selected layer", selectedConstellationId ? escapeHTML(selectedConstellationId) : "None"]
      ],
      "Click a star, constellation, label, or named grid line to inspect it. Use #dm-editor only when you need the hidden generator, import, and export tools."
    );
  }

  function reportClick(event){
    if(clickMoved) return;
    const target = findTarget(event.clientX, event.clientY);
    if(target){
      if(target.type === "star") showStarInfo(target.data);
      if(target.type === "constellation") showConstellationInfo(target.data);
      if(target.type === "coordinate") showCoordinateInfo(target.data);
      draw(performance.now());
      return;
    }
    selectedConstellationId = null;
    const dx = event.clientX - window.innerWidth / 2 - panX;
    const dy = event.clientY - window.innerHeight / 2 - panY;
    const distance = Math.hypot(dx, dy);
    const direction = Math.round((Math.atan2(dx, -dy) * 180 / Math.PI + 360) % 360);
    setInfo(
      "Open sky click",
      [
        ["Screen position", Math.round(event.clientX) + ", " + Math.round(event.clientY)],
        ["Offset from view center", Math.round(dx) + ", " + Math.round(dy)],
        ["Direction / distance", direction + "° / " + Math.round(distance) + " px"],
        ["View", viewMode === "up" ? "Top Up" : "Top Down"],
        ["Current zoom", zoom.toFixed(2) + "×"]
      ],
      "No star or constellation was selected at this point."
    );
  }

  function findTarget(x,y){
    let best = null;
    let bestD = Infinity;
    for(const target of hoverTargets){
      const d = Math.hypot(target.x - x, target.y - y);
      if(d <= target.radius && d < bestD){ best = target; bestD = d; }
    }
    return best;
  }

  function showStarInfo(star){
    selectedConstellationId = null;
    const p = projectStar(star);
    setInfo(
      star.name || star.id,
      [
        ["Type", "Star"],
        ["RA / sky longitude", Number(star.ra_deg).toFixed(2) + "°"],
        ["Dec / sky latitude", Number(star.dec_deg).toFixed(2) + "°"],
        ["Current altitude", p.alt.toFixed(2) + "°"],
        ["Current azimuth", p.az.toFixed(2) + "°"],
        ["Luminosity", Number(star.luminosity).toFixed(3)],
        ["Lore", escapeHTML(star.lore || "No star lore has been added yet.")]
      ],
      "This star is clickable because its id is present in the imported/generated star hook list.",
      '<div class="info-actions"><button onclick="window.AzaraNightSky.focusStar(\'' + escapeHTML(star.id) + '\')" type="button">Focus Star</button><button onclick="window.AzaraNightSky.resetView()" type="button">Reset View</button></div>'
    );
  }

  function showConstellationInfo(c){
    selectedConstellationId = c.id;
    const meta = c._computed || computeConstellationMeta(c);
    setInfo(
      c.name || c.id,
      [
        ["Type", "Constellation"],
        ["Domain", escapeHTML(c.domain || "Unassigned")],
        ["Season", escapeHTML(c.season || "All / not assigned")],
        ["Stars", String((c.stars || []).length)],
        ["Lines", String((c.lines || []).length)],
        ["Center", meta.ra_deg.toFixed(2) + "° RA, " + meta.dec_deg.toFixed(2) + "° Dec"],
        ["Radius", meta.radius_deg.toFixed(2) + "°"],
        ["Summary", escapeHTML(c.summary || "No summary has been added yet.")],
        ["Lore", escapeHTML(c.lore || "No lore has been added yet.")]
      ],
      "This constellation can be watched across the time and latitude sliders because it is stored by sky coordinates, not fixed screen pixels.",
      '<div class="info-actions"><button onclick="window.AzaraNightSky.focusConstellation(\'' + escapeHTML(c.id) + '\')" type="button">Zoom Into It</button><button onclick="window.AzaraNightSky.resetView()" type="button">Reset View</button></div>'
    );
  }

  function showCoordinateInfo(line){
    setInfo(
      line.name || line.line,
      [
        ["Coordinate type", escapeHTML(line.coordinate_type || line.kind || "Coordinate line")],
        ["Line", escapeHTML(line.line)],
        ["Degrees", String(line.degrees) + "°"],
        ["JSON hook", "coordinate_lines[]"],
        ["Visible layer", showGrid ? "Named grid on" : "Named grid off"]
      ],
      "This named coordinate line is included in the exported constellations JSON and in the exported constellations.html."
    );
  }

  function focusConstellation(id){
    const c = skyData.constellations.find(x => x.id === id);
    if(!c) return;
    selectedConstellationId = id;
    const center = c.center || c._computed || computeConstellationMeta(c);
    const p = projectStar(center);
    panX += window.innerWidth / 2 - p.x;
    panY += window.innerHeight / 2 - p.y;
    zoom = clamp(Number(c?.interactions?.focus_zoom || 2.4), 1.2, 6);
    showConstellationInfo(c);
    updateReadouts();
    draw(performance.now());
  }

  function focusStar(id){
    const star = starIndex.get(id);
    if(!star) return;
    const p = projectStar(star);
    panX += window.innerWidth / 2 - p.x;
    panY += window.innerHeight / 2 - p.y;
    zoom = clamp(Math.max(zoom, 2.8), 1.2, 6);
    showStarInfo(star);
    updateReadouts();
    draw(performance.now());
  }

  function applyZoom(multiplier, anchorX, anchorY){
    const oldZoom = zoom;
    zoom = clamp(zoom * multiplier, 0.55, 7.5);
    const mx = anchorX - window.innerWidth / 2 - panX;
    const my = anchorY - window.innerHeight / 2 - panY;
    panX -= mx * (zoom / oldZoom - 1);
    panY -= my * (zoom / oldZoom - 1);
    updateReadouts();
    draw(performance.now());
  }

  function tick(now){
    const dt = (now - lastFrame) / 1000;
    lastFrame = now;
    if(playing){
      const spec=azaraSpeedSpec(document.getElementById("speed").value);
      if(spec.key==="sync") simDay=currentVeilDayFloat();
      else if(spec.key!=="paused") simDay=(simDay+spec.daysPerSecond*dt)%AZARA_SKY_YEAR_DAYS;
      document.getElementById("day").value=Math.floor(simDay);
    }
    updateReadouts();
    draw(now);
    requestAnimationFrame(tick);
  }

  function getGeneratorSettingsFromUI(){
    return {
      seed: document.getElementById("inpseed").value || Date.now(),
      star_density_power: Number(document.getElementById("stardensity").value),
      num_constellations: Number(document.getElementById("numconstellations").value),
      min_stars_per_constellation: Number(document.getElementById("minconstellationsize").value),
      additional_stars_per_constellation: Number(document.getElementById("constellationsizerange").value),
      max_link_distance_deg: Number(document.getElementById("constellationdistance").value),
      prettify: prettifyEnabled,
      connection_field: connectionFieldEnabled
    };
  }

  function applyGeneratorSettingsToUI(settings){
    if(!settings) return;
    document.getElementById("inpseed").value = settings.seed ?? document.getElementById("inpseed").value;
    document.getElementById("stardensity").value = settings.star_density_power ?? document.getElementById("stardensity").value;
    document.getElementById("numconstellations").value = settings.num_constellations ?? document.getElementById("numconstellations").value;
    document.getElementById("minconstellationsize").value = settings.min_stars_per_constellation ?? document.getElementById("minconstellationsize").value;
    document.getElementById("constellationsizerange").value = settings.additional_stars_per_constellation ?? document.getElementById("constellationsizerange").value;
    document.getElementById("constellationdistance").value = settings.max_link_distance_deg ?? document.getElementById("constellationdistance").value;
    prettifyEnabled = Boolean(settings.prettify ?? prettifyEnabled);
    connectionFieldEnabled = Boolean(settings.connection_field ?? connectionFieldEnabled);
    syncToggleButtons();
    updateSliderLabels();
  }

  function generateSky(){
    const settings = getGeneratorSettingsFromUI();
    const stars = generateStars(settings);
    const constellations = generateConstellationsFromStars(stars, settings);
    skyData = {
      metadata: defaultMetadata("Aza\'ra Generated Night Sky"),
      coordinate_lines: DEFAULT_COORDINATE_LINES.slice(),
      generator: settings,
      stars,
      constellations
    };
    selectedConstellationId = null;
    rebuildIndex();
    setInfo(
      "Generated sky complete",
      [["Stars", String(stars.length)], ["Constellations", String(constellations.length)], ["Seed", escapeHTML(String(settings.seed))]],
      "Use Download JSON to save the editable sky data, or Export constellations.html to save a full standalone site with this exact generated sky embedded."
    );
  }

  function clearSky(){
    skyData = { metadata: defaultMetadata("Blank Aza\'ra Night Sky"), coordinate_lines: DEFAULT_COORDINATE_LINES.slice(), generator: {}, stars: [], constellations: [] };
    selectedConstellationId = null;
    rebuildIndex();
  }

  function exportData(){
    return {
      metadata: Object.assign(defaultMetadata(), skyData.metadata || {}),
      coordinate_lines: skyData.coordinate_lines || DEFAULT_COORDINATE_LINES.slice(),
      generator: skyData.generator || getGeneratorSettingsFromUI(),
      stars: skyData.stars.map(s => {
        const out = {...s};
        delete out._screen;
        return out;
      }),
      constellations: skyData.constellations.map(c => {
        const out = {...c};
        delete out._computed;
        return out;
      })
    };
  }

  function updateEmbeddedJSON(){
    const tag = document.getElementById("bv-embedded-constellations-json");
    if(tag) tag.textContent = JSON.stringify(exportData(), null, 2);
  }

  function downloadText(filename, text, mime){
    const blob = new Blob([text], {type: mime || "text/plain;charset=utf-8"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 0);
  }

  function downloadJSON(){
    updateEmbeddedJSON();
    downloadText("azara_constellations.json", JSON.stringify(exportData(), null, 2), "application/json;charset=utf-8");
  }

  function exportHTML(){
    updateEmbeddedJSON();
    const clone = document.documentElement.cloneNode(true);
    const cloneBody = clone.querySelector("body");
    if(cloneBody) {
      cloneBody.classList.remove("dm-editor");
      cloneBody.classList.add("player-export-default");
    }
    const pasted = clone.querySelector("#jsonPaste");
    if(pasted) pasted.textContent = "";
    // In the integrated site viewer CSS and JavaScript live in separate files.
    // Build the downloadable constellation viewer as a complete standalone HTML file.
    const assetTag=clone.querySelector('#azara-standalone-assets');
    if(assetTag){
      const bank=JSON.parse(assetTag.textContent);
      const decode=b64=>new TextDecoder('utf-8').decode(Uint8Array.from(atob(b64),ch=>ch.charCodeAt(0)));
      bank.styles.forEach(item=>{
        const link=Array.from(clone.querySelectorAll('link[rel="stylesheet"]')).find(el=>el.getAttribute('href')===item.href);
        if(!link)return;
        const style=clone.ownerDocument.createElement('style');
        style.textContent=decode(item.base64);
        link.replaceWith(style);
      });
      bank.scripts.forEach(item=>{
        const tag=Array.from(clone.querySelectorAll('script[src]')).find(el=>el.getAttribute('src')===item.src);
        if(!tag)return;
        const script=clone.ownerDocument.createElement('script');
        script.textContent=decode(item.base64).replace(/<\/script/gi,'<\\/script');
        tag.replaceWith(script);
      });
      assetTag.remove();
    }
    const html = "<!DOCTYPE html>\n" + clone.outerHTML;
    downloadText("constellations.html", html, "text/html;charset=utf-8");
  }

  async function importJSONFile(file){
    const text = await file.text();
    loadJSONText(text, "Imported " + file.name);
  }

  function loadJSONText(text, title){
    try {
      const parsed = JSON.parse(text);
      const normalized = normalizeImportedData(parsed);
      if(title && !normalized.metadata.title) normalized.metadata.title = title;
      skyData = normalized;
      applyGeneratorSettingsToUI(skyData.generator);
      selectedConstellationId = null;
      rebuildIndex();
      document.getElementById("jsonPaste").value = JSON.stringify(exportData(), null, 2);
      setInfo("JSON imported", [["Stars", String(skyData.stars.length)], ["Constellations", String(skyData.constellations.length)], ["Coordinate lines", String((skyData.coordinate_lines||[]).length)]], "The imported sky is now active. Export constellations.html to preserve it inside the full site.");
    } catch(err) {
      setInfo("JSON import failed", [["Error", escapeHTML(err.message)]], "Check that the file is valid JSON and that stars/constellations use the hooks listed in the schema.");
    }
  }

  function copyHooks(){
    const hooksTag = document.getElementById("bv-constellations-json-hooks");
    const text = hooksTag ? hooksTag.textContent : JSON.stringify({}, null, 2);
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(() => setInfo("JSON hooks copied", [["Schema", "azara_constellations_json_hooks"], ["Coordinate lines", String(DEFAULT_COORDINATE_LINES.length)]], "The required JSON hooks are now on your clipboard."));
    } else {
      document.getElementById("jsonPaste").value = text;
      setInfo("JSON hooks shown", [["Schema", "azara_constellations_json_hooks"]], "Clipboard access was unavailable, so the hooks were placed in the paste box.");
    }
  }

  function updateSliderLabels(){
    const sd = Number(document.getElementById("stardensity").value);
    document.getElementById("stardensityValue").textContent = "2^" + sd + " = " + Math.pow(2,sd);
    document.getElementById("numconstellationsValue").textContent = document.getElementById("numconstellations").value;
    document.getElementById("minconstellationsizeValue").textContent = document.getElementById("minconstellationsize").value;
    document.getElementById("constellationsizerangeValue").textContent = "+" + document.getElementById("constellationsizerange").value;
    document.getElementById("constellationdistanceValue").textContent = document.getElementById("constellationdistance").value + "°";
  }

  function syncToggleButtons(){
    const toggles = [
      ["togglePrettify", prettifyEnabled, "Prettify On", "Prettify Off"],
      ["toggleConnections", connectionFieldEnabled, "Ambient Links On", "Ambient Links Off"],
      ["toggleStars", showStars, "Stars On", "Stars Off"],
      ["toggleLines", showLines, "Lines On", "Lines Off"],
      ["toggleLabels", showLabels, "Labels On", "Labels Off"],
      ["toggleGrid", showGrid, "Named Grid On", "Named Grid Off"]
    ];
    toggles.forEach(([id,state,on,off]) => {
      const el = document.getElementById(id);
      if(!el) return;
      el.classList.toggle("active", !!state);
      el.textContent = state ? on : off;
    });
  }

  function updateLegend(){
    document.getElementById("legend").innerHTML =
      '<span class="key">' + skyData.stars.length + ' stars</span>' +
      '<span class="key">' + skyData.constellations.length + ' constellations</span>' +
      '<span class="key">drag = pan</span>' +
      '<span class="key">wheel/buttons = zoom</span>' +
      '<span class="key">click = inspect</span>' +
      '<span class="key">Experience The Wonder</span>';
  }

  function syncAccessMode(){
    let mergedHash = String(window.location.hash || "");
    try { if(parent && parent !== window) mergedHash += " " + String(parent.location.hash || ""); } catch(err) {}
    const enabled = mergedHash.toLowerCase().includes("dm-editor");
    document.body.classList.toggle("dm-editor", enabled);
    return enabled;
  }

  function installEvents(){
    window.addEventListener("resize", resize);
    window.addEventListener("hashchange", syncAccessMode);
    document.getElementById("hours").addEventListener("click", event => {
      if(event.target.dataset.hour==null) return;
      hour = event.target.dataset.hour==="live" ? null : Number(event.target.dataset.hour);
      document.querySelectorAll("#hours button").forEach(button => button.classList.toggle("active", button === event.target));
      updateReadouts();
    });
    document.getElementById("viewTopUp").addEventListener("click", () => {
      viewMode = "up";
      document.getElementById("viewTopUp").classList.add("active");
      document.getElementById("viewTopDown").classList.remove("active");
      draw(performance.now());
    });
    document.getElementById("viewTopDown").addEventListener("click", () => {
      viewMode = "down";
      document.getElementById("viewTopDown").classList.add("active");
      document.getElementById("viewTopUp").classList.remove("active");
      draw(performance.now());
    });
    document.getElementById("play").addEventListener("click", () => {
      playing = !playing;
      document.getElementById("play").textContent = playing ? "Pause" : "Play";
      updateReadouts();
    });
    document.getElementById("recenter").addEventListener("click", resetView);
    document.getElementById("zoomIn").addEventListener("click", () => applyZoom(1.18, window.innerWidth / 2, window.innerHeight / 2));
    document.getElementById("zoomOut").addEventListener("click", () => applyZoom(0.85, window.innerWidth / 2, window.innerHeight / 2));
    const speedSlider=document.getElementById("speed"),speedOutput=document.getElementById("speedOutput"),speedHelpers=document.querySelector("#constellationSpeedControl .aza-speed-help");
    function azaraSyncSpeedUI(slider,output,helpers){const spec=azaraSpeedSpec(slider.value);if(output)output.textContent=spec.label;if(helpers)helpers.querySelectorAll("[data-speed-pos]").forEach(b=>b.classList.toggle("active",Math.abs(Number(b.dataset.speedPos)-Number(slider.value))<.5));return spec}
    function applySkySpeed(){const spec=azaraSyncSpeedUI(speedSlider,speedOutput,speedHelpers);if(spec.key==="paused"){playing=false;document.getElementById("play").textContent="Play";}else{playing=true;document.getElementById("play").textContent="Pause";}if(spec.key==="sync")simDay=currentVeilDayFloat();updateReadouts();}
    speedSlider.addEventListener("input",applySkySpeed);speedHelpers?.addEventListener("click",event=>{const b=event.target.closest("[data-speed-pos]");if(!b)return;speedSlider.value=b.dataset.speedPos;speedSlider.dispatchEvent(new Event("input",{bubbles:true}));});applySkySpeed();
    document.getElementById("day").addEventListener("input", event => { simDay = Number(event.target.value); if(azaraSpeedSpec(document.getElementById("speed").value).key==="sync"){playing=false;document.getElementById("play").textContent="Play";} updateReadouts(); draw(performance.now()); });
    document.getElementById("lat").addEventListener("input", event => { lat = Number(event.target.value); updateReadouts(); draw(performance.now()); });

    ["stardensity","numconstellations","minconstellationsize","constellationsizerange","constellationdistance"].forEach(id => {
      document.getElementById(id).addEventListener("input", updateSliderLabels);
    });
    document.getElementById("generateSky").addEventListener("click", generateSky);
    document.getElementById("clearSky").addEventListener("click", clearSky);
    document.getElementById("newSeed").addEventListener("click", () => { document.getElementById("inpseed").value = "Aza\'ra-" + Math.floor(Math.random()*1e12).toString(36); generateSky(); });
    document.getElementById("togglePrettify").addEventListener("click", () => { prettifyEnabled = !prettifyEnabled; syncToggleButtons(); });
    document.getElementById("toggleConnections").addEventListener("click", () => { connectionFieldEnabled = !connectionFieldEnabled; syncToggleButtons(); });
    document.getElementById("toggleStars").addEventListener("click", () => { showStars = !showStars; syncToggleButtons(); });
    document.getElementById("toggleLines").addEventListener("click", () => { showLines = !showLines; syncToggleButtons(); });
    document.getElementById("toggleLabels").addEventListener("click", () => { showLabels = !showLabels; syncToggleButtons(); });
    document.getElementById("toggleGrid").addEventListener("click", () => { showGrid = !showGrid; syncToggleButtons(); });

    document.getElementById("importJSON").addEventListener("click", () => document.getElementById("jsonFileInput").click());
    document.getElementById("jsonFileInput").addEventListener("change", event => { const file = event.target.files[0]; if(file) importJSONFile(file); event.target.value = ""; });
    document.getElementById("downloadJSON").addEventListener("click", downloadJSON);
    document.getElementById("exportHTML").addEventListener("click", exportHTML);
    document.getElementById("copyHooks").addEventListener("click", copyHooks);
    document.getElementById("loadPastedJSON").addEventListener("click", () => loadJSONText(document.getElementById("jsonPaste").value, "Pasted JSON"));
    document.getElementById("refreshPaste").addEventListener("click", () => { updateEmbeddedJSON(); document.getElementById("jsonPaste").value = JSON.stringify(exportData(), null, 2); });

    canvas.addEventListener("click", reportClick);
    canvas.addEventListener("pointerdown", event => {
      drag = true;
      clickMoved = false;
      pointerDownAt = {x:event.clientX, y:event.clientY};
      lastX = event.clientX;
      lastY = event.clientY;
      canvas.classList.add("dragging");
    });
    window.addEventListener("pointerup", () => { drag = false; canvas.classList.remove("dragging"); pointerDownAt = null; });
    window.addEventListener("pointermove", event => {
      if(!drag) return;
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      if(pointerDownAt && Math.hypot(event.clientX - pointerDownAt.x, event.clientY - pointerDownAt.y) > 4) clickMoved = true;
      panX += dx;
      panY += dy;
      lastX = event.clientX;
      lastY = event.clientY;
      draw(performance.now());
    });
    canvas.addEventListener("wheel", event => { event.preventDefault(); applyZoom(event.deltaY < 0 ? 1.12 : 0.89, event.clientX, event.clientY); }, { passive:false });
  }

  function resetView(){
    zoom = 1;
    panX = 0;
    panY = 0;
    selectedConstellationId = null;
    resetInfo();
    updateReadouts();
    draw(performance.now());
  }

  function loadEmbeddedData(){
    const tag = document.getElementById("bv-embedded-constellations-json");
    if(!tag) return false;
    try {
      const parsed = JSON.parse(tag.textContent || "{}");
      skyData = normalizeImportedData(parsed);
      applyGeneratorSettingsToUI(skyData.generator);
      if(!skyData.stars.length && skyData.generator && Object.keys(skyData.generator).length) {
        const stars = generateStars(skyData.generator);
        skyData.stars = stars;
        skyData.constellations = generateConstellationsFromStars(stars, skyData.generator);
      }
      rebuildIndex();
      return true;
    } catch(err) {
      console.warn("Embedded constellation JSON could not be read:", err);
      return false;
    }
  }

  window.AzaraNightSky = {
    generateSky,
    clearSky,
    exportData,
    importData(data){ skyData = normalizeImportedData(data); rebuildIndex(); },
    focusConstellation,
    focusStar,
    resetView,
    downloadJSON,
    exportHTML,
    hooks(){ return JSON.parse(document.getElementById("bv-constellations-json-hooks").textContent); }
  };

  syncAccessMode();
  installEvents();
  syncToggleButtons();
  updateSliderLabels();
  loadEmbeddedData();
  if(!skyData.stars.length) generateSky();
  resize();
  requestAnimationFrame(tick);

  function installTimePanel(){
    if(window.__belavadosDualTimeInstalled) return;
    window.__belavadosDualTimeInstalled = true;
    const YEAR_DAYS=240;
    const MONTHS=AZARA_SKY_MONTHS;
    const WEEKDAYS=AZARA_SKY_WEEKDAYS;
    const NUM_PRON=["Ih","Neh","Duh","Meh","Goh","Ohm","r͡reh"];
    function selectedSpeedText(){
      const spec=azaraSpeedSpec(document.getElementById("speed")?.value||100);
      const secPerYear=spec.daysPerSecond>0?YEAR_DAYS/spec.daysPerSecond:Infinity;
      return{secPerYear,label:spec.label,daysPerSecond:spec.daysPerSecond,secondsPerDay:spec.daysPerSecond>0?1/spec.daysPerSecond:Infinity,live:spec.key==="sync",paused:spec.key==="paused"};
    }
    function dominantMoon(h){
      if(h===21)return"Arvalla + Duvaen";
      if(h>=12&&h<=14)return"W’iosamn + Arvalla";
      if(h>=6&&h<=7)return"Duvaen + W’iosamn";
      if(h<=7)return"Duvaen";
      if(h<=14)return"W’iosamn";
      return"Arvalla";
    }
    function simulationParts(){
      const dayIndex=azaMod(Math.floor(simDay),YEAR_DAYS);
      const t=skyVeilParts();
      const monthIndex=Math.floor(dayIndex/30);
      const pronunciation=NUM_PRON[t.periodHour-1]+"-"+(t.period==="Ae"?"aye":t.period==="W’i"?"wuh-ai-ee":"lah");
      const dayOfMonth=(dayIndex%30)+1,weekOfMonth=Math.floor((dayOfMonth-1)/6)+1,weekOfYear=Math.floor(dayIndex/6)+1;return{dayIndex,day:dayIndex+1,month:MONTHS[monthIndex],dayOfMonth,weekday:WEEKDAYS[dayIndex%6],weekOfMonth,weekOfYear,t,pronunciation,moon:dominantMoon(t.hour)};
    }
    function latitudeSummary(){
      const absLat=Math.abs(lat);
      const hemi=lat===0?"Equator":(lat>0?"Northern sky":"Southern sky");
      const pole=lat===0?"both poles sit on the horizon":(lat>0?"northern pole rises":"southern pole rises");
      return{absLat,hemi,pole};
    }
    function earthPulseRates(){
      const now=new Date(),y=now.getFullYear(),start=new Date(y,0,1),end=new Date(y+1,0,1),days=Math.round((end-start)/86400000);
      const leap=days===366;
      const dayHours=days*24/240;
      const hourMinutes=days*24*60/(240*21);
      return{year:y,leap,dayHours,hourMinutes,minuteSeconds:hourMinutes};
    }
    function makePanel(){
      let div=document.getElementById("bv-time-panel");
      if(!div){
        div=document.createElement("section");
        div.id="bv-time-panel";div.className="bv-time-panel bv-time-inline";
        div.setAttribute("aria-label","Aza'ra Veil time converter");
        div.innerHTML='<div class="bv-time-head"><div>⏱ <span>Aza\'raan Veil Time</span><small class="bv-time-draghint">inline</small></div><button class="bv-time-toggle" type="button">hide</button></div>'+
        '<div class="bv-time-body">'+
        '<div class="bv-time-card"><b>Calendar</b><strong data-bv-earth-main></strong><small data-bv-earth-sub></small></div>'+
        '<div class="bv-time-card"><b>Live Veil now</b><strong data-bv-live-main></strong><small data-bv-live-sub></small></div>'+
        '<div class="bv-time-card"><b>Veil clock</b><strong data-bv-bela-main></strong><small data-bv-bela-sub></small></div>'+
        '<div class="bv-time-card"><b>Observer latitude</b><strong data-bv-month-main></strong><small data-bv-month-sub></small></div>'+
        '<div class="bv-time-card"><b>Simulation speed</b><strong data-bv-day-main></strong><small data-bv-day-sub></small></div>'+
        '</div><div class="bv-time-foot"><em>Veil time</em> uses 21 hours/day, 6 days/week, 5 weeks/month, 8 months/year, and 240 days/year. Old Belavadös calendar names are retained; removed seventh-day and extra-month names remain legacy names rather than extra calendar slots.</div>';
        const hud=document.querySelector(".hud");const anchor=document.getElementById("dmEditorTools")||document.querySelector(".hud details");
        if(hud&&anchor)hud.insertBefore(div,anchor);else document.body.appendChild(div);
      }
      const toggle=div.querySelector(".bv-time-toggle");
      if(toggle&&!toggle.dataset.bound){toggle.dataset.bound="true";toggle.addEventListener("click",event=>{event.stopPropagation();div.classList.toggle("collapsed");toggle.textContent=div.classList.contains("collapsed")?"show":"hide";saveTimePanel(div);});}
      restoreTimePanel(div);return div;
    }
    function saveTimePanel(panel){try{localStorage.setItem(STORAGE_KEY,JSON.stringify({collapsed:panel.classList.contains("collapsed")}));}catch(e){}}
    function restoreTimePanel(panel){try{const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||"null");if(!saved)return;if(saved.collapsed){panel.classList.add("collapsed");panel.querySelector(".bv-time-toggle").textContent="show";}}catch(e){}}
    const panel=makePanel();
    function updateTimePanel(){
      if(!panel||!panel.isConnected)return;
      const b=simulationParts(),sp=selectedSpeedText(),la=latitudeSummary(),pulse=earthPulseRates();
      const viewText=viewMode==="up"?"Top Up":"Top Down";
      panel.querySelector("[data-bv-earth-main]").textContent=`Day ${b.day} / 240 · ${b.month} ${b.dayOfMonth}`;
      panel.querySelector("[data-bv-earth-sub]").textContent=`${b.weekday} • week ${b.weekOfMonth}/5 • year week ${b.weekOfYear}/40`;
      const liveDay=currentVeilDayFloat(),liveIndex=azaMod(Math.floor(liveDay),240),liveMonth=MONTHS[Math.floor(liveIndex/30)],liveDOM=(liveIndex%30)+1,liveWeekday=WEEKDAYS[liveIndex%6];
      const oldSim=simDay;simDay=liveDay;const liveT=skyVeilParts();simDay=oldSim;
      panel.querySelector("[data-bv-live-main]").textContent=`${liveMonth} ${liveDOM} · ${liveWeekday} · ${liveT.notation} ${pad(liveT.minute)}:${pad(liveT.second)}`;
      panel.querySelector("[data-bv-live-sub]").textContent=`Canonical Earth-year sync • 240 days/year • ${pulse.dayHours.toFixed(3)} Earth hours/Aza'raan day`;
      panel.querySelector("[data-bv-bela-main]").textContent=`${b.t.notation} · ${b.pronunciation} · ${pad(b.t.minute)}:${pad(b.t.second)}`;
      panel.querySelector("[data-bv-bela-sub]").textContent=`${hour===null?"Live/animated clock":"Clock locked to selected sky hour"} • Hour ${b.t.hour}/21 • ${b.moon} • ${viewText}`;
      panel.querySelector("[data-bv-month-main]").textContent=la.hemi+" · "+(lat>=0?"+":"")+lat+"°";
      panel.querySelector("[data-bv-month-sub]").textContent=`At ${la.absLat}° latitude, the ${la.pole}; horizon projection refreshes with this slider.`;
      panel.querySelector("[data-bv-day-main]").textContent=sp.live?(playing?"Live Veil sync":"Live sync paused"):(sp.paused?"Paused":((playing?"Playing":"Paused")+" · "+sp.daysPerSecond.toFixed(6)+" Aza'raan days/sec"));
      panel.querySelector("[data-bv-day-sub]").textContent=`${sp.label} • canonical ${pulse.leap?"leap":"common"}-year hum: ${pulse.dayHours.toFixed(3)} Earth hr/day, ${pulse.hourMinutes.toFixed(2)} Earth min/hour, ${pulse.minuteSeconds.toFixed(2)} Earth sec/minute, ${(pulse.minuteSeconds/60).toFixed(3)} Earth sec per magitech second.`;
    }
    window.__belavadosUpdateTimePanel=updateTimePanel;
    updateTimePanel();
  }
  installTimePanel();
})();
