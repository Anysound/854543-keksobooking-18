'use strict';
(function () {
  // создание карточек
  // function makeCards() {
  //   var card = document.querySelector('#card').content.querySelector('.map__card');
  //   for (var i = 0; i < window.globalValues.arrWithObjs.length; i++) {
  //     var clone = card.cloneNode(true);
  //     card.querySelector('.popup__title').textContent = window.globalValues.arrWithObjs[i].offer.title;
  //     card.querySelector('.popup__text--address').textContent = window.globalValues.arrWithObjs[i].offer.address;
  //     card.querySelector('.popup__text--price').textContent = window.globalValues.arrWithObjs[i].offer.price;
  //     card.querySelector('.popup__text--capacity').textContent = window.globalValues.arrWithObjs[i].offer.rooms + '' + window.globalValues.arrWithObjs[i].offer.guests;
  //     card.querySelector('.popup__text--time').textContent = 'Заезд после ' + window.globalValues.arrWithObjs[i].offer.checkin + ', выезд до ' + window.globalValues.arrWithObjs[i].offer.checkout;
  //     card.querySelector('.popup__features').textContent = window.globalValues.arrWithObjs[i].offer.features;
  //     card.querySelector('.popup__description').textContent = window.globalValues.arrWithObjs[i].offer.description;
  //     card.querySelector('.popup__photos').src = window.globalValues.arrWithObjs[i].offer.photos;
  //     card.querySelector('.popup__avatar').src = window.globalValues.arrWithObjs[i].author.avatar;
  //     document.querySelector('.map__pins').insertAdjacentElement('beforebegin', clone);
  //   }
  // }

  var successHandler = function (data) {
    var card = document.querySelector('#card').content.querySelector('.map__card');
    card.classList.add('hidden');
    for (var i = 0; i < data.length; i++) {
      var cloneCard = card.cloneNode(true);
      card.querySelector('.popup__title').textContent = data[i].offer.title;
      card.querySelector('.popup__text--address').textContent = data[i].offer.address;
      card.querySelector('.popup__text--price').textContent = data[i].offer.price;
      card.querySelector('.popup__text--capacity').textContent = data[i].offer.rooms + '' + data[i].offer.guests;
      card.querySelector('.popup__text--time').textContent = 'Заезд после ' + data[i].offer.checkin + ', выезд до ' + data[i].offer.checkout;
      card.querySelector('.popup__features').textContent = data[i].offer.features;
      card.querySelector('.popup__description').textContent = data[i].offer.description;
      card.querySelector('.popup__photos').src = data[i].offer.photos;
      card.querySelector('.popup__avatar').src = data[i].author.avatar;
      document.querySelector('.map__pins').insertAdjacentElement('beforebegin', cloneCard);
    }

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
          var pinClickHiddenHandler = function () {
            cards[index].classList.add('hidden');
          };
          cards[index].querySelector('.popup__close').addEventListener('click', pinClickHiddenHandler);
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
  // console.log(document.querySelectorAll('.map__card'))
  window.backend.load(successHandler, errorHandler);
  // makeCards();
})();
