const profileEditButton = document.querySelector('.profile__edit-button');
const profileUserName = document.querySelector('.profile__user-name');
const profileUserAbout = document.querySelector('.profile__user-about');

const popupEl = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');

const editProfileForm = document.forms['edit-profile-form'];
const userNameFormField = editProfileForm.elements.userName;
const userAboutFormField = editProfileForm.elements.userAbout;

function openPopup() {
    userNameFormField.value = profileUserName.textContent;
    userAboutFormField.value = profileUserAbout.textContent;
    popupEl.classList.add('popup_opened');
}

function closePopup() {
    popupEl.classList.remove('popup_opened');
}

function editProfileFormSubmitHandler(event) {
    event.preventDefault();
    profileUserName.textContent = userNameFormField.value;
    profileUserAbout.textContent = userAboutFormField.value;
    closePopup();
}

profileEditButton.addEventListener('click', openPopup);

popupCloseButton.addEventListener('click', closePopup);

editProfileForm.addEventListener('submit', editProfileFormSubmitHandler);