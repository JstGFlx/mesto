// класс элемента карточки
export default class Card {
  constructor(
    { name, link, likes, _id, owner },
    template,
    myId,
    { handleImageClick, handleDeleteClick, handleLikeClick }
  ) {
    this._title = name;
    this._image = link;
    this._id = _id;
    this._owner = owner;
    this._template = document.querySelector(template);
    this._likes = likes;
    this._myId = myId;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
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

  _deleteTheLike = (res) => {
    this._likes = res.likes;
    this._likeCounter.textContent = res.likes.length;
    this._likeButton.classList.remove("card__like_active");
  };

  _addTheLike = (res) => {
    this._likes = res.likes;
    this._likeCounter.textContent = res.likes.length;
    this._likeButton.classList.add("card__like_active");
  };

  _checkMyLike = () => {
    return this._likes.some((obj) => {
      return obj._id === this._myId;
    });
  };

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
      this._handleImageClick(this._image, this._title);
    });
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(
        this._checkMyLike(),
        this._id,
        this._deleteTheLike,
        this._addTheLike
      );
    });
    this._elementBtnDelete.addEventListener("click", () => {
      this._handleDeleteClick(this._element, this._id);
    });
  }
}
