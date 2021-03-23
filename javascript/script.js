const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input-text',
  submitButtonSelector: '.button-popup',
  inactiveButtonClass: 'button-popup_inactive',
  inputErrorClass: 'popup__form-input-text_type_error',
  errorClass: 'popup__error-message_active'
}

const popupConfig = {
  openPopup: '.popup_opened',
};

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Блок profile
const profile = document.querySelector('.profile');
// Кнопка редактировать данные из профиля
const editBtn = profile.querySelector('.profile__edit-btn');
// Данные из профиля
const titleName = profile.querySelector('.profile__title-name');
const subtitleDoes = profile.querySelector('.profile__subtitle-does');
/* Кнопка добавляет карточки с местами */
const btnAddCard = profile.querySelector('.profile__add-card-place');

/* Общий класс попапов */
const popupItems = document.querySelectorAll('.popup');

// Попап редактирования профиля
const popupEditProfile = document.querySelector('.popup_edit_profile');

// Попад добавления карточек
const popupAddCard = document.querySelector('.popup_add_card');

/* Попап просмотр картинки */
const popupShowImg = document.querySelector('.popup_review_img');
/* Картинка в попапе */
const imgPopup = popupShowImg.querySelector('.popup__img');
/* Текст в попапе */
const textPopupShowImg = popupShowImg.querySelector('.popup__img-text');

// Форма редактирует профиль
const formEditProfile = popupEditProfile.querySelector('.popup__form');
// Данные пользователя, из формы редактирования профиля
const inputEditName = formEditProfile.querySelector('.popup__form-input-text_value_name');
const inputEditDoes = formEditProfile.querySelector('.popup__form-input-text_value_does');

/* Форма создание карточек */
const formAddCard = popupAddCard.querySelector('.popup__form');
// Данные пользователя, из формы добавления карточки
const inputAddName = formAddCard.querySelector('.popup__form-input-text_value_name');
const inputAddSrcImg = formAddCard.querySelector('.popup__form-input-text_value_does');

/* Блок с сообщением об ошибке в попапе */
const blockMessageError = document.querySelectorAll('.popup__error-message');
/* Все поля в форме */
const allInputPopup = document.querySelectorAll('.popup__form-input-text');

/* Список карточек с местами */
const place = document.querySelector('.place');
const placeList = place.querySelector('.place__list');

/* Шаблон карточек с местами */
const placeListTemplate = document.querySelector('.place-list-template');


/* Добавляет класс открытия попапа, на переданный в параметрах попап */
function addPopup(popupType) {
  popupType.classList.add('popup_opened');
}

/* Принимает аргументом попап у которого нужно удалить класс */
function removePopup(popupItem) {
  popupItem.classList.remove('popup_opened');
  document.removeEventListener('keydown', listenerPopupKey);
}

/* Очищает форму. Первый параметр формы инпуты которые нужно очистить */
function clearFormInput(...inputs) {
  inputs.forEach(input => {
    input.value = '';
  });
}


/* Сохраняет данные из формы в блок профиля */
function editProfile() {
  titleName.textContent = inputEditName.value;
  subtitleDoes.textContent = inputEditDoes.value;
}

/* Сохраняет данные из блока профиля в форму  */
function editInputValue() {
  inputEditName.value = titleName.textContent;
  inputEditDoes.value = subtitleDoes.textContent;
}

/* Очищает текст в с ошибкой в попапе */
const clearTextFormMessage = () => {
  blockMessageError.forEach(block => {
    block.textContent = '';
    block.classList.remove(validationConfig.errorClass);
  });
}

/* Удаляет класс со всех инпутов */
const clearClassInputs = () => {
  allInputPopup.forEach(input => {
    input.classList.remove(validationConfig.inputErrorClass);
  });
}

/* Открытие попапа редактирования профиля */
function openPopupEditProfile() {
  clearTextFormMessage();
  clearClassInputs();

  document.addEventListener('keydown', listenerPopupKey);

  editInputValue();
  addPopup(popupEditProfile);
}

editBtn.addEventListener('click', openPopupEditProfile);

const checkClassPopup = (positionClick, event) => {
  const openPopup = document.querySelector(popupConfig.openPopup)

  /* Если кликнуть два раза произойдет событие клика во второй раз, так как попап еще не закрылся, поэтому проверяю если в переменной что-то есть, только тогда удаляю класс */
  if (event.target.classList.contains(positionClick) && openPopup) {
    removePopup(openPopup);
  }
};

