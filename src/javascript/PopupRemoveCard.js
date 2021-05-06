import Popup from "./Popup.js";

export default class popupRemoveCard extends Popup {
  constructor(selectorPopup, {popupButtonDeleteSelector, ...objInfo}, deleteCardPlace) {
    super(selectorPopup, objInfo);
    this._popupButtonDelete = this._popup.querySelector(popupButtonDeleteSelector);

    this._deleteCardPlace = deleteCardPlace;
  }

  setSubmitAction(action) {
    this._handleSubmitCallback = action;
  }

  setEventListeners() {
    super.setEventListeners();
    document.querySelector('.button-popup_delete_card').addEventListener('click', event => {
      event.preventDefault();
      this._handleSubmitCallback();
    });
  }
}
