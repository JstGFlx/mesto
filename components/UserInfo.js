export default class UserInfo {
  constructor({ name, about, avatar }) {
    this._profileName = document.querySelector(name);
    this._profileAbout = document.querySelector(about);
    this._profileAvatar = document.querySelector(avatar);
  }

  getUserInfo = () => {
    this._profileValues = {};
    this._profileValues.name = this._profileName.textContent;
    this._profileValues.about = this._profileAbout.textContent;
    return this._profileValues;
  };

  setUserInfo = ({ name, about, avatar }) => {
    this._profileName.textContent = name;
    this._profileAbout.textContent = about;
    this._profileAvatar.style.backgroundImage = `url(${avatar})`;
  };
}
