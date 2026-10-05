// Testimonials gallery: adds previous, pause and next buttons and auto-advance.
// Progressive enhancement: without this script the gallery is a row you can swipe or scroll.
(function () {
  var root = document.querySelector('.testimonials');
  if (!root) return;
  var track = root.querySelector('.track');
  var slides = track.children;
  var controls = root.querySelector('.controls');
  var count = root.querySelector('.count');
  var pauseButton = root.querySelector('[data-act="pause"]');
  var n = slides.length;
  var DELAY = 14000;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover = window.matchMedia('(hover: hover)').matches;
  var index = 0;
  var timer = null;
  var paused = reduceMotion; // visitors who ask for less motion start paused

  function show(k) {
    index = (k + n) % n;
    track.style.transform = 'translateX(-' + index * 100 + '%)';
    count.textContent = (index + 1) + ' / ' + n;
    for (var j = 0; j < n; j++) {
      slides[j].setAttribute('aria-hidden', j === index ? 'false' : 'true');
    }
  }

  function stop() {
    window.clearInterval(timer);
    timer = null;
  }

  function play() {
    stop();
    if (!paused) timer = window.setInterval(function () { show(index + 1); }, DELAY);
  }

  function setPaused(value) {
    paused = value;
    pauseButton.textContent = paused ? 'Play' : 'Pause';
    track.setAttribute('aria-live', paused ? 'polite' : 'off');
    play();
  }

  root.addEventListener('click', function (event) {
    var button = event.target.closest('[data-act]');
    if (!button) return;
    var act = button.getAttribute('data-act');
    if (act === 'prev') show(index - 1);
    if (act === 'next') show(index + 1);
    if (act === 'pause') setPaused(!paused);
    if (act !== 'pause') play(); // restart the timer after a manual move
  });

  if (canHover) {
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', play);
  }
  root.addEventListener('focusin', stop);
  root.addEventListener('focusout', play);

  var startX = null;
  track.addEventListener('touchstart', function (event) { startX = event.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', function (event) {
    if (startX === null) return;
    var dx = event.changedTouches[0].clientX - startX;
    startX = null;
    if (Math.abs(dx) > 40) { show(index + (dx < 0 ? 1 : -1)); play(); }
  }, { passive: true });

  root.classList.add('enhanced');
  controls.hidden = false;
  setPaused(paused);
  show(0);
})();
