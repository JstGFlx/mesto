import FormValidator from '../components/FormValidator.js'; // импорт класса валидации форм
import { initialCards } from '../utils/initialCards.js'; // импорт конфига списка карт
import { validationConfig } from '../utils/validationConfig.js';  // импорт конфига валидации
import Card from '../components/Card.js'; // импорт класса элемента карточки
import Section from '../components/Section.js' // импорт класса отрисовки элементов
import PopupWithImage from '../components/PopupWithImage.js' // импорт класса попапа увеличенной картинки
import PopupWithForm from '../components/PopupWithForm.js' // импорт класса поапа с формой 
import UserInfo from '../components/UserInfo.js' // импорт класса управляющего отображением информации профиля
import { buttonEdit, buttonAdd, listContainerElement } from '../utils/constants.js' //импорт DOM элементов страницы

const validatorEdit = new FormValidator(validationConfig, "edit-profile");  //включение валидации формы редактирования профиля
const validatorAdd = new FormValidator(validationConfig, "add-new-card"); // включение валидации формы добавления новой карточки
//инициализация начального списка карточек
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardsList.addItem(generateCardElement(item));
  },
},
  listContainerElement
);
//инициализация попапа редактирования профиля
const popupTypeEdit = new PopupWithForm({
  submitForm: (item) => {
    usesInfo.setUserInfo(item);
  }
},
  '.popup_type_edit'
);
//инициализация попапа добавления новой карточки
const popupTypeAdd = new PopupWithForm({
  submitForm: (item) => {
    listContainerElement.prepend(generateCardElement(item));
  }
},
  '.popup_type_add'
);
//инициализация попапа увеличенной картинки
const popupTypeImage = new PopupWithImage('.popup_type_img');
//инициализация управления инфорацией профиля
const usesInfo = new UserInfo({ name: '.profile__name', aboutMe: '.profile__about-me' })
//функция генерации DOM элемента карточки
function generateCardElement(item) {
  const card = new Card(item, '.template', popupTypeImage.openPopup);
  const cardElement = card.generateCard();

  return cardElement;
}
//отрисовка начального списка карточек
cardsList.renderItems();

popupTypeEdit.setEventListeners();
popupTypeAdd.setEventListeners();
popupTypeImage.setEventListeners();

buttonEdit.addEventListener("click", () => {
  popupTypeEdit.setInitialInputsValues(usesInfo.getUserInfo());
  validatorEdit.enableValidation();
  popupTypeEdit.openPopup();
});

buttonAdd.addEventListener("click", () => {
  validatorAdd.enableValidation();
  popupTypeAdd.openPopup();
});
