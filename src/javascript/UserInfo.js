export default class UserInfo {
  constructor({nameSelector, doesInfoSelector, profileSelector}) {
    /* Я согласен что контейнер здесь лишний, но мне проще ориентироваться по коду, когда есть от чего отталкиваться. То есть структура кода более понятно. Возможно в будущем, но сейчас я не готов. */
    this._profile = document.querySelector(profileSelector)
    this._name = this._profile.querySelector(nameSelector);
    this._doesInfo = this._profile.querySelector(doesInfoSelector);
  }

  getUserInfo() {
    return {nameSelectorText: this._name.textContent, doesInfoSelectorText: this._doesInfo.textContent};
  }

  setUserInfo({profileName, profileDoes}) {
    this._name.textContent = profileName;
    this._doesInfo.textContent = profileDoes;
  }
}
