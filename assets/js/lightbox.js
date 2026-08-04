// Click a thumbnail, get the full-size version in a modal.
//
// Uses the native <dialog> element, so Escape-to-close, focus trapping, and
// inertness of the page behind it come from the browser rather than from here.
// Opt in per image with data-lightbox; the caption comes from the enclosing
// <figcaption> or the image's alt text.
//
// Handles video as well as stills: an animated thumbnail opens as a playing
// video rather than freezing into its poster frame.
(function () {
  'use strict';

  var dialog = null;
  var dialogImg = null;
  var dialogVideo = null;
  var dialogCaption = null;

  function isVideoSrc(src) {
    return /\.(webm|mp4|m4v|mov|ogv)(\?|#|$)/i.test(src || '');
  }

  function build() {
    if (dialog) return dialog;

    dialog = document.createElement('dialog');
    dialog.className = 'lightbox';
    dialog.innerHTML =
      '<button class="lightbox-close" aria-label="Close">&times;</button>' +
      '<img class="lightbox-img" alt="" hidden>' +
      '<video class="lightbox-video" loop muted playsinline controls hidden></video>' +
      '<p class="lightbox-caption"></p>';

    dialogImg = dialog.querySelector('.lightbox-img');
    dialogVideo = dialog.querySelector('.lightbox-video');
    dialogCaption = dialog.querySelector('.lightbox-caption');

    dialog.querySelector('.lightbox-close').addEventListener('click', function () {
      dialog.close();
    });

    // Clicking the backdrop closes. The dialog's own box is a child, so only
    // treat clicks landing on the dialog element itself as backdrop clicks.
    dialog.addEventListener('click', function (e) {
      if (e.target === dialog) dialog.close();
    });

    // Release the media so it is not decoded or held in memory once closed.
    dialog.addEventListener('close', function () {
      dialogImg.removeAttribute('src');
      dialogVideo.pause();
      dialogVideo.removeAttribute('src');
      dialogVideo.removeAttribute('poster');
      dialogVideo.load();
    });

    document.body.appendChild(dialog);
    return dialog;
  }

  function captionFor(img) {
    var fig = img.closest('figure');
    var cap = fig && fig.querySelector('figcaption');
    if (cap && cap.textContent.trim()) return cap.textContent.trim();
    return img.getAttribute('alt') || '';
  }

  function open(el) {
    build();

    // data-lightbox-full / data-full let a thumbnail point at a larger file.
    // For a <video> thumbnail with neither, fall back to its own source so the
    // enlarged view animates instead of freezing on the poster.
    var src = el.getAttribute('data-lightbox-full') || el.getAttribute('data-full');
    if (!src) {
      if (el.tagName === 'VIDEO') {
        var source = el.querySelector('source');
        src = el.currentSrc || (source && source.getAttribute('src')) || '';
      } else {
        src = el.currentSrc || el.src;
      }
    }

    var label = el.getAttribute('alt') || el.getAttribute('aria-label') || '';
    dialogCaption.textContent = captionFor(el);

    if (isVideoSrc(src)) {
      dialogImg.hidden = true;
      dialogImg.removeAttribute('src');

      dialogVideo.hidden = false;
      dialogVideo.setAttribute('aria-label', label);
      // Keep the poster so there is something to look at while it loads, and
      // so a browser that cannot play the file still shows the still frame.
      var poster = el.getAttribute('poster');
      if (poster) dialogVideo.setAttribute('poster', poster);
      dialogVideo.src = src;

      // Controls are always present. Autoplay only when motion is welcome ---
      // the reader opted into this view, but not necessarily into animation.
      var reduce = window.matchMedia &&
                   window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!reduce) {
        var p = dialogVideo.play();
        if (p && typeof p.catch === 'function') p.catch(function () {});
      }
    } else {
      dialogVideo.hidden = true;
      dialogVideo.pause();
      dialogVideo.removeAttribute('src');

      dialogImg.hidden = false;
      dialogImg.src = src;
      dialogImg.alt = label;
    }

    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      // Very old browsers: fall through to opening the file directly.
      window.open(src, '_blank');
    }
  }

  function init() {
    // img[data-lightbox] shows itself full size. Any element with
    // data-lightbox-full (e.g. a <video> thumbnail) opens that file instead.
    var targets = document.querySelectorAll('img[data-lightbox], [data-lightbox-full]');
    if (!targets.length) return;

    Array.prototype.forEach.call(targets, function (img) {
      img.classList.add('is-zoomable');
      // Keyboard reachable and announced as an interactive control.
      img.setAttribute('tabindex', '0');
      img.setAttribute('role', 'button');

      img.addEventListener('click', function (e) {
        // A <video> with controls would otherwise swallow clicks on its own
        // buttons; the in-page thumbnail has no controls, so any click is ours.
        e.preventDefault();
        open(img);
      });
      img.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open(img);
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
