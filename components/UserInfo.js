export default class UserInfo {
  constructor({ name, aboutMe }) {
    this._profileName = document.querySelector(name);
    this._profileAboutMe = document.querySelector(aboutMe);
  }

  getUserInfo = () => {
    this._profileValues = {};
    this._profileValues.name = this._profileName.textContent;
    this._profileValues.aboutMe = this._profileAboutMe.textContent;
    return this._profileValues;
  };

  setUserInfo = ({ name, aboutMe }) => {
    this._profileName.textContent = name;
    this._profileAboutMe.textContent = aboutMe;
  };
}
