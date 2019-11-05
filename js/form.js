'use strict';
(function () {
  // отключение полей
  for (var x = 0; x < window.globalValues.inputs.length; x++) {
    window.globalValues.inputs[x].setAttribute('disabled', '');
  }

  // валидация
  var form = document.querySelector('.ad-form');
  var selectRoomAmount = form.querySelector('#room_number');
  var selectGuestAmount = form.querySelector('#capacity');

  // валидатор комнат
  function selectValidHandler() {
    var HashAmountOfRooms = {
      amountOfRooms: selectRoomAmount.value,
      amountOfGuests: selectGuestAmount.value
    };
    switch (HashAmountOfRooms.amountOfRooms) {
      case '1':
        for (var y = 0; y < selectGuestAmount.children.length; y++) {
          if (HashAmountOfRooms.amountOfGuests !== selectGuestAmount[y].value) {
            selectGuestAmount[y].setAttribute('disabled', '');
          } else {
            selectGuestAmount[y].removeAttribute('disabled');
          }
        }
        break;
      case '2':
        selectGuestAmount[0].setAttribute('disabled', '');
        selectGuestAmount[1].removeAttribute('disabled');
        selectGuestAmount[2].removeAttribute('disabled');
        selectGuestAmount[3].setAttribute('disabled', '');
        break;
      case '3':
        for (var j = 0; j < selectGuestAmount.children.length; j++) {
          if (selectRoomAmount[j].value >= 4) {
            selectGuestAmount[j].setAttribute('disabled', '');
          } else {
            selectGuestAmount[j].removeAttribute('disabled');
          }
        }
        break;
      case '100':
        for (var z = 0; z < selectGuestAmount.children.length; z++) {
          if (selectRoomAmount[z].value <= 3) {
            selectGuestAmount[z].setAttribute('disabled', '');
          } else {
            selectGuestAmount[z].removeAttribute('disabled');
          }
        }
        break;
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

    //     title.addEventListener('change', function () {
    //   if (title.value.length < title.minlength) {
    //     title.setCustomValidity('слишком короткое значение, мин.длина - 30 символов');
    //     console.log(true);
    //   } else {
    //     title.setCustomValidity('');
    //   }
    // });
  }
  // валидация полей с числом гостей и комнат
  if (selectRoomAmount.value === '1') {
    selectGuestAmount[0].setAttribute('disabled', '');
    selectGuestAmount[1].setAttribute('disabled', '');
    selectGuestAmount[3].setAttribute('disabled', '');
  }
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

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var successHandler = function () {
      var successTemplate = document.querySelector('#success').content.querySelector('.success');
      document.querySelector('main').appendChild(successTemplate);
      document.addEventListener('click', function () {
        successTemplate.style.display = 'none';
      });
      document.addEventListener('keydown', function (evt2) {
        if (evt2.keyCode === window.globalValues.ESC_KEYCODE) {
          successTemplate.style.display = 'none';
        }
      });
      // ресет формы
      form.reset();
      // скрытие меток
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < pins.length; i++) {
        pins[i].style.display = 'none';
      }
      // переход в неактивное состояние
      document.querySelector('#address').value = (parseInt(document.querySelector('.map__pin--main').style.top, 10) + 33 + 'px') + ' ' + (parseInt(document.querySelector('.map__pin--main').style.left, 10) + 33 + 'px');
      document.querySelector('.map').classList.add('map--faded');
      document.querySelector('.ad-form').classList.add('ad-form--disabled');

      var fieldsets = document.querySelector('.ad-form').children;
      for (var j = 0; j < fieldsets.length; j++) {
        fieldsets[j].setAttribute('disabled', '');
      }
      // закрытие карточек
      var cards = document.querySelectorAll('.map__card');
      for (var z = 0; z < cards.length; z++) {
        if (!cards[z].classList.contains('hidden')) {
          cards[z].classList.add('hidden');
        }
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
      // document.addEventListener('click', function() {
      //   successTemplate.style.display = 'none';
      // });
      // document.addEventListener('keydown', function(evt) {
      //   if (evt.keyCode === window.globalValues.ESC_KEYCODE) {
      //     successTemplate.style.display = 'none';
      //   }
      // });
    };

    window.backend.save(new FormData(form), successHandler, errorHandler);
  });
})();
