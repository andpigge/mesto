import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selectorPopup,
    {popupFormSelector, popupFormfieldsSelector, ...objInfo},
    formSubmitHandler)
  {
    super(selectorPopup, objInfo);
    this._formSubmitHandler = formSubmitHandler;
    this.form = this._popup.querySelector(popupFormSelector);
    this._popupFormfieldsSelector = popupFormfieldsSelector;

    this.objInfo = objInfo;

    this._getInputValues = this._getInputValues.bind(this)
  }

  close() {
    super.close();
    this.form.reset();
  }

  _getInputValues() {
    this._inputList = Array.from(this.form.querySelectorAll(this._popupFormfieldsSelector));
    this.formValues = this._inputList.reduce((acc, item) => {
      acc[item.name] = item.value;

      return acc;
    }, {});

    return this.formValues;
  }

  _submitForm(event) {
    event.preventDefault()
    this._formSubmitHandler(this._getInputValues())
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', (event) => {
      this._submitForm(event);
    });
  }
}
