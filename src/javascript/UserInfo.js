export default class UserInfo {
  constructor({nameSelector, doesInfoSelector, profileSelector}) {
    this._profile = document.querySelector(profileSelector)
    this._name = this._profile.querySelector(nameSelector);
    this._doesInfo = this._profile.querySelector(doesInfoSelector);
  }

  getUserInfo() {
    return {nameSelectorText: this._name.textContent, doesInfoSelectorText: this._doesInfo.textContent};
  }

  setUserInfo(name, does) {
    this._name.textContent = does;
    this._doesInfo.textContent = name;
  }
}
