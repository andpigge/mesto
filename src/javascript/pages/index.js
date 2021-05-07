// CSS
import '../../pages/index.css';

import Card from '../components/Card.js';
import {createCardVadidation, editProfileVadidation, editProfileImgVadidation} from '../FormValidator.js';

// Отрисовка
import Section from '../components/Section.js';
import RenderLoading from '../utils/RenderLoading.js';

// import Popup from '../Popup.js';
import PopupWithImage from '../PopupWithImage.js';
import PopupWithForm from '../PopupWithForm.js';
import PopupRemoveCard from '../PopupRemoveCard'
import UserInfo from '../UserInfo.js';

import {infoPopupReviewImg, infoPopupEditProfile, infoPopupAddCard, infoPopupEditImg, infoPopupRemoveCard, editBtn, btnAddCard, btnEditProfile, apiServeMesto} from '../utils/constants.js';

import {token, cohortId} from '../utils/token.js';
import Api from '../components/Api.js';

import Storage from '../store/Storage.js';
const storage = new Storage();


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
    });
    console.log('лайк добавлен')
  } else {
    storage.deleteLike(idCard).then(data => {
      showCounterLikes(data.likes.length);
    });
    console.log('лайк удален')
  }
}

// Класс вывод и просмотр попапа с карточками внутри
const cardPlace = new Section({initialCards: storage.getCardsAndUserId(), renderer: (objItem, userId) => {
  const templateCardPlace = new Card(objItem, userId, '.place-list-template', deleteCardPlace, toggleLikes);

  templateCardPlace.showLikesLoading();

  templateCardPlace.showCounterLikes(objItem.likes.length);

  cardPlace.addItem(templateCardPlace.fillCardTemplate());

  setEventListeners(templateCardPlace._item);

}}, '.place__list', new RenderLoading('.place'));

cardPlace.renderItems();
// *

// Класс открытия попапа удаления карточки
const popupRemoveCard = new PopupRemoveCard('.popup_remove_card', infoPopupRemoveCard);
popupRemoveCard.setEventListeners();

// Колбек удаляет карточку при подтверждении
function deleteCardPlace(cardTemplate, idCard) {
  popupRemoveCard.setSubmitAction(() => {
    cardTemplate.remove();
    popupRemoveCard.close();

    storage.deleteCard(idCard);
  });
}

// Класс попапа просмотра картинки карточки
const popupWithImage =  new PopupWithImage('.popup_review_img', infoPopupReviewImg);
popupWithImage.setEventListeners();

// Устанавливает обработчики на карточку
function setEventListeners(cardTemplate) {
  const card = cardTemplate.querySelector('.card-place');
  const buttonDeleteCard = card.querySelector('.card-place__delete-btn');
  const imgCard = card.querySelector('.card-place__img');
  const titleCard = card.querySelector('.card-place__title');

  buttonDeleteCard.addEventListener('click', popupRemoveCard.open.bind(popupRemoveCard));

  imgCard.addEventListener('click', () => popupWithImage.open(titleCard.textContent, imgCard.src));
}

// Обрабатывает одну из форм попапа при событии submit. Посылает запрос на сервер, отрисовывает карточку при помощи класса Section. Класс RenderLoading добавляет прелоадер
function formSubmitHandlerAddCard({placeImg, placeName}) {

  const renderLoading = new RenderLoading('.button-popup_add_card');
  renderLoading.renderLoadingChangeText(true);

  storage.createCardAndGetUserId(placeName, placeImg).then(card => {
    const templateCardPlace = new Card(card[0], card[1], '.place-list-template', deleteCardPlace, toggleLikes);

    cardPlace.addItem(templateCardPlace.fillCardTemplate());

    setEventListeners(templateCardPlace._item);
  })
  .finally(() => {
    renderLoading.renderLoadingChangeText(false);
  })

  popupFormAddCard.close();
}

// Класс информация о пользователе
const userInfo = new UserInfo('.profile');
userInfo.setEventListener();

// Обрабатывает одну из форм попапа при событии submit. При помощи класса UserInfo картинку профиля
function formSubmitHandlerEditProfileImg({imgEdit}) {
  const renderLoading = new RenderLoading('.button-popup_edit_img');
  renderLoading.renderLoadingChangeText(true);

  storage.updateImgProfile(imgEdit).then(profile => {
    userInfo.updateProfileImg(profile.avatar);
  }).finally(() => {
    renderLoading.renderLoadingChangeText(false);
  });

  popupFormEditProfuleImg.close();
}

// Обрабатывает одну из форм попапа при событии submit. При помощи класса UserInfo редактирует профиль
function formSubmitHandlerEditProfile({profileDoes, profileName}) {
  const renderLoading = new RenderLoading('.button-popup_edit_profile');
  renderLoading.renderLoadingChangeText(true);

  storage.updateProfile(profileDoes, profileName).then(profile => {
    return userInfo.setUserInfo(profile.name, profile.does);
  }).finally(() => {
    renderLoading.renderLoadingChangeText(false);
  });

  popupFormEditProfule.close();
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

// Одна из функция которая открывает попап. Из профиля дынные о пользователе заносит в форму
function openPopupEditProfule(popup) {
  editProfileVadidation.resetValidation();

  const {nameValue, doesValue} = userInfo.getUserInfo();

  popupFormEditProfule.formFill(nameValue, doesValue);

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

// Загрузает из сервера данные о пользователе
function showProfile() {
  const renderLoading = new RenderLoading('.profile__img');
  renderLoading.renderLoadingChangeImg();

  storage.infoUser().then(profile => {
    userInfo.updateProfileImg(profile.avatar);
    userInfo.setUserInfo(profile.name, profile.does);
  });
}

showProfile();

export {api};
