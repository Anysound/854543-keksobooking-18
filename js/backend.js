'use strict';
(function () {
  window.backend = {
    load: function (loadHandler, errorHandler) {
      var URL = 'https://js.dump.academy/keksobooking/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          loadHandler(xhr.response);
        } else {
          errorHandler();
        }
      });

      xhr.addEventListener('error', function () {
        errorHandler();
      });

      xhr.addEventListener('timeout', function () {
        errorHandler('Запрос не успел выполниться');
      });

      xhr.timeout = 10000;
      xhr.open('GET', URL);
      xhr.send();
    },
    save: function (data, successSaveHandler, errorSaveHandler) {
      var URL = 'https://js.dump.academy/keksobooking';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        successSaveHandler(xhr.response);
      });
      xhr.addEventListener('error', function () {
        errorSaveHandler;
      });
      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();
