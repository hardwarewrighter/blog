// Animated thumbnails (<video class="photo-anim">).
//
// The markup deliberately omits `autoplay`. Playback starts here instead, so
// that a reader who has asked their OS for reduced motion gets the poster frame
// — a still, transparent WebP — rather than a looping animation they cannot
// stop. An `autoplay` attribute would ignore that preference entirely.
(function () {
  'use strict';

  function init() {
    var vids = document.querySelectorAll('video.photo-anim');
    if (!vids.length) return;

    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');

    function apply() {
      Array.prototype.forEach.call(vids, function (v) {
        if (reduce && reduce.matches) {
          v.pause();
          // Rewind so the poster-equivalent first frame is what shows.
          try { v.currentTime = 0; } catch (e) {}
          v.classList.add('is-paused');
        } else {
          v.classList.remove('is-paused');
          // play() rejects if the browser blocks it; muted+playsinline should
          // satisfy every current autoplay policy, but never let it throw.
          var p = v.play();
          if (p && typeof p.catch === 'function') p.catch(function () {});
        }
      });
    }

    apply();

    if (reduce) {
      if (reduce.addEventListener) reduce.addEventListener('change', apply);
      else if (reduce.addListener) reduce.addListener(apply);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
