// CSS
import '../../pages/index.css';

import Card from '../components/Card.js';
import {createCardVadidation, editProfileVadidation, editProfileImgVadidation} from '../FormValidator.js';

// Отрисовка
import Section from '../components/Section.js';

// import Popup from '../Popup.js';
import PopupWithImage from '../PopupWithImage.js';
import PopupWithForm from '../PopupWithForm.js';
import PopupRemoveCard from '../PopupRemoveCard'
import UserInfo from '../UserInfo.js';

import {infoPopupReviewImg, infoPopupEditProfile, infoPopupAddCard, infoPopupEditImg, infoPopupRemoveCard, selectorInfoUser, editBtn, btnAddCard, infoTemplatePlace, apiServeMesto} from '../utils/constants.js';

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

const popupWithImage =  new PopupWithImage('.popup_review_img', infoPopupReviewImg);
popupWithImage.setEventListeners();

// Класс вывод и просмотр попапа с карточками внутри
const cardPlace = new Section({initialCards: storage.getCardsAndUserId(), renderer: (objItem, userId) => {
  const templateCardPlace = new Card(objItem, userId, infoTemplatePlace, deleteCardPlace, toggleLikes, checkLikeCard);

  cardPlace.addItem(templateCardPlace.fillCardTemplate());

  setEventListeners(templateCardPlace.cardTemplate);

  cardPlace.showCountLikes(templateCardPlace.cardTemplate, objItem.likes);

}}, '.place__list', '.card-place__counter');

cardPlace.renderItems();
// *


//
const popupRemoveCard = new PopupRemoveCard('.popup_remove_card', infoPopupRemoveCard);
popupRemoveCard.setEventListeners();

function deleteCardPlace(cardTemplate, idCard) {
  popupRemoveCard.setSubmitAction(() => {
    cardTemplate.remove();
    popupRemoveCard.close();

    storage.deleteCard(idCard);
  });
}

function addLikeCard(btn) {
  btn.classList.add('card-place__like-btn_active');
}

function removeLikeCard(btn) {
  btn.classList.remove('card-place__like-btn_active');
}

function checkLikeCard(userObj, userId) {
  if (userObj.likes) {
    return userObj.likes.some(dataUser => dataUser._id === userId);
  }
}

function toggleLikes(card, objInitialCards, userId) {
  const likeBtn = card.querySelector('.card-place__like-btn');

  storage.initialCards().then(data => {
    // Находим все лайки на странице, так как запрос get получения информации о лайке не работает, а PUT сразу записывает на сервер лайк. Находим карточку с лайками которая нужна, заносим в переменную.
    const compare = data.filter(card => card.idCard === objInitialCards.idCard);

    // Ищу лайкал ли я эту карточку
    // compare возвращает массив из одного обьекта, быть больше обьектов там не может
    // const myLike = compare[0].likes.some(dataUser => dataUser._id === userId);
    const myLike = checkLikeCard(compare[0], userId)

    // Если не лайкал, лайкаю.
    if (!myLike) {
      storage.likeCard(objInitialCards.idCard).then(data => {
        cardPlace.showCountLikes(card, data.likes);
        addLikeCard(likeBtn);
      });
      console.log('лайк добавлен')
    } else {
      storage.deleteLike(objInitialCards.idCard).then(data => {
        cardPlace.showCountLikes(card, data.likes);
        removeLikeCard(likeBtn);
      });
      console.log('лайк удален')
    }
  });
}

function setEventListeners(cardTemplate) {
  const card = cardTemplate.querySelector('.card-place');
  const buttonDeleteCard = card.querySelector('.card-place__delete-btn');
  const imgCard = card.querySelector('.card-place__img');
  const titleCard = card.querySelector('.card-place__title');

  buttonDeleteCard.addEventListener('click', popupRemoveCard.open.bind(popupRemoveCard));

  imgCard.addEventListener('click', () => popupWithImage.open(titleCard.textContent, imgCard.src));
}
//



// Классы попапов с формой
const popupFormAddCard = new PopupWithForm('.popup_add_card', infoPopupAddCard, formSubmitHandlerAddCard);
popupFormAddCard.setEventListeners();

const popupFormEditProfule = new PopupWithForm('.popup_edit_profile', infoPopupEditProfile, formSubmitHandlerEditProfile);
popupFormEditProfule.setEventListeners();

const popupFormEditProfuleImg = new PopupWithForm('.popup_edit_profile-img', infoPopupEditImg, formSubmitHandlerEditProfileImg);
popupFormEditProfuleImg.setEventListeners();

function openPopupAddCard(popup) {
  createCardVadidation.resetValidation();

  popup.open();
}

function openPopupEditImgProfile(popup) {
  editProfileImgVadidation.resetValidation();

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
document.querySelector('.profile__edit-img').addEventListener('click', () => openPopupEditImgProfile(popupFormEditProfuleImg))

function formSubmitHandlerAddCard({placeImg, placeName}) {

  storage.createCardAndGetUserId(placeName, placeImg).then(card => {
    const templateCardPlace = new Card(card[0], card[1], infoTemplatePlace, deleteCardPlace, toggleLikes, checkLikeCard);

    cardPlace.addItem(templateCardPlace.fillCardTemplate());

    setEventListeners(templateCardPlace.cardTemplate);
  });

  popupFormAddCard.close();
}
// *

function formSubmitHandlerEditProfileImg() {
  console.log(1)
}

// Класс информация о пользователе
const userInfo = new UserInfo(selectorInfoUser);

function formSubmitHandlerEditProfile({profileDoes, profileName}) {
  storage.updateProfile(profileDoes, profileName).then(data => {
    return userInfo.setUserInfo(data.does, data.name);
  });

  popupFormEditProfule.close();
}
// *

storage.infoUser().then(user => {
  const {does, name} = user;
  userInfo.setUserInfo(does, name);
});

export {api};
