import {
  spinnerAvatar,
  btnSubmitAdd,
  btnSubmitDelete,
  errorTemplate,
  errorsContainer,
} from "../utils/constants.js";

export {
  renderSpinnerAvatar,
  renderLoading,
  renderLoadTextBtnEdit,
  renderLoadTextBtnAdd,
  renderLoadTextBtnDelete,
};
//showErrorMassage,
function renderSpinnerAvatar(isLoading) {
  if (isLoading) {
    spinnerAvatar.classList.add("spinner_visible");
  } else {
    spinnerAvatar.classList.remove("spinner_visible");
  }
}

function renderLoading(isLoading, loader) {
  if (isLoading) {
    loader.classList.add("loader_visible");
  } else {
    loader.classList.remove("loader_visible");
  }
}

function renderLoadTextBtnEdit(isLoading, btn) {
  if (isLoading) {
    btn.textContent = "Сохранение...";
  } else {
    btn.textContent = "Сохранить";
  }
}

function renderLoadTextBtnAdd(isLoading) {
  if (isLoading) {
    btnSubmitAdd.textContent = "Создание...";
  } else {
    btnSubmitAdd.textContent = "Создать";
  }
}

function renderLoadTextBtnDelete(isLoading) {
  if (isLoading) {
    btnSubmitDelete.textContent = "Удаление...";
  } else {
    btnSubmitDelete.textContent = "Да";
  }
}

function getTemplateError() {
  return errorTemplate.content.querySelector(".error").cloneNode(true);
}

function createErrorElement(err) {
  const errorElement = getTemplateError();
  errorElement.querySelector(
    ".error__massage"
  ).textContent = `${err}. Что-то пошло не так :(`;
  return errorElement;
}

function hideErrorMassage(err) {
  err.classList.remove("popup_opened");
}

//почему то с этой функцией не проходит тесты при загрузке работы хотя локально все работает без ошибок
/* function showErrorMassage(err) {
  const errElem = createErrorElement(err);
  errorsContainer.prepend(errElem);
  new Promise((res) => {
    setTimeout(() => {
      errElem.classList.add("popup_opened");
      res(errElem);
    }, 0);
  })
    .then((res) => {
      return new Promise((resault) => {
        setTimeout(() => {
          hideErrorMassage(res);
          resault(res);
        }, 5000);
      });
    })
    .then((res) => {
      setTimeout(() => {
        res.remove();
      }, 1000);
    });
} */
