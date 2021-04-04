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

    if (!field.validity.valid) {
      this._showErrorFields(field, blockMessage);
    } else {
      this._hideErrorFields(field, blockMessage);
    }
  };

  /* Если поле невалидно вернет true */
  _checkValidationFieldList(fieldList) {
    return fieldList.some(field => {
      return !field.validity.valid;
    });
  }

  _toggleStateButton(buttonFormSubmit, fieldList) {
    this._invalidFieldTrue = this._checkValidationFieldList(fieldList);

    if (this._invalidFieldTrue) {
      buttonFormSubmit.classList.add(this._objValidConfig.inactiveButtonClass);
      buttonFormSubmit.disabled = true;
    } else {
      buttonFormSubmit.classList.remove(this._objValidConfig.inactiveButtonClass);
      buttonFormSubmit.disabled = false;
    }
  }

  _setListenerFieldList(formItem) {
    /* Ищу все текстовые поля одной формы */
    const fieldList = Array.from(formItem.querySelectorAll(this._objValidConfig.inputSelector));
    /* Ищу кнопку отправки формы на сервер */
    const buttonFormSubmit = formItem.querySelector(this._objValidConfig.submitButtonSelector);

    this._toggleStateButton(buttonFormSubmit, fieldList);

    /* Поле нужно чтобы его подсвечивать, и выводить ошибку */
    fieldList.forEach(field => {

      this._switchValidationField(field, formItem);

      formItem.addEventListener('input', event => {
        this._toggleStateButton(buttonFormSubmit, fieldList);
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
