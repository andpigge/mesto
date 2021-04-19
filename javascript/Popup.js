export default class Popup {
  // Помню про ТЗ. objInfo обьекты будут хранить свои классы открытия и кнопки крестика. Можно было сразу передать обьект с именем попапа, но возможно это противоречит ТЗ.
  constructor(selectorPopup, {showPopup, buttonCloseSelector}) {
    this._popup = document.querySelector(selectorPopup);
    this._showPopup = showPopup;
    this._buttonClose = this._popup.querySelector(buttonCloseSelector);
  }

  open() {
    this._popup.classList.add(this._showPopup);
    document.addEventListener('keydown', (event) => this._handleEscClose(event));
  }

  close() {
    this._popup.classList.remove(this._showPopup);
    document.removeEventListener('keydown', (event) => this._handleEscClose(event));
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._buttonClose.addEventListener('click', this.close.bind(this))
  }
}
