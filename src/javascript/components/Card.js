import {infoTemplatePlace} from '../utils/constants.js';

export default class Card {
  constructor(objInitialCards, handleCardClick) {
    this._objInfoTemplate = infoTemplatePlace;
    this._template = this._objInfoTemplate.name;
    this._objInitialCards = objInitialCards;
    this._handleCardClick = handleCardClick;
  }

  _deleteCardPlace({target}) {
    target.closest(this._objInfoTemplate.cardItem).remove();
  }

  _toggleLikeCard({target}) {
    target.classList.toggle(this._objInfoTemplate.buttonLikeCardActive);
  }

  _eventListenerCard(event) {
    if (event.target.classList.contains(this._objInfoTemplate.buttonDeleteCard)) {
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

  fillCardTemplate() {
    this._cardTemplate = this._selectTemplateCard();

    this._cardTemplate.querySelector(this._objInfoTemplate.cardTitle).textContent = this._objInitialCards.name;
    this._cardTemplate.querySelector(this._objInfoTemplate.cardImg).src = this._objInitialCards.link;
    this._cardTemplate.querySelector(this._objInfoTemplate.cardImg).alt = this._objInitialCards.name;

    /* События */
    this._cardTemplate.addEventListener('click', event => this._eventListenerCard(event));

    this._cardTemplate.querySelector('.card-place__img').addEventListener('click', () => this._handleCardClick(this._objInitialCards.name, this._objInitialCards.link));

    return this._cardTemplate;
  }
}
