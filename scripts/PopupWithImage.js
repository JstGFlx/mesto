import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
  }

  openPopup = (link, name) => {
    const image = this._popup.querySelector('.popup__image');
    const desc = this._popup.querySelector('.popup__description');
    image.src = link;
    desc.textContent = name;
    image.alt = name;
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._closeByEscape);
  }

}