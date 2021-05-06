(function() {
  var menu = document.querySelector('.main-nav');
  var menuItem = document.querySelectorAll('.main-nav__item');
  var body = document.querySelector('.body');
  var menuToggler = document.querySelector('.main-nav__toggler');

  window.onload = function() {
    menu.classList.remove('no-js');
    menu.classList.remove('main-nav--opened');
    menu.classList.add('main-nav--closed');
  };

  var closeMenu = function () {
    menu.classList.add('main-nav--closed');
    menu.classList.remove('main-nav--opened');
    body.classList.remove('body--noscroll');
    removeListenerOnMenuItem();
  };

  var openMenu = function () {
    menu.classList.remove('main-nav--closed');
    menu.classList.add('main-nav--opened');
    body.classList.add('body--noscroll');
    onMenuItemClick();
  };

  var removeListenerOnMenuItem = function () {
    for (item of menuItem) {
      item.removeEventListener('click', closeMenu);
    }
  };

  var onMenuItemClick = function () {
    for (item of menuItem) {
      item.addEventListener('click', closeMenu);
    }
  };

  menuToggler.addEventListener('click',  () => {
    if (menu.classList.contains('main-nav--opened')){
      closeMenu();
    } else {
      openMenu();
    }
  });

  // phoneMask
  var phoneInput = document.querySelector('input[type=tel]');

  var getPhoneMask = function () {
    var getInputNumbersValue = function (input) {
      // Return stripped input value — just numbers
      return input.value.replace(/\D/g, '');
    };

    var onPhonePaste = function (e) {
      var input = e.target,
        inputNumbersValue = getInputNumbersValue(input);
      var pasted = e.clipboardData || window.clipboardData;
      if (pasted) {
        var pastedText = pasted.getData('Text');
        if (/\D/g.test(pastedText)) {
          // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
          // formatting will be in onPhoneInput handler
          input.value = inputNumbersValue;
          return;
        }
      }
    };

    var onPhoneInput = function (e) {
      var input = e.target,
        inputNumbersValue = getInputNumbersValue(input),
        selectionStart = input.selectionStart,
        formattedInputValue = '';

      if (!inputNumbersValue) {
        return input.value = '';
      }

      if (input.value.length != selectionStart) {
        // Editing in the middle of input, not last symbol
        if (e.data && /\D/g.test(e.data)) {
          // Attempt to input non-numeric symbol
          input.value = inputNumbersValue;
        }
        return;
      }

      if (['7', '8', '9'].indexOf(inputNumbersValue[0]) > -1) {
        if (inputNumbersValue[0] == '9') inputNumbersValue = '7' + inputNumbersValue;
        // var firstSymbols = (inputNumbersValue[0] == '8') ? '8' : '+7';

        if (inputNumbersValue[0] == '8') {
          var firstSymbols = '8';
          phoneInput.setAttribute('pattern', '.{17,17}');
          phoneInput.setAttribute('maxlength', '17');
        } else {
          var firstSymbols = '+7';
          phoneInput.setAttribute('pattern', '.{18,18}');
          phoneInput.setAttribute('maxlength', '18');
        }

        formattedInputValue = input.value = firstSymbols + ' ';
        if (inputNumbersValue.length > 1) {
          formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
        }
        if (inputNumbersValue.length >= 5) {
          formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
        }
        if (inputNumbersValue.length >= 8) {
          formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
        }
        if (inputNumbersValue.length >= 10) {
          formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
        }
      } else {
        formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
      }
      input.value = formattedInputValue;
    };
    var onPhoneKeyDown = function (e) {
      // Clear input after remove last symbol
      var inputValue = e.target.value.replace(/\D/g, '');
      if (e.keyCode == 8 && inputValue.length == 1) {
        e.target.value = '';
      }
    };

    phoneInput.addEventListener('keydown', onPhoneKeyDown);
    phoneInput.addEventListener('input', onPhoneInput, false);
    phoneInput.addEventListener('paste', onPhonePaste, false);
  };

  getPhoneMask();
}());
