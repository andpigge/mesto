// CSS
import './index.css';

import Card from '../javascript/components/Card.js';
import {createCardVadidation, editProfileVadidation, editProfileImgVadidation} from '../javascript/components/FormValidator';

// Отрисовка
import Section from '../javascript/components/Section.js';
import RenderLoading from '../javascript/utils/RenderLoading.js';

// import Popup from '../Popup.js';
import PopupWithImage from '../javascript/components/PopupWithImage.js';
import PopupWithForm from '../javascript/components/PopupWithForm.js';
import PopupRemoveCard from '../javascript/components/PopupRemoveCard'
import UserInfo from '../javascript/components/UserInfo.js';

import {infoPopupReviewImg, infoPopupEditProfile, infoPopupAddCard, infoPopupEditImg, infoPopupRemoveCard, editBtn, btnAddCard, btnEditProfile, apiServeMesto, selectorProfile} from '../javascript/utils/constants.js';

import {token, cohortId} from '../javascript/utils/token.js';
import Api from '../javascript/components/Api.js';

import Storage from '../javascript/store/Storage.js';
const storage = new Storage();

let userId;

const api = new Api({
  baseUrl: `${apiServeMesto.CONECT_SERVER}/${cohortId}`,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  },
  paths: apiServeMesto.PATHS
});

// Запрашивает данные с сервера. Вызывает метод showCounterLikes из класса card как колбек функция
function toggleLikes(myLike, idCard, showCounterLikes) {
  if (myLike) {
    storage.likeCard(idCard).then(data => {
      showCounterLikes(data.likes.length);
    })
    .catch(err => {
      console.error(err);
    });
  } else {
    storage.deleteLike(idCard).then(data => {
      showCounterLikes(data.likes.length);
    })
    .catch(err => {
      console.error(err);
      // throw new Error(err); остановит приложение с ошибкой
    });
  }
}

// Класс попапа просмотра картинки карточки
const popupWithImage =  new PopupWithImage('.popup_review_img', infoPopupReviewImg);
popupWithImage.setEventListeners();

function createCard(objItem) {
  return new Card(objItem, userId, '.place-list-template', deleteCardPlace, toggleLikes, popupRemoveCard.open.bind(popupRemoveCard), popupWithImage.open.bind(popupWithImage));
}

function renderLoading(selector) {
  return new RenderLoading(selector);
}

// Класс вывод и просмотр попапа с карточками внутри
const cardPlace = new Section({/* dataCards: dataCards,  */renderer: objItem => {
  const templateCardPlace = createCard(objItem);

  templateCardPlace.showLikesLoading();

  templateCardPlace.showCounterLikes(objItem.likes.length);

  cardPlace.addItem(templateCardPlace.fillCardTemplate());
}}, '.place__list');

// cardPlace.renderItems();
// *

// Класс открытия попапа удаления карточки
const popupRemoveCard = new PopupRemoveCard('.popup_remove_card', infoPopupRemoveCard);
popupRemoveCard.setEventListeners();

const renderLoadingButtonDeleteCard = renderLoading('.button-popup_delete_card');

// Колбек удаляет карточку при подтверждении
function deleteCardPlace(cardTemplate, idCard) {
  popupRemoveCard.setSubmitAction(() => {
    renderLoadingButtonDeleteCard.renderLoadingChangeText(true);

    storage.deleteCard(idCard).then(data => {
      cardTemplate.remove();
      popupRemoveCard.close();
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      renderLoadingButtonDeleteCard.renderLoadingChangeText(false);
    })
  });
}

// Устанавливает обработчики на карточку
/* function setEventListeners(cardTemplate) {
  const card = cardTemplate.querySelector('.card-place');
  const buttonDeleteCard = card.querySelector('.card-place__delete-btn');
  const imgCard = card.querySelector('.card-place__img');
  const titleCard = card.querySelector('.card-place__title');

  buttonDeleteCard.addEventListener('click', popupRemoveCard.open.bind(popupRemoveCard));

  imgCard.addEventListener('click', () => popupWithImage.open(titleCard.textContent, imgCard.src));
} */

const renderLoadingPopupButtonAddCard = renderLoading('.button-popup_add_card');

// Обрабатывает одну из форм попапа при событии submit. Посылает запрос на сервер, отрисовывает карточку при помощи класса Section. Класс RenderLoading добавляет прелоадер
function formSubmitHandlerAddCard({placeImg, placeName}) {

  renderLoadingPopupButtonAddCard.renderLoadingChangeText(true);

  storage.createCard(placeName, placeImg).then(card => {
    const templateCardPlace = createCard(card);

    cardPlace.addItem(templateCardPlace.fillCardTemplate());

    popupFormAddCard.close();
  })
  .catch(err => {
    console.error(err);
  })
  .finally(() => {
    renderLoadingPopupButtonAddCard.renderLoadingChangeText(false);
  })
}

