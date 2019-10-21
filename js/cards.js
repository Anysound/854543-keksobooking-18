'use strict';
(function () {
  // создание карточек
  function makeCards() {
    var card = document.querySelector('#card').content.querySelector('.map__card');
    for (var i = 0; i < window.globalValues.arrWithObjs.length; i++) {
      var clone = card.cloneNode(true);
      card.querySelector('.popup__title').textContent = window.globalValues.arrWithObjs[i].offer.title;
      card.querySelector('.popup__text--address').textContent = window.globalValues.arrWithObjs[i].offer.address;
      card.querySelector('.popup__text--price').textContent = window.globalValues.arrWithObjs[i].offer.price;
      card.querySelector('.popup__text--capacity').textContent = window.globalValues.arrWithObjs[i].offer.rooms + '' + window.globalValues.arrWithObjs[i].offer.guests;
      card.querySelector('.popup__text--time').textContent = 'Заезд после ' + window.globalValues.arrWithObjs[i].offer.checkin + ', выезд до ' + window.globalValues.arrWithObjs[i].offer.checkout;
      card.querySelector('.popup__features').textContent = window.globalValues.arrWithObjs[i].offer.features;
      card.querySelector('.popup__description').textContent = window.globalValues.arrWithObjs[i].offer.description;
      card.querySelector('.popup__photos').src = window.globalValues.arrWithObjs[i].offer.photos;
      card.querySelector('.popup__avatar').src = window.globalValues.arrWithObjs[i].author.avatar;
      document.querySelector('.map__pins').insertAdjacentElement('beforebegin', clone);
    }
  }
  makeCards();
})();
