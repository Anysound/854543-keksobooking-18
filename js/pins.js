'use strict';
(function () {
  window.cards = document.querySelectorAll('.map__card');
  // скрытие карточек
  for (var i = 0; i < window.cards.length; i++) {
    window.cards[i].classList.add('hidden');
    window.cards[i].setAttribute('tabindex', '0');
  }
  // function makePins() {
  //   var template = document.querySelector('#pin').content.querySelector('.map__pin');
  //   var wrapper = document.querySelector('.map__pins');
  //   var fragment = document.createDocumentFragment();

  //   for (var j = 0; j < window.globalValues.arrWithObjs.length; j++) {
  //     var clone = template.cloneNode(true);
  //     clone.style.left = window.globalValues.arrWithObjs[j].location.x + 'px';
  //     clone.style.top = window.globalValues.arrWithObjs[j].location.y + 'px';
  //     clone.src = window.globalValues.arrWithObjs[j].author.avatar;
  //     clone.alt = window.globalValues.arrWithObjs[j].offer.description;
  //     fragment.appendChild(clone);
  //   }
  //   wrapper.appendChild(fragment);
  // }
  // makePins();
  // обработчик открытия карточек
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
        alert(true)
        window.cards[index].classList.remove('hidden');
        window.cards[index].style.top = evt.clientY + 'px';
        window.cards[index].style.left = evt.clientX + 'px';
        // если карточка вылезает вниз, разместить ее повыше
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

  // перемещение главной метки
  var mainPin = document.querySelector('.map__pin--main');

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startPoints = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var mainPinMousemoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startPoints.x - moveEvt.clientX,
        y: startPoints.y - moveEvt.clientY
      };

      startPoints = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      // ограничение движения метки
      if (parseInt(mainPin.style.top, 10) > 630) {
        mainPin.style.top = '630px';
      } else if (parseInt(mainPin.style.top, 10) < 130) {
        mainPin.style.top = '130px';
      } else if (parseInt(mainPin.style.left, 10) < 0) {
        mainPin.style.left = '0';
      } else if (parseInt(mainPin.style.left, 10) > 1140) {
        mainPin.style.left = '1140px';
      }

      document.querySelector('#address').value = (parseInt(mainPin.style.top, 10) + 72 + 'px') + ' ' + (parseInt(mainPin.style.left, 10) + 32 + 'px');
    };

    var mainPinMouseupHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mainPinMousemoveHandler);
      document.removeEventListener('mouseup', mainPinMouseupHandler);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          mainPin.removeEventListener('click', onClickPreventDefault);
        };
        mainPin.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', mainPinMousemoveHandler);
    document.addEventListener('mouseup', mainPinMouseupHandler);
    document.querySelector('#address').value = (parseInt(mainPin.style.top, 10) + 72 + 'px') + ' ' + (parseInt(mainPin.style.left, 10) + 32 + 'px');
  });

  // переход в активное состояние
  function pinMouseDownHandler() {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    for (var j = 0; j < window.globalValues.inputs.length; j++) {
      window.globalValues.inputs[j].removeAttribute('disabled');
    }
  }

  mainPin.addEventListener('mousedown', pinMouseDownHandler);
  mainPin.addEventListener('mousedown', window.globalValues.makePins)
  mainPin.addEventListener('keypress', function (evt) {
    if (evt.keyCode === 13) {
      document.querySelector('.map').classList.remove('map--faded');
      document.querySelector('.ad-form').classList.remove('ad-form--disabled');

      for (var j = 0; j < window.globalValues.inputs.length; j++) {
        window.globalValues.inputs[j].removeAttribute('disabled');
      }
    }
  });
  document.querySelector('#address').value = (parseInt(mainPin.style.top, 10) + 33 + 'px') + ' ' + (parseInt(mainPin.style.left, 10) + 33 + 'px');
})();
