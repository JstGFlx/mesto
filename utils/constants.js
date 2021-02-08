import agra from "../images/card-images/Agra.jpg";
import barcelona from "../images/card-images/Barcelona.jpg";
import florence from "../images/card-images/Florence.jpg";
import hiroshima from "../images/card-images/Hiroshima.jpg";
import moscow from "../images/card-images/Moscow.jpg";
import singapore from "../images/card-images/singapore.jpg";
export {
  buttonEdit,
  buttonAdd,
  listContainerElement,
  initialCards,
  validationConfig,
};
// конфиг начального списка карточек
const initialCards = [
  {
    name: "Агра",
    link: agra,
  },
  {
    name: "Барселона",
    link: barcelona,
  },
  {
    name: "Хиросима",
    link: hiroshima,
  },
  {
    name: "Флоренция",
    link: florence,
  },
  {
    name: "Москва",
    link: moscow,
  },
  {
    name: "Сингапур",
    link: singapore,
  },
];

// конфиг для класса валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: ".popup__error",
};

const buttonEdit = document.querySelector(".btn_type_edit"); // кнопка редактировать профиль
const buttonAdd = document.querySelector(".btn_type_add"); // кнопка добавить карточку
const listContainerElement = document.querySelector(".cards"); // контейнер со всеми карточками
