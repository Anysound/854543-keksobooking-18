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
        mainPin.style.top = '558px';
      } else if (parseInt(mainPin.style.top, 10) < window.globalValues.MIN_Y_PIN_POSITION) {
        mainPin.style.top = '58px';
      } else if (parseInt(mainPin.style.left, 10) < window.globalValues.MIN_X_PIN_POSITION) {
        mainPin.style.left = '-31px';
      } else if (parseInt(mainPin.style.left, 10) > window.globalValues.MAX_X_PIN_POSITION) {
        mainPin.style.left = '1166px';
      }

      document.querySelector('#address').value = (parseInt(mainPin.style.left, 10) + window.globalValues.DISTANCE_X_TO_SHARP_POINT_OF_PIN + 'px') + ' ' +
        (parseInt(mainPin.style.top, 10) + window.globalValues.DISTANCE_Y_TO_SHARP_POINT_OF_PIN + 'px');
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

    document.querySelector('#address').value = (parseInt(mainPin.style.left, 10) + window.globalValues.DISTANCE_X_TO_SHARP_POINT_OF_PIN + 'px') + ' ' +
      (parseInt(mainPin.style.top, 10) + window.globalValues.DISTANCE_Y_TO_SHARP_POINT_OF_PIN + 'px');
  });
  // загрузка данных
  var loadData = function () {

    if (document.querySelector('.ad-form').classList.contains('ad-form--disabled')) {

      document.querySelector('.ad-form').classList.remove('ad-form--disabled');

      var successHandler = function (data) {
      // создание карточек
        var card = document.querySelector('#card').content.querySelector('.map__card');
        for (var i = 0; i < data.length; i++) {
          var cloneCard = card.cloneNode(true);
          cloneCard.classList.add('hidden');

          if (!data[i].offer.title) {
            cloneCard.querySelector('.popup__title').style.display = 'none';
          } else {
            cloneCard.querySelector('.popup__title').textContent = data[i].offer.title;
          }

          if (!data[i].offer.address) {
            cloneCard.querySelector('.popup__text--address').style.display = 'none';
          } else {
            cloneCard.querySelector('.popup__text--address').textContent = data[i].offer.address;
          }

          if (!data[i].offer.price) {
            cloneCard.querySelector('.popup__text--price').style.display = 'none';
          } else {
            cloneCard.querySelector('.popup__text--price').textContent = data[i].offer.price + '₽/ночь';
          }

          if (!data[i].offer.type) {
            cloneCard.querySelector('.popup__type').style.display = 'none';
          } else {
            if (data[i].offer.type === 'flat') {
              cloneCard.querySelector('.popup__type').textContent = 'Квартира';
              cloneCard.querySelector('.popup__type').setAttribute('value', 'flat');
            } else if (data[i].offer.type === 'bungalo') {
              cloneCard.querySelector('.popup__type').textContent = 'Бунгало';
              cloneCard.querySelector('.popup__type').setAttribute('value', 'bungalo');
            } else if (data[i].offer.type === 'house') {
              cloneCard.querySelector('.popup__type').textContent = 'Дом';
              cloneCard.querySelector('.popup__type').setAttribute('value', 'house');
            } else if (data[i].offer.type === 'palace') {
              cloneCard.querySelector('.popup__type').textContent = 'Дворец';
              cloneCard.querySelector('.popup__type').setAttribute('value', 'palace');
            } else {
              cloneCard.querySelector('.popup__type').textContent = 'Неизвестный тип жилья';
              cloneCard.querySelector('.popup__type').setAttribute('value', 'unknown');
            }
          }

          if (!isFinite(data[i].offer.rooms)) {
            cloneCard.querySelector('.popup__text--capacity').textContent = 'Количество гостей: ' + data[i].offer.guests;
          } else {
            cloneCard.querySelector('.popup__text--capacity').textContent = 'Количество комнат: ' + data[i].offer.rooms + ' количество гостей: ' + data[i].offer.guests;
          }

          if (!isFinite(data[i].offer.guests)) {
            cloneCard.querySelector('.popup__text--capacity').textContent = 'Количество комнат: ' + data[i].offer.rooms;
          } else {
            cloneCard.querySelector('.popup__text--capacity').textContent = 'Количество комнат: ' + data[i].offer.rooms + ' количество гостей: ' + data[i].offer.guests;
          }

          if (!data[i].offer.checkin) {
            cloneCard.querySelector('.popup__text--time').textContent = 'выезд до ' + data[i].offer.checkout;
          } else {
            cloneCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + data[i].offer.checkin + ' выезд до ' + data[i].offer.checkout;
          }

          if (!data[i].offer.checkout) {
            cloneCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + data[i].offer.checkin;
          } else {
            cloneCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + data[i].offer.checkin + ' выезд до ' + data[i].offer.checkout;
          }

          if (!data[i].offer.features) {
            cloneCard.querySelector('.popup__features').style.display = 'none';
          } else {
            cloneCard.querySelector('.popup__features').innerHTML = '';
            data[i].offer.features.forEach(function (elem) {
              var li = document.createElement('li');
              var span = document.createElement('span');
              span.style.display = 'none';
              span.classList.add('popup__feature--text');
              li.classList.add('popup__feature');
              li.classList.add('popup__feature--' + elem);
              span.textContent = elem + '';
              cloneCard.querySelector('.popup__features').insertAdjacentElement('afterbegin', li);
              cloneCard.querySelector('.popup__features').insertAdjacentElement('beforeend', span);
            });
          }

          if (!data[i].offer.description) {
            cloneCard.querySelector('.popup__description').style.display = 'none';
          } else {
            cloneCard.querySelector('.popup__description').textContent = data[i].offer.description;
          }

          if (!data[i].offer.photos) {
            cloneCard.querySelector('.popup__photos').style.display = 'none';
          } else {
            cloneCard.querySelector('.popup__photos').innerHTML = '';
            data[i].offer.photos.forEach(function (item) {
              var img = document.createElement('img');
              img.classList.add('popup__photo');
              img.src = item;
              img.width = '45';
              img.height = '40';
              cloneCard.querySelector('.popup__photos').insertAdjacentElement('afterbegin', img);
            });
          }

          if (!data[i].author.avatar) {
            cloneCard.querySelector('.popup__avatar').style.display = 'none';
          } else {
            cloneCard.querySelector('.popup__avatar').src = data[i].author.avatar;
          }

          cloneCard.dataset.id = i;

          cloneCard.querySelector('.popup__close').setAttribute('tabindex', '0');
          document.querySelector('.map__pins').insertAdjacentElement('beforebegin', cloneCard);
        }

        // отрисовка пинов
        var template = document.querySelector('#pin').content.querySelector('.map__pin');
        var wrapper = document.querySelector('.map__pins');
        var fragment = document.createDocumentFragment();

        for (var j = 0; j < data.length; j++) {

          var clone = template.cloneNode(true);

          clone.querySelector('img').src = data[j].author.avatar;
          clone.style.display = (data[j].offer) ? true : 'none';
          clone.style.left = data[j].location.x + 'px';
          clone.style.top = data[j].location.y + 'px';
          clone.src = data[j].author.avatar;
          clone.alt = data[j].offer.description;
          clone.id = 'pin_' + j;
          clone.setAttribute('tabindex', '0');
          clone.style.visibility = (j < 5) ? 'visible' : 'hidden';

          fragment.appendChild(clone);
        }

        wrapper.appendChild(fragment);
        // создание обработчиков на пины и карточки
        var cards = document.querySelectorAll('.map__card');
        var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

        pins.forEach(function (elem, index) {

          var pinPressShowHandler = function (evt2) {
            if (evt2.keyCode === window.globalValues.ENTER_KEYCODE) {
              cards[index].classList.remove('hidden');
            }
            document.removeEventListener('keydown', pinPressShowHandler);
          };

          var pinPressHideHandler = function (evt) {
            if (evt.keyCode === window.globalValues.ESC_KEYCODE) {
              cards[index].classList.add('hidden');

              for (var y = 0; y < pins.length; y++) {
                if (pins[y].classList.contains('map__pin--active')) {
                  pins[y].classList.remove('map__pin--active');
                  break;
                }
              }
            }
            document.removeEventListener('keydown', pinPressHideHandler);
          };

          var pinClickHiddenHandler = function () {
            cards[index].classList.add('hidden');
            for (var y = 0; y < pins.length; y++) {
              if (pins[y].classList.contains('map__pin--active')) {
                pins[y].classList.remove('map__pin--active');
              }
            }
          };

          var pinClickShowHandler = function () {
            for (var z = 0; z < cards.length; z++) {
              cards[index].classList.remove('hidden');
              pins[index].classList.add('map__pin--active');
              if (cards[index].classList.contains('hidden')) {
                cards[index].classList.remove('hidden');
                pins[index].classList.remove('map__pin--active');
              } else {
                cards[z].classList.add('hidden');
                pins[z].classList.remove('map__pin--active');
              }
            }
            cards[index].classList.remove('hidden');
            cards[index].querySelector('.popup__close').addEventListener('click', pinClickHiddenHandler);
          };

          elem.addEventListener('click', pinClickShowHandler);

          elem.addEventListener('keydown', pinPressShowHandler);
          document.removeEventListener('keydown', pinPressShowHandler);

          elem.addEventListener('keydown', pinPressHideHandler);
          document.removeEventListener('keydown', pinPressHideHandler);
        });
      };

      var errorHandler = function () {
        var errorMessage = document.querySelector('#error').content.querySelector('.error');
        document.querySelector('main').appendChild(errorMessage);
      };

      // успешная\неуспешная загрузка данных
      window.backend.load(successHandler, errorHandler);
    }
  };

  // переход в активное состояние
  function mainPinMouseDownHandler() {
    document.querySelector('.map').classList.remove('map--faded');

    loadData();

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

    loadData();

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
  document.removeEventListener('keydown', mainPinPressHandler);

  document.querySelector('#address').value = (parseInt(mainPin.style.left, 10) + window.globalValues.CENTER_OF_PIN + 'px') + ' ' +
    (parseInt(mainPin.style.top, 10) + window.globalValues.CENTER_OF_PIN + 'px');
})();
