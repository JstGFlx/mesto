import FormValidator from "../components/FormValidator.js"; // импорт класса валидации форм
import Card from "../components/Card.js"; // импорт класса элемента карточки
import Section from "../components/Section.js"; // импорт класса отрисовки элементов
import PopupWithImage from "../components/PopupWithImage.js"; // импорт класса попапа увеличенной картинки
import PopupWithForm from "../components/PopupWithForm.js"; // импорт класса поапа с формой
import UserInfo from "../components/UserInfo.js"; // импорт класса управляющего отображением информации профиля
import PopupWithDelete from "../components/PopupWithDelete.js";
import {
  renderLoadTextBtnEdit,
  renderLoadTextBtnAdd,
  showErrorMassage,
  renderLoadTextBtnDelete,
} from "../utils/utils.js";
import Api from "../components/Api.js";
import {
  buttonEdit,
  buttonAdd,
  validationConfig,
  profileAvatar,
  btnSubmitEdit,
  btnSubmitEditAvatar,
} from "../utils/constants.js"; //импорт DOM элементов страницы
import "./index.css";

let userId;

const validatorEdit = new FormValidator(validationConfig, "edit-profile"); //включение валидации формы редактирования профиля
const validatorAdd = new FormValidator(validationConfig, "add-new-card"); // включение валидации формы добавления новой карточки
const validatorAvatar = new FormValidator(validationConfig, "change-avatar");

const api = new Api(
  {
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-20",
    headers: {
      authorization: "79accf8f-cc76-4033-84f9-2d1d81c30157",
      "Content-Type": "application/json",
    },
  },
  renderLoadTextBtnEdit,
  renderLoadTextBtnAdd,
  renderLoadTextBtnDelete,
  btnSubmitEdit,
  btnSubmitEditAvatar
);

//получение и установка начальной информации пользователя и инициализация начального списка карточек
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([info, cards]) => {
    userId = info._id;
    usesInfo.setUserInfo(info);
    cardsList.renderItems(cards);
  })
  .catch((err) => {
    showErrorMassage(err);
  });

const cardsList = new Section(
  {
    renderer: (item) => {
      const card = createCard(item);
      cardsList.appendItem(card.generateCard());
    },
  },
  ".cards"
);

const createCard = (data) => {
  return new Card(data, ".template", userId, {
    handleImageClick: (image, title) => {
      popupTypeImage.openPopup(image, title);
    },
    handleDeleteClick: (element, id) => {
      popupTypeDelete.openPopup(element, id);
    },
    handleLikeClick: (myLike, id, deleteTheLike, addTheLike) => {
      if (myLike) {
        api
          .deleteLike(id)
          .then((res) => {
            deleteTheLike(res);
          })
          .catch((err) => {
            showErrorMassage(err);
          });
      } else {
        api
          .putLikeCard(id)
          .then((res) => {
            addTheLike(res);
          })
          .catch((err) => {
            showErrorMassage(err);
          });
      }
    },
  });
};

const popupTypeAdd = new PopupWithForm(
  {
    submitForm: (item) => {
      api
        .postNewCard(item)
        .then((res) => {
          const card = createCard(res);
          cardsList.prependItem(card.generateCard());
        })
        .catch((err) => {
          showErrorMassage(err);
        })
        .finally(() => {
          renderLoadTextBtnAdd(false);
          popupTypeAdd.closePopup();
        });
    },
  },
  ".popup_type_add"
);

//инициализация попапа редактирования профиля
const popupTypeEdit = new PopupWithForm(
  {
    submitForm: (item) => {
      api
        .pathUserInfo(item)
        .then((res) => {
          usesInfo.setUserInfo(res);
        })
        .catch((err) => {
          showErrorMassage(err);
        })
        .finally(() => {
          renderLoadTextBtnEdit(false, btnSubmitEdit);
          popupTypeEdit.closePopup();
        });
    },
  },
  ".popup_type_edit"
);

//инициализация попапа добавления новой карточки
const popupTypeAvatar = new PopupWithForm(
  {
    submitForm: (item) => {
      api
        .patchAvatar(item.link)
        .then((res) => {
          usesInfo.setUserInfo(res);
        })
        .catch((err) => {
          showErrorMassage(err);
        })
        .finally(() => {
          popupTypeAvatar.closePopup();
          renderLoadTextBtnEdit(false, btnSubmitEditAvatar);
        });
    },
  },
  ".popup_type_avatar"
);

//инициализация попапа увеличенной картинки
const popupTypeImage = new PopupWithImage(".popup_type_img");

const popupTypeDelete = new PopupWithDelete(".popup_type_delete", {
  handleDeleteCard: (id, card, closePopup) => {
    renderLoadTextBtnDelete(true);
    api
      .deleteCard(id)
      .catch((err) => {
        showErrorMassage(err);
      })
      .finally(() => {
        renderLoadTextBtnDelete(false);
        card.remove();
        closePopup();
      });
  },
});

//инициализация блока управления инфорацией профиля
const usesInfo = new UserInfo({
  name: ".profile__name",
  about: ".profile__about-me",
  avatar: ".profile__avatar",
});

popupTypeEdit.setEventListeners();
popupTypeAdd.setEventListeners();
popupTypeImage.setEventListeners();
popupTypeDelete.setEventListeners();
popupTypeAvatar.setEventListeners();

validatorEdit.enableValidation();
validatorAdd.enableValidation();
validatorAvatar.enableValidation();

buttonEdit.addEventListener("click", () => {
  popupTypeEdit.setInitialInputsValues(usesInfo.getUserInfo());
  validatorEdit.resetValidityMassage();
  validatorEdit.setButtonState();
  popupTypeEdit.openPopup();
});
buttonAdd.addEventListener("click", () => {
  validatorAdd.resetValidityMassage();
  validatorAdd.reseteInputsValues();
  validatorAdd.setButtonState();
  popupTypeAdd.openPopup();
});
profileAvatar.addEventListener("click", () => {
  validatorAvatar.reseteInputsValues();
  validatorAvatar.resetValidityMassage();
  validatorAvatar.setButtonState();
  popupTypeAvatar.openPopup();
});
