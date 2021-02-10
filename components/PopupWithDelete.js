import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
  constructor(popup) {
    super(popup);
    this._buttonDelete = this._popup.querySelector(".popup__button");
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._buttonDelete.addEventListener("click", () => {
      this.evt.path[1].remove();
      this.closePopup();
    });
  };

  openPopup = (evt) => {
    super.openPopup();
    this.evt = evt;
  };

  closePopup = () => {
    super.closePopup();
  };
}
