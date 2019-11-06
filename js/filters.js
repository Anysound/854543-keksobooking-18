'use strict';
(function() {
  var filters = document.querySelector('.map__filters');
  var type = filters.querySelector('#housing-type');
  type.addEventListener('change', function() {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var cards = document.querySelectorAll('.map__card');
    // if (type.value === 'flat') {
    //   for (var i = 0; i < cards.length; i++) {
    //     //  console.log(cards[i].querySelector('.popup__type').textContent);
    //     if (cards[i].querySelector('.popup__type').textContent !== 'flat') {
    //       console.log('not flat');
    //       cards[i].style.display = 'none';
    //       pins[i].style.display = 'none';
    //     }
    //   }
    // }
    switch(type.value) {

      case 'flat':
        // массив отфильтрованных элементов        
        var flatCards = [];
        for (var i = 0; i < cards.length; i++) {
          if (cards[i].querySelector('.popup__type').textContent !== 'flat') {
            cards[i].style.visibility = 'hidden';
            pins[i].style.visibility = 'hidden';
          } else {
            cards[i].style.visibility = 'visible';
            pins[i].style.visibility = 'visible';
            flatCards.push(cards[i]);
          }
        }
        // если отфильтрованных пинов больше 5,  вывод первых 5 пинов
        for (var i = 0; i < flatCards.length; i++) {
          if (i <= window.globalValues.MAX_AMOUNT_OF_PINS) {
            flatCards[i].style.visibility = 'visible';
          } else {
            flatCards[i].style.visibility = 'hidden';
          }
        }
      break;

      case 'any':
        // массив отфильтрованных элементов
        var anyCards = [];
        for (var i = 0; i < cards.length; i++) {
          if (cards[i].querySelector('.popup__type')) {
            cards[i].style.visibility = 'visible';
            pins[i].style.visibility = 'visible';
            anyCards.push(pins[i]);
          } else {
            cards[i].style.visibility = 'visible';
            pins[i].style.visibility = 'visible';
          }
        };
        // если отфильтрованных пинов больше 5,  вывод первых 5 пинов
        for (var j = 0; j <= anyCards.length; j++) {
          if (j < window.globalValues.MAX_AMOUNT_OF_PINS) {
            anyCards[j].style.visibility = 'visible';
          } else {
            anyCards[j].style.visibility = 'hidden';
          }
        }
        break;

      case 'palace':
        // массив отфильтрованных элементов
        var palaceCards = [];
        for (var i = 0; i < cards.length; i++) {
          if (cards[i].querySelector('.popup__type').textContent !== 'palace') {
            cards[i].style.visibility = 'hidden';
            pins[i].style.visibility = 'hidden';
          } else {
            cards[i].style.visibility = 'visible';
            pins[i].style.visibility = 'visible';
            palaceCards.push(pins[i]);
          }
        }
        // если отфильтрованных пинов больше 5,  вывод первых 5 пинов
        for (var j = 0; j < palaceCards.length; j++) {
          if (j <= 5) {
            palaceCards[j].style.visibility = 'visible';
          } else {
            palaceCards[j].style.visibility = 'hidden';
          }
        }
        break;

      case 'house':
        // массив отфильтрованных элементов
        var houseCards = [];
        for (var i = 0; i < cards.length; i++) {
          if (cards[i].querySelector('.popup__type').textContent !== 'house') {
            cards[i].style.visibility = 'hidden';
            pins[i].style.visibility = 'hidden';
          } else {
            cards[i].style.visibility = 'visible';
            pins[i].style.visibility = 'visible';
            houseCards.push(pins[i]);
          }
        }
        // если отфильтрованных пинов больше 5,  вывод первых 5 пинов
        for (var j = 0; j < houseCards.length; j++) {
          if (j <= window.globalValues.MAX_AMOUNT_OF_PINS) {
            houseCards[j].style.visibility = 'visible';
          } else {
            houseCards[j].style.visibility = 'hidden';
          }
        }
        break;

      case 'bungalo':
        // массив отфильтрованных элементов
        var bungaloCards = [];
        for (var i = 0; i < cards.length; i++) {
          if (cards[i].querySelector('.popup__type').textContent !== 'bungalo') {
            cards[i].style.visibility = 'hidden';
            pins[i].style.visibility = 'hidden';
          } else {
            cards[i].style.visibility = 'visible';
            pins[i].style.visibility = 'visible';
            bungaloCards.push(pins[i]);
          }
        }
        // если отфильтрованных пинов больше 5,  вывод первых 5 пинов
        for (var j = 0; j < bungaloCards.length; j++) {
          if (j <= window.globalValues.MAX_AMOUNT_OF_PINS) {
            bungaloCards[j].style.visibility = 'visible';
          } else {
            bungaloCards[j].style.visibility = 'hidden';
          }
        }
        break;
    };
    // скрытие открытой карточки при смене фильтра
    var cards = document.querySelectorAll('.map__card');
    for (var i = 0; i < cards.length; i++) {
      if (!cards[i].classList.contains('hidden')) {
        cards[i].classList.add('hidden');
      }
    }
  });
})();
