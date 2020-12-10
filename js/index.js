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
const buttonEdit = document.querySelector('.btn-edit');
const buttonAdd = document.querySelector('.btn-add');
const buttonLike = document.querySelector('.card__like');
const showImagePopap = document.querySelector('.popup-img');
const editProfilePopup = document.querySelector('.popup_type_edit');
const addProfilePopup = document.querySelector('.popup_type_add');
const popupEditCloseButton = editProfilePopup.querySelector('.btn-close');
const popupAddCloseButton = addProfilePopup.querySelector('.btn-close');
const formEditElement = document.getElementById('profileEditForm');
const formAddElement = document.getElementById('profileAddForm');
const listContainerElement = document.querySelector('.cards');
const templateCardElement = document.querySelector('.template');


let nameInput = document.querySelector('.popup__input_text_name');
let jobInput = document.querySelector('.popup__input_text_about-me');
let titleInput = document.querySelector('.popup__input_text_title');
let linkInput = document.querySelector('.popup__input_text_link');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__about-me');

function renderList() {
	const listItems = initialCards.map(composeItem);
	listContainerElement.append(...listItems);
}

function writeProfileInfo() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function composeItem(item) {
	const newItem = templateCardElement.content.cloneNode(true);
	const titleElement = newItem.querySelector('.card__name');
	const imgElement = newItem.querySelector('.card__image');
	const likeElement = newItem.querySelector('.card__like');
	titleElement.textContent = item.name;
	imgElement.src = item.link;
	removeListenerToItem(newItem);
	likeElement.addEventListener('click', (evt)=> {
		evt.target.classList.toggle('card__like_active')
	});
	imgElement.addEventListener('click', ()=>handlePopupOpenButtonClick(showImagePopap));
	return newItem;
}

function handlePopupCloseButtonClick(popup) {
	popup.classList.remove('popup_opened');
}

function handlePopupOpenButtonClick(popup) {
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


function editProfileInfo(evt) {
	evt.preventDefault();
	profileName.textContent = nameInput.value;
	profileJob.textContent = jobInput.value;
	handlePopupCloseButtonClick(editProfilePopup);
}

function AddNewCard(evt) {
	evt.preventDefault();
	const inputTextTitle = titleInput.value;
	const inputTextLink = linkInput.value;
	const item = composeItem({ name: inputTextTitle, link: inputTextLink})
	listContainerElement.prepend(item);
	handlePopupCloseButtonClick(addProfilePopup);
	titleInput.value = '';
	linkInput.value = '';
}

renderList();
writeProfileInfo();

buttonEdit.addEventListener('click', ()=>handlePopupOpenButtonClick(editProfilePopup));
buttonAdd.addEventListener('click', ()=>handlePopupOpenButtonClick(addProfilePopup));
popupEditCloseButton.addEventListener('click', ()=>handlePopupCloseButtonClick(editProfilePopup));
popupAddCloseButton.addEventListener('click', ()=>handlePopupCloseButtonClick(addProfilePopup));
formEditElement.addEventListener('submit', editProfileInfo);
formAddElement.addEventListener('submit', AddNewCard);