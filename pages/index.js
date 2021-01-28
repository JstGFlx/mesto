import FormValidator from '../components/FormValidator.js'; // импорт класса валидации форм
import { initialCards } from '../utils/initialCards.js'; // импорт конфига списка карт
import { validationConfig } from '../utils/validationConfig.js';  // импорт конфига валидации
import Card from '../components/Card.js'; // импорт класса элемента карточки
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import { buttonEdit, buttonAdd, listContainerElement } from '../utils/constants.js'

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
