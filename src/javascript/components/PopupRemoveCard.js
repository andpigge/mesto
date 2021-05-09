import Popup from "./Popup.js";

export default class popupRemoveCard extends Popup {
  constructor(selectorPopup, {popupFormSelector, ...objInfo}) {
    super(selectorPopup, objInfo);
    this._popupForm = this._popup.querySelector(popupFormSelector);
  }

  setSubmitAction(action) {
    this._handleSubmitCallback = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', event => {
      event.preventDefault();
      this._handleSubmitCallback();
    });
  }
}
