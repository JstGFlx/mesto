const buttonEdit = document.querySelector('.btn_type_edit'); // кнопка редактировать профиль 
const buttonAdd = document.querySelector('.btn_type_add'); // кнопка добавить карточку
const popupShowImage = document.querySelector('.popup_type_img');  // попап с увеличенной картинкой

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

class Card {
  constructor(data) {
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