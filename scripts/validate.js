const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
};

const popupProfileEdit = document.querySelector('.popup_type_edit'); // попап с формой редактирования профиля 
const popupAddCard = document.querySelector('.popup_type_add'); // попап с формой добавления карточки
const formEditElement = popupProfileEdit.querySelector('.popup__form'); // форма редактирования профиля
const formAddElement = popupAddCard.querySelector('.popup__form'); // форма добавления элемента
class FormValidator {
  constructor(data, form) {
    this._form = form;
    this._input = data.inputSelector;
    this._submitButton = data.submitButtonSelector;
    this._inactiveButton = data.inactiveButtonClass;
    this._inputError = data.inputErrorClass;
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
    })
  }

  _checkInputValidity(input) {
    if (input.validity.valid) {
      this._hideError(input);
    } else {
      this._showError(input);
    }
  }

  _setButtonState() {
    if (!this._checkInvalidInput()) {
      this._button.classList.remove(this._inactiveButton);
      this._button.disabled = false;
    } else {
      this._button.classList.add(this._inactiveButton);
      this._button.disabled = true;
    }
  }

  _setEventListener() {
    this._inputList = [...this._form.querySelectorAll(this._input)];
    this._button = this._form.querySelector(this._submitButton);

    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._setButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListener();
    this._setButtonState();
  }
}



const validatorEdit = new FormValidator(validationConfig, formEditElement);
const validatorAdd = new FormValidator(validationConfig, formAddElement);


