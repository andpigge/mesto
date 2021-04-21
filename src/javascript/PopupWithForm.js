import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selectorPopup,
    {popupFormSelector, popupFormfieldsSelector, ...objInfo},
    formSubmitHandlerAddCard)
  {
    super(selectorPopup, objInfo);
    this._formSubmitHandlerAddCard = formSubmitHandlerAddCard;
    this._form = this._popup.querySelector(popupFormSelector);
    this._popupFormfieldsSelector = popupFormfieldsSelector;

    this._objInfo = objInfo;

    this._getInputValues = this._getInputValues.bind(this)
  }

  close() {
    super.close();
    this._form.reset();
  }

  _getInputValues() {
    this._inputList = Array.from(this._form.querySelectorAll(this._popupFormfieldsSelector));
    this.formValues = this._inputList.reduce((acc, item) => {
      acc[item.name] = item.value;

      return acc;
    }, {});
    return this.formValues;
  }

  // Чтобы не использовать в index.js готовую функцию, я предпочел заполнять форму здесь
  formFill(nameSelectorText, doesInfoSelectorText) {
    this._form.querySelector(this._objInfo.popupFormfieldNameSelector).value = nameSelectorText;
    this._form.querySelector(this._objInfo.popupFormfieldDoesSelector).value = doesInfoSelectorText;
  }

  // Чтобы выставить event.preventDefault для всех форм кнопок отправки
  _submitForm(event) {
    event.preventDefault()
    this._formSubmitHandlerAddCard(this._getInputValues())
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._getInputValues);
    this._form.addEventListener('submit', () => this._formSubmitHandlerAddCard(this._getInputValues()));
  }
}
