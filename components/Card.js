// класс элемента карточки
//import { showErrorMassage } from "../utils/utils.js";
export default class Card {
  constructor(
    { name, link, likes, _id, owner },
    template,
    myId,
    openPopupView,
    openPopupDelete,
    putLikeCard,
    deleteLike,
    { handleDeleteClick }
  ) {
    this._title = name;
    this._image = link;
    this._id = _id;
    this._owner = owner;
    this._template = document.querySelector(template);
    this._openPopupView = openPopupView;
    this._openPopupDelete = openPopupDelete;
    this._putLikeCard = putLikeCard;
    this._deleteLike = deleteLike;
    this._likes = likes;
    this._handleDeleteClick = handleDeleteClick;
    this._myId = myId;
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector(".card__image");
    this._elementDesc = this._element.querySelector(".card__name");
    this._elementBtnDelete = this._element.querySelector(".btn_type_delete");
    this._likeButton = this._element.querySelector(".card__like");
    this._likeCounter = this._element.querySelector(".card__like-counter");
  }

  _getTemplate() {
    return this._template.content.querySelector(".card").cloneNode(true);
  }

  _toggleLikeTheCard(evt, id) {
    if (this._checkMyLike()) {
      this._deleteLike(id)
        .then((res) => {
          const myLike = this._likes.indexOf(
            this._likes.find((obj) => obj._id === this._myId)
          );

          this._likeCounter.textContent--;
          evt.target.classList.toggle("card__like_active");
          this._likes.splice(myLike, 1);
        })
        .catch((err) => {
          //showErrorMassage(err);
        });
    } else {
      this._putLikeCard(id)
        .then((res) => {
          this._likeCounter.textContent++;
          evt.target.classList.toggle("card__like_active");
          this._likes.push({ _id: this._myId });
        })
        .catch((err) => {
          //showErrorMassage(err);
        });
    }
  }

  _checkMyLike() {
    return this._likes.some((obj) => {
      return obj._id === this._myId;
    });
  }

  generateCard() {
    this._elementImage.src = this._image;
    this._elementImage.alt = this._title;
    this._elementDesc.textContent = this._title;
    this._likeCounter.textContent = this._likes.length;
    this._setEventListeners();
    if (this._owner._id === this._myId) {
      this._elementBtnDelete.classList.add("btn_visible");
    }
    if (this._checkMyLike()) {
      this._likeButton.classList.add("card__like_active");
    }

    return this._element;
  }

  _setEventListeners() {
    this._elementImage.addEventListener("click", () => {
      this._openPopupView(this._image, this._title);
    });
    this._likeButton.addEventListener("click", (evt) => {
      this._toggleLikeTheCard(evt, this._id, this._likes);
    });
    this._elementBtnDelete.addEventListener("click", this._handleDeleteClick);
  }
}
