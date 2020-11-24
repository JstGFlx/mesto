const buttonEdit = document.querySelector('.btn-edit');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.btn-close');
const popupSubmitButton = document.querySelector('.btn-submit');
const formElement = document.querySelector('.popup__container');

buttonEdit.addEventListener('click', handleButtonEditClick);

function handleButtonEditClick() {
  popup.classList.add('popup_opened');
}

function handlePopupCloseButtonClick() {
	popup.classList.remove('popup_opened');
	nameInput.value = profileName.textContent;
	jobInput.value = profileJob.textContent;
}

function handlePopupCloseButtonSubmit() {
	popup.classList.remove('popup_opened');
}

let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_about-me');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__about-me');

nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

function editProfileInfo(evt) {
	evt.preventDefault();
	profileName.textContent = nameInput.value;
	profileJob.textContent = jobInput.value;
	handlePopupCloseButtonSubmit();
}

popupCloseButton.addEventListener('click', handlePopupCloseButtonClick);
formElement.addEventListener('submit', editProfileInfo);