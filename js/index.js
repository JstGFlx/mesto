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
		name: 'Иваново',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
		name: 'Камчатка',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
		name: 'Холмогорский район',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	},
	{
		name: 'Байкал',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	}
];
const buttonEdit = document.querySelector('.btn-edit'); // кнопка редактировать профиль 
const buttonAdd = document.querySelector('.btn-add'); // кнопка добавить карточку
const buttonLike = document.querySelector('.card__like'); // кнопка поставить лайк
const popupShowImage = document.querySelector('.popup-img');  // попап с увеличенной картинкой
const popupProfileEdit = document.querySelector('.popup_type_edit'); // попап с формой редактирования профиля 
const popupAddCard = document.querySelector('.popup_type_add'); // попап с формой добавления карточки
const buttonCloseEditPopup = popupProfileEdit.querySelector('.btn-close'); // кнопка закрыть попап редактирования 
const buttonCloseAddPopup = popupAddCard.querySelector('.btn-close');  // кнопка закрыть попап добавления
const buttonCloseImgPopup = popupShowImage.querySelector('.btn-close'); // кнопка закрыть попап большого изображения
const formEditElement = document.getElementById('profileEditForm'); // форма редактирования профиля
const formAddElement = document.getElementById('profileAddForm'); // форма добавления элемента
const listContainerElement = document.querySelector('.cards'); // контейнер со всеми карточками 
const templateCardElement = document.querySelector('.template'); // темплейт элемент карточки 
const picturePopupImage = document.querySelector('.popup-img__image'); // картинка от попапа увеличения изображения
const descriptionPopupImage = document.querySelector('.popup-img__description'); // описание картинки от попапа увеличенного изображения


let nameInput = document.querySelector('.popup__input_text_name'); // поле ввода имени
let jobInput = document.querySelector('.popup__input_text_about-me'); // поле ввода вида деятельности
let titleInput = document.querySelector('.popup__input_text_title'); // поле ввода описания изображения 
let linkInput = document.querySelector('.popup__input_text_link'); // поле ввода ссылки на изображение
let profileName = document.querySelector('.profile__name'); // имя профиля
let profileJob = document.querySelector('.profile__about-me'); // вид деятельности

function renderList() { 
	const listItems = initialCards.map(composeItem);
	listContainerElement.append(...listItems);
}

function composeItem(item) {
	const newItem = templateCardElement.content.cloneNode(true);
	const titleElement = newItem.querySelector('.card__name');
	const imgElement = newItem.querySelector('.card__image');
	const likeElement = newItem.querySelector('.card__like');
	titleElement.textContent = item.name;
	imgElement.src = item.link;
	removeListenerToItem(newItem);
	likeElement.addEventListener('click', (event)=> {
		event.target.classList.toggle('card__like_active')
	});
	imgElement.addEventListener('click', showImagePopup);
	return newItem;
}

function AddNewCard(event) {
	event.preventDefault();
	const inputTextTitle = titleInput.value;
	const inputTextLink = linkInput.value;
	const item = composeItem({ name: inputTextTitle, link: inputTextLink})
	listContainerElement.prepend(item);
	handlePopupCloseButtonClick(popupAddCard);
}

function showImagePopup(event) {
	const targetImage = event.target.closest('.card__image');
	/* const targetDescription = event.target.closest('.card__name');
	descriptionPopupImage.textContent = targetDescription.textContent; */
	picturePopupImage.src = targetImage.src;
	handlePopupOpenButtonClick(popupShowImage);
}

function handlePopupCloseButtonClick(popup) {
	popup.classList.remove('popup_opened');
	formEditElement.reset();
	formAddElement.reset();
}

function handlePopupOpenButtonClick(popup) {
	writeProfileInfo();
  popup.classList.add('popup_opened');
}

function removeListenerToItem(item) {
	const buttonDelete = item.querySelector('.btn-delete');
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

buttonEdit.addEventListener('click', ()=>handlePopupOpenButtonClick(popupProfileEdit));
buttonAdd.addEventListener('click', ()=>handlePopupOpenButtonClick(popupAddCard));
buttonCloseImgPopup.addEventListener('click', ()=>handlePopupCloseButtonClick(popupShowImage));
buttonCloseEditPopup.addEventListener('click', ()=>handlePopupCloseButtonClick(popupProfileEdit));
buttonCloseAddPopup.addEventListener('click', ()=>handlePopupCloseButtonClick(popupAddCard));
formEditElement.addEventListener('submit', editProfileInfo);
formAddElement.addEventListener('submit', AddNewCard);