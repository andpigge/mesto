import Popup from "./Popup.js";

export default class popupRemoveCard extends Popup {
  constructor(selectorPopup, {popupFormSelector, popupButtonDeleteSelector, ...objInfo}, deleteCardPlace) {
    super(selectorPopup, objInfo);
    this._popupFormSelector = this._popup.querySelector(popupFormSelector);
    this._popupButtonDelete = this._popup.querySelector(popupButtonDeleteSelector);

    this._deleteCardPlace = deleteCardPlace;
  }

  setSubmitAction(action) {
    this._handleSubmitCallback = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupFormSelector.addEventListener('submit', event => {
      event.preventDefault();
      this._handleSubmitCallback();
    });
  }
}
