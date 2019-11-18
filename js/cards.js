'use strict';
(function () {
  var successHandler = function (data) {
    // создание карточек
    var card = document.querySelector('#card').content.querySelector('.map__card');
    for (var i = 0; i < data.length; i++) {
      var cloneCard = card.cloneNode(true);
      cloneCard.classList.add('hidden');
      
      var title = cloneCard.querySelector('.popup__title');
      (data[i].offer.title ? title.textContent = data[i].offer.title : title.style.display = 'none');

      var address = cloneCard.querySelector('.popup__text--address');
      data[i].offer.address ? address.textContent = data[i].offer.address :
      address.style.display = 'none';

      var price = cloneCard.querySelector('.popup__text--price');
      data[i].offer.price ? price.textContent = data[i].offer.price :
      price.style.display = 'none';

      var type = cloneCard.querySelector('.popup__type');
      data[i].offer.type ? type.textContent = data[i].offer.type :
      type.style.display = 'none';

      var capacity = cloneCard.querySelector('.popup__text--capacity');
      data[i].offer.rooms ? capacity.textContent = 'количество комнат: ' + data[i].offer.rooms +  ' количество гостей: ' + data[i].offer.guests :
      capacity.textContent = 'количество гостей: ' + data[i].offer.guests;

      data[i].offer.guests ? capacity.textContent = 'количество комнат: ' + data[i].offer.rooms +  ' количество гостей: ' + data[i].offer.guests :
      capacity.textContent = 'количество комнат: ' + data[i].offer.rooms;

      (!isFinite(data[i].offer.rooms) && !isFinite(data[i].offer.guests)) ?  capacity.style.display = 'none' :
      capacity.textContent = 'количество комнат: ' + data[i].offer.rooms + ' количество гостей: ' + data[i].offer.guests;

      var time = cloneCard.querySelector('.popup__text--time');
      data[i].offer.checkin ? time.textContent = 'Заезд после ' + data[i].offer.checkin + ', выезд до ' + data[i].offer.checkout :
      time.textContent = 'выезд до ' + data[i].offer.checkout;

      data[i].offer.checkout ? time.textContent = 'Заезд после ' + data[i].offer.checkin + ', выезд до ' + data[i].offer.checkout :
      time.textContent = 'заезд после ' + data[i].offer.checkin;

      (data[i].offer.checkin && data[i].offer.checkout) ? time.textContent = 'Заезд после ' + data[i].offer.checkin + ', выезд до ' + data[i].offer.checkout :
      time.style.display = 'none';

      var features = cloneCard.querySelector('.popup__features');
      data[i].offer.features ? features.textContent = data[i].offer.features :
      features.style.display = 'none';

      var description = cloneCard.querySelector('.popup__description');
      data[i].offer.description ? description.textContent = data[i].offer.description :
      description.style.display = 'none';

      var avatar = cloneCard.querySelector('.popup__avatar');
      data[i].author.avatar ? avatar.src = data[i].author.avatar :
      avatar.style.display = 'none';
      cloneCard.dataset.id = i;

      document.querySelector('.map__pins').insertAdjacentElement('beforebegin', cloneCard);
    }
    // отрисовка пинов
    var template = document.querySelector('#pin').content.querySelector('.map__pin');
    var wrapper = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    for (var j = 0; j < data.length; j++) {
      var clone = template.cloneNode(true);
      data[j].offer ? true : clone.style.display = 'none';
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
      console.log(pins + ' ' + cards);
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
        elem.addEventListener('keydown', pinPressShowHandler);
        elem.addEventListener('keydown', pinPressHideHandler);

        var pinClickShowHandler = function (evt) {
          for (var i = 0; i < cards.length; i++) {
            cards[index].classList.remove('hidden');
            pins[index].classList.add('map__pin--active');
            if (cards[index].classList.contains('hidden')) {
              cards[index].classList.remove('hidden');
              pins[index].classList.remove('map__pin--active');
            } else {
              cards[i].classList.add('hidden');
              pins[i].classList.remove('map__pin--active');
            }
          }

          cards[index].classList.remove('hidden');
          cards[index].style.top = evt.clientY + 'px';
          cards[index].style.left = evt.clientX + 'px';
          // если карточка вылезает вниз, разместить ее повыше
          if (parseInt(cards[index].style.top, 10) > 400) {
            cards[index].style.top = parseInt(cards[index].style.top, 10) - 300 + 'px';
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

  window.backend.load(successHandler, errorHandler);
})();