// Класс информация о пользователе
const userInfo = new UserInfo('.profile', selectorProfile);

const renderLoadingPopupButtonEditProfileImg = renderLoading('.button-popup_edit_img');

// Обрабатывает одну из форм попапа при событии submit. При помощи класса UserInfo картинку профиля
function formSubmitHandlerEditProfileImg({imgEdit}) {
  renderLoadingPopupButtonEditProfileImg.renderLoadingChangeText(true);

  storage.updateImgProfile(imgEdit).then(profile => {
    userInfo.updateProfileImg(profile.avatar);
    popupFormEditProfuleImg.close();
  })
  .catch(err => {
    console.error(err);
  })
  .finally(() => {
    renderLoadingPopupButtonEditProfileImg.renderLoadingChangeText(false);
  });
}

const renderLoadingPopupButtonEditProfile = renderLoading('.button-popup_edit_profile');

// Обрабатывает одну из форм попапа при событии submit. При помощи класса UserInfo редактирует профиль
function formSubmitHandlerEditProfile({profileDoes, profileName}) {
  renderLoadingPopupButtonEditProfile.renderLoadingChangeText(true);

  storage.updateProfile(profileDoes, profileName).then(profile => {
    popupFormEditProfule.close();
    userInfo.setUserInfo(profile.name, profile.does);
  })
  .catch(err => {
    console.error(err);
  })
  .finally(() => {
    renderLoadingPopupButtonEditProfile.renderLoadingChangeText(false);
  });
}

// * Классы попапов с формой
const popupFormAddCard = new PopupWithForm('.popup_add_card', infoPopupAddCard, formSubmitHandlerAddCard);
popupFormAddCard.setEventListeners();

const popupFormEditProfule = new PopupWithForm('.popup_edit_profile', infoPopupEditProfile, formSubmitHandlerEditProfile);
popupFormEditProfule.setEventListeners();

const popupFormEditProfuleImg = new PopupWithForm('.popup_edit_img', infoPopupEditImg, formSubmitHandlerEditProfileImg);
popupFormEditProfuleImg.setEventListeners();
// *

// Одна из функция которая открывает попап. Сбрасывает при этом форму
function openPopupAddCard(popup) {
  createCardVadidation.resetValidation();
  popup.open();
}

function formFill(nameValue, doesValue) {
  popupFormEditProfule.form.querySelector(popupFormEditProfule.objInfo.popupFormfieldNameSelector).value = nameValue;
  popupFormEditProfule.form.querySelector(popupFormEditProfule.objInfo.popupFormfieldDoesSelector).value = doesValue;
}

// Одна из функция которая открывает попап. Из профиля дынные о пользователе заносит в форму
function openPopupEditProfule(popup) {
  editProfileVadidation.resetValidation();

  const {nameValue, doesValue} = userInfo.getUserInfo();

  formFill(nameValue, doesValue);

  popup.open();
}

// Одна из функция которая открывает попап. Сбрасывает при этом форму
function openPopupEditImgProfile(popup) {
  editProfileImgVadidation.resetValidation();

  popup.open();
}

// Слушатели событий для попапов. Открытие попапов и валидация
btnAddCard.addEventListener('click', () => openPopupAddCard(popupFormAddCard));
editBtn.addEventListener('click', () => openPopupEditProfule(popupFormEditProfule));
btnEditProfile.addEventListener('click', () => openPopupEditImgProfile(popupFormEditProfuleImg))

const renderLoadingProfileImg = renderLoading('.profile__img');
const renderLoadingPlace = renderLoading('.place');


// Загрузает из сервера данные о пользователе
function showProfile() {
  renderLoadingProfileImg.renderLoadingChangeImg();
  renderLoadingPlace.renderLoading(true);

  // Круто
  Promise.all( [storage.getCards(), storage.getUser()] )
  .then(([cards, userData]) => {
    userId = userData.userId;

    cardPlace.renderItems(cards);

    userInfo.updateProfileImg(userData.avatar);
    userInfo.setUserInfo(userData.name, userData.profession);
  })
  .catch(err => {
    console.error(err);
  })
  .finally(() => {
    renderLoadingPlace.renderLoading(false);
  });
}

showProfile();

export {api};
