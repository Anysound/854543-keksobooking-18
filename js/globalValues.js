'use strict';
(function () {
  window.globalValues = {
    ENTER_KEYCODE: 13,
    ESC_KEYCODE: 27,
    arrWithObjs: [],
    inputs: document.querySelector('.ad-form').children,
    makePins: function() {
    var template = document.querySelector('#pin').content.querySelector('.map__pin');
    var wrapper = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    for (var j = 0; j < window.globalValues.arrWithObjs.length; j++) {
      var clone = template.cloneNode(true);
      clone.style.left = window.globalValues.arrWithObjs[j].location.x + 'px';
      clone.style.top = window.globalValues.arrWithObjs[j].location.y + 'px';
      clone.src = window.globalValues.arrWithObjs[j].author.avatar;
      clone.alt = window.globalValues.arrWithObjs[j].offer.description;
      fragment.appendChild(clone);
    }
    wrapper.appendChild(fragment);
    }
  };
})();
