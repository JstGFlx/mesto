import Popup from './Popup.js'
export default class PopupWithForm extends Popup {
  constructor({ submitForm }, popup) {
    super(popup);
    this._submitForm = submitForm;
    this._inputList = this._popup.querySelectorAll('.popup__input')
  }

  setEventListeners = () => {
    this._popup.querySelector('.btn_type_close').addEventListener('click', this.closePopup);
    this._popup.addEventListener('mousedown', evt => this._closeByClick(evt));
    this._form = this._popup.querySelector('.popup__form');
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
      this.closePopup();
      this._form.reset();
      this._resetValidityMassage();
    });
  }

  setInitialInputsValues = ({ name, aboutMe }) => {
    this._inputName = this._popup.querySelector('.popup__input_text_name');
    this._inputAboutMe = this._popup.querySelector('.popup__input_text_about-me');
    this._inputName.value = name;
    this._inputAboutMe.value = aboutMe;

  }

  _resetValidityMassage = () => {
    this._errors = this._popup.querySelectorAll('.popup__error');

    this._inputList.forEach((input) => {
      input.classList.remove('popup__input_type_error');
    });
    this._errors.forEach((error) => {
      error.textContent = '';
    })
  }

  _getInputValues = () => {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  closePopup = () => {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closeByEscape);
    this._form.reset();
    this._resetValidityMassage();
  }
}