(function () {
  var wrapper = document.querySelector('.card-wrapper');
  var card = document.querySelector('.card');
  var glare = document.querySelector('.card-glare');
  var maxAngle = 7;

  var resetTimer = null;

  var hasPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  var scrollIndicator = document.querySelector('.scroll-indicator');

  function updateScrollIndicator() {
    var overflow = document.documentElement.scrollHeight > window.innerHeight;
    var scrolled = window.scrollY > 16;
    if (overflow && !scrolled) {
      scrollIndicator.classList.add('visible');
    } else {
      scrollIndicator.classList.remove('visible');
    }
  }

  updateScrollIndicator();
  window.addEventListener('resize', updateScrollIndicator);
  window.addEventListener('scroll', updateScrollIndicator);

  if (hasPointer) {
    wrapper.addEventListener('mouseenter', function () {
      wrapper.style.transition = 'none';
      if (resetTimer) {
        clearTimeout(resetTimer);
        resetTimer = null;
      }
    });

    wrapper.addEventListener('mousemove', function (e) {
      var rect = wrapper.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;

      var rx = ((y / rect.height) - 0.5) * -2 * maxAngle;
      var ry = ((x / rect.width) - 0.5) * 2 * maxAngle;

      wrapper.style.transform = 'rotateX(' + rx.toFixed(3) + 'deg) rotateY(' + ry.toFixed(3) + 'deg)';

      var gx = (x / rect.width) * 100;
      var gy = (y / rect.height) * 100;
      card.style.setProperty('--glare-x', gx.toFixed(1) + '%');
      card.style.setProperty('--glare-y', gy.toFixed(1) + '%');
    });

    wrapper.addEventListener('mouseleave', function () {
      wrapper.style.transition = 'transform 1.0s cubic-bezier(0.23, 1, 0.32, 1)';
      wrapper.style.transform = 'rotateX(0deg) rotateY(0deg)';

      resetTimer = setTimeout(function () {
        wrapper.style.transition = 'none';
      }, 1200);
    });
  }
})();
