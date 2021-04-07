import Card from './Card.js';
import {createCardVadidation, editProfileVadidation} from './FormValidator.js';

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
    name: 'Коломна',
    link: 'https://images.unsplash.com/photo-1574580514971-662e3ef49eff?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80'
  }
];

/* Возможно понадобиться в будущем */
// const infoPopup = {
//   namePopup: '.popup_review_img',
//   showPopup: 'popup_opened',
//   buttonClose: 'popup__btn',
//   popupImg: '.popup__img',
//   popupImgText: '.popup__img-text',
// };

/* Этот обьект для каждого шаблона свой */
const infoTemplatePlace = {
  name: '.place-list-template',
  cardItem: '.place__item',
  cardTitle: '.card-place__title',
  cardImg: '.card-place__img',
  buttonDeleteCard: 'card-place__delete-btn',
  buttonLikeCard: 'card-place__like-btn',
  buttonLikeCardActive: 'card-place__like-btn_active',
};

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

// Попап добавления карточек
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

/* Список карточек с местами */
const place = document.querySelector('.place');
const placeList = place.querySelector('.place__list');

export function handleCardClick(name, link) {
  imgPopup.src = link;
  imgPopup.alt = name;
  textPopupShowImg.textContent = name;

  addPopup(popupShowImg);
}

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

function clearFormInput(form) {
  form.reset();
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

/* Открытие попапа редактирования профиля */
function openPopupEditProfile() {
  editInputValue();
  editProfileVadidation.resetValidation();
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

/* При загрузке страницы данные в карточки заносятся из массива */
showCards(initialCards, placeList);

/* Клонирует элемент шаблона, и выводит в карточку с местами, данные из массива */
function showCards(arrCardList, container) {
  arrCardList.forEach(item => {
    /* В переменную присваивается возвращаемое значение функции */
    const placeItem = createCard(item.name, item.link);

    /* Добавляется узел в верстку */
    container.append(placeItem);
  });
}

/* Создаст одну карточку с местами. Принимает в параметры имя карточки, и ссылку на картинку */
function createCard(name, link) {
  const initialCards = { name, link };

  const cardPlace = new Card(initialCards, infoTemplatePlace, handleCardClick);

  return cardPlace.fillCardTemplate();
}

/* Открытие попапа создания карточки */
function openPopupAddCard() {
  createCardVadidation.resetValidation();

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

  placeList.prepend(placeItem);

  removePopup(popupAddCard);

  clearFormInput(formAddCard);
}

formAddCard.addEventListener('submit', formSubmitHandlerAddCard);
