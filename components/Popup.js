//общий класс для попапов
export default class Popup {
  constructor(popup) {
    this._popup = document.querySelector(popup);
  }

  openPopup() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._closeByEscape);
  }

  closePopup() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._closeByEscape);
  }

  _closeByEscape = (evt) => {
    const escapeCode = 27;
    if (evt.keyCode === escapeCode) {
      this.closePopup();
    }
  };

  _closeByClick(evt) {
    const target = evt.target;
    if (target.classList.contains("popup_opened")) {
      this.closePopup();
    }
  }

  setEventListeners() {
    this._popup
      .querySelector(".btn_type_close")
      .addEventListener("click", this.closePopup);
    this._popup.addEventListener("mousedown", (evt) => this._closeByClick(evt));
  }
}
