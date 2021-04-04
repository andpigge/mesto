/* Для каждой формы validationConfig свой, можно вынести в отдельный файл, если обьектов станет много */
/* Сразу обрабатывать обьект удобнее, чем по отдельности указывать селектор формы */
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input-text',
  submitButtonSelector: '.button-popup',
  inactiveButtonClass: 'button-popup_inactive',
  inputErrorClass: 'popup__form-input-text_type_error',
  errorClass: 'popup__error-message_active'
}

class FormValidator {
  constructor({formSelector, ...objValidConfig}) {
    this._formSelector = formSelector;
    this._objValidConfig = objValidConfig;
  }

  _showErrorFields() {
    this._field.classList.add(this._objValidConfig.inputErrorClass);
    this._blockMessage.textContent = this._field.validationMessage;
    this._blockMessage.classList.add(this._objValidConfig.errorClass);
  };

  _hideErrorFields() {
    this._field.classList.remove(this._objValidConfig.inputErrorClass);
    this._blockMessage.textContent = '';
    this._blockMessage.classList.remove(this._objValidConfig.errorClass);
  };

  _switchValidationField() {
    /* Блок с сообщением. Связываем с формой */
    this._blockMessage = this._formItem.querySelector(`.${this._field.id}-error`);

    if (this._invalidFieldTrue) {
      this._showErrorFields();
    } else {
      this._hideErrorFields();
    }
  };

  /* Если поле невалидно вернет true */
  _checkValidationFieldList = () => {
    return this._fieldList.some(field => {
      return !field.validity.valid;
    });
  };

  _toggleStateButton() {
    this._invalidFieldTrue = this._checkValidationFieldList();

    if (this._invalidFieldTrue) {
      this._buttonFormSubmit.classList.add(this._objValidConfig.inactiveButtonClass);
      this._buttonFormSubmit.disabled = true;
      // console.log(true)
    } else {
      this._buttonFormSubmit.classList.remove(this._objValidConfig.inactiveButtonClass);
      this._buttonFormSubmit.disabled = false;
      // console.log(false)
    }
  };

  _setListenerFieldList() {
    /* Ищю все текстовые поля одной формы */
    this._fieldList = Array.from(this._formItem.querySelectorAll(this._objValidConfig.inputSelector));
    /* Ищю кнопку отправки формы на сервер */
    this._buttonFormSubmit = this._formItem.querySelector(this._objValidConfig.submitButtonSelector);

    this._toggleStateButton();

    /* Поле нужно чтобы его подсвечивать, и выводить ошибку */
    this._fieldList.forEach(field => {
      this._field = field;

      this._switchValidationField();

      this._formItem.addEventListener('input', event => {
        this._toggleStateButton();
        this._switchValidationField();
      });
    });
  }

  enableValidation() {
    /* Ищю все формы с переданным селектором в параметрах */
    const formList = Array.from(document.querySelectorAll(this._formSelector));

    formList.forEach(formItem => {
      this._formItem = formItem;

      this._formItem.addEventListener('submit', event => {
        event.preventDefault();
      });

      /* Валидируем каждую форму из цикла */
      this._setListenerFieldList();
    });
  }
}

const formVadidation = new FormValidator(validationConfig);
formVadidation.enableValidation();
