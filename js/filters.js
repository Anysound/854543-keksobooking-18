'use strict';
(function () {
  var filters = document.querySelector('.map__filters');
  var filtersInputs = document.querySelector('.map__filters').children;
  for (var i = 0; i < filtersInputs.length; i++) {
    filtersInputs[i].setAttribute('disabled', '');
  }

  function removeDebounce() {
    var cards = Array.from(document.querySelectorAll('.map__card'));
    var pins = Array.from(document.querySelectorAll('.map__pin:not(.map__pin--main)'));
    var priceValue = filters.querySelector('#housing-price').value;
    var typeValue = filters.querySelector('#housing-type').value;
    var roomValue = filters.querySelector('#housing-rooms').value;
    var guestValue = filters.querySelector('#housing-guests').value;

    for (var i = 0; i < cards.length; i++) {
      // при смене фильтров закрываем открытые объявления
      if (!cards[i].classList.contains('hidden')) {
        cards[i].classList.add('hidden');
      }
    }

    for (var i = 0; i < pins.length; i++) {
      pins[i].style.visibility = 'hidden';
    }

    var filterType = function(elem, index) {
      var type = cards[index].querySelector('.popup__type').textContent;

      if (type === typeValue) {
        return elem;        
      } else if (typeValue === 'any') {
        return elem;   
      }
    }

    var filterPrice = function(elem, index) {
      var price = parseInt(elem.querySelector('.popup__text--price').textContent);

      if (priceValue === 'any') {
          return elem;
      } else if (price < 10000 && priceValue === 'low') {
        return elem;
      } else if ((price >= 10000 && price <= 50000) && priceValue === 'middle') {
        return elem;
      } else if (price >= 50000  && priceValue === 'high') {
        return elem;
      }
    }

    var filterRoom = function(elem, index) {
      var digits = []; // массив для цифр из текста с кол-вом гостей и комнат
      var roomsAndGuestsAmount = elem.querySelector('.popup__text--capacity').textContent;
      var words = roomsAndGuestsAmount.split(' ');

      words.forEach(function (item, index) {
        var num = parseInt(words[index], 10);
        if (typeof num === "number" && !isNaN(num)) {
          digits.push(num);
        }
      });

      var roomsAmount = digits[0]; // число комнат
      if (parseInt(roomsAmount, 10) === parseInt(roomValue, 10)) {
        return elem;
      } else if (roomValue === 'any') {
        return elem;
      }
    }

    var filterGuest = function(elem, index) {
      var digits = [];
      var roomsAndGuestsAmount = elem.querySelector('.popup__text--capacity').textContent;
      var words = roomsAndGuestsAmount.split(' ');
      words.forEach(function (item, index) {
        var num = parseInt(words[index]);
        if (typeof num === "number" && !isNaN(num)) {
          digits.push(num);
        }
      });

      var guestsAmount = digits[1]; // число гостей
      if (parseInt(guestsAmount, 10) === parseInt(guestValue, 10)) {
        return elem;
      } else if (guestValue === 'any') {
        return elem;
      }
    };

    var filterFeatures = function(elem, index) {
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
      for (var i = 0; i < buttons.length; i++) {
        if (buttons[i]) {
          selectedFeatures.push(buttons[i].value);
        } 
      }
      // массив из удобств в карточке
      var cardFeatures = elem.querySelector('.popup__features').textContent.split(',');
      var matchingFeatures = []; // совпадающие элементы
      // добавление в отдельный массив совпадающих элементов
      for (var i = 0; i < selectedFeatures.length; i++) {
        if (cardFeatures.indexOf(selectedFeatures[i]) !== -1) {
          matchingFeatures.push(selectedFeatures[i]);  
        }
      }
      var counter = 0; // счетчик совпадающих удобств
      // если длина массива совпадающих элементов равна длине массива выбранных удобств,
      // счетчик считает кол-во совпадающих элементов, если значение счетчика равно
      // длине совпадающих удобств, значит выбранные значения имеются в карточке и она возвращается.
      if (matchingFeatures.length === selectedFeatures.length) {
        for (var i = 0; i < matchingFeatures.length; i++) {
          if (matchingFeatures[i] === selectedFeatures[i]) {
            counter++;
          }
        }

        if (counter === matchingFeatures.length) {
          return elem;
        };
      }
    }

    var filteredCards = cards.filter(filterType)
    .filter(filterPrice)
    .filter(filterRoom)
    .filter(filterGuest)
    .filter(filterFeatures)
    .slice(0, window.globalValues.MAX_AMOUNT_OF_PINS);

    for (var i = 0; i < filteredCards.length; i++) {
      document.querySelector('#pin_' + filteredCards[i].dataset.id).style.visibility = 'visible';
    }
  }

  filters.addEventListener('change', function () {
    setTimeout(removeDebounce, window.globalValues.DEBOUNCE_INTERVAL);
  });
})();
