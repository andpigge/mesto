export default class Section {
  constructor({initialCards, renderer}, containerSelector) {
    this._initialCards = initialCards;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  renderItems() {
    this._initialCards.forEach(objItem => {
      this._renderer(objItem);
    });
  }

  addItem(card) {
    this._container.prepend(card);
  }
}
