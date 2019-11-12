'use strict';
(function () {
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
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var a = 0; a < pins.length; a++) {
      if (a < 5) {
        pins[a].style.visibility = 'visible';
      } else {
        pins[a].style.visibility = 'hidden';
      }
    }

  }

  function pinPressHandler(evt) {
    if (evt.keyCode === window.globalValues.ENTER_KEYCODE) {
      document.querySelector('.map').classList.remove('map--faded');
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var b = 0; b < pins.length; b++) {
        pins[b].style.visibility = 'visible';
      }
      document.querySelector('.ad-form').classList.remove('ad-form--disabled');
      for (var j = 0; j < window.globalValues.inputs.length; j++) {
        window.globalValues.inputs[j].removeAttribute('disabled');
      }
    }
  }

  mainPin.addEventListener('mousedown', pinMouseDownHandler);
  mainPin.addEventListener('keydown', pinPressHandler);
  document.querySelector('#address').value = (parseInt(mainPin.style.top, 10) + 33 + 'px') + ' ' + (parseInt(mainPin.style.left, 10) + 33 + 'px');
})();
