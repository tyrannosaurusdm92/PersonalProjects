/*
 * Onyx Bird Dice — standalone JavaScript, no dependencies.
 *
 * Include this file in the tribute's page (once). It automatically detects
 * <video> playback, including videos inserted later or reusing one element.
 * A new d4, d6, d8 and d10 are rolled BEFORE each new video plays.
 * Preloading a video rolls secretly, but does not change active birds.
 * Resuming a paused video does NOT re-roll. Replaying an ended video does.
 *
 * Dice rules (one shared roll per die):
 *   Robin       d4  even     | Sparrow      d4  odd
 *   Finch       d6  odd      | Cardinal     d6  even
 *   Dove        d8  odd      | (d8 even = no Dove)
 *   Hummingbird d10 even     | Blue Jay      d10 odd
 *
 * For the requested 2–3 species per video, 2 or 3 eligible birds are chosen
 * without replacement; all four dice are always rolled first. To display ALL
 * eligible species instead, set config.minSpecies=4 and maxSpecies=4.
 *
 * BRIDGE TO AN EXISTING BIRD ANIMATION:
 *   if (window.OnyxBirdDice.isBirdAllowed(speciesName)) {
 *     // spawn your existing bird animation for this species
 *   }
 *
 * Or subscribe to each video's new selection:
 *   document.addEventListener('onyx:birds-changed', (event) => {
 *     const birds = event.detail.birds; // e.g. ['Robin', 'Dove', 'Blue Jay']
 *     const keys  = event.detail.keys;  // e.g. ['robin', 'dove', 'blue-jay']
 *     // update your existing bird species pool here
 *   });
 *
 * If your slideshow knows exactly when it swaps videos, it can trigger a
 * new roll even when reusing the same URL (BEFORE invoking video.play()):
 *   window.OnyxBirdDice.beforeVideo(videoElement);
 *   // or: window.OnyxBirdDice.beforeVideo('unique-video-id');
 *
 * No interface or dice outcomes are displayed. debug defaults to false.
 */
