import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  // super сохраняет переданный popup в родительском constructor
  constructor(popup, {popupImg, popupImgText, ...objInfo}) {
    super(popup, objInfo);
    this._popupImg = this._popup.querySelector(popupImg);
    this._popupImgText = this._popup.querySelector(popupImgText);
  }

  open(name, link) {
    super.open();
    this._popupImg.src = link;
    this._popupImg.alt = link;
    this._popupImgText.textContent = name;
  }
}
