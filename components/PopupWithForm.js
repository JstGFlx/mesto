import Popup from './Popup.js'
//класс попапов с формой
export default class PopupWithForm extends Popup {
  constructor({ submitForm }, popup, resetValidityMassage) {
    super(popup);
    this._submitForm = submitForm;
    this._inputList = this._popup.querySelectorAll('.popup__input')
    this._resetValidityMassage = resetValidityMassage;
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._form = this._popup.querySelector('.popup__form');
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
      this.closePopup();
      this._resetValidityMassage();
    });
  }

  setInitialInputsValues(values) {
    this._inputList.forEach((input) => {
      if (values[input.name]) {
        input.value = values[input.name];
      }
    });
  }

  _getInputValues = () => {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  closePopup = () => {
    super.closePopup();
    this._form.reset();
    this._resetValidityMassage();
  }
}