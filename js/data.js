'use strict';
(function () {
  var TYPES = ['palace', 'flat', 'house', 'bungalo', 'palace', 'flat', 'house', 'bungalo'];
  var CHECK_TIMES = ['12.00', '13.00', '14.00', '12.00', '13.00', '14.00', '12.00', '13.00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner', 'wifi', 'dishwasher'];
  var URLS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg', 'http://o0.github.io/assets/images/tokyo/hotel4.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel5.jpg', 'http://o0.github.io/assets/images/tokyo/hotel6.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel7.jpg', 'http://o0.github.io/assets/images/tokyo/hotel8.jpg'];
  var PRICES = [100, 150, 200, 250, 350, 450, 500, 600];

  // вспомогательная функция для создания массива с рандомной длиной
  function makeArrWithRandomLength(arr) {
    var resultArr = [];
    for (var i = 0; i < Math.round(Math.random() * arr.length + 1); i++) {
      resultArr.push(arr[i]);
    }
    return resultArr;
  }
  // вспомогательная функция для создания рандомного числа в указанных пределах
  function makeRandomNumber(min, max) {
    return Math.round(min + Math.random() * (max - min));
  }
  // заполнение массива объектами
  function fillArrWithObjs() {
    for (var i = 0; i < 8; i++) {
      var defaultObj = {
        author: {
          avatar: 'img/avatars/user0' + i + '.png'
        },
        offer: {
          title: 'title',
          address: '600, 350',
          price: PRICES[i],
          type: TYPES[i],
          rooms: i,
          guests: i,
          checkin: CHECK_TIMES[i],
          checkout: CHECK_TIMES[i],
          features: makeArrWithRandomLength(FEATURES),
          description: 'description',
          photos: makeArrWithRandomLength(URLS)
        },
        location: {
          x: makeRandomNumber(130, 630),
          y: makeRandomNumber(130, 630)
        }
      };
      window.globalValues.arrWithObjs.push(defaultObj);
    }
  }

  fillArrWithObjs();
})();
