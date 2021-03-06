export {
  buttonEdit,
  buttonAdd,
  validationConfig,
  profileAvatar,
  btnSubmitEdit,
  btnSubmitAdd,
  btnSubmitDelete,
  btnSubmitEditAvatar,
  errorTemplate,
  errorsContainer,
  loadWrappers,
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
const profileAvatar = document.querySelector(".profile__avatar");
const btnSubmitEdit = document.querySelector(".popup__button_type_edit");
const btnSubmitEditAvatar = document.querySelector(
  ".popup__button_type_edit-avatar"
);
const btnSubmitAdd = document.querySelector(".popup__button_type_add");
const btnSubmitDelete = document.querySelector(".popup__button_type_delete");
const errorTemplate = document.querySelector(".error__template");
const errorsContainer = document.querySelector(".errors");
const loadWrappers = document.querySelectorAll(".load-wraper");
