/* Принимает аргументы: форму, поле, сообщение ошибки, класс для ошибки в поле, класс который покажет блок с ошибкой */
const showErrorFields = (formItem, fieldItem, messageError, inputErrorClass, errorClass) => {
  const blockMessage = formItem.querySelector(`.${fieldItem.id}-error`);

  fieldItem.classList.add(inputErrorClass);
  blockMessage.textContent = messageError;
  blockMessage.classList.add(errorClass);
};

/* Принимает аргументы: форму, поле, класс для ошибки в поле, класс который покажет блок с ошибкой */
const hideErrorFields = (formItem, fieldItem, inputErrorClass, errorClass) => {
  const blockMessage = formItem.querySelector(`.${fieldItem.id}-error`);

  fieldItem.classList.remove(inputErrorClass);
  blockMessage.textContent = '';
  blockMessage.classList.remove(errorClass);
};

/* Принимает аргументы: форму, поле, класс для ошибки в поле, класс который покажет блок с ошибкой */
const switchValidationField = (form, field, inputErrorClass, errorClass) => {
  if (!field.validity.valid) {
    showErrorFields(form, field, field.validationMessage, inputErrorClass, errorClass);
  } else {
    hideErrorFields(form, field, inputErrorClass, errorClass);
  }
};

/* Если поле невалидно вернет true */
const checkValidationFieldList = (fieldList) => {
  return fieldList.some(field => !field.validity.valid);
};

/* Принимает аргументы: все поля в форме, кнопку отправки формы, класс для неактивной кнопки */
const toggleStateButton = (fieldList, buttonFormSubmit, inactiveButtonClass) => {
  const invalidTrue = checkValidationFieldList(fieldList);

  if (invalidTrue) {
    buttonFormSubmit.classList.add(inactiveButtonClass);
    buttonFormSubmit.disabled = true;
  } else {
    buttonFormSubmit.classList.remove(inactiveButtonClass);
    buttonFormSubmit.disabled = false;
  }
};

/* Принимает аргументы: одну форму, весь обьект args */
const setListenerFieldList = (formItem, {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
  const fieldList = Array.from(formItem.querySelectorAll(inputSelector));
  const buttonFormSubmit = formItem.querySelector(submitButtonSelector);

  toggleStateButton(fieldList, buttonFormSubmit, inactiveButtonClass);

  fieldList.forEach(field => {
    switchValidationField(formItem, field, inputErrorClass, errorClass);

    formItem.addEventListener('input', event => {
      toggleStateButton(fieldList, buttonFormSubmit, inactiveButtonClass);
      switchValidationField(formItem, field, inputErrorClass, errorClass);
    });
  });
}

/* Оператор spread вытащит все элементы из обьекта */
const enableValidation = ({formSelector, ...args}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach(formItem => {
    formItem.addEventListener('submit', event => {
      event.preventDefault();
    });

    setListenerFieldList(formItem, args);
  });
}

/* Принимает на вход 6 аргументов. Форму для валидации, текстовые поля, кнопку отправки формы, класс неактивной кнопки, класс подсвечивания ошибки в поле, класс показать сообщения об ошибке */
/* Аргументы у форм, классы одинаковые, поэтому повторно функцию вызывать не нужно */
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input-text',
  submitButtonSelector: '.button-popup',
  inactiveButtonClass: 'button-popup_inactive',
  inputErrorClass: 'popup__form-input-text_type_error',
  errorClass: 'popup__error-message_active'
});
