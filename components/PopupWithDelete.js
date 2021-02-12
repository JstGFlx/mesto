import Popup from "./Popup.js";
import { renderLoadTextBtnDelete } from "../utils/utils.js";
//showErrorMassage
export default class PopupWithDelete extends Popup {
  constructor(popup, handleDeleteCard) {
    super(popup);
    this._handleDeleteCard = handleDeleteCard;
    this._buttonDelete = this._popup.querySelector(".popup__button");
  }

  _deleteCard() {
    renderLoadTextBtnDelete(true);
    this._handleDeleteCard(this._currentCard._id)
      .catch((err) => {
        //showErrorMassage(err);
      })
      .finally(() => {
        this._currentCard._element.remove();
        renderLoadTextBtnDelete(false);
        this.closePopup();
      });
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._buttonDelete.addEventListener("click", () => {
      this._deleteCard();
    });
  };

  openPopup = (card) => {
    super.openPopup();
    this._currentCard = card;
  };

  closePopup = () => {
    super.closePopup();
  };
}
