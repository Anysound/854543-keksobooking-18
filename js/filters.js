'use strict';
(function () {
  var filters = document.querySelector('.map__filters');
  var sets = filters.children;
  var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  var cards = document.querySelectorAll('.map__card');
  for (var i = 0; i < filters.length; i++) {
    console.log(filters[i].value);
  }
  // фильтрация типа жилья
  var type = filters.querySelector('#housing-type');
  
  type.addEventListener('change', function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var cards = document.querySelectorAll('.map__card');

    switch (type.value) {

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
        }
        // если отфильтрованных пинов больше 5,  вывод первых 5 пинов
        if (anyCards.length > window.globalValues.MAX_AMOUNT_OF_PINS) {
          for (var j = 0; j < anyCards.length; j++) {
            if (j < window.globalValues.MAX_AMOUNT_OF_PINS) {
              anyCards[j].style.visibility = 'visible';
            } else {
              anyCards[j].style.visibility = 'hidden';
            }
          }
        }

        break;

      case 'palace':
        // массив отфильтрованных элементов
        var palaceCards = [];
        for (var a = 0; a < cards.length; a++) {
          if (cards[a].querySelector('.popup__type').textContent !== 'palace') {
            cards[a].style.visibility = 'hidden';
            pins[a].style.visibility = 'hidden';
          } else {
            cards[a].style.visibility = 'visible';
            pins[a].style.visibility = 'visible';
            palaceCards.push(pins[a]);
          }
        }
        // если отфильтрованных пинов больше 5,  вывод первых 5 пинов
        if (palaceCards.length > window.globalValues.MAX_AMOUNT_OF_PINS) {
          for (var b = 0; b < palaceCards.length; b++) {
            if (b < window.globalValues.MAX_AMOUNT_OF_PINS) {
              palaceCards[b].style.visibility = 'visible';
            } else {
              palaceCards[b].style.visibility = 'hidden';
            }
          }
        }
        break;

      case 'flat':
        // массив отфильтрованных элементов
        var flatCards = [];
        for (var c = 0; c < cards.length; c++) {
          if (cards[c].querySelector('.popup__type').textContent !== 'flat') {
            cards[c].style.visibility = 'hidden';
            pins[c].style.visibility = 'hidden';
          } else {
            cards[c].style.visibility = 'visible';
            pins[c].style.visibility = 'visible';
            flatCards.push(cards[c]);
          }
        }
        // если отфильтрованных пинов больше 5,  вывод первых 5 пинов
        if (flatCards.length > window.globalValues.MAX_AMOUNT_OF_PINS) {
          for (var d = 0; d < flatCards.length; d++) {
            if (d < window.globalValues.MAX_AMOUNT_OF_PINS) {
              flatCards[d].style.visibility = 'visible';
            } else {
              flatCards[d].style.visibility = 'hidden';
            }
          }
        }
        break;

      case 'house':
        // массив отфильтрованных элементов
        var houseCards = [];
        for (var e = 0; e < cards.length; e++) {
          if (cards[e].querySelector('.popup__type').textContent !== 'house') {
            cards[e].style.visibility = 'hidden';
            pins[e].style.visibility = 'hidden';
          } else {
            cards[e].style.visibility = 'visible';
            pins[e].style.visibility = 'visible';
            houseCards.push(pins[e]);
          }
        }
        // если отфильтрованных пинов больше 5,  вывод первых 5 пинов
        if (houseCards.length > window.globalValues.MAX_AMOUNT_OF_PINS) {
          for (var f = 0; f < houseCards.length; f++) {
            if (f < window.globalValues.MAX_AMOUNT_OF_PINS) {
              houseCards[f].style.visibility = 'visible';
            } else {
              houseCards[f].style.visibility = 'hidden';
            }
          }
        }
        break;

      case 'bungalo':
        // массив отфильтрованных элементов
        var bungaloCards = [];
        for (var g = 0; g < cards.length; g++) {
          if (cards[g].querySelector('.popup__type').textContent !== 'bungalo') {
            cards[g].style.visibility = 'hidden';
            pins[g].style.visibility = 'hidden';
          } else {
            cards[g].style.visibility = 'visible';
            pins[g].style.visibility = 'visible';
            bungaloCards.push(pins[g]);
          }
        }
        // если отфильтрованных пинов больше 5,  вывод первых 5 пинов
        if (bungaloCards.length > window.globalValues.MAX_AMOUNT_OF_PINS) {
          for (var x = 0; x < bungaloCards.length; x++) {
            if (x < window.globalValues.MAX_AMOUNT_OF_PINS) {
              bungaloCards[x].style.visibility = 'visible';
            } else {
              bungaloCards[x].style.visibility = 'hidden';
            }
          }
        }
        break;
    }
    // скрытие открытой карточки при смене фильтра
    for (var y = 0; y < cards.length; y++) {
      if (!cards[y].classList.contains('hidden')) {
        cards[y].classList.add('hidden');
      }
    }
  });

  // фильтрация цены
  var priceFilter = document.querySelector('#housing-price');
  priceFilter.addEventListener('change', function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var cards = document.querySelectorAll('.map__card');

    switch(priceFilter.value) {
      case 'any':
        // массив отфильтрованных элементов
        var anyCards = [];
        cards.forEach(function (item, index) {
          if (item.querySelector('.popup__text--price')) {
            cards[index].style.visibility = 'visible';
            pins[index].style.visibility = 'visible';
            anyCards.push(pins[index]);
          } else {
            cards[index].style.visibility = 'visible';
            pins[index].style.visibility = 'visible';
          }
        });
        break;

      case 'middle':
        // массив отфильтрованных элементов
        var middleCards = [];
        console.log(cards);
        cards.forEach(function (item, index) {
          var cardPrice = item.querySelector('.popup__text--price').textContent;
          if (+cardPrice >= 10000 && +cardPrice <= 50000) {
            cards[index].style.visibility = 'visible';
            pins[index].style.visibility = 'visible';
          } else {
            cards[index].style.visibility = 'hidden';
            pins[index].style.visibility = 'hidden';
          }
        });
        break;

      case 'low':
        var lowCards = [];
        cards.forEach(function (item, index) {
          var cardPrice = item.querySelector('.popup__text--price').textContent;
          if (+cardPrice <= 10000) {
            cards[index].style.visibility = 'visible';
            pins[index].style.visibility = 'visible';
          } else {
            cards[index].style.visibility = 'hidden';
            pins[index].style.visibility = 'hidden';
          }
        });
        break;

      case 'high':
        var highCards = [];
        cards.forEach(function (item, index) {
          var cardPrice = item.querySelector('.popup__text--price').textContent;
          if (+cardPrice > 50000) {
            cards[index].style.visibility = 'visible';
            pins[index].style.visibility = 'visible';
          } else {
            cards[index].style.visibility = 'hidden';
            pins[index].style.visibility = 'hidden';
          }
        });
        break;
    }
  });

  // фильтрация комнат
  var roomFilter = document.querySelector('#housing-rooms');
  roomFilter.addEventListener('change', function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var cards = document.querySelectorAll('.map__card');

    switch(roomFilter.value) {
      case 'any':
        for (var a = 0; a < pins.length; a++) {
          if (a < window.globalValues.MAX_AMOUNT_OF_PINS) {
            pins[a].style.visibility = 'visible';
            cards[a].style.visibility = 'visible';
          } else {
            pins[a].style.visibility = 'hidden';
            cards[a].style.visibility = 'hidden';
          }
        }
        break;

      case '1':
        cards.forEach(function (item, index) {
          var digits = [];
          var roomAmount = item.querySelector('.popup__text--capacity').textContent;
          var words = roomAmount.split(' ');
          words.forEach(function (elem, index) {
            var num = parseInt(words[index]);
            if (typeof num === "number" && !isNaN(num)) {
              digits.push(num);
            }
          });
          console.log(words);
          if (digits[0] === 1) {
            cards[index].style.visibility = 'visible';
            pins[index].style.visibility = 'visible';
          } else {
            cards[index].style.visibility = 'hidden';
            pins[index].style.visibility = 'hidden';
          }
        });
        break;

      case '2':
        cards.forEach(function (item, index) {
          var digits = [];
          var roomAmount = item.querySelector('.popup__text--capacity').textContent;
          var words = roomAmount.split(' ');
          words.forEach(function (elem, index) {
            var num = parseInt(words[index]);
            if (typeof num === "number" && !isNaN(num)) {
              digits.push(num);
            }
          });
          console.log(words);
          if (digits[0] === 2) {
            cards[index].style.visibility = 'visible';
            pins[index].style.visibility = 'visible';
          } else {
            cards[index].style.visibility = 'hidden';
            pins[index].style.visibility = 'hidden';
          }
        });
        break;

      case '3':
        cards.forEach(function (item, index) {
          var digits = [];
          var roomAmount = item.querySelector('.popup__text--capacity').textContent;
          var words = roomAmount.split(' ');
          words.forEach(function (elem, index) {
            var num = parseInt(words[index]);
            if (typeof num === "number" && !isNaN(num)) {
              digits.push(num);
            }
          });
          console.log(words);
          if (digits[0] === 3) {
            cards[index].style.visibility = 'visible';
            pins[index].style.visibility = 'visible';
          } else {
            cards[index].style.visibility = 'hidden';
            pins[index].style.visibility = 'hidden';
          }
        });
        break;
    }
  })

  // фильтрация гостей
  var guestFilter = document.querySelector('#housing-guests');
  guestFilter.addEventListener('change', function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var cards = document.querySelectorAll('.map__card');
    switch(guestFilter.value) {
      case 'any':
        for (var a = 0; a < pins.length; a++) {
          if (a < window.globalValues.MAX_AMOUNT_OF_PINS) {
            pins[a].style.visibility = 'visible';
            cards[a].style.visibility = 'visible';
          } else {
            pins[a].style.visibility = 'hidden';
            cards[a].style.visibility = 'hidden';
          }
        }
        break;

      case '0':
        cards.forEach(function (item, index) {
          var digits = [];
          var guestAmount = item.querySelector('.popup__text--capacity').textContent;
          var words = guestAmount.split(' ');
          words.forEach(function (elem, index) {
            var num = parseInt(words[index]);
            if (typeof num === "number" && !isNaN(num)) {
              digits.push(num);
            }
          });
          console.log(words);
          if (digits[1] === 0) {
            cards[index].style.visibility = 'visible';
            pins[index].style.visibility = 'visible';
          } else {
            cards[index].style.visibility = 'hidden';
            pins[index].style.visibility = 'hidden';
          }
        });
        break;

      case '1':
        cards.forEach(function (item, index) {
          var digits = [];
          var guestAmount = item.querySelector('.popup__text--capacity').textContent;
          var words = guestAmount.split(' ');
          words.forEach(function (elem, index) {
            var num = parseInt(words[index]);
            if (typeof num === "number" && !isNaN(num)) {
              digits.push(num);
            }
          });
          console.log(words);
          if (digits[1] === 1) {
            cards[index].style.visibility = 'visible';
            pins[index].style.visibility = 'visible';
          } else {
            cards[index].style.visibility = 'hidden';
            pins[index].style.visibility = 'hidden';
          }
        });
        break;

      case '2':
        cards.forEach(function (item, index) {
          var digits = [];
          var guestAmount = item.querySelector('.popup__text--capacity').textContent;
          var words = guestAmount.split(' ');
          words.forEach(function (elem, index) {
            var num = parseInt(words[index]);
            if (typeof num === "number" && !isNaN(num)) {
              digits.push(num);
            }
          });
          console.log(words);
          if (digits[1] === 2) {
            cards[index].style.visibility = 'visible';
            pins[index].style.visibility = 'visible';
          } else {
            cards[index].style.visibility = 'hidden';
            pins[index].style.visibility = 'hidden';
          }
        });
        break;
    }
  });

  // фильтрация по удобствам
  var features = document.querySelector('#housing-features');

  var wifi = features.querySelector('#filter-wifi');
  wifi.addEventListener('change', function () {
    var cards = document.querySelectorAll('.map__card');
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    cards.forEach(function (item, index) {
      var featuresList = cards[index].querySelector('.popup__features').textContent;
      var arrFeatures = featuresList.split(',');
      console.log(arrFeatures);
      if (arrFeatures.indexOf('wifi') !== -1) {
        cards[index].style.visibility = 'visible';
        pins[index].style.visibility = 'visible';
      } else {
        cards[index].style.visibility = 'hidden';
        pins[index].style.visibility = 'hidden';
      }
    })
  });

  var dishwasher = features.querySelector('#filter-dishwasher');
  dishwasher.addEventListener('change', function () {
    var cards = document.querySelectorAll('.map__card');
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    cards.forEach(function (item, index) {
      var featuresList = cards[index].querySelector('.popup__features').textContent;
      var arrFeatures = featuresList.split(',');
      console.log(arrFeatures);
      if (arrFeatures.indexOf('dishwasher') !== -1) {
        cards[index].style.visibility = 'visible';
        pins[index].style.visibility = 'visible';
      } else {
        cards[index].style.visibility = 'hidden';
        pins[index].style.visibility = 'hidden';
      }
    })
  })

  var parking = features.querySelector('#filter-parking');
  parking.addEventListener('change', function () {
    var cards = document.querySelectorAll('.map__card');
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    cards.forEach(function (item, index) {
      var featuresList = cards[index].querySelector('.popup__features').textContent;
      var arrFeatures = featuresList.split(',');
      console.log(arrFeatures);
      if (arrFeatures.indexOf('parking') !== -1) {
        cards[index].style.visibility = 'visible';
        pins[index].style.visibility = 'visible';
      } else {
        cards[index].style.visibility = 'hidden';
        pins[index].style.visibility = 'hidden';
      }
    })
  });

  var washer = features.querySelector('#filter-washer');
  washer.addEventListener('change', function () {
    var cards = document.querySelectorAll('.map__card');
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    cards.forEach(function (item, index) {
      var featuresList = cards[index].querySelector('.popup__features').textContent;
      var arrFeatures = featuresList.split(',');
      console.log(arrFeatures);
      if (arrFeatures.indexOf('washer') !== -1) {
        cards[index].style.visibility = 'visible';
        pins[index].style.visibility = 'visible';
      } else {
        cards[index].style.visibility = 'hidden';
        pins[index].style.visibility = 'hidden';
      }
    })
  });

  var elevator = features.querySelector('#filter-elevator');
  elevator.addEventListener('change', function () {
    var cards = document.querySelectorAll('.map__card');
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    cards.forEach(function (item, index) {
      var featuresList = cards[index].querySelector('.popup__features').textContent;
      var arrFeatures = featuresList.split(',');
      console.log(arrFeatures);
      if (arrFeatures.indexOf('elevator') !== -1) {
        cards[index].style.visibility = 'visible';
        pins[index].style.visibility = 'visible';
      } else {
        cards[index].style.visibility = 'hidden';
        pins[index].style.visibility = 'hidden';
      }
  })

})();
// for (var i = 0; i < cards.length; i++) {
//   if (cards[i].querySelector('.popup__type')) {
//     cards[i].style.visibility = 'visible';
//     pins[i].style.visibility = 'visible';
//     anyCards.push(pins[i]);
//   } else {
//     cards[i].style.visibility = 'visible';
//     pins[i].style.visibility = 'visible';
//   }
// }
