'use strict';
(function () {
  window.cards = document.querySelectorAll('.map__card');
  for (var i = 0; i < window.cards.length; i++) {
    window.cards[i].classList.add('hidden');
    window.cards[i].setAttribute('tabindex', '0');
  } // hide cards
  function makePins() {
    var template = document.querySelector('#pin').content.querySelector('.map__pin');
    var wrapper = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    for (var j = 0; j < window.globalValues.arrWithObjs.length; j++) {
      var clone = template.cloneNode(true);
      clone.style.left = window.globalValues.arrWithObjs[j].location.x + 'px';
      clone.style.top = window.globalValues.arrWithObjs[j].location.y + 'px';
      clone.src = window.globalValues.arrWithObjs[j].author.avatar;
      clone.alt = window.globalValues.arrWithObjs[j].offer.description;
      fragment.appendChild(clone);
    }
    wrapper.appendChild(fragment);
  }
  makePins(); // отключено для возврата в исходное состояние

  function pinClickAndPressHandler() {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (elem, index) {
      elem.setAttribute('tabindex', '0');
      elem.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.globalValues.ESC_KEYCODE) {
          window.cards[index].classList.add('hidden');
        }
      });
      var pinPressShowHandler = function (evt2) {
        if (evt2.keyCode === window.globalValues.ENTER_KEYCODE) {
          window.cards[index].classList.remove('hidden');
        }
      };
      elem.addEventListener('keydown', pinPressShowHandler);
      var pinClickShowHandler = function (evt) {
        window.cards[index].classList.remove('hidden');
        window.cards[index].style.top = evt.clientY + 'px';
        window.cards[index].style.left = evt.clientX + 'px';
        // если картинка вылезает вниз, разместить ее повыше
        if (parseInt(window.cards[index].style.top, 10) > 500) {
          window.cards[index].style.top = parseInt(window.cards[index].style.top, 10) - 200 + 'px';
        }
        window.cards[index].querySelector('.popup__close').setAttribute('tabindex', '0');
        var pinClickHiddenHandler = function () {
          window.cards[index].classList.add('hidden');
        };
        window.cards[index].querySelector('.popup__close').addEventListener('click', pinClickHiddenHandler);
      };
      elem.addEventListener('click', pinClickShowHandler);
    });
  }
  pinClickAndPressHandler();
})();
