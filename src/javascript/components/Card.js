export default class Card {
  constructor(objInitialCards, userId, templateSelector, deleteCardPlace, toggleLikes, popupRemoveCardOpen, popupWithImageOpen) {
    // Информация о пользователе с сервера
    this._objInitialCards = objInitialCards;
    this._userId = userId;

    // Методы колбеки
    this._deleteCardPlace = deleteCardPlace;
    this._toggleLikes = toggleLikes;
    this._popupRemoveCardOpen = popupRemoveCardOpen;
    this._popupWithImageOpen = popupWithImageOpen;

    // Дополнительные свойства
    this._btnLikeActive = 'card-place__like-btn_active';

    // Селекторы шаблона
    this._template = document.querySelector(templateSelector).content;
    this._item = this._template.querySelector('.place__item').cloneNode(true);
    this._img = this._item.querySelector('.card-place__img');
    this._name = this._item.querySelector('.card-place__title');
    this._btnDelete = this._item.querySelector('.card-place__delete-btn');
    this._btnLike = this._item.querySelector('.card-place__like-btn');
    this._likeCounter = this._item.querySelector('.card-place__counter');
  }

  // Показывает при загрузке странице стоит ли лайк
  showLikesLoading() {
    const check = this._objInitialCards.likes.some(objUser => objUser._id === this._userId);
    check && this._btnLike.classList.add(this._btnLikeActive);
  }

  // Показать колличество лайков
  showCounterLikes(counterLikes) {
    this._likeCounter.textContent = counterLikes;
  }

  // Скрывает кнопку удалить если это чужая карточка
  _hideButtonDelete() {
    if (this._userId !== this._objInitialCards.userId) {
      this._btnDelete.classList.add('card-place__delete-btn_display_none');
    }
  }

  // Меняет класс на лайках
  _toggleLikeClass() {
    this._btnLike.classList.toggle(this._btnLikeActive);
  }

  _toggleLikeCard() {
    this._btnLike.addEventListener('click', () => {
      this._toggleLikeClass();
      this._toggleLikes(this._btnLike.classList.contains(this._btnLikeActive), this._objInitialCards.idCard, this.showCounterLikes.bind(this));
    })
  }

  _setEventListeners() {
    this._btnDelete.addEventListener('click', this._popupRemoveCardOpen);
    this._btnDelete.addEventListener('click', () => this._deleteCardPlace(this._item, this._objInitialCards.idCard));
    this._img.addEventListener('click', () => this._popupWithImageOpen(this._name.textContent, this._img.src));
    this._toggleLikeCard();
  }

  fillCardTemplate() {
    this._name.textContent = this._objInitialCards.name;
    this._img.src = this._objInitialCards.link;
    this._img.alt = this._objInitialCards.name;

    this._hideButtonDelete();

    this._setEventListeners();

    return this._item;
  }
}
