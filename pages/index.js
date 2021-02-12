import FormValidator from "../components/FormValidator.js"; // импорт класса валидации форм
import Card from "../components/Card.js"; // импорт класса элемента карточки
import Section from "../components/Section.js"; // импорт класса отрисовки элементов
import PopupWithImage from "../components/PopupWithImage.js"; // импорт класса попапа увеличенной картинки
import PopupWithForm from "../components/PopupWithForm.js"; // импорт класса поапа с формой
import UserInfo from "../components/UserInfo.js"; // импорт класса управляющего отображением информации профиля
import PopupWithDelete from "../components/PopupWithDelete.js";
import {
  renderSpinnerAvatar,
  renderLoading,
  renderLoadTextBtnEdit,
  renderLoadTextBtnAdd,
} from "../utils/utils.js";
//showErrorMassage,
import Api from "../components/Api.js";
import {
  buttonEdit,
  buttonAdd,
  listContainerElement,
  validationConfig,
  profileAvatar,
  btnSubmitEdit,
  btnSubmitEditAvatar,
  loaderInfo,
  loaderCards,
} from "../utils/constants.js"; //импорт DOM элементов страницы
import "./index.css";

const validatorEdit = new FormValidator(validationConfig, "edit-profile"); //включение валидации формы редактирования профиля
const validatorAdd = new FormValidator(validationConfig, "add-new-card"); // включение валидации формы добавления новой карточки
const validatorAvatar = new FormValidator(validationConfig, "change-avatar");

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-20",
  headers: {
    authorization: "79accf8f-cc76-4033-84f9-2d1d81c30157",
    "Content-Type": "application/json",
  },
});
//инициализация начального списка карточек
api
  .getInitialCards()
  .then((res) => {
    const cardsList = new Section(
      {
        items: res,
        renderer: (item) => {
          const card = new Card(
            item,
            ".template",
            "8ab59052478cb887db10ead2",
            popupTypeImage.openPopup,
            popupTypeDelete.openPopup,
            api.putLikeCard,
            api.deleteLike,
            {
              handleDeleteClick: () => {
                popupTypeDelete.openPopup(card);
              },
            }
          );
          cardsList.addItem(card.generateCard());
        },
      },
      listContainerElement
    );
    cardsList.renderItems();
  })
  .catch((err) => {
    //showErrorMassage(err);
  })
  .finally(() => {
    renderLoading(false, loaderCards);
  });
//получение и установка начальной информации пользователя
api
  .getUserInfo()
  .then((res) => {
    usesInfo.setUserInfo(res);
    profileAvatar.style.backgroundImage = `url(${res.avatar})`;
  })
  .catch((err) => {
    //showErrorMassage(err);
  })
  .finally(() => {
    renderLoading(false, loaderInfo);
    renderSpinnerAvatar(false);
  });

const popupTypeAdd = new PopupWithForm(
  {
    submitForm: (item) => {
      api
        .postNewCard(item)
        .then((res) => {
          const card = new Card(
            res,
            ".template",
            "8ab59052478cb887db10ead2",
            popupTypeImage.openPopup,
            popupTypeDelete.openPopup,
            api.putLikeCard,
            api.deleteLike,
            {
              handleDeleteClick: () => {
                popupTypeDelete.openPopup(card);
              },
            }
          );
          listContainerElement.prepend(card.generateCard());
        })
        .catch((err) => {
          //showErrorMassage(err);
        })
        .finally(() => {
          renderLoadTextBtnAdd(false);
          popupTypeAdd.closePopup();
        });
    },
  },
  ".popup_type_add",
  validatorAdd.resetValidityMassage
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
          //showErrorMassage(err);
        })
        .finally(() => {
          renderLoadTextBtnEdit(false, btnSubmitEdit);
          popupTypeEdit.closePopup();
        });
    },
  },
  ".popup_type_edit",
  validatorEdit.resetValidityMassage
);
//инициализация попапа добавления новой карточки
const popupTypeAvatar = new PopupWithForm(
  {
    submitForm: (item) => {
      api
        .patchAvatar(item.link)
        .then((res) => {
          profileAvatar.style.backgroundImage = `url(${item.link})`;
        })
        .catch((err) => {
          //showErrorMassage(err);
        })
        .finally(() => {
          popupTypeAvatar.closePopup();
          renderLoadTextBtnEdit(false, btnSubmitEditAvatar);
          renderSpinnerAvatar(false);
        });
    },
  },
  ".popup_type_avatar",
  validatorAvatar.resetValidityMassage
);
//инициализация попапа увеличенной картинки
const popupTypeImage = new PopupWithImage(".popup_type_img");

const popupTypeDelete = new PopupWithDelete(
  ".popup_type_delete",
  api.deleteCard
);

//инициализация управления инфорацией профиля
const usesInfo = new UserInfo({
  name: ".profile__name",
  about: ".profile__about-me",
});

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
