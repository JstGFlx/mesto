export default class UserInfo {
  constructor({ name, about }) {
    this._profileName = document.querySelector(name);
    this._profileAbout = document.querySelector(about);
  }

  getUserInfo = () => {
    this._profileValues = {};
    this._profileValues.name = this._profileName.textContent;
    this._profileValues.aboutMe = this._profileAbout.textContent;
    return this._profileValues;
  };

  setUserInfo = ({ name, about }) => {
    this._profileName.textContent = name;
    this._profileAbout.textContent = about;
  };
}
