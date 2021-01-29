export { buttonEdit, buttonAdd, listContainerElement, initialCards, validationConfig }
// конфиг начального списка карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'

  },
  {
    name: 'Ставрополь',
    link: 'https://stv24.tv/wp-content/uploads/2019/12/11/8cc25a94f1fa7968b98fb26b6231b737.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Новочеркасск',
    link: 'https://foto-don.ru/photo/novocherkassk/platov_sobor0.jpg'
  }
];

// конфиг для класса валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: '.popup__error'
};

const buttonEdit = document.querySelector('.btn_type_edit'); // кнопка редактировать профиль 
const buttonAdd = document.querySelector('.btn_type_add'); // кнопка добавить карточку
const listContainerElement = document.querySelector('.cards'); // контейнер со всеми карточками 
