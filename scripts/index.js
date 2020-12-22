const buttonEdit = document.querySelector('.btn_type_edit'); // кнопка редактировать профиль 
const buttonAdd = document.querySelector('.btn_type_add'); // кнопка добавить карточку
const popupShowImage = document.querySelector('.popup_type_img');  // попап с увеличенной картинкой
const popupProfileEdit = document.querySelector('.popup_type_edit'); // попап с формой редактирования профиля 
const popupAddCard = document.querySelector('.popup_type_add'); // попап с формой добавления карточки
const buttonCloseEditPopup = popupProfileEdit.querySelector('.btn_type_close'); // кнопка закрыть попап редактирования 
const buttonCloseAddPopup = popupAddCard.querySelector('.btn_type_close');  // кнопка закрыть попап добавления
const buttonCloseImgPopup = popupShowImage.querySelector('.btn_type_close'); // кнопка закрыть попап большого изображения
const formEditElement = popupProfileEdit.querySelector('.popup__form'); // форма редактирования профиля
const formAddElement = popupAddCard.querySelector('.popup__form'); // форма добавления элемента
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
	addDeleteCardListener(newItem);
	likeElement.addEventListener('click', (event) => {
		event.target.classList.toggle('card__like_active')
	});
	imgElement.addEventListener('click', () => {
    showImagePopup(item.link, item.name)
    hoverBtnCloseByOverlay(popupShowImage);
	});
	return newItem;
}

function showImagePopup(link, name) { // функция открытия попапа с увеличенной картинкой
	picturePopupImage.src = link;
	picturePopupImage.alt = name;
	descriptionPopupImage.textContent = name;
	openPopup(popupShowImage);
}

function addNewCard(event) {
	event.preventDefault();
	const inputTextTitle = titleInput.value;
	const inputTextLink = linkInput.value;
	const item = composeItem({ name: inputTextTitle, link: inputTextLink })
	listContainerElement.prepend(item);
	formAddElement.reset();
	closePopup(popupAddCard);
}

function closePopup(popup) {
	popup.classList.remove('popup_opened');
	document.removeEventListener('keydown', closeByEscape);
}

function openPopup(popup) {
	popup.classList.add('popup_opened');
	document.addEventListener('keydown', closeByEscape);
}

function addDeleteCardListener(item) {
	const buttonDelete = item.querySelector('.btn_type_delete');
	buttonDelete.addEventListener('click', removeItem);
}

function removeItem(event) {
	const targetItem = event.target.closest('.card');
	targetItem.remove();
}


function editProfileInfo(event) {
	event.preventDefault();
	profileName.textContent = nameInput.value;
	profileJob.textContent = jobInput.value;
	closePopup(popupProfileEdit);
}

function writeProfileInfo() {
	nameInput.value = profileName.textContent;
	jobInput.value = profileJob.textContent;
}
function resetValidityMassage(event) {
	const errors = event.querySelectorAll('.popup__error');
	const inputs = event.querySelectorAll('.popup__input');

	inputs.forEach((item) => {
		item.classList.remove('popup__input_type_error');
	});
	errors.forEach((item) => {
		item.textContent = '';
	})
}

function closePopupByClick(popup) {
	popup.addEventListener('mousedown', (event) => {
    const target = event.target;
		if (target.classList.contains('popup_opened')) {
      closePopup(popup);
		}
	});
}

function closeByEscape(evt) {
	const escapeCode = 27;
	if (evt.keyCode === escapeCode) {
		const openedPopup = document.querySelector('.popup_opened')
		closePopup(openedPopup);
	}
}

function hoverBtnCloseByOverlay(popup) {
  const btnClose = popup.querySelector('.btn_type_close');
  popup.addEventListener('mouseover', (event) => {
    const target = event.target;
    if (target.classList.contains('popup_opened')) {
      btnClose.classList.add('btn_hover');
    }
  })
  popup.addEventListener('mouseout', (event) => {
    const target = event.target;
    if (target.classList.contains('popup_opened')) {
      btnClose.classList.remove('btn_hover');
    }
  })
}


renderList();
closePopupByClick(popupProfileEdit);
closePopupByClick(popupAddCard);
closePopupByClick(popupShowImage);

buttonEdit.addEventListener('click', () => {
	resetValidityMassage(popupProfileEdit);
  openPopup(popupProfileEdit);
  hoverBtnCloseByOverlay(popupProfileEdit);
	writeProfileInfo();
	enableValidation(validationConfig);
});
buttonCloseEditPopup.addEventListener('click', () => {
	closePopup(popupProfileEdit);
	formEditElement.reset();
});
buttonCloseAddPopup.addEventListener('click', () => {
  closePopup(popupAddCard);
	formAddElement.reset();
});
buttonAdd.addEventListener('click', () => {
	formAddElement.reset();
	resetValidityMassage(popupAddCard);
  openPopup(popupAddCard);
  hoverBtnCloseByOverlay(popupAddCard);
	enableValidation(validationConfig);
});
buttonCloseImgPopup.addEventListener('click', () => closePopup(popupShowImage));
formEditElement.addEventListener('submit', editProfileInfo);
formAddElement.addEventListener('submit', addNewCard);