(function (root) {
  'use strict';

  var SPECIES = Object.freeze([
    Object.freeze({ name: 'Robin',       key: 'robin',       die: 4,  parity: 'even' }),
    Object.freeze({ name: 'Finch',       key: 'finch',       die: 6,  parity: 'odd' }),
    Object.freeze({ name: 'Hummingbird', key: 'hummingbird', die: 10, parity: 'even' }),
    Object.freeze({ name: 'Dove',        key: 'dove',        die: 8,  parity: 'odd' }),
    Object.freeze({ name: 'Blue Jay',    key: 'blue-jay',    die: 10, parity: 'odd' }),
    Object.freeze({ name: 'Cardinal',    key: 'cardinal',    die: 6,  parity: 'even' }),
    Object.freeze({ name: 'Sparrow',     key: 'sparrow',     die: 4,  parity: 'odd' })
  ]);

  var config = {
    minSpecies: 2,
    maxSpecies: 3,
    debug: false
  };

  var videoStates = new WeakMap();
  var namedStates = new Map();
  var latest = null;
  var currentVideo = null;

  // Uniform random integer using browser Web Crypto when available.
  // Rejection sampling eliminates modulo bias for fair dice rolls.
  function randomIndex(size) {
    if (!Number.isSafeInteger(size) || size < 1) {
      throw new RangeError('Random range must be a positive integer');
    }
    if (root.crypto && typeof root.crypto.getRandomValues === 'function') {
      var max = 0x100000000;
      var cutoff = max - (max % size);
      var bytes = new Uint32Array(1);
      do {
        root.crypto.getRandomValues(bytes);
      } while (bytes[0] >= cutoff);
      return bytes[0] % size;
    }
    return Math.floor(Math.random() * size);
  }

  function rollDie(sides) {
    return randomIndex(sides) + 1;
  }

  function shuffle(input) {
    var values = input.slice();
    for (var i = values.length - 1; i > 0; i--) {
      var j = randomIndex(i + 1);
      var tmp = values[i];
      values[i] = values[j];
      values[j] = tmp;
    }
    return values;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function drawSpecies() {
    // IMPORTANT: Each die is rolled exactly once and shared by its birds.
    var rolls = {
      d4: rollDie(4),
      d6: rollDie(6),
      d8: rollDie(8),
      d10: rollDie(10)
    };

    var qualifying = SPECIES.filter(function (bird) {
      var value = rolls['d' + bird.die];
      return (value % 2 === 0) === (bird.parity === 'even');
    });

    // d4/d6/d10 each always qualify exactly one species: 3 or 4 candidates.
    // Pick 2 or 3 per video to keep the animation varied, never clustered.
    var minimum = clamp(Math.trunc(Number(config.minSpecies) || 2), 1, qualifying.length);
    var maximum = clamp(Math.trunc(Number(config.maxSpecies) || 3), minimum, qualifying.length);
    var count = minimum + randomIndex(maximum - minimum + 1);
    var chosenKeys = new Set(shuffle(qualifying).slice(0, count).map(function (bird) {
      return bird.key;
    }));

    // Keep the returned species order stable for straightforward integration.
    var selected = SPECIES.filter(function (bird) {
      return chosenKeys.has(bird.key);
    });

    return {
      birds: selected.map(function (bird) { return bird.name; }),
      keys: selected.map(function (bird) { return bird.key; }),
      rolls: rolls
    };
  }

  function isVideo(value) {
    return !!value && typeof value === 'object' &&
      String(value.tagName || '').toUpperCase() === 'VIDEO';
  }

  function clipSignature(video) {
    var file = video.getAttribute('src');
    if (!file && typeof video.querySelector === 'function') {
      var source = video.querySelector('source[src]');
      file = source && source.getAttribute('src');
    }
    file = file || video.currentSrc || video.src || video.id || 'unnamed-video';
    var logicalId = video.getAttribute('data-bird-clip-id') || '';
    return logicalId + '|' + file;
  }

  function announce(selection, video, reason) {
    var detail = {
      birds: selection.birds.slice(),
      keys: selection.keys.slice(),
      videoId: isVideo(video) ? (video.id || null) : (video || null),
      reason: reason
    };
    var destination = isVideo(video) ? video : (root.document || root);
    if (destination && typeof destination.dispatchEvent === 'function' &&
        typeof root.CustomEvent === 'function') {
      destination.dispatchEvent(new root.CustomEvent('onyx:birds-changed', {
        bubbles: true,
        detail: detail
      }));
    }
    if (config.debug && root.console && typeof root.console.debug === 'function') {
      root.console.debug('[OnyxBirdDice]', reason, detail.videoId,
        'dice=', selection.rolls || '(cleared)', 'birds=', detail.birds);
    }
  }

  function start(videoOrId, force, activate) {
    if (activate === undefined) activate = true;
    var video = isVideo(videoOrId) ? videoOrId : null;
    var id = video ? null : String(videoOrId == null ? 'manual-video' : videoOrId);
    var signature = video ? clipSignature(video) : id;
    var previous = video ? videoStates.get(video) : namedStates.get(id);

    if (!force && previous && !previous.ended && previous.signature === signature) {
      // Resume or activate a pre-rolled video without rerolling the dice.
      if (activate && (currentVideo !== (video || id) || !previous.announced)) {
        latest = previous.selection;
        currentVideo = video || id;
        previous.announced = true;
        announce(previous.selection, video || id, 'video-start');
      }
      return previous.selection.birds.slice();
    }

    var selection = drawSpecies();
    var state = {
      signature: signature,
      selection: selection,
      ended: false,
      announced: false,
      lastPlaybackTime: 0
    };
    if (video) videoStates.set(video, state);
    else namedStates.set(id, state);

    if (activate) {
      latest = selection;
      currentVideo = video || id;
      state.announced = true;
      announce(selection, video || id, 'video-start');
    }
    return selection.birds.slice();
  }

  function endVideo(video) {
    var state = videoStates.get(video);
    if (!state) return;
    state.ended = true;
    if (currentVideo !== video) return;
    latest = null;
    currentVideo = null;
    announce({ birds: [], keys: [] }, video, 'video-ended');
  }

  function normalizeBird(name) {
    return String(name == null ? '' : name).toLowerCase().replace(/[^a-z]/g, '');
  }

  var api = {
    config: config,
    species: SPECIES,
    // Force a fresh secret roll directly BEFORE a new slideshow video.
    beforeVideo: function (videoOrId) {
      return start(videoOrId, true);
    },
    rollForVideo: function (videoOrId) {
      return start(videoOrId, true);
    },
    // Return only the species allowed in the current video, not die results.
    getSelectedBirds: function () {
      return latest ? latest.birds.slice() : [];
    },
    getSelectedKeys: function () {
      return latest ? latest.keys.slice() : [];
    },
    isBirdAllowed: function (speciesName) {
      var requested = normalizeBird(speciesName);
      return !!latest && latest.birds.some(function (bird) {
        return normalizeBird(bird) === requested;
      });
    },
    // Get the selection associated with a specific video or named clip.
    getBirdsForVideo: function (videoOrId) {
      var state = isVideo(videoOrId)
        ? videoStates.get(videoOrId)
        : namedStates.get(String(videoOrId));
      return state && !state.ended ? state.selection.birds.slice() : [];
    }
  };

  root.OnyxBirdDice = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;

  // Event capture works for both existing and dynamically inserted <video>s;
  // no mutation observer, timers or external library is required.
  if (root.document && typeof root.document.addEventListener === 'function') {
    root.document.addEventListener('loadstart', function (event) {
      if (isVideo(event.target)) start(event.target, false, false);
    }, true);

    root.document.addEventListener('play', function (event) {
      if (isVideo(event.target)) start(event.target, false);
    }, true);

    root.document.addEventListener('ended', function (event) {
      if (isVideo(event.target)) endVideo(event.target);
    }, true);

    // HTML video loop=true can restart without firing 'ended'.
    root.document.addEventListener('timeupdate', function (event) {
      var video = event.target;
      if (!isVideo(video) || !video.loop) return;
      var state = videoStates.get(video);
      if (!state) return;
      var time = Number(video.currentTime) || 0;
      if (state.lastPlaybackTime > 1 && time < 0.35) {
        start(video, true);
        state = videoStates.get(video);
      }
      state.lastPlaybackTime = time;
    }, true);
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);
