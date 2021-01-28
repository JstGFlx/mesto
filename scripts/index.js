import FormValidator from './FormValidator.js'; // импорт класса валидации форм
import { initialCards } from './initialCards.js'; // импорт конфига списка карт
import { validationConfig } from './validationConfig.js';  // импорт конфига валидации
import Card from './Card.js'; // импорт класса элемента карточки
import Section from './Section.js'
import PopupWithImage from './PopupWithImage.js'
import PopupWithForm from './PopupWithForm.js'
import UserInfo from './UserInfo.js'

const buttonEdit = document.querySelector('.btn_type_edit'); // кнопка редактировать профиль 
const buttonAdd = document.querySelector('.btn_type_add'); // кнопка добавить карточку

const listContainerElement = document.querySelector('.cards'); // контейнер со всеми карточками 

const validatorEdit = new FormValidator(validationConfig, "edit-profile");  //включение валидации формы редактирования профиля
const validatorAdd = new FormValidator(validationConfig, "add-new-card"); // включение валидации формы добавления новой карточки

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardsList.addItem(generateCardElement(item));
  },
},
  listContainerElement
);

const popupTypeEdit = new PopupWithForm({
  submitForm: (item) => {
    usesInfo.setUserInfo(item);
  }
},
  '.popup_type_edit'
);

const popupTypeAdd = new PopupWithForm({
  submitForm: (item) => {
    listContainerElement.prepend(generateCardElement(item));
  }
},
  '.popup_type_add'
);

const popupTypeImage = new PopupWithImage('.popup_type_img');

const usesInfo = new UserInfo({ name: '.profile__name', aboutMe: '.profile__about-me' })

function generateCardElement(item) {
  const card = new Card(item, '.template', popupTypeImage.openPopup);
  const cardElement = card.generateCard();

  return cardElement;
}

cardsList.renderItems();

popupTypeEdit.setEventListeners();
popupTypeAdd.setEventListeners();
popupTypeImage.setEventListeners();

buttonEdit.addEventListener("click", () => {
  popupTypeEdit.setInitialInputsValues(usesInfo.getUserInfo());
  popupTypeEdit.openPopup();
  validatorEdit.enableValidation();
});

buttonAdd.addEventListener("click", () => {
  validatorAdd.enableValidation();
  popupTypeAdd.openPopup();
});
