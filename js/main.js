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
  for (var i = 0; i < 22; i++) {
    var defaultObj = {
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
}

fillArrWithObjs();

// document.querySelector('.map').classList.remove('map--faded'); // отключено для возврата в исходное состояние

// function makePins() {
//   var template = document.querySelector('#pin').content.querySelector('.map__pin');
//   var wrapper = document.querySelector('.map__pins');
//   var fragment = document.createDocumentFragment();

//   for (var i = 0; i < arrWithObjs.length; i++) {
//     var clone = template.cloneNode(true);

//     clone.style.left = arrWithObjs[i].location.x + 'px';
//     clone.style.top = arrWithObjs[i].location.y + 'px';
//     clone.src = arrWithObjs[i].author.avatar;
//     clone.alt = arrWithObjs[i].offer.description;

//     fragment.appendChild(clone);
//   }
//   wrapper.appendChild(fragment);
// }
// makePins(); отключено для возврата в исходное состояние

// создание объявления
// function makeCard() {
//   var card = document.querySelector('#card').content.querySelector('.map__card');

//   card.querySelector('.popup__title').textContent = arrWithObjs[0].offer.title;
//   card.querySelector('.popup__text--address').textContent = arrWithObjs[0].offer.address;
//   card.querySelector('.popup__text--price').textContent = arrWithObjs[0].offer.price;
//   card.querySelector('.popup__text--capacity').textContent = arrWithObjs[0].offer.rooms + '' + arrWithObjs[0].offer.guests;
//   card.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrWithObjs[0].offer.checkin + ', выезд до ' + arrWithObjs[0].offer.checkout;
//   card.querySelector('.popup__features').textContent = arrWithObjs[0].offer.features;
//   card.querySelector('.popup__description').textContent = arrWithObjs[0].offer.description;
//   card.querySelector('.popup__photos').src = arrWithObjs[0].offer.photos;
//   card.querySelector('.popup__avatar').src = arrWithObjs[0].author.avatar;

//   document.querySelector('.map__pins').insertAdjacentElement('beforebegin', card);
// }
// makeCard(); // отключено для возврата в исходное состояние

// отключение полей
var inputs = document.querySelector('.ad-form').children;
for (var i = 0; i < inputs.length; i++) {
  inputs[i].setAttribute('disabled', '');
}

var pin = document.querySelector('.map__pin--main');

function pinMouseDownHandler() {
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');

  for (var j = 0; j < inputs.length; j++) {
    inputs[j].removeAttribute('disabled');
  }

  pinMouseOverHandler();
}

function pinMouseOverHandler(evt) {
  document.querySelector('#address').value = evt.clientX + ' ' + evt.clientY;
}

pin.addEventListener('mousedown', pinMouseDownHandler);
pin.addEventListener('keypress', function (evt) {
  if (evt.keyCode === 13) {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');

    for (var j = 0; j < inputs.length; i++) {
      inputs[j].removeAttribute('disabled');
    }
  }
});
pin.addEventListener('mouseover', pinMouseOverHandler);

// валидация
var form = document.querySelector('.ad-form');
var selectRoomAmount = form.querySelector('#room_number');
var selectGuestAmount = form.querySelector('#capacity');

// валидатор селекта
function selectValidHandler() {
  var amountOfRooms = selectRoomAmount.value;
  var amountOfGuests = selectGuestAmount.value;

  if (amountOfRooms === '3') {
    for (var j = 0; j < selectGuestAmount.children.length; j++) {
      if (selectRoomAmount[j].value >= 4) {
        selectGuestAmount[j].setAttribute('disabled', '');
      } else {
        selectGuestAmount[j].removeAttribute('disabled');
      }
    }
  }

  if (amountOfRooms === '2') {
    selectGuestAmount[0].setAttribute('disabled', '');
    selectGuestAmount[1].removeAttribute('disabled');
    selectGuestAmount[2].removeAttribute('disabled');
    selectGuestAmount[3].setAttribute('disabled', '');
  }

  if (amountOfRooms === '1') {
    for (var x = 0; x < selectGuestAmount.children.length; x++) {
      if (amountOfGuests !== selectGuestAmount[x].value) {
        selectGuestAmount[x].setAttribute('disabled', '');
      } else {
        selectGuestAmount[x].removeAttribute('disabled');
      }
    }
  }

  if (amountOfRooms === '100') {
    for (var z = 0; z < selectGuestAmount.children.length; z++) {
      if (selectRoomAmount[z].value <= 3) {
        selectGuestAmount[z].setAttribute('disabled', '');
      } else {
        selectGuestAmount[z].removeAttribute('disabled');
      }
    }
  }
}

// валидатор формы
function formValidHandler() {
  // валидация названия
  var title = form.querySelector('#title');
  title.setAttribute('minlength', '30');
  title.setAttribute('maxlength', '100');
  title.addEventListener('invalid', function () {
    if (title.validity.tooShort) {
      title.setCustomValidity('слишком короткое значение, мин.длина - 30 символов');
    } else {
      title.setCustomValidity('');
    }
  });
}

if (selectRoomAmount.value === '1') {
  selectGuestAmount[0].setAttribute('disabled', '');
  selectGuestAmount[1].setAttribute('disabled', '');
  selectGuestAmount[3].setAttribute('disabled', '');
}

// изменение цены при разных типах жилья
var selectType = form.querySelector('#type');
var price = form.querySelector('#price');
function houseTypeHandler() {
  var houseType = selectType.value;
  if (houseType === 'bungalo') {
    price.setAttribute('placeholder', '0');
    price.setAttribute('min', '0');
  } else if (houseType === 'flat') {
    price.setAttribute('placeholder', '1000');
    price.setAttribute('min', '1000');
  } else if (houseType === 'house') {
    price.setAttribute('placeholder', '5000');
    price.setAttribute('min', '5000');
  } else if (houseType === 'palace') {
    price.setAttribute('placeholder', '10000');
    price.setAttribute('min', '10000');
  }
}

selectRoomAmount.addEventListener('change', selectValidHandler);
selectType.addEventListener('change', houseTypeHandler);
form.addEventListener('submit', function (evt) {
  evt.preventDefault();
  formValidHandler();
});
