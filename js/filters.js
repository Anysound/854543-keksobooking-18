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
        for (var i = 0; i < cards.length; i++) {
        //  console.log(cards[i].querySelector('.popup__type').textContent);
          if (cards[i].querySelector('.popup__type').textContent !== 'flat') {
            cards[i].style.visibility = 'hidden';
            pins[i].style.visibility = 'hidden';
          } else {
            cards[i].style.visibility = 'visible';
            pins[i].style.visibility = 'visible';
          }
        }
      break;
      case 'any':
        for (var i = 0; i < cards.length; i++) {
          if (cards[i].querySelector('.popup__type')) {
            cards[i].style.visibility = 'visible';
            pins[i].style.visibility = 'visible';
          }
        };
        break;
      case 'palace':
        for (var i = 0; i < cards.length; i++) {
          if (cards[i].querySelector('.popup__type').textContent !== 'palace') {
            cards[i].style.visibility = 'hidden';
            pins[i].style.visibility = 'hidden';
          } else {
            cards[i].style.visibility = 'visible';
            pins[i].style.visibility = 'visible';
          }
        }
        break;
      case 'house':
        for (var i = 0; i < cards.length; i++) {
          if (cards[i].querySelector('.popup__type').textContent !== 'house') {
            cards[i].style.visibility = 'hidden';
            pins[i].style.visibility = 'hidden';
          } else {
            cards[i].style.visibility = 'visible';
            pins[i].style.visibility = 'visible';
          }
        }
        break;
      case 'bungalo':
        for (var i = 0; i < cards.length; i++) {
          if (cards[i].querySelector('.popup__type').textContent !== 'bungalo') {
            cards[i].style.visibility = 'hidden';
            pins[i].style.visibility = 'hidden';
          } else {
            cards[i].style.visibility = 'visible';
            pins[i].style.visibility = 'visible';
          }
        }
        break;  
    }
  });
})();
