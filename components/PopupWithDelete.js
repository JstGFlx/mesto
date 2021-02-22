import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
  constructor(popup, { handleDeleteCard }) {
    super(popup);
    this._handleDeleteCard = handleDeleteCard;
    this._buttonDelete = this._popup.querySelector(".popup__button");
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._buttonDelete.addEventListener("click", () => {
      this._handleDeleteCard(this._id, this._card, this.closePopup);
    });
  };

  openPopup = (card, id) => {
    super.openPopup();
    this._card = card;
    this._id = id;
  };
}