/* Принимает атрибутом строку, место на которое кликает пользователь, чтобы закрыть попап */
const closePopupMouse = positionClick => {
  popupItems.forEach(item => {
    item.addEventListener('mousedown', event => checkClassPopup(positionClick, event));
  });
};

closePopupMouse('popup__btn');
closePopupMouse('popup');

function listenerPopupKey (event) {
  if (event.key === 'Escape') {
    const openPopup = document.querySelector(popupConfig.openPopup)
    removePopup(openPopup);
  }
};

/* Форма редактирования профиля */
function formSubmitHandlerEditProfile (event) {
  event.preventDefault();

  editProfile();

  const openPopup = document.querySelector(popupConfig.openPopup)
  removePopup(openPopup);
}

formEditProfile.addEventListener('submit', formSubmitHandlerEditProfile);


/* При загрузке страницы данные в карточки заносятся из массива */
showCards();

/* Клонирует элемент шаблона, и выводит в карточку с местами, данные из массива */
function showCards() {
  initialCards.forEach(item => {
    /* В переменную присваивается возвращаемое значение функции */
    const placeItem = createCard(item.name, item.link);

    /* Добавил события. Все события вешаются до того как DOM узлы будут добавлены в верстку */
    eventsAddEl(placeItem);

    /* Добавляется узел в верстку */
    placeList.append(placeItem);
  });
}

/* Создаст одну карточку с местами. Принимает в параметры имя карточки, и ссылку на картинку */
function createCard(nameCard, linkImg) {
  const placeItem = placeListTemplate.content.querySelector('.place__item').cloneNode('true');

  placeItem.querySelector('.card-place__title').textContent = nameCard;

  const imgNode = placeItem.querySelector('.card-place__img');

  imgNode.src = linkImg;
  imgNode.alt = nameCard;

  return placeItem;
}

/* Открытие попапа создания карточки */
function openPopupAddCard() {
  clearTextFormMessage();
  clearClassInputs();
  document.addEventListener('keydown', listenerPopupKey);
  addPopup(popupAddCard);
}

btnAddCard.addEventListener('click', openPopupAddCard);

/* Форма добавления карточки */
function formSubmitHandlerAddCard (event) {
  event.preventDefault();

  const inputAddNameValue = inputAddName.value;
  const inputAddSrcImgValue = inputAddSrcImg.value;

  /* Создал обьект с карточкой */
  const objCard = {name: inputAddNameValue, link: inputAddSrcImgValue};

  /* Добававил карточку в массив */
  initialCards.push(objCard);

  /* В переменную присваивается возвращаемое значение функции. Создаст одну карточку */
  const placeItem = createCard(inputAddNameValue, inputAddSrcImgValue);

  /* Добавил события. Все события вешаются до того как DOM узлы будут добавлены в верстку */
  eventsAddEl(placeItem);

  placeList.prepend(placeItem);

  clearFormInput(inputAddName, inputAddSrcImg);

  const openPopup = document.querySelector(popupConfig.openPopup)
  removePopup(openPopup);
}

formAddCard.addEventListener('submit', formSubmitHandlerAddCard);

/* Меняет класс в кнопке */
function likeCard(event) {
  event.target.classList.toggle('card-place__like-btn_active');
}

/* Удаляет карточку с верстки и с массива */
function deleteCard(event) {
  event.target.closest('.place__item').remove();
}

/* Попап просмотр картинки */
function showImg(event) {
  imgPopup.src = event.target.src;

  const titleCard = event.target.nextElementSibling.textContent;
  textPopupShowImg.textContent = titleCard;

  imgPopup.alt = titleCard;

  document.addEventListener('keydown', listenerPopupKey);
  addPopup(popupShowImg);
}

/* Вызывается до добавления DOM узла в верстку. Вызывает у найденных элементов события. Принимает элемент на который вешаются эти события */
function eventsAddEl(item) {
  /* Все события вешаются до того как DOM узлы будут добавлены в верстку */
  /* Удаляется карточка */
  item.querySelector('.card-place__delete-btn').addEventListener('click', deleteCard);
  /* Ставиться лайк */
  item.querySelector('.card-place__like-btn').addEventListener('click', likeCard);
  /* Просмотр картинок из карточки в модальном окне */
  item.querySelector('.card-place__img').addEventListener('click', showImg);
}


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
