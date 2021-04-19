export default class UserInfo {
  constructor({nameSelector, doesInfoSelector, nameProfileSelector}) {
    // Чтоб не искать лишнее, добавил основной контейнер
    this.nameProfileSelector = document.querySelector(nameProfileSelector)
    this._nameSelector = this.nameProfileSelector.querySelector(nameSelector);
    this._doesInfoSelector = this.nameProfileSelector.querySelector(doesInfoSelector);
  }

  getUserInfo() {
    // Вернуть лучше бы массив
    return {nameSelectorText: this._nameSelector.textContent, doesInfoSelectorText: this._doesInfoSelector.textContent};
  }

  setUserInfo({nameValueForm, doesValueForm}) {
    this._nameSelector.textContent = nameValueForm;
    this._doesInfoSelector.textContent = doesValueForm;
  }
}
