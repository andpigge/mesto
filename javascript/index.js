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


const listenerPopupKey = event => {
  if (event.key === 'Escape') {
    const openPopup = document.querySelector(popupConfig.openPopup)
    removePopup(openPopup);
  }
};

/* Добавляет класс открытия попапа, на переданный в параметрах попап */
function addPopup(popupType) {
  popupType.classList.add('popup_opened');
  document.addEventListener('keydown', listenerPopupKey);
}

/* Принимает аргументом попап у которого нужно удалить класс */
/* Функция манипулирует с кнопкой у попапа, относиться к валидации, но переноситься не может */
function removePopup(popupItem) {
  popupItem.classList.remove('popup_opened');
  document.removeEventListener('keydown', listenerPopupKey);
}

/* Скрывает кнопку при очистке полей. Т.к поля очищаются, нужно при этом скрывать кнопку */
/* Функция манипулирует с кнопкой у попапа, относиться к валидации, но переноситься не может */
const hideButtonForm = form => {
  const buttonFormSubmit = form.querySelector(validationConfig.submitButtonSelector);
  buttonFormSubmit.classList.add(validationConfig.inactiveButtonClass);
  buttonFormSubmit.disabled = true;
}

/* Показывает кнопку при добавлении в форму текста. Т.к текст в полях уже есть, кнопку надо показывать */
const showButtonForm = form => {
  const buttonFormSubmit = form.querySelector(validationConfig.submitButtonSelector);
  buttonFormSubmit.classList.remove(validationConfig.inactiveButtonClass);
  buttonFormSubmit.disabled = false;
}

function clearFormInput(form) {
  form.reset();
  hideButtonForm(form);
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

  /* При добавлении в поля текста, кнопку при этом нужно показывать */
  showButtonForm(formEditProfile);
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

/* Форма редактирования профиля */
function formSubmitHandlerEditProfile (event) {
  event.preventDefault();

  editProfile();

  removePopup(popupEditProfile);
}

formEditProfile.addEventListener('submit', formSubmitHandlerEditProfile);

/* Создаст одну карточку с местами. Принимает в параметры имя карточки, и ссылку на картинку */
function createCard(nameCard, linkImg) {
  const placeItem = placeListTemplate.content.querySelector('.place__item').cloneNode('true');

  placeItem.querySelector('.card-place__title').textContent = nameCard;

  const imgNode = placeItem.querySelector('.card-place__img');

  imgNode.src = linkImg;
  imgNode.alt = nameCard;

  /* Добавил события. Все события вешаются до того как DOM узлы будут добавлены в верстку. События вешаются при создании DOM узлов */
  eventsAddEl(placeItem);

  return placeItem;
}

/* Открытие попапа создания карточки */
function openPopupAddCard() {
  clearTextFormMessage();
  clearClassInputs();
  addPopup(popupAddCard);
}

btnAddCard.addEventListener('click', openPopupAddCard);

/* Форма добавления карточки */
function formSubmitHandlerAddCard (event) {
  event.preventDefault();

  const inputAddNameValue = inputAddName.value;
  const inputAddSrcImgValue = inputAddSrcImg.value;

  /* В переменную присваивается возвращаемое значение функции. Создаст одну карточку */
  const placeItem = createCard(inputAddNameValue, inputAddSrcImgValue);

  /* Добавил события. Все события вешаются до того как DOM узлы будут добавлены в верстку */
  eventsAddEl(placeItem);

  placeList.prepend(placeItem);

  clearFormInput(formAddCard);

  removePopup(popupAddCard);
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
