import Popup from "./Popup.js";

export default class popupRemoveCard extends Popup {
  constructor(selectorPopup, {popupButtonDeleteSelector, ...objInfo}, deleteCardPlace) {
    super(selectorPopup, objInfo);
    this._popup = document.querySelector(selectorPopup);
    this._popupButtonDelete = this._popup.querySelector(popupButtonDeleteSelector);

    this._deleteCardPlace = deleteCardPlace;
  }

  setSubmitAction(action) {
    this._handleSubmitCallback = action;
  }

  // Сделать приватные методы и свойства
  // 2 удалить лишние формы селекторы с popupeithform
  setEventListeners() {
    super.setEventListeners();
    document.querySelector('.button-popup_delete_card').addEventListener('click', event => {
      event.preventDefault();
      this._handleSubmitCallback();
    });
  }
}
