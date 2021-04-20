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

// Блок profile
const profile = document.querySelector('.profile');
// Кнопка редактировать данные из профиля
const editBtn = profile.querySelector('.profile__edit-btn');
/* Кнопка добавляет карточки с местами */
const btnAddCard = profile.querySelector('.profile__add-card-place');

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

const infoPopupReviewImg = {
  // Селекторы для Popup
  // namePopupSelector: '.popup_review_img',
  showPopup: 'popup_opened',
  buttonCloseSelector: '.popup__btn',

  // Селекторы для попапа просмотра картинок
  popupImg: '.popup__img',
  popupImgText: '.popup__img-text',
};

const infoPopupEditProfile = {
  // namePopup: '.popup_review_img',
  showPopup: 'popup_opened',
  buttonCloseSelector: '.popup__btn',

  popupFormSelector: '.popup__form_edit_profile',
  popupFormfieldNameSelector: '.popup__form-input-text_value_name',
  popupFormfieldDoesSelector: '.popup__form-input-text_value_does',
};

const infoPopupAddCard = {
  // namePopup: '.popup_review_img',
  showPopup: 'popup_opened',
  buttonCloseSelector: '.popup__btn',

  popupFormSelector: '.popup__form_create_card',
  popupFormfieldNameSelector: '.popup__form-place-name-input',
  popupFormfieldDoesSelector: '.popup__form-place-img-input',
};

const selectorInfoUser = {
  nameProfileSelector: '.profile__about',
  nameSelector: '.profile__title-name',
  doesInfoSelector: '.profile__subtitle-does',
};

/* Для каждой формы validationConfig свой, можно вынести в отдельный файл, если обьектов станет много */
/* Сразу обрабатывать обьект удобнее, чем по отдельности указывать селектор формы */
const validationConfig = {
  inputSelector: '.popup__form-input-text',
  submitButtonSelector: '.button-popup',
  inactiveButtonClass: 'button-popup_inactive',
  inputErrorClass: 'popup__form-input-text_type_error',
  errorClass: 'popup__error-message_active'
}

export {initialCards, infoTemplatePlace, infoPopupReviewImg, infoPopupEditProfile, infoPopupAddCard, selectorInfoUser, validationConfig, editBtn, btnAddCard};
