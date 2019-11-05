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
            cards[i].style.display = 'none';
            pins[i].style.display = 'none';
          } else {
            cards[i].style.display = 'block';
            pins[i].style.display = 'block';
          }
        }
      break;
      case 'any':
        for (var i = 0; i < cards.length; i++) {
          if (cards[i].querySelector('.popup__type').textContent !== 'any') {
            cards[i].style.display = 'none';
            pins[i].style.display = 'none';
          } else {
            cards[i].style.display = 'block';
            pins[i].style.display = 'block';
          }
        };
        break;
      case 'palace':
        for (var i = 0; i < cards.length; i++) {
          if (cards[i].querySelector('.popup__type').textContent !== 'palace') {
            cards[i].style.display = 'none';
            pins[i].style.display = 'none';
          } else {
            cards[i].style.display = 'block';
            pins[i].style.display = 'block';
          }
        }
        break;
      case 'house':
        for (var i = 0; i < cards.length; i++) {
          if (cards[i].querySelector('.popup__type').textContent !== 'house') {
            cards[i].style.display = 'none';
            pins[i].style.display = 'none';
          } else {
            cards[i].style.display = 'block';
            pins[i].style.display = 'block';
          }
        }
        break;
      case 'bungalo':
        for (var i = 0; i < cards.length; i++) {
          if (cards[i].querySelector('.popup__type').textContent !== 'bungalo') {
            cards[i].style.display = 'none';
            pins[i].style.display = 'none';
          } else {
            cards[i].style.display = 'block';
            pins[i].style.display = 'block';
          }
        }
        break;  
    }
  });
})();
