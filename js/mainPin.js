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
      if (parseInt(mainPin.style.top, 10) > window.globalValues.MAX_Y_PIN_POSITION) {
        mainPin.style.top = '630px';
      } else if (parseInt(mainPin.style.top, 10) < window.globalValues.MIN_Y_PIN_POSITION) {
        mainPin.style.top = '130px';
      } else if (parseInt(mainPin.style.left, 10) < window.globalValues.MIN_X_PIN_POSITION) {
        mainPin.style.left = '-31px';
      } else if (parseInt(mainPin.style.left, 10) > window.globalValues.MAX_X_PIN_POSITION) {
        mainPin.style.left = '1166px';
      }

      document.querySelector('#address').value = (parseInt(mainPin.style.top, 10) + window.globalValues.DISTANCE_X_TO_SHARP_POINT_OF_PIN + 'px') + ' ' +
       (parseInt(mainPin.style.left, 10) + window.globalValues.DISTANCE_Y_TO_SHARP_POINT_OF_PIN + 'px');
    };

    var mainPinMouseupHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mainPinMousemoveHandler);
      document.removeEventListener('mouseup', mainPinMouseupHandler);

      if (dragged) {
        var clickPreventDefaultHandler = function (clickEvt) {
          clickEvt.preventDefault();
          mainPin.removeEventListener('click', clickPreventDefaultHandler);
        };
        mainPin.addEventListener('click', clickPreventDefaultHandler);
      }
    };

    document.addEventListener('mousemove', mainPinMousemoveHandler);
    document.addEventListener('mouseup', mainPinMouseupHandler);
    document.querySelector('#address').value = (parseInt(mainPin.style.top, 10) + window.globalValues.DISTANCE_X_TO_SHARP_POINT_OF_PIN + 'px') + ' ' +
      (parseInt(mainPin.style.left, 10) + window.globalValues.DISTANCE_Y_TO_SHARP_POINT_OF_PIN + 'px');
  });

  // переход в активное состояние
  function mainPinMouseDownHandler() {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');

    var filters = document.querySelector('.map__filters').children;
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    for (var a = 0; a < filters.length; a++) {
      filters[a].removeAttribute('disabled', '');
    }

    for (var i = 0; i < pins.length; i++) {
      pins[i].style.visibility = (i < window.globalValues.MAX_AMOUNT_OF_PINS) ? 'visible' : 'hidden';
    }

    for (var j = 0; j < document.querySelector('.ad-form').children.length; j++) {
      document.querySelector('.ad-form').children[j].removeAttribute('disabled');
    }
  }

  function mainPinPressHandler(evt) {
    if (evt.keyCode === window.globalValues.ENTER_KEYCODE) {
      document.querySelector('.map').classList.remove('map--faded');
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var b = 0; b < pins.length; b++) {
        pins[b].style.visibility = (b < 5) ? 'visible' : 'hidden';
      }
      document.querySelector('.ad-form').classList.remove('ad-form--disabled');

      for (var j = 0; j < document.querySelector('.ad-form').children.length; j++) {
        document.querySelector('.ad-form').children[j].removeAttribute('disabled');
      }
    }
  }

  mainPin.addEventListener('mousedown', mainPinMouseDownHandler);
  mainPin.addEventListener('keydown', mainPinPressHandler);

  document.querySelector('#address').value = (parseInt(mainPin.style.top, 10) + window.globalValues.CENTER_OF_PIN + 'px') + ' ' +
    (parseInt(mainPin.style.left, 10) + window.globalValues.CENTER_OF_PIN + 'px');
})();
