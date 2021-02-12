import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
  constructor(
    popup,
    handleDeleteCard,
    renderLoadTextBtnDelete,
    showErrorMassage
  ) {
    super(popup);
    this._handleDeleteCard = handleDeleteCard;
    this._buttonDelete = this._popup.querySelector(".popup__button");
    this._renderLoadTextBtnDelete = renderLoadTextBtnDelete;
    this._showErrorMassage = showErrorMassage;
  }

  _deleteCard() {
    this._renderLoadTextBtnDelete(true);
    this._handleDeleteCard(this._id)
      .catch((err) => {
        this._showErrorMassage(err);
      })
      .finally(() => {
        this._renderLoadTextBtnDelete(false);
        this._card.remove();
        this.closePopup();
      });
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._buttonDelete.addEventListener("click", () => {
      this._deleteCard();
    });
  };

  openPopup = (card, id) => {
    super.openPopup();
    this._card = card;
    this._id = id;
  };
}
