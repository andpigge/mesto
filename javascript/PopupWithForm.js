import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selectorPopup,
    {popupFormSelector, popupFormfieldNameSelector, popupFormfieldDoesSelector, ...objInfo},
    formSubmitHandlerAddCard)
  {
    super(selectorPopup, objInfo);
    this._formSubmitHandlerAddCard = formSubmitHandlerAddCard;
    this._form = this._popup.querySelector(popupFormSelector);
    this._fieldOne = this._form.querySelector(popupFormfieldNameSelector);
    this._fieldTwo = this._form.querySelector(popupFormfieldDoesSelector);
  }

  close() {
    super.close();
    this._form.reset();
  }

  _getInputValues() {
    this._fieldOneValue = this._fieldOne.value;
    this._fieldTwoValue = this._fieldTwo.value;
  }

  // Чтобы не использовать в index.js готовую функцию, я предпочел заполнять форму здесь
  formFill(nameSelectorText, doesInfoSelectorText) {
    console.log(nameSelectorText, doesInfoSelectorText)
    this._fieldOne.value = nameSelectorText;
    this._fieldTwo.value = doesInfoSelectorText;
    console.log(this._fieldOne.value, this._fieldTwo.value)
  }

  setEventListeners() {
    super.setEventListeners();
    // У метода _getInputValues this -> windows. У windows нет свойства _form. This это текущий класс.
    /* Так как _getInputValues вызывается локально в классе, то пришлось 2 раза слушать события, двух разных обработчиков, хотя можно было обьеденить два обработчика события в одну функцию, тоесть вызвать в функции колбек. */
    this._form.addEventListener('submit', this._getInputValues.bind(this));
    // event теряется если использовать его внутри колбека класса
    this._form.addEventListener('submit', (event) => this._formSubmitHandlerAddCard(event, this._fieldOneValue, this._fieldTwoValue));
  }
}
