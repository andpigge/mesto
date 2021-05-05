// const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Коломна',
//     link: 'https://images.unsplash.com/photo-1574580514971-662e3ef49eff?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80'
//   }
// ];

// Блок profile
const profile = document.querySelector('.profile');
// Кнопка редактировать данные из профиля
const editBtn = profile.querySelector('.profile__edit-btn');
/* Кнопка добавляет карточки с местами */
const btnAddCard = profile.querySelector('.profile__add-card-place');

/* Этот обьект для каждого шаблона свой */
const infoTemplatePlace = {
  nameSelector: '.place-list-template',
  cardItemSelector: '.place__item',
  cardTitleSelector: '.card-place__title',
  cardImgSelector: '.card-place__img',
  buttonDeleteCardSelector: '.card-place__delete-btn',
  buttonLikeCardSelector: '.card-place__like-btn',
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
  popupFormfieldsSelector: '.popup__form-input',

  popupFormfieldNameSelector: '.popup__form-input_value_name',
  popupFormfieldDoesSelector: '.popup__form-input_value_does',
};

const infoPopupAddCard = {
  // namePopup: '.popup_review_img',
  showPopup: 'popup_opened',
  buttonCloseSelector: '.popup__btn',

  popupFormSelector: '.popup__form_create_card',
  popupFormfieldsSelector: '.popup__form-input',
};

const infoPopupEditImg = {
  showPopup: 'popup_opened',
  buttonCloseSelector: '.popup__btn',

  popupFormSelector: '.popup__form_edit_img',
  popupFormfieldsSelector: '.popup__form-input'
}

const infoPopupRemoveCard = {
  showPopup: 'popup_opened',
  buttonCloseSelector: '.popup__btn',

  popupButtonDeleteSelector: '.button-popup_delete_card'
};

const selectorInfoUser = {
  profileSelector: '.profile__about',
  nameSelector: '.profile__title-name',
  doesInfoSelector: '.profile__subtitle-does',
};

/* Для каждой формы validationConfig свой, можно вынести в отдельный файл, если обьектов станет много */
/* Сразу обрабатывать обьект удобнее, чем по отдельности указывать селектор формы */
const validationConfig = {
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.button-popup',
  inactiveButtonClass: 'button-popup_inactive',
  inputErrorClass: 'popup__form-input-text_type_error',
  errorClass: 'popup__error-message_active'
}

// Для каждого отдельного сервера, свой apiServe обьект
const apiServeMesto = {
  CONECT_SERVER: 'https://mesto.nomoreparties.co/v1',
  PATHS: {
    user: 'users/me',
    cards: 'cards',
    cardLikes: 'cards/likes'
  }
};

export {infoTemplatePlace, infoPopupReviewImg, infoPopupEditProfile, infoPopupAddCard, infoPopupEditImg, infoPopupRemoveCard, selectorInfoUser, validationConfig, editBtn, btnAddCard, apiServeMesto};
