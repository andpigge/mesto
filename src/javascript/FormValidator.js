import {validationConfig} from './utils/constants.js';

class FormValidator {
  constructor(objValidConfig, formSelector) {

    this._form = document.querySelector(formSelector);
    this._objValidConfig = objValidConfig;
  }

  _showErrorFields(field) {
    /* Блок с сообщением. Связываем с формой */
    const blockMessage = this._form.querySelector(`.${field.id}-error`);

    field.classList.add(this._objValidConfig.inputErrorClass);
    blockMessage.textContent = field.validationMessage;
    blockMessage.classList.add(this._objValidConfig.errorClass);
  };

  _hideErrorFields(field) {
    /* Блок с сообщением. Связываем с формой */
    /* Пришлось повторить переменную, со свойством класса не работает */
    const blockMessage = this._form.querySelector(`.${field.id}-error`);

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
    this._fieldList = Array.from(this._form.querySelectorAll(this._objValidConfig.inputSelector));

    /* Ищу кнопку отправки формы на сервер */
    this._submitButton = this._form.querySelector(this._objValidConfig.submitButtonSelector);

    this._toggleStateButton();

    /* Поле нужно чтобы его подсвечивать, и выводить ошибку */
    this._fieldList.forEach(field => {

      this._switchValidationField(field);

      this._form.addEventListener('input', event => {

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
    this._form.addEventListener('submit', event => {
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
export const editProfileImgVadidation = new FormValidator(validationConfig, '.popup__form_edit_img');
editProfileImgVadidation.enableValidation();
