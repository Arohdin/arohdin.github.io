(function () {
  var card = document.querySelector('.card');
  var glare = document.querySelector('.card-glare');
  var maxAngle = 7;

  var resetTimer = null;

  card.addEventListener('mouseenter', function () {
    card.style.transition = 'none';
    if (resetTimer) {
      clearTimeout(resetTimer);
      resetTimer = null;
    }
  });

  card.addEventListener('mousemove', function (e) {
    var rect = card.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    var rx = ((y / rect.height) - 0.5) * -2 * maxAngle;
    var ry = ((x / rect.width) - 0.5) * 2 * maxAngle;

    card.style.transform = 'rotateX(' + rx.toFixed(3) + 'deg) rotateY(' + ry.toFixed(3) + 'deg)';

    var gx = (x / rect.width) * 100;
    var gy = (y / rect.height) * 100;
    card.style.setProperty('--glare-x', gx.toFixed(1) + '%');
    card.style.setProperty('--glare-y', gy.toFixed(1) + '%');
  });

  card.addEventListener('mouseleave', function () {
    card.style.transition = 'transform 1.0s cubic-bezier(0.23, 1, 0.32, 1)';
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    card.style.setProperty('--glare-x', '50%');
    card.style.setProperty('--glare-y', '50%');

    resetTimer = setTimeout(function () {
      card.style.transition = 'none';
    }, 1200);
  });
})();
