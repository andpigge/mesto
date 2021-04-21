export default class Card {
  constructor(objInitialCards, infoTemplatePlace, handleCardClick) {
    this._objInitialCards = objInitialCards;
    this._handleCardClick = handleCardClick;

    this._template = document.querySelector(infoTemplatePlace.nameSelector);

    this._buttonDeleteCardSelector = infoTemplatePlace.buttonDeleteCardSelector;
    this._buttonLikeCardSelector = infoTemplatePlace.buttonLikeCardSelector;
    this._buttonLikeCardActive = infoTemplatePlace.buttonLikeCardActive;
    this._cardImgSelector = infoTemplatePlace.cardImgSelector;
    this._cardTitleSelector = infoTemplatePlace.cardTitleSelector;
    this._cardItem = infoTemplatePlace.cardItemSelector;
  }

  _deleteCardPlace() {
    // Круто.
    this._cardTemplate.remove();
    this._cardTemplate = null;
  }

  _toggleLikeCard(btn) {
    btn.classList.toggle(this._buttonLikeCardActive);
  }

  _setEventListeners() {
    const buttonLikeCard = this._cardTemplate.querySelector(this._buttonLikeCardSelector);

    this._cardTemplate.querySelector(this._buttonDeleteCardSelector).addEventListener('click', this._deleteCardPlace.bind(this));
    buttonLikeCard.addEventListener('click', () => this._toggleLikeCard(buttonLikeCard));
    this._cardTemplate.querySelector(this._cardImgSelector).addEventListener('click', () => this._handleCardClick(this._objInitialCards.name, this._objInitialCards.link));
  }

  _selectTemplateCard() {
    return this._template
    .content
    .querySelector(this._cardItem)
    .cloneNode(true);
  }

  fillCardTemplate() {
    this._cardTemplate = this._selectTemplateCard();

    this._cardTemplate.querySelector(this._cardTitleSelector).textContent = this._objInitialCards.name;
    this._cardTemplate.querySelector(this._cardImgSelector).src = this._objInitialCards.link;
    this._cardTemplate.querySelector(this._cardImgSelector).alt = this._objInitialCards.name;

    this._setEventListeners();

    return this._cardTemplate;
  }
}
