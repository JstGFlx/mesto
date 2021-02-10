// класс элемента карточки
export default class Card {
  constructor({ name, link, likes }, template, openPopupView, openPopupDelete) {
    this._title = name;
    this._image = link;
    this._template = document.querySelector(template);
    this._openPopupView = openPopupView;
    this._openPopupDelete = openPopupDelete;
    this._likes = likes;
  }

  _getTemplate() {
    const cardElement = this._template.content
      .querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _likeTheCard(evt) {
    evt.target.classList.toggle("card__like_active");
  }

  _deleteTheCard(evt) {
    evt.target.closest(".card").remove();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._elementImage = this._element.querySelector(".card__image");
    this._elementImage.src = this._image;
    this._elementImage.alt = this._title;
    this._element.querySelector(".card__name").textContent = this._title;
    this._element.querySelector(
      ".card__like-counter"
    ).textContent = this._likes.length;

    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._openPopupView(this._image, this._title);
      });
    this._element
      .querySelector(".card__like")
      .addEventListener("click", (evt) => {
        this._likeTheCard(evt);
      });
    this._element
      .querySelector(".btn_type_delete")
      .addEventListener("click", (evt) => {
        this._openPopupDelete(evt);
      });
  }
}
