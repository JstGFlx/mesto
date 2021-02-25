import {
  btnSubmitAdd,
  btnSubmitDelete,
  errorTemplate,
  errorsContainer,
  loadWrappers,
  profileAvatar,
} from "./constants";

export {
  renderLoadTextBtnEdit,
  renderLoadTextBtnAdd,
  renderLoadTextBtnDelete,
  showErrorMassage,
  displayLoadWrapper,
};

function displayLoadWrapper(isDisplay) {
  if (isDisplay) {
    loadWrappers.forEach((wraper) => {
      wraper.classList.add("display");
    });
  } else {
    loadWrappers.forEach((wraper) => {
      wraper.classList.remove("display");
    });
    profileAvatar.classList.add("display");
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

function showErrorMassage(err) {
  const errElem = createErrorElement(err);
  errorsContainer.prepend(errElem);
  new Promise((res) => {
    setTimeout(() => {
      errElem.classList.add("popup_opened");
      res(errElem);
    }, 0);
  })
    .then((res) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          hideErrorMassage(res);
          resolve(res);
        }, 5000);
      });
    })
    .then((res) => {
      setTimeout(() => {
        res.remove();
      }, 1000);
    });
}
