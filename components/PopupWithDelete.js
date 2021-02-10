import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
  constructor(popup) {
    super(popup);
    this._buttonDelete = this._popup.querySelector(".popup__button");
  }

  setEventListeners = (evt) => {
    super.setEventListeners();
    //this._buttonDelete.addEventListener("click");
  };

  openPopup = () => {
    super.openPopup();
  };

  closePopup = () => {
    super.closePopup();
  };
}
