'use strict';
(function () {
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
        cloneCard.querySelector('.popup__type').textContent = (data[i].offer.type === 'flat') ? 'Квартира' :
          (data[i].offer.type === 'bungalo') ? 'Бунгало' :
            (data[i].offer.type === 'house') ? 'Дом' :
              (data[i].offer.type === 'palace') ? 'Дворец' : 'Неизвестный тип жилья';
        cloneCard.querySelector('.popup__type').setAttribute('value', data[i].offer.type);
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
          li.classList.add('popup__feature');
          li.classList.add('popup__feature--' + elem);

          cloneCard.querySelector('.popup__features').insertAdjacentElement('afterbegin', li);
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
      fragment.appendChild(clone);
    }
    wrapper.appendChild(fragment);

    function pinClickAndPressHandler() {
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      var cards = document.querySelectorAll('.map__card');
      pins.forEach(function (elem, index) {
        elem.style.visibility = 'hidden';
        elem.setAttribute('tabindex', '0');
        var pinPressShowHandler = function (evt2) {
          if (evt2.keyCode === window.globalValues.ENTER_KEYCODE) {
            cards[index].classList.remove('hidden');
          }
        };

        var pinPressHideHandler = function (evt) {
          if (evt.keyCode === window.globalValues.ESC_KEYCODE) {
            cards[index].classList.add('hidden');
            for (var y = 0; y < pins.length; y++) {
              if (pins[y].classList.contains('map__pin--active')) {
                pins[y].classList.remove('map__pin--active');
              }
            }
          }
        };
        elem.addEventListener('keydown', pinPressShowHandler, true);
        elem.addEventListener('keydown', pinPressHideHandler, true);

        var pinClickShowHandler = function (evt) {
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
          cards[index].style.top = evt.clientY + 'px';
          cards[index].style.left = evt.clientX + 'px';
          // если карточка вылезает вниз, разместить ее повыше
          if (parseInt(cards[index].style.top, 10) > 400) {
            cards[index].style.top = parseInt(cards[index].style.top, 10) - 450 + 'px';
          }
          // если карточка располагается сильно вправо, сделать полевее
          if (parseInt(cards[index].style.left, 10) > 700) {
            cards[index].style.left = parseInt(cards[index].style.left, 10) - 600 + 'px';
          }

          cards[index].querySelector('.popup__close').setAttribute('tabindex', '0');
          cards[index].querySelector('.popup__close').addEventListener('click', pinClickHiddenHandler);
        };

        var pinClickHiddenHandler = function () {
          cards[index].classList.add('hidden');
          for (var y = 0; y < pins.length; y++) {
            if (pins[y].classList.contains('map__pin--active')) {
              pins[y].classList.remove('map__pin--active');
            }
          }
        };
        elem.addEventListener('click', pinClickShowHandler);
      });
    }
    pinClickAndPressHandler();
  };

  var errorHandler = function () {
    var errorMessage = document.querySelector('#error').content.querySelector('.error');
    document.querySelector('main').appendChild(errorMessage);
  };

  // успешная\неуспешная загрузка данных
  window.backend.load(successHandler, errorHandler);
})();
