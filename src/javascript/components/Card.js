export default class Card {
  constructor(objInitialCards, userId, infoTemplatePlace, deleteCardPlace, toggleLikes, checkLikeCard/* , userId */ /* , handleCardClick, initialLikesCount */) {
    this._objInitialCards = objInitialCards;
    this._deleteCardPlace = deleteCardPlace;
    this._userId = userId.userId;
    this._toggleLikes = toggleLikes;

    this._checkLikeCard = checkLikeCard;
    /* this._handleCardClick = handleCardClick;
    this._initialLikesCount = initialLikesCount; */

    /* this._showPopupRemoveCard = showPopupRemoveCard;
    this._setEventListeners = setEventListeners; */

    this._template = document.querySelector(infoTemplatePlace.nameSelector);

    /* this._buttonDeleteCardSelector = infoTemplatePlace.buttonDeleteCardSelector;
    this._buttonLikeCardSelector = infoTemplatePlace.buttonLikeCardSelector;
    this._buttonLikeCardActive = infoTemplatePlace.buttonLikeCardActive; */
    this._cardImgSelector = infoTemplatePlace.cardImgSelector;
    this._cardTitleSelector = infoTemplatePlace.cardTitleSelector;
    this._cardItem = infoTemplatePlace.cardItemSelector;
  }

  _selectTemplateCard() {
    return this._template
    .content
    .querySelector(this._cardItem)
    .cloneNode(true);
  }

  _hideButtonDelete() {
    if (this._userId !== this._objInitialCards.userId) {
      this.cardTemplate.querySelector('.card-place__delete-btn').classList.add('card-place__delete-btn_display_none');
    }
  }

  _toggleLikesCard() {
    this.cardTemplate.querySelector('.card-place__like-btn').addEventListener('click', () => {
      this._toggleLikes(this.cardTemplate, this._objInitialCards, this._userId)
    })
  }

  _addLike() {
    const checks = this._checkLikeCard(this._objInitialCards, this._userId);
    if (checks) {
      this.cardTemplate.querySelector('.card-place__like-btn').classList.add('card-place__like-btn_active');
    }
  }

  fillCardTemplate() {
    this.cardTemplate = this._selectTemplateCard();

    this.cardTemplate.querySelector(this._cardTitleSelector).textContent = this._objInitialCards.name;
    this.cardTemplate.querySelector(this._cardImgSelector).src = this._objInitialCards.link;
    this.cardTemplate.querySelector(this._cardImgSelector).alt = this._objInitialCards.name;

    this._hideButtonDelete();

    this.cardTemplate.querySelector('.card-place__delete-btn').addEventListener('click', () => this._deleteCardPlace(this.cardTemplate, this._objInitialCards.idCard));

    this._toggleLikesCard();

    this._addLike();

    return this.cardTemplate;
  }
}
