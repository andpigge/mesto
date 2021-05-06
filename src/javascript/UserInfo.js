export default class UserInfo {
  constructor(profileSelector) {
    this._profile = document.querySelector(profileSelector)
    this._name = this._profile.querySelector('.profile__title-name');
    this._does = this._profile.querySelector('.profile__subtitle-does');
    this._img = this._profile.querySelector('.profile__img');

    this._containerImg = this._profile.querySelector('.profile__img-container');
    this._buttonEditImg = this._profile.querySelector('.profile__edit-img');
  }

  getUserInfo() {
    return {nameValue: this._name.textContent, doesValue: this._does.textContent};
  }

  // name, does приходят с сервера
  setUserInfo(name, does) {
    this._name.textContent = name;
    this._does.textContent = does;
  }

  _showHoverButton() {
    this._buttonEditImg.classList.add('profile__edit-img_active');
  }

  _hideHoverButton() {
    this._buttonEditImg.classList.remove('profile__edit-img_active');
  }

  setEventListener() {
    this._containerImg.addEventListener('mouseover', this._showHoverButton.bind(this));
    this._containerImg.addEventListener('mouseout', this._hideHoverButton.bind(this));
  }

  // url приходит от сервера
  updateProfileImg(url) {
    this._img.src = url;
  }
}
