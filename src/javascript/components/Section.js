export default class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(data) {
    data.forEach(objItem => {
      this._renderer(objItem);
    })
  }

  addItem(card) {
    this._container.prepend(card);
  }
}
