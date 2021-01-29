import Popup from './Popup.js'
//класс попапа увеличенного изображения
export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._image = this._popup.querySelector('.popup__image');
    this._desc = this._popup.querySelector('.popup__description');
  }

  openPopup = (link, name) => {
    super.openPopup()
    this._image.src = link;
    this._desc.textContent = name;
    this._image.alt = name;
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._closeByEscape);
  }

  closePopup = () => {
    super.closePopup();
  }

}