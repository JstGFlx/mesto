export {
  buttonEdit,
  buttonAdd,
  listContainerElement,
  validationConfig,
  profileAvatar,
  loaderInfo,
  spinnerAvatar,
  loaderCards,
  btnSubmitEdit,
  btnSubmitAdd,
  btnSubmitDelete,
  btnSubmitEditAvatar,
  errorTemplate,
  errorsContainer,
};

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
const profileAvatar = document.querySelector(".profile__avatar");
const loaderInfo = document.querySelector(".loader_type_profile");
const loaderCards = document.querySelector(".loader_type_cards");
const spinnerAvatar = document.querySelector(".spinner");
const btnSubmitEdit = document.querySelector(".popup__button_type_edit");
const btnSubmitEditAvatar = document.querySelector(
  ".popup__button_type_edit-avatar"
);
const btnSubmitAdd = document.querySelector(".popup__button_type_add");
const btnSubmitDelete = document.querySelector(".popup__button_type_delete");
const errorTemplate = document.querySelector(".error__template");
const errorsContainer = document.querySelector(".errors");
