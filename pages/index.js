import FormValidator from "../components/FormValidator.js"; // импорт класса валидации форм
import Card from "../components/Card.js"; // импорт класса элемента карточки
import Section from "../components/Section.js"; // импорт класса отрисовки элементов
import PopupWithImage from "../components/PopupWithImage.js"; // импорт класса попапа увеличенной картинки
import PopupWithForm from "../components/PopupWithForm.js"; // импорт класса поапа с формой
import UserInfo from "../components/UserInfo.js"; // импорт класса управляющего отображением информации профиля
import PopupWithDelete from "../components/PopupWithDelete.js";
import {
  buttonEdit,
  buttonAdd,
  listContainerElement,
  initialCards,
  validationConfig,
  profileAvatar,
} from "../utils/constants.js"; //импорт DOM элементов страницы
import "./index.css";

const validatorEdit = new FormValidator(validationConfig, "edit-profile"); //включение валидации формы редактирования профиля
const validatorAdd = new FormValidator(validationConfig, "add-new-card"); // включение валидации формы добавления новой карточки
const validatorAvatar = new FormValidator(validationConfig, "change-avatar");
//инициализация начального списка карточек
const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        item,
        ".template",
        popupTypeImage.openPopup,
        popupTypeDelete.openPopup
      );
      cardsList.addItem(card.generateCard());
    },
  },
  listContainerElement
);
//инициализация попапа редактирования профиля
const popupTypeEdit = new PopupWithForm(
  {
    submitForm: (item) => {
      usesInfo.setUserInfo(item);
    },
  },
  ".popup_type_edit",
  validatorEdit.resetValidityMassage
);
//инициализация попапа добавления новой карточки
const popupTypeAdd = new PopupWithForm(
  {
    submitForm: (item) => {
      const card = new Card(
        item,
        ".template",
        popupTypeImage.openPopup,
        popupTypeDelete.openPopup
      );
      listContainerElement.prepend(card.generateCard());
    },
  },
  ".popup_type_add",
  validatorAdd.resetValidityMassage
);

const popupTypeAvatar = new PopupWithForm(
  {
    submitForm: (item) => {
      profileAvatar.style.backgroundImage = `url(${item.link})`;
    },
  },
  ".popup_type_avatar",
  validatorAvatar.resetValidityMassage
);
//инициализация попапа увеличенной картинки
const popupTypeImage = new PopupWithImage(".popup_type_img");

const popupTypeDelete = new PopupWithDelete(".popup_type_delete");

//инициализация управления инфорацией профиля
const usesInfo = new UserInfo({
  name: ".profile__name",
  aboutMe: ".profile__about-me",
});

//отрисовка начального списка карточек
cardsList.renderItems();

popupTypeEdit.setEventListeners();
popupTypeAdd.setEventListeners();
popupTypeImage.setEventListeners();
popupTypeDelete.setEventListeners();
popupTypeAvatar.setEventListeners();

buttonEdit.addEventListener("click", () => {
  popupTypeEdit.setInitialInputsValues(usesInfo.getUserInfo());
  validatorEdit.enableValidation();
  popupTypeEdit.openPopup();
});

buttonAdd.addEventListener("click", () => {
  validatorAdd.enableValidation();
  popupTypeAdd.openPopup();
});
profileAvatar.addEventListener("click", () => {
  validatorAvatar.enableValidation();
  popupTypeAvatar.openPopup();
});
