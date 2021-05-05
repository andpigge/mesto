export default class Section {
  constructor({initialCards, renderer}, containerSelector, counterSelector) {
    this._initialCards = initialCards;
    this._container = document.querySelector(containerSelector);
    this._counterSelector = counterSelector;
    this._renderer = renderer;
  }

  renderItems() {
    this._initialCards.then(objItems => {
      this.userInfo = objItems[1];
      objItems[0].forEach(objItem => {
        this._renderer(objItem, objItems[1]);
      });
    })
  }

  showCountLikes(card, likes) {
    card.querySelector('.card-place__counter').textContent = likes.length;
  }

  addItem(card) {
    this._container.prepend(card);
  }
}
