// CSS
import '../../pages/index.css';

import Card from '../components/Card.js';
import {createCardVadidation, editProfileVadidation} from '../FormValidator.js';

// Отрисовка
import Section from '../components/Section.js';

// import Popup from '../Popup.js';
import PopupWithImage from '../PopupWithImage.js';
import PopupWithForm from '../PopupWithForm.js';
import UserInfo from '../UserInfo.js';

import {initialCards, infoPopupReviewImg, infoPopupEditProfile, infoPopupAddCard, selectorInfoUser, editBtn, btnAddCard, infoTemplatePlace} from '../utils/constants.js';


// Класс вывод и просмотр попапа с карточками внутри
const cardPlace = new Section({initialCards, renderer: objItem => {
  const templateCardPlace = new Card(objItem, infoTemplatePlace, handleCardClick);
  cardPlace.addItem(templateCardPlace.fillCardTemplate());
}}, '.place__list');

cardPlace.renderItems();

const popupWithImage =  new PopupWithImage('.popup_review_img', infoPopupReviewImg);
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}
// *

// Классы попапов с формой
const popupFormAddCard = new PopupWithForm('.popup_add_card', infoPopupAddCard, formSubmitHandlerAddCard);
popupFormAddCard.setEventListeners();

const popupFormEditProfule = new PopupWithForm('.popup_edit_profile', infoPopupEditProfile, formSubmitHandlerEditProfile);
popupFormEditProfule.setEventListeners();

function openPopupAddCard(popup) {
  createCardVadidation.resetValidation();

  popup.open();
}

function openPopupEditProfule(popup) {
  editProfileVadidation.resetValidation();

  const {nameSelectorText, doesInfoSelectorText} = userInfo.getUserInfo();

  popupFormEditProfule.formFill(nameSelectorText, doesInfoSelectorText);

  popup.open();
}

// Слушатели событий для попапов. Открытие попапов и валидация
btnAddCard.addEventListener('click', () => openPopupAddCard(popupFormAddCard));
editBtn.addEventListener('click', () => openPopupEditProfule(popupFormEditProfule));

function formSubmitHandlerAddCard({placeImg, placeName}) {
  const templateCardPlace = new Card({name: placeName, link: placeImg}, infoTemplatePlace, handleCardClick);

  cardPlace.addItem(templateCardPlace.fillCardTemplate());

  popupFormAddCard.close();
}
// *


// Класс информация о пользователе
const userInfo = new UserInfo(selectorInfoUser);

function formSubmitHandlerEditProfile(formValues) {
  userInfo.setUserInfo(formValues);

  popupFormEditProfule.close();
}
// *
