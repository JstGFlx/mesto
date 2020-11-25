const buttonEdit = document.querySelector('.btn-edit');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.btn-close');
const formElement = document.querySelector('.popup__container');

let nameInput = document.querySelector('.popup__input_text_name');
let jobInput = document.querySelector('.popup__input_text_about-me');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__about-me');

function handleButtonEditClick() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popup.classList.add('popup_opened');
}

function handlePopupCloseButtonClick() {
	popup.classList.remove('popup_opened');
}

function editProfileInfo(evt) {
	evt.preventDefault();
	profileName.textContent = nameInput.value;
	profileJob.textContent = jobInput.value;
	handlePopupCloseButtonClick();
}

buttonEdit.addEventListener('click', handleButtonEditClick);
popupCloseButton.addEventListener('click', handlePopupCloseButtonClick);
formElement.addEventListener('submit', editProfileInfo);