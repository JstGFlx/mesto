// класс элемента карточки
export default class Card {
  constructor(data, template, showPopup) {
    this._title = data.name;
    this._image = data.link;
    this._template = template;
    this._showPopup = showPopup;
  }

  _getTemplate() {
    const cardElement = this._template
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.card__image').src = this._image;
    this._element.querySelector('.card__name').textContent = this._title;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._showPopup(this._image, this._title);
    });
    this._element.querySelector('.card__like').addEventListener('click', (event) => {
      event.target.classList.toggle('card__like_active');
    });
    this._element.querySelector('.btn_type_delete').addEventListener('click', (event) => {
      event.target.closest('.card').remove();
    });
  }
}