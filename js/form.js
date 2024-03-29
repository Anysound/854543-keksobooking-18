'use strict';
(function () {
  // отключение полей
  for (var x = 0; x < document.querySelector('.ad-form').children.length; x++) {
    document.querySelector('.ad-form').children[x].setAttribute('disabled', '');
  }

  // валидация
  var form = document.querySelector('.ad-form');

  // валидация полей с числом гостей и комнат
  var selectRoomAmount = form.querySelector('#room_number');
  var selectGuestAmount = form.querySelector('#capacity');

  // изначальное блокирование неподходящих вариантов
  if (selectRoomAmount.value === '1') {
    selectGuestAmount[0].setAttribute('disabled', '');
    selectGuestAmount[1].setAttribute('disabled', '');
    selectGuestAmount[3].setAttribute('disabled', '');
  }

  function selectValidHandler() {
    var HashAmountOfRooms = {
      amountOfRooms: selectRoomAmount.value,
      amountOfGuests: selectGuestAmount.value
    };
    switch (HashAmountOfRooms.amountOfRooms) {
      case '1':
        selectGuestAmount[0].setAttribute('disabled', '');
        selectGuestAmount[1].setAttribute('disabled', '');
        selectGuestAmount[2].removeAttribute('disabled');
        selectGuestAmount[3].setAttribute('disabled', '');
        selectGuestAmount.value = '1';
        break;
      case '2':
        selectGuestAmount[0].setAttribute('disabled', '');
        selectGuestAmount[1].removeAttribute('disabled');
        selectGuestAmount[2].removeAttribute('disabled');
        selectGuestAmount[3].setAttribute('disabled', '');
        selectGuestAmount.value = '2';
        break;
      case '3':
        for (var j = 0; j < selectGuestAmount.children.length; j++) {
          if (selectRoomAmount[j].value >= 4) {
            selectGuestAmount[j].setAttribute('disabled', '');
          } else {
            selectGuestAmount[j].removeAttribute('disabled');
            selectGuestAmount.value = '3';
          }
        }
        break;
      case '100':
        for (var z = 0; z < selectGuestAmount.children.length; z++) {
          if (selectRoomAmount[z].value <= 3) {
            selectGuestAmount[z].setAttribute('disabled', '');
            // selectGuestAmount.value = '1';
          } else {
            selectGuestAmount[z].removeAttribute('disabled');
            selectGuestAmount.value = '0';
          }
        }
        break;
    }
  }

  selectRoomAmount.addEventListener('change', selectValidHandler);

  // валидация названия
  var title = form.querySelector('#title');
  title.setAttribute('minlength', '30');
  title.setAttribute('maxlength', '100');
  title.addEventListener('invalid', function () {
    if (title.validity.tooShort) {
      title.setCustomValidity('слишком короткое название, мин.длина - 30 символов');
    } else {
      title.setCustomValidity('');
    }
  });

  // валидация цены при разных типах жилья
  var selectType = form.querySelector('#type');
  var price = form.querySelector('#price');
  price.setAttribute('placeholder', '0');
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

  selectType.addEventListener('change', houseTypeHandler);

  // валидация поля адреса
  form.querySelector('#address').setAttribute('readonly', '');

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

  timeOut.addEventListener('change', function () {
    if (timeOut.value === '13:00') {
      timeIn.value = '13:00';
    } else if (timeOut.value === '14:00') {
      timeIn.value = '14:00';
    } else {
      timeIn.value = '12:00';
    }
  });

  // отправка формы
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  form.addEventListener('submit', function (evt) {

    evt.preventDefault();

    var successHandler = function () {
      document.querySelector('main').appendChild(successTemplate);

      document.addEventListener('click', function () {
        successTemplate.remove();
      });

      document.addEventListener('keydown', function (evt2) {
        if (evt2.keyCode === window.globalValues.ESC_KEYCODE) {
          successTemplate.style.display = 'none';
        }
      });
      // ресет формы
      form.reset();

      // переход в неактивное состояние
      document.querySelector('#address').value = (parseInt(document.querySelector('.map__pin--main').style.top, 10) + 33 + 'px') + ' ' + (parseInt(document.querySelector('.map__pin--main').style.left, 10) + 33 + 'px');
      document.querySelector('.map').classList.add('map--faded');
      document.querySelector('.ad-form').classList.add('ad-form--disabled');

      var filtersInputs = document.querySelector('.map__filters').children;

      // при неактивном состоянии форма фильтрации заблокирована
      for (var a = 0; a < filtersInputs.length; a++) {
        filtersInputs[a].setAttribute('disabled', '');
      }

      var fieldsets = document.querySelector('.ad-form').children;
      for (var j = 0; j < fieldsets.length; j++) {
        fieldsets[j].setAttribute('disabled', '');
      }

      // закрытие карточек
      var cards = document.querySelectorAll('.map__card');
      for (var z = 0; z < cards.length; z++) {
        cards[z].remove();
      }

      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var h = 0; h < pins.length; h++) {
        pins[h].remove();
      }

      // установка главной метки на первоначальное положение
      document.querySelector('.map__pin--main').style.left = '570px';
      document.querySelector('.map__pin--main').style.top = '375px';
    };

    var errorHandler = function () {
      var errorTemplate = document.querySelector('#error').content.querySelector('.error');

      document.querySelector('main').appendChild(errorTemplate);
      document.querySelector('.error__button').addEventListener('click', function () {
        errorTemplate.remove();
      });

      document.addEventListener('keydown', function (evt3) {
        if (evt3.keyCode === window.globalValues.ESC_KEYCODE) {
          errorTemplate.remove();
        }
      });
    };

    window.backend.save(new FormData(form), successHandler, errorHandler);
  });

  // ресет формы
  form.querySelector('.ad-form__reset').addEventListener('click', function () {
    // переход в неактивное состояние
    document.querySelector('#address').value = (parseInt(document.querySelector('.map__pin--main').style.top, 10) + 33 + 'px') + ' ' + (parseInt(document.querySelector('.map__pin--main').style.left, 10) + 33 + 'px');
    document.querySelector('.map').classList.add('map--faded');
    document.querySelector('.ad-form').classList.add('ad-form--disabled');

    var fieldsets = document.querySelector('.ad-form').children;
    for (var j = 0; j < fieldsets.length; j++) {
      fieldsets[j].setAttribute('disabled', '');
    }

    var filtersInputs = document.querySelector('.map__filters').children;
    // при неактивном состоянии форма фильтрации заблокирована
    for (var i = 0; i < filtersInputs.length; i++) {
      filtersInputs[i].setAttribute('disabled', '');
    }

    // фиксация в адресе текущее положение главной метки
    setTimeout(function () {
      document.querySelector('#address').value = (parseInt(document.querySelector('.map__pin--main').style.top, 10) + window.globalValues.CENTER_OF_PIN + 'px') + ' ' +
      (parseInt(document.querySelector('.map__pin--main').style.left, 10) + window.globalValues.CENTER_OF_PIN + 'px');
    }, 50);

    // сброс фильтров
    document.querySelector('.map__filters').reset();

    // открытые карточки закрываются
    var cards = document.querySelectorAll('.map__card');
    for (var c = 0; c < cards.length; c++) {
      cards[c].remove();
    }
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var h = 0; h < pins.length; h++) {
      pins[h].remove();
    }

    form.reset();
  });
})();
