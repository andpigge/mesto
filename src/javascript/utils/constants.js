// Блок profile
const profile = document.querySelector('.profile');
// Кнопка редактировать данные из профиля
const editBtn = profile.querySelector('.profile__edit-btn');
// Кнопка добавляет карточки с местами
const btnAddCard = profile.querySelector('.profile__add-card-place');
// Кнопка редактирования профиля
const btnEditProfile = profile.querySelector('.profile__edit-img');

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

  popupFormSelector: '.popup__form_delete_card',
  popupButtonDeleteSelector: '.button-popup_delete_card'
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

const selectorProfile = {
  nameSelector: '.profile__title-name',
  professionSelector: '.profile__subtitle-does',
  imgSelector: '.profile__img',
  containerImgSelector: '.profile__img-container',
  buttonEditImgSelector: '.profile__edit-img'
}

export {infoPopupReviewImg, infoPopupEditProfile, infoPopupAddCard, infoPopupEditImg, infoPopupRemoveCard, validationConfig, editBtn, btnAddCard, btnEditProfile, apiServeMesto, selectorProfile};
