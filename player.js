// Builds the waveform bars and wires each .player to its <audio>.
document.querySelectorAll('.player').forEach(function (p) {
  var audio = p.querySelector('audio'), btn = p.querySelector('button'), wave = p.querySelector('.wave'), time = p.querySelector('.time');
  var hs = [30,55,40,80,65,90,45,70,100,60,35,75,95,50,85,40,65,30,70,90,55,80,45,60,100,75,40,85,50,65,35,70,95,55,45,80,60,90,40,70,50,85,30,65,75,45,55,35];
  hs.forEach(function (h) { var s = document.createElement('span'); s.style.height = h + '%'; wave.appendChild(s); });
  var bars = wave.children;
  function fmt(t) { t = Math.floor(t || 0); return Math.floor(t / 60) + ':' + String(t % 60).padStart(2, '0'); }
  function draw() {
    var f = audio.duration ? audio.currentTime / audio.duration : 0;
    for (var i = 0; i < bars.length; i++) bars[i].classList.toggle('on', i / bars.length < f);
    time.textContent = fmt(audio.currentTime) + ' / ' + fmt(audio.duration);
  }
  var play = '<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5v11l9-5.5z" fill="#F4F3EF"/></svg>';
  var pause = '<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" fill="#F4F3EF"/></svg>';
  btn.innerHTML = play;
  btn.addEventListener('click', function () { audio.paused ? audio.play() : audio.pause(); });
  audio.addEventListener('play', function () { btn.innerHTML = pause; });
  audio.addEventListener('pause', function () { btn.innerHTML = play; });
  audio.addEventListener('timeupdate', draw);
  audio.addEventListener('loadedmetadata', draw);
  wave.addEventListener('click', function (e) { var r = wave.getBoundingClientRect(); if (audio.duration) audio.currentTime = (e.clientX - r.left) / r.width * audio.duration; });
});
