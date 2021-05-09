export default class Popup {
  constructor(selectorPopup, {showPopup, buttonCloseSelector}) {
    this._popup = document.querySelector(selectorPopup);
    this._showPopup = showPopup;
    this._buttonClose = this._popup.querySelector(buttonCloseSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add(this._showPopup);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove(this._showPopup);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _closeInPopup(event) {
    if (event.target === this._popup) {
      this.close();
    }
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._buttonClose.addEventListener('click', this.close.bind(this));
    this._popup.addEventListener('mousedown', this._closeInPopup.bind(this));
  }
}
