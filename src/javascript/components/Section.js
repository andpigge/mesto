export default class Section {
  constructor({initialCards, renderer}, containerSelector, renderLoading) {
    this._initialCards = initialCards;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._renderLoading = renderLoading;
  }

  renderItems() {
    this._renderLoading.renderLoading(true);

    this._initialCards.then(objItems => {
      this.userInfo = objItems[1];

      objItems[0].forEach(objItem => {
        this._renderer(objItem, objItems[1]);
      });
    })
    .finally(() => {
      this._renderLoading.renderLoading(false);
    });
  }

  addItem(card) {
    this._container.prepend(card);
  }
}
