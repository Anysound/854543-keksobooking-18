'use strict';
var TYPES = ['palace', 'flat', 'house', 'bungalo', 'palace', 'flat', 'house', 'bungalo'];
var CHECK_TIMES = ['12.00', '13.00', '14.00', '12.00', '13.00', '14.00', '12.00', '13.00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner', 'wifi', 'dishwasher'];
var URLS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg', 'http://o0.github.io/assets/images/tokyo/hotel4.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel5.jpg', 'http://o0.github.io/assets/images/tokyo/hotel6.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel7.jpg', 'http://o0.github.io/assets/images/tokyo/hotel8.jpg'];
var PRICES = [100, 150, 200, 250, 350, 450, 500, 600];

var arrWithObjs = [];
// вспомогательная функция для создания массива с рандомной длиной
function makeArrWithRandomLength(arr) {
  var resultArr = [];
  for (var i = 0; i < Math.round(Math.random() * arr.length + 1); i++) {
    resultArr.push(arr[i]);
  }
  return resultArr;
}
// вспомогательная функция для создания рандомоного числа в указанных пределах
function makeRandomNumber(min, max) {
  return Math.round(min + Math.random() * (max - min));
}

function fillArrWithObjs() {
  for (var i = 0; i < 8; i++) {
    var defaultObj = {
      author: {
        avatar: 'img/avatars/user' + i + '.png'
      },
      offer: {
        title: 'title',
        address: '600, 350',
        price: PRICES[i],
        type: TYPES[i],
        rooms: i + 1,
        guests: i + 1,
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
    arrWithObjs.push(defaultObj);
  }
};

fillArrWithObjs();
console.log(arrWithObjs);
document.querySelector('.map').classList.remove('map--faded');

function makePins() {
  var template = document.querySelector('#pin').content.querySelector('.map__pin');
  var wrapper = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arrWithObjs.length; i++) {
    var clone = template.cloneNode(true);

    clone.style.left = arrWithObjs[i].location.x + 'px';
    clone.style.top = arrWithObjs[i].location.y + 'px';
    clone.src = arrWithObjs[i].author.avatar;
    clone.alt = arrWithObjs[i].offer.description;

    fragment.appendChild(clone);
  }
  wrapper.appendChild(fragment);
}
makePins();

// создание объявления
function makeCard() {
  var card = document.querySelector('#card').content.querySelector('.map__card');

  card.querySelector('.popup__title').textContent = arrWithObjs[0].offer.title;
  card.querySelector('.popup__text--address').textContent = arrWithObjs[0].offer.address;
  card.querySelector('.popup__text--price').textContent = arrWithObjs[0].offer.price;
  card.querySelector('.popup__text--capacity').textContent = arrWithObjs[0].offer.rooms + '' + arrWithObjs[0].offer.guests;
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrWithObjs[0].offer.checkin + ', выезд до ' + arrWithObjs[0].offer.checkout;
  card.querySelector('.popup__features').textContent = arrWithObjs[0].offer.features;
  card.querySelector('.popup__description').textContent = arrWithObjs[0].offer.description;
  card.querySelector('.popup__photos').src = arrWithObjs[0].offer.photos;
  card.querySelector('.popup__avatar').src = arrWithObjs[0].author.avatar;

  document.querySelector('.map__pins').insertAdjacentElement('beforebegin', card);
}
makeCard();
