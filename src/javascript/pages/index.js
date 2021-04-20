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

import {initialCards, infoPopupReviewImg, infoPopupEditProfile, infoPopupAddCard, selectorInfoUser, editBtn, btnAddCard} from '../utils/constants.js';


// Класс вывод и просмотр попапа с карточками внутри
const cardPlace = new Section({initialCards, renderer: objItem => {
  const templateCardPlace = new Card(objItem, handleCardClick);
  cardPlace.addItem(templateCardPlace.fillCardTemplate());
}}, '.place__list');

cardPlace.renderItems();

function handleCardClick(name, link) {
  const popupWithImage =  new PopupWithImage('.popup_review_img', infoPopupReviewImg);
  popupWithImage.setEventListeners();
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

function formSubmitHandlerAddCard(event, nameValueForm, doesValueForm) {
  event.preventDefault();

  const templateCardPlace = new Card({name: nameValueForm, link: doesValueForm}, handleCardClick);

  cardPlace.addItem(templateCardPlace.fillCardTemplate());

  popupFormAddCard.close();
}
// *


// Класс информация о пользователе
const userInfo = new UserInfo(selectorInfoUser);

function formSubmitHandlerEditProfile(event, nameValueForm, doesValueForm) {
  event.preventDefault();

  userInfo.setUserInfo({nameValueForm, doesValueForm});

  popupFormEditProfule.close();
}
// *


// Эта куча кода отвечает за клик по свободной области, для закрытия попапов. В ТЗ этот пункт не прописан, поэтому код пока оставил.
// /* Общий класс попапов */
// const popupItems = document.querySelectorAll('.popup');

// const popupConfig = {
//   openPopup: '.popup_opened',
// };

// const listenerPopupKey = event => {
//   if (event.key === 'Escape') {
//     const openPopup = document.querySelector(popupConfig.openPopup)
//     removePopup(openPopup);
//   }
// };

// /* Принимает аргументом попап у которого нужно удалить класс */
// /* Функция манипулирует с кнопкой у попапа, относиться к валидации, но переноситься не может */
// function removePopup(popupItem) {
//   popupItem.classList.remove('popup_opened');
//   document.removeEventListener('keydown', listenerPopupKey);
// }

// const checkClassPopup = (positionClick, event) => {
//   const openPopup = document.querySelector(popupConfig.openPopup)

//   /* Если кликнуть два раза произойдет событие клика во второй раз, так как попап еще не закрылся, поэтому проверяю если в переменной что-то есть, только тогда удаляю класс */
//   if (event.target.classList.contains(positionClick) && openPopup) {
//     removePopup(openPopup);
//   }
// };


// /* Принимает атрибутом строку, место на которое кликает пользователь, чтобы закрыть попап */
// const closePopupMouse = positionClick => {
//   popupItems.forEach(item => {
//     item.addEventListener('mousedown', event => checkClassPopup(positionClick, event));
//   });
// };

// closePopupMouse('popup');
