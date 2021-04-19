export default class Section {
  constructor({initialCards, renderer}, containerSelector) {
    this._initialCards = initialCards;
    this._containerSelector = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  renderItems() {
    this._initialCards.forEach(objItem => {
      this._renderer(objItem);
    });
  }

  addItem(selector) {
    this._containerSelector.prepend(selector);
  }
}
