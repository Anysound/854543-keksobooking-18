'use strict';
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIMES = ['12.00', '13.00', '14.00', '12.00', '13.00', '14.00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var URLS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg', 'http://o0.github.io/assets/images/tokyo/hotel4.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel5.jpg', 'http://o0.github.io/assets/images/tokyo/hotel6.jpg'];
var PRICES = [100, 150, 200, 250, 350, 450];
var arrWithObjs = [];

function makeArrWithMockData(arr) {
  var resultArr = [];
  for (var i = 0; i < Math.round(Math.random() * arr.length + 1); i++) {
    resultArr.push(arr[i]);
  }
  return resultArr;
}

function makeRandomNumber(min, max) {
  return Math.round( min + Math.random() * (max - min) );
}

function makeArr() {
  for (var i = 0; i < 8; i++) {
    var defaultObj = {
      author: {
        avatar: ''
      },
      offer: {
        title: '',
        address: '',
        price: '',
        type: '',
        rooms: '',
        guests: '',
        checkin: '',
        checkout: '',
        features: '',
        description: '',
        photos: ''
      },
      location: {
        x: '',
        y: ''
      }
    };

    defaultObj = {
      author: {
        avatar: 'img/avatars/user' + i + '.png'
      },
      offer: {
        title: 'title',
        address: '600, 350',
        price: PRICES[i],
        type: TYPES[i],
        rooms: ++i,
        guests: ++i,
        checkin: CHECK_TIMES[i],
        checkout: CHECK_TIMES[i],
        features: makeArrWithMockData(FEATURES),
        description: 'description',
        photos: makeArrWithMockData(URLS)
      },
      location: {
        x: makeRandomNumber(130, 630),
        y: makeRandomNumber(130, 630)
      }
    };


    arrWithObjs.push(defaultObj);
  }
}

makeArr();
console.log(arrWithObjs);
document.querySelector('.map').classList.remove('map--faded');

function makePins() {
  var template = document.querySelector('#pin');
  var wrapper = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arrWithObjs.length; i++) {
    var clone = template.cloneNode(true);

    clone.style.left = arrWithObjs[i].location.x + 'px';
    clone.style.right = arrWithObjs[i].location.y + 'px';
    clone.src = arrWithObjs[i].author.avatar;
    clone.alt = arrWithObjs[i].offer.description;

    fragment.appendChild(clone);
  }
  wrapper.appendChild(fragment);
}
makePins();


// var defaultObj = {
//     author: {
//       avatar: 'img/avatars/user' + i + '.png'
//     },
//     offer: {
//       title: 'title',
//       address: '600, 350',
//       price: PRICES[i],
//       type: TYPES[i],
//       rooms: ++i,
//       guests: ++i,
//       checkin: CHECK_TIMES[i],
//       checkout: CHECK_TIMES[i],
//       features: makeArrWithMockData(FEATURES),
//       description: 'description',
//       photos: makeArrWithMockData(URLS)
//     },
//     location: {
//       x: makeRandomNumber(130, 630),
//       y: makeRandomNumber(130, 630)
//     }
//   };