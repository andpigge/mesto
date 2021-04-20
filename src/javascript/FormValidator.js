import {validationConfig} from './utils/constants.js';

class FormValidator {
  constructor(objValidConfig, formSelector) {
    this._formSelector = formSelector;
    this._objValidConfig = objValidConfig;
  }

  _showErrorFields(field) {
    /* Блок с сообщением. Связываем с формой */
    const blockMessage = this._formItem.querySelector(`.${field.id}-error`);

    field.classList.add(this._objValidConfig.inputErrorClass);
    blockMessage.textContent = field.validationMessage;
    blockMessage.classList.add(this._objValidConfig.errorClass);
  };

  _hideErrorFields(field) {
    /* Блок с сообщением. Связываем с формой */
    /* Пришлось повторить переменную, со свойством класса не работает */
    const blockMessage = this._formItem.querySelector(`.${field.id}-error`);

    field.classList.remove(this._objValidConfig.inputErrorClass);
    blockMessage.textContent = '';
    blockMessage.classList.remove(this._objValidConfig.errorClass);
  };

  _switchValidationField(field) {
    if (!field.validity.valid) {
      this._showErrorFields(field);
    } else {
      this._hideErrorFields(field);
    }
  };

  /* Если поле невалидно вернет true */
  _checkValidationFieldList() {
    return this._fieldList.some(field => !field.validity.valid);
  }

  _toggleStateButton() {
    this._invalidFieldTrue = this._checkValidationFieldList();

    if (this._invalidFieldTrue) {
      this._submitButton.classList.add(this._objValidConfig.inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._objValidConfig.inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _setListenerFieldList() {
    /* Ищу все текстовые поля одной формы */
    this._fieldList = Array.from(this._formItem.querySelectorAll(this._objValidConfig.inputSelector));

    /* Ищу кнопку отправки формы на сервер */
    this._submitButton = this._formItem.querySelector(this._objValidConfig.submitButtonSelector);

    this._toggleStateButton();

    /* Поле нужно чтобы его подсвечивать, и выводить ошибку */
    this._fieldList.forEach(field => {

      /* Свойства класса не дружат с циклами, они не перезаписываются при каждом каждом проходе цикла, а оставляют старое значение
      this._field как свойство класса здесь не подойдет, так как присуствует цикл */

      this._switchValidationField(field);

      this._formItem.addEventListener('input', event => {

        this._toggleStateButton();
        this._switchValidationField(field);
      });
    });
  }

  /* Публичный метод */
  resetValidation() {
    this._fieldList.forEach(field => {
      this._hideErrorFields(field);
    })
    this._toggleStateButton();
  }

  enableValidation() {
    /* Ищу все формы с переданным селектором в параметрах */
    this._formItem = document.querySelector(this._formSelector);

    this._formItem.addEventListener('submit', event => {
      event.preventDefault();
    });

    /* Валидируем каждую форму из цикла */
    this._setListenerFieldList();
  }
}

/* Экземпляры понадобятся в другом модуле, так как в нем будет задействована валидация */
export const createCardVadidation = new FormValidator(validationConfig, '.popup__form_create_card');
createCardVadidation.enableValidation();
export const editProfileVadidation = new FormValidator(validationConfig, '.popup__form_edit_profile');
editProfileVadidation.enableValidation();
