import {
  spinnerAvatar,
  btnSubmitAdd,
  btnSubmitDelete,
} from "../utils/constants.js";

export {
  renderSpinnerAvatar,
  renderLoading,
  renderLoadTextBtnEdit,
  renderLoadTextBtnAdd,
  renderLoadTextBtnDelete,
};

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
