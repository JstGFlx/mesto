const buttonEdit = document.querySelector('.btn_type_edit'); // кнопка редактировать профиль 
const buttonAdd = document.querySelector('.btn_type_add'); // кнопка добавить карточку
const buttonLike = document.querySelector('.card__like'); // кнопка поставить лайк
const popupShowImage = document.querySelector('.popup_type_img');  // попап с увеличенной картинкой
const popupProfileEdit = document.querySelector('.popup_type_edit'); // попап с формой редактирования профиля 
const popupAddCard = document.querySelector('.popup_type_add'); // попап с формой добавления карточки
const buttonCloseEditPopup = popupProfileEdit.querySelector('.btn_type_close'); // кнопка закрыть попап редактирования 
const buttonCloseAddPopup = popupAddCard.querySelector('.btn_type_close');  // кнопка закрыть попап добавления
const buttonCloseImgPopup = popupShowImage.querySelector('.btn_type_close'); // кнопка закрыть попап большого изображения
const formEditElement = popupProfileEdit.querySelector('.popup__container'); // форма редактирования профиля
const formAddElement = popupAddCard.querySelector('.popup__container'); // форма добавления элемента
const listContainerElement = document.querySelector('.cards'); // контейнер со всеми карточками 
const templateCardElement = document.querySelector('.template'); // темплейт элемент карточки 
const picturePopupImage = popupShowImage.querySelector('.popup__image'); // картинка от попапа увеличения изображения
const descriptionPopupImage = popupShowImage.querySelector('.popup__description'); // описание картинки от попапа увеличенного изображения
const nameInput = popupProfileEdit.querySelector('.popup__input_text_name'); // поле ввода имени
const jobInput = popupProfileEdit.querySelector('.popup__input_text_about-me'); // поле ввода вида деятельности
const titleInput = popupAddCard.querySelector('.popup__input_text_title'); // поле ввода описания изображения 
const linkInput = popupAddCard.querySelector('.popup__input_text_link'); // поле ввода ссылки на изображение
const profileName = document.querySelector('.profile__name'); // имя профиля показанный на странице
const profileJob = document.querySelector('.profile__about-me'); // вид деятельности показанный на странице

function renderList() { 
  const listItems = initialCards.map(composeItem);
  listContainerElement.append(...listItems);
}

function composeItem(item) { // функция создания карточки
  const newItem = templateCardElement.content.cloneNode(true);
  const titleElement = newItem.querySelector('.card__name');
  const imgElement = newItem.querySelector('.card__image');
  const likeElement = newItem.querySelector('.card__like');
  titleElement.textContent = item.name; // беру описание карточки из массива
  imgElement.src = item.link; // беру ссылку на картинку из массива
  imgElement.alt = item.name;
  removeItemListener(newItem);
  likeElement.addEventListener('click', (event)=> {
    event.target.classList.toggle('card__like_active')
  });
  imgElement.addEventListener('click', ()=> {
    showImagePopup(item.link, item.name)
  });
  return newItem;
}

function showImagePopup(link, name) { // функция открытия попапа с увеличенной картинкой
  picturePopupImage.src = link;
  picturePopupImage.alt = name;
  descriptionPopupImage.textContent = name;
  handlePopupOpenButtonClick(popupShowImage);
}

function AddNewCard(event) {
  event.preventDefault();
  const inputTextTitle = titleInput.value;
  const inputTextLink = linkInput.value;
  const item = composeItem({ name: inputTextTitle, link: inputTextLink})
  listContainerElement.prepend(item);
  formAddElement.reset();
  handlePopupCloseButtonClick(popupAddCard);
}

function handlePopupCloseButtonClick(popup) {
  popup.classList.remove('popup_opened');
}

function handlePopupOpenButtonClick(popup) {
  popup.classList.add('popup_opened');
}

function removeItemListener(item) {
  const buttonDelete = item.querySelector('.btn_type_delete');
  buttonDelete.addEventListener('click', removeItem);
}

function removeItem(event){
  const targetItem = event.target.closest('.card');
  targetItem.remove();
}


function editProfileInfo(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  handlePopupCloseButtonClick(popupProfileEdit);
}

function writeProfileInfo() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

renderList();

buttonEdit.addEventListener('click', ()=> {
  handlePopupOpenButtonClick(popupProfileEdit);
  writeProfileInfo();
});
buttonCloseEditPopup.addEventListener('click', ()=> {
  handlePopupCloseButtonClick(popupProfileEdit);
  formEditElement.reset();
});
buttonCloseAddPopup.addEventListener('click', ()=> {
  handlePopupCloseButtonClick(popupAddCard);
  formAddElement.reset();
});
buttonAdd.addEventListener('click', ()=>handlePopupOpenButtonClick(popupAddCard));
buttonCloseImgPopup.addEventListener('click', ()=>handlePopupCloseButtonClick(popupShowImage));
formEditElement.addEventListener('submit', editProfileInfo);
formAddElement.addEventListener('submit', AddNewCard);