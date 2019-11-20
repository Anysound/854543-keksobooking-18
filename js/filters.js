'use strict';
(function () {
  var filters = document.querySelector('.map__filters');
  var filtersInputs = document.querySelector('.map__filters').children;
  // при неактивном состоянии форма фильтрации заблокирована
  for (var i = 0; i < filtersInputs.length; i++) {
    filtersInputs[i].setAttribute('disabled', '');
  }

  function filterCards() {
    var cards = Array.from(document.querySelectorAll('.map__card'));
    var pins = Array.from(document.querySelectorAll('.map__pin:not(.map__pin--main)'));
    var priceValue = filters.querySelector('#housing-price').value;
    var typeValue = filters.querySelector('#housing-type').value;
    var roomValue = filters.querySelector('#housing-rooms').value;
    var guestValue = filters.querySelector('#housing-guests').value;

    // при смене фильтров закрываем открытые объявления и скрываем пины
    for (var a = 0; a < cards.length; a++) {
      if (!cards[a].classList.contains('hidden')) {
        cards[a].classList.add('hidden');
      }
    }

    for (var b = 0; b < pins.length; b++) {
      pins[b].style.visibility = 'hidden';
    }

    var filterType = function (elem, index) {
      var type = cards[index].querySelector('.popup__type').getAttribute('value');
      if (type === typeValue) {
        return elem;
      } else if (typeValue === 'any') {
        return elem;
      }
      return null;
    };

    var filterPrice = function (elem) {
      var price = parseInt(elem.querySelector('.popup__text--price').textContent, 10);

      if (priceValue === 'any') {
        return elem;
      } else if (price < 10000 && priceValue === 'low') {
        return elem;
      } else if ((price >= 10000 && price <= 50000) && priceValue === 'middle') {
        return elem;
      } else if (price >= 50000 && priceValue === 'high') {
        return elem;
      }
      return null;
    };

    var filterRoom = function (elem) {
      var digits = []; // массив для цифр из текста с кол-вом гостей и комнат
      var roomsAndGuestsAmount = elem.querySelector('.popup__text--capacity').textContent;
      var words = roomsAndGuestsAmount.split(' ');

      words.forEach(function (item, index) {
        var num = parseInt(words[index], 10);
        if (typeof num === 'number' && !isNaN(num)) {
          digits.push(num);
        }
      });

      var roomsAmount = digits[0]; // число комнат

      if (parseInt(roomsAmount, 10) === parseInt(roomValue, 10)) {
        return elem;
      } else if (roomValue === 'any') {
        return elem;
      }
      return null;
    };

    var filterGuest = function (elem) {
      var digits = [];
      var roomsAndGuestsAmount = elem.querySelector('.popup__text--capacity').textContent;
      var words = roomsAndGuestsAmount.split(' ');

      words.forEach(function (item, indx) {
        var num = parseInt(words[indx], 10);
        if (typeof num === 'number' && !isNaN(num)) {
          digits.push(num);
        }
      });

      var guestsAmount = digits[1]; // число гостей

      if (parseInt(guestsAmount, 10) === parseInt(guestValue, 10)) {
        return elem;
      } else if (guestValue === 'any') {
        return elem;
      }
      return null;
    };

    var filterFeatures = function (elem) {
      var features = filters.querySelector('#housing-features');
      var selectedFeatures = []; // массив выбранных удобств
      var wifi = features.querySelector('#filter-wifi:checked');
      var dishwasher = features.querySelector('#filter-dishwasher:checked');
      var parking = features.querySelector('#filter-parking:checked');
      var washer = features.querySelector('#filter-washer:checked');
      var elevator = features.querySelector('#filter-elevator:checked');
      var conditioner = features.querySelector('#filter-conditioner:checked');
      var buttons = [wifi, dishwasher, parking, washer, elevator, conditioner];
      // проверка нажатых кнопок-удобств и добавление в selectedFeatures
      for (var f = 0; f < buttons.length; f++) {
        if (buttons[f]) {
          selectedFeatures.push(buttons[f].value);
        }
      }
      // массив из удобств в карточке
      var cardFeatures = elem.querySelector('.popup__features').textContent.split(',');
      var matchingFeatures = []; // совпадающие элементы
      // добавление в отдельный массив совпадающих элементов
      for (var c = 0; c < selectedFeatures.length; c++) {
        if (cardFeatures.indexOf(selectedFeatures[c]) !== -1) {
          matchingFeatures.push(selectedFeatures[c]);
        }
      }
      var counter = 0; // счетчик совпадающих удобств
      // если длина массива совпадающих элементов равна длине массива выбранных удобств,
      // счетчик считает кол-во совпадающих элементов, если значение счетчика равно
      // длине совпадающих удобств, значит выбранные значения имеются в карточке и она возвращается.
      if (matchingFeatures.length === selectedFeatures.length) {
        for (var d = 0; d < matchingFeatures.length; d++) {
          if (matchingFeatures[d] === selectedFeatures[d]) {
            counter++;
          }
        }

        if (counter === matchingFeatures.length) {
          return elem;
        }
      }
      return null;
    };

    var filteredCards = cards.filter(filterType)
    .filter(filterPrice)
    .filter(filterRoom)
    .filter(filterGuest)
    .filter(filterFeatures)
    .slice(0, window.globalValues.MAX_AMOUNT_OF_PINS);

    for (var e = 0; e < filteredCards.length; e++) {
      document.querySelector('#pin_' + filteredCards[e].dataset.id).style.visibility = 'visible';
    }
  }
  // устранение "дребезга"
  filters.addEventListener('change', function () {
    setTimeout(filterCards, window.globalValues.DEBOUNCE_INTERVAL);
  });
})();
