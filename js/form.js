'use strict';
(function () { // отключение полей
  var inputs = document.querySelector('.ad-form').children;
  for (var x = 0; x < inputs.length; x++) {
    inputs[x].setAttribute('disabled', '');
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

      for (var j = 0; j < inputs.length; j++) {
        inputs[j].removeAttribute('disabled');
      }
    }
  });
  pin.addEventListener('mouseover', pinMouseOverHandler);

  // валидация
  var form = document.querySelector('.ad-form');
  var selectRoomAmount = form.querySelector('#room_number');
  var selectGuestAmount = form.querySelector('#capacity');

  // валидатор селекта комнат
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
      for (var y = 0; y < selectGuestAmount.children.length; y++) {
        if (amountOfGuests !== selectGuestAmount[y].value) {
          selectGuestAmount[y].setAttribute('disabled', '');
        } else {
          selectGuestAmount[y].removeAttribute('disabled');
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

  // валидация цены при разных типах жилья
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

  if (selectType.value === 'bungalo') {
    price.setAttribute('placeholder', '0');
  }

  // валидация поля адреса
  form.querySelector('#address').setAttribute('readonly', '');

  selectRoomAmount.addEventListener('change', selectValidHandler);
  selectType.addEventListener('change', houseTypeHandler);
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    formValidHandler();
  });

  // валидация времени
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');
  timeIn.addEventListener('change', function () {
    if (timeIn.value === '13:00') {
      timeOut.value = '13:00';
    } else if (timeIn.value === '14:00') {
      timeOut.value = '14:00';
    } else {
      timeOut.value = '12:00';
    }
  });
})();