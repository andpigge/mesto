export default class UserInfo {
  constructor(profileSelector,
    { nameSelector, professionSelector, imgSelector, containerImgSelector, buttonEditImgSelector })
  {
    this._profile = document.querySelector(profileSelector)
    this._name = this._profile.querySelector(nameSelector);
    this._profession = this._profile.querySelector(professionSelector);
    this._img = this._profile.querySelector(imgSelector);

    this._containerImg = this._profile.querySelector(containerImgSelector);
    this._buttonEditImg = this._profile.querySelector(buttonEditImgSelector);
  }

  getUserInfo() {
    return {nameValue: this._name.textContent, doesValue: this._profession.textContent};
  }

  // name, does приходят с сервера
  setUserInfo(name, does) {
    this._name.textContent = name;
    this._profession.textContent = does;
  }

  // url приходит от сервера
  updateProfileImg(url) {
    this._img.src = url;
  }
}
