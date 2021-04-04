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

class Card {
  constructor(objInitialCards, {name, ...objInfoTemplate}) {
    this._template = name;
    this._objInitialCards = objInitialCards;
    this._objInfoTemplate = objInfoTemplate;
    /* Это свойство _infoPopup у каждого попапа будет свое, оно не будет создаваться в родительском классе */
    this._infoPopup = {
      namePopup: '.popup_review_img',
      showPopup: 'popup_opened',
      buttonClose: 'popup__btn',
      popupImg: '.popup__img',
      popupImgText: '.popup__img-text',
      isOpen: null,
    };
  }

  _addClassPopup() {
    document.querySelector(this._infoPopup.namePopup).classList.add(this._infoPopup.showPopup)
    this._infoPopup.isOpen = true;
    document.addEventListener('keydown', () => this._closePopupKey(event, 'Escape'));
  }

  _removeClassPopup() {
    document.querySelector(this._infoPopup.namePopup).classList.remove(this._infoPopup.showPopup);
    this._infoPopup.isOpen = false;
    document.removeEventListener('keydown', () => this._closePopupKey(event, 'Escape'));
  }

  /* Этот метод исключительно для попапа просмотра картинки */
  _fillPopupImg() {
    const popup = document.querySelector(this._infoPopup.namePopup);
    const popupImg = popup.querySelector(this._infoPopup.popupImg);

    popupImg.src = this._objInitialCards.link;
    popupImg.alt = this._objInitialCards.name;
    popup.querySelector(this._infoPopup.popupImgText).textContent = this._objInitialCards.name;
  }

  _closePopupKey(event, key) {
    if (this._infoPopup.isOpen && event.key === key) {
      this._removeClassPopup();
    }
  }

  _eventListenerPopup({target}) {
    /* Делегирование событий */
    if (target.classList.contains(this._infoPopup.buttonClose)) {
      this._removeClassPopup();
    } else if (target.classList.contains(this._infoPopup.namePopup.slice(1))) {
      this._removeClassPopup();
    }
  }

  _showPopup() {
    this._addClassPopup();
    this._fillPopupImg();
  }

  _deleteCardPlace({target}) {
    target.closest(this._objInfoTemplate.cardItem).remove();
  }

  _toggleLikeCard({target}) {
    target.classList.toggle(this._objInfoTemplate.buttonLikeCardActive);
  }

  _eventListenerCard(event) {
    /* Делегирование событий */
    if (event.target.classList.contains(this._objInfoTemplate.cardImg.slice(1))) {
      this._showPopup();
    }
    else if (event.target.classList.contains(this._objInfoTemplate.buttonDeleteCard)) {
      this._deleteCardPlace(event);
    }
    else if (event.target.classList.contains(this._objInfoTemplate.buttonLikeCard)) {
      this._toggleLikeCard(event);
    }
  }

  _selectTemplateCard() {
    return document.querySelector(this._template)
    .content
    .querySelector(this._objInfoTemplate.cardItem)
    .cloneNode(true);
  }

  _fillCardTemplate() {
    this._cardTemplate = this._selectTemplateCard();

    this._cardTemplate.querySelector(this._objInfoTemplate.cardTitle).textContent = this._objInitialCards.name;
    this._cardTemplate.querySelector(this._objInfoTemplate.cardImg).src = this._objInitialCards.link;
    this._cardTemplate.querySelector(this._objInfoTemplate.cardImg).alt = this._objInitialCards.name;

    /* События */
    this._cardTemplate.addEventListener('click', event => this._eventListenerCard(event));
    document.querySelector(this._infoPopup.namePopup).addEventListener('click', event => this._eventListenerPopup(event));

    return this._cardTemplate;
  }

  createCard() {
    this._fillCardTemplate()
    document.querySelector('.place__list').append(this._cardTemplate);
  }
}

initialCards.forEach(obj => {
  /* Принимает два атрибута. Данные карточки для заполнения.
  Обьект с информацией о текущем шаблоне. */
  const createCard = new Card(obj, infoTemplatePlace);
  createCard.createCard();
});
