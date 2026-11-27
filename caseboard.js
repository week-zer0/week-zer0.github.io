// Draws the strings on the evidence board: one line from the case note to each
// photo, pinned where it meets the photo's edge. Redrawn on load and resize.
(function () {
  var board = document.getElementById('caseboard');
  if (!board) return;
  var svg = board.querySelector('.strings');
  var note = board.querySelector('.case-note');
  function box(el, b) {
    var r = el.getBoundingClientRect();
    return { cx: r.left - b.left + r.width / 2, cy: r.top - b.top + r.height / 2, w: r.width / 2, h: r.height / 2 };
  }
  function edge(B, dx, dy, pad) {
    var t = Math.min(dx ? (B.w + pad) / Math.abs(dx) : 1e9, dy ? (B.h + pad) / Math.abs(dy) : 1e9);
    return { x: B.cx + dx * t, y: B.cy + dy * t };
  }
  function draw() {
    var b = board.getBoundingClientRect(), N = box(note, b), lines = '', dots = '';
    board.querySelectorAll('.ev img').forEach(function (img) {
      var R = box(img, b), dx = R.cx - N.cx, dy = R.cy - N.cy, L = Math.hypot(dx, dy);
      if (!L) return;
      var ux = dx / L, uy = dy / L, a = edge(N, ux, uy, 0), c = edge(R, -ux, -uy, 6);
      lines += '<line x1="' + a.x + '" y1="' + a.y + '" x2="' + c.x + '" y2="' + c.y + '"/>';
      dots += '<circle cx="' + c.x + '" cy="' + c.y + '" r="5"/><circle cx="' + a.x + '" cy="' + a.y + '" r="4"/>';
    });
    svg.innerHTML = lines + dots;
  }
  window.addEventListener('resize', draw);
  window.addEventListener('load', draw);
  board.querySelectorAll('img').forEach(function (i) { i.addEventListener('load', draw); });
  draw();
})();
