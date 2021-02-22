import Popup from "./Popup.js";
//класс попапов с формой
export default class PopupWithForm extends Popup {
  constructor({ submitForm }, popup) {
    super(popup);
    this._submitForm = submitForm;
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._form = this._popup.querySelector(".popup__form");
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
  };

  setInitialInputsValues(values) {
    this._inputList.forEach((input) => {
      if (values[input.name]) {
        input.value = values[input.name];
      }
    });
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }
}
