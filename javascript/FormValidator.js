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

  _showErrorFields(field, blockMessage) {
    field.classList.add(this._objValidConfig.inputErrorClass);
    blockMessage.textContent = field.validationMessage;
    blockMessage.classList.add(this._objValidConfig.errorClass);
  };

  _hideErrorFields(field, blockMessage) {
    field.classList.remove(this._objValidConfig.inputErrorClass);
    blockMessage.textContent = '';
    blockMessage.classList.remove(this._objValidConfig.errorClass);
  };

  _switchValidationField(field, formItem) {
    /* Блок с сообщением. Связываем с формой */
    const blockMessage = formItem.querySelector(`.${field.id}-error`);

    if (this._invalidFieldTrue) {
      this._showErrorFields(field, blockMessage);
    } else {
      this._hideErrorFields(field, blockMessage);
    }
  };

  /* Если поле невалидно вернет true */
  _checkValidationFieldList() {
    return this._fieldList.some(field => !field.validity.valid);
  }

  _toggleStateButton() {
    this._invalidFieldTrue = this._checkValidationFieldList(this._fieldList);

    if (this._invalidFieldTrue) {
      this._buttonFormSubmit.classList.add(this._objValidConfig.inactiveButtonClass);
      this._buttonFormSubmit.disabled = true;
    } else {
      this._buttonFormSubmit.classList.remove(this._objValidConfig.inactiveButtonClass);
      this._buttonFormSubmit.disabled = false;
    }
  }

  _setListenerFieldList(formItem) {
    /* Ищу все текстовые поля одной формы */
    /* Записываю в свойство _fieldList все текстовые инпуты формы */
    this._fieldList = Array.from(formItem.querySelectorAll(this._objValidConfig.inputSelector));

    /* Ищу кнопку отправки формы на сервер */
    /* Записываю в свойство _buttonFormSubmit кнопку формы */
    this._buttonFormSubmit = formItem.querySelector(this._objValidConfig.submitButtonSelector);

    this._toggleStateButton();

    /* Поле нужно чтобы его подсвечивать, и выводить ошибку */
    this._fieldList.forEach(field => {

      this._switchValidationField(field, formItem);

      formItem.addEventListener('input', event => {

        this._toggleStateButton();
        this._switchValidationField(field, formItem);
      });
    });
  }

  enableValidation() {
    /* Ищу все формы с переданным селектором в параметрах */
    const formList = Array.from(document.querySelectorAll(this._formSelector));

    formList.forEach(formItem => {

      formItem.addEventListener('submit', event => {
        event.preventDefault();
      });

      /* Валидируем каждую форму из цикла */
      this._setListenerFieldList(formItem);
    });
  }
}

const formVadidation = new FormValidator(validationConfig);
formVadidation.enableValidation();
