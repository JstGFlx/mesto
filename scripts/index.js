const buttonEdit = document.querySelector('.btn_type_edit'); // кнопка редактировать профиль 
const buttonAdd = document.querySelector('.btn_type_add'); // кнопка добавить карточку
const popupShowImage = document.querySelector('.popup_type_img');  // попап с увеличенной картинкой
const popupProfileEdit = document.querySelector('.popup_type_edit'); // попап с формой редактирования профиля 
const popupAddCard = document.querySelector('.popup_type_add'); // попап с формой добавления карточки.
const buttonCloseEditPopup = popupProfileEdit.querySelector('.btn_type_close'); // кнопка закрыть попап редактирования 
const buttonCloseAddPopup = popupAddCard.querySelector('.btn_type_close');  // кнопка закрыть попап добавления
const buttonCloseImgPopup = popupShowImage.querySelector('.btn_type_close'); // кнопка закрыть попап большого изображения

const listContainerElement = document.querySelector('.cards'); // контейнер со всеми карточками 
const templateCardElement = document.querySelector('.template'); // темплейт элемент карточки 
const picturePopupImage = popupShowImage.querySelector('.popup__image'); // картинка от попапа увеличения изображения
const descriptionPopupImage = popupShowImage.querySelector('.popup__description'); // описание картинки от попапа увеличенного изображения
const nameInput = popupProfileEdit.querySelector('.popup__input_text_name'); // поле ввода имени
const jobInput = popupProfileEdit.querySelector('.popup__input_text_about-me'); // поле ввода вида деятельности
const titleInput = popupAddCard.querySelector('.popup__input_text_title'); // поле ввода описания изображения 
const linkInput = popupAddCard.querySelector('.popup__input_text_link'); // поле ввода ссылки на изображение
const profileName = document.querySelector('.profile__name'); // имя профиля показанное на странице
const profileJob = document.querySelector('.profile__about-me'); // вид деятельности показанный на странице
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
};


const formEditElement = popupProfileEdit.querySelector('.popup__form'); // форма редактирования профиля
const formAddElement = popupAddCard.querySelector('.popup__form'); // форма добавления элемента


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


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


class Card {
  constructor(data, template, popupImage, descriptionPopup,) {
    this._title = data.name;
    this._image = data.link;
  }

  _getTemplate() {
    const cardElement = templateCardElement
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.card__image').src = this._image;
    this._element.querySelector('.card__name').textContent = this._title;

    return this._element;
  }

  _handleOpenPopup() {
    picturePopupImage.src = this._image;
    descriptionPopupImage.textContent = this._title;
    openPopup(popupShowImage);
  }

  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleOpenPopup();
    });
    this._element.querySelector('.card__like').addEventListener('click', (event) => {
      event.target.classList.toggle('card__like_active');
    });
    this._element.querySelector('.btn_type_delete').addEventListener('click', (event) => {
      event.target.closest('.card').remove();
    });
    buttonCloseImgPopup.addEventListener('click', () => closePopup(popupShowImage));
  }
}

initialCards.forEach((item) => {
  const card = new Card(item);
  const cardElement = card.generateCard();

  listContainerElement.append(cardElement);
});

function addNewCard(event) {
  event.preventDefault();
  const inputTextTitle = titleInput.value;
  const inputTextLink = linkInput.value;
  const card = new Card({ name: inputTextTitle, link: inputTextLink });
  const cardElement = card.generateCard();
  listContainerElement.prepend(cardElement);
  formAddElement.reset();
  closePopup(popupAddCard);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

function editProfileInfo(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfileEdit);
}

function writeProfileInfo() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function resetValidityMassage(item) {
  const errors = item.querySelectorAll('.popup__error');
  const inputs = item.querySelectorAll('.popup__input');

  inputs.forEach((item) => {
    item.classList.remove('popup__input_type_error');
  });
  errors.forEach((item) => {
    item.textContent = '';
  })
}

function closePopupByClick(popup) {
  popup.addEventListener('mousedown', (event) => {
    const target = event.target;
    if (target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  });
}

function closeByEscape(evt) {
  const escapeCode = 27;
  if (evt.keyCode === escapeCode) {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
}

closePopupByClick(popupProfileEdit);
closePopupByClick(popupAddCard);
closePopupByClick(popupShowImage);

buttonEdit.addEventListener("click", () => {
  resetValidityMassage(popupProfileEdit);
  openPopup(popupProfileEdit);
  writeProfileInfo();
  validatorEdit.enableValidation();
});
buttonCloseEditPopup.addEventListener("click", () => {
  closePopup(popupProfileEdit);
  formEditElement.reset();
});
buttonCloseAddPopup.addEventListener("click", () => {
  closePopup(popupAddCard);
  formAddElement.reset();
});
buttonAdd.addEventListener("click", () => {
  formAddElement.reset();
  resetValidityMassage(popupAddCard);
  validatorAdd.enableValidation();
  openPopup(popupAddCard);
});

formEditElement.addEventListener('submit', editProfileInfo);
formAddElement.addEventListener('submit', addNewCard);