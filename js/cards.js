'use strict';
(function () {

  var successHandler = function (data) {
    // создание карточек
    var card = document.querySelector('#card').content.querySelector('.map__card');
    card.classList.add('hidden');
    for (var i = 0; i < data.length; i++) {
      var cloneCard = card.cloneNode(true);
      card.querySelector('.popup__title').textContent = data[i].offer.title;
      card.querySelector('.popup__text--address').textContent = data[i].offer.address;
      card.querySelector('.popup__text--price').textContent = data[i].offer.price;
      card.querySelector('.popup__type').textContent = data[i].offer.type;
      card.querySelector('.popup__text--capacity').textContent = 'количество комнат: ' + data[i].offer.rooms + ' количество гостей: ' + data[i].offer.guests;
      card.querySelector('.popup__text--time').textContent = 'Заезд после ' + data[i].offer.checkin + ', выезд до ' + data[i].offer.checkout;
      card.querySelector('.popup__features').textContent = data[i].offer.features;
      card.querySelector('.popup__description').textContent = data[i].offer.description;
      card.querySelector('.popup__photos').src = data[i].offer.photos;
      card.querySelector('.popup__avatar').src = data[i].author.avatar;
      document.querySelector('.map__pins').insertAdjacentElement('beforebegin', cloneCard);
    }
    // отрисовка пинов
    var template = document.querySelector('#pin').content.querySelector('.map__pin');
    var wrapper = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    for (var j = 0; j < data.length; j++) {
      var clone = template.cloneNode(true);
      clone.style.left = data[j].location.x + 'px';
      clone.style.top = data[j].location.y + 'px';
      clone.src = data[j].author.avatar;
      clone.alt = data[j].offer.description;
      fragment.appendChild(clone);
    }
    wrapper.appendChild(fragment);

    function pinClickAndPressHandler() {
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      var cards = document.querySelectorAll('.map__card');
      pins.forEach(function (elem, index) {
        elem.style.visibility = 'hidden';
        elem.setAttribute('tabindex', '0');
        elem.addEventListener('click', function () {
          elem.classList.add('map__pin--active');
        });
        var pinPressShowHandler = function (evt2) {
          if (evt2.keyCode === window.globalValues.ENTER_KEYCODE) {
            cards[index].classList.remove('hidden');
          }
        };

        var pinPressHideHandler = function (evt) {
          if (evt.keyCode === window.globalValues.ESC_KEYCODE) {
            cards[index].classList.add('hidden');
          }
        };
        elem.addEventListener('keydown', pinPressShowHandler);
        elem.addEventListener('keydown', pinPressHideHandler);

        var pinClickShowHandler = function (evt) {
          cards[index].classList.remove('hidden');
          cards[index].style.top = evt.clientY + 'px';
          cards[index].style.left = evt.clientX + 'px';
          // если карточка вылезает вниз, разместить ее повыше
          if (parseInt(cards[index].style.top, 10) > 400) {
            cards[index].style.top = parseInt(cards[index].style.top, 10) - 200 + 'px';
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
        //elem.addEventListener('click', pinClickShowHandler);
        for (var i = 0; i < cards.length; i++) {
          if (!cards[i].classList.contains('hidden')) {
            cards[i].classList.add('hidden');
          } else {
            elem.addEventListener('click', pinClickShowHandler);
          }
        }

      });

    }
    pinClickAndPressHandler();
  };

  var errorHandler = function () {
    var errorMessage = document.querySelector('#error').content.querySelector('.error');
    document.querySelector('main').appendChild(errorMessage);
  };
  // console.log(document.querySelectorAll('.map__card'))
  window.backend.load(successHandler, errorHandler);
  // makeCards();

})();
