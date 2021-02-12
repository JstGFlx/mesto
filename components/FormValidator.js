// класс валидации форм
export default class FormValidator {
  constructor(data, form) {
    this._form = document.querySelector(`form[name=${form}]`);
    this._input = data.inputSelector;
    this._submitButton = data.submitButtonSelector;
    this._inactiveButton = data.inactiveButtonClass;
    this._inputError = data.inputErrorClass;
    this._errors = this._form.querySelectorAll(data.errorClass);
    this._inputList = [...this._form.querySelectorAll(this._input)];
    this._button = this._form.querySelector(this._submitButton);
  }

  _showError(input) {
    this._error = this._form.querySelector(`#${input.id}-error`);
    this._error.textContent = input.validationMessage;
    input.classList.add(this._inputError);
  }

  _hideError(input) {
    this._error = this._form.querySelector(`#${input.id}-error`);
    this._error.textContent = "";
    input.classList.remove(this._inputError);
  }

  _checkInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _checkInputValidity(input) {
    if (input.validity.valid) {
      this._hideError(input);
    } else {
      this._showError(input);
    }
  }

  setButtonState = () => {
    if (!this._checkInvalidInput()) {
      this._button.classList.remove(this._inactiveButton);
      this._button.disabled = false;
    } else {
      this._button.classList.add(this._inactiveButton);
      this._button.disabled = true;
    }
  };

  _setEventListener() {
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this.setButtonState();
      });
    });
  }

  reseteInputsValues() {
    this._inputList.forEach((input) => {
      input.value = "";
    });
  }

  resetValidityMassage = () => {
    this._inputList.forEach((input) => {
      input.classList.remove(this._inputError);
    });
    this._errors.forEach((error) => {
      error.textContent = "";
    });
  };

  enableValidation() {
    this._setEventListener();
    this.setButtonState();
  }
}
