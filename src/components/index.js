import {initialCards} from "../constants";
import {enableValidation} from "./validate";
import {setPopupCloseListeners, setEscPopupListener} from "./modal";
import {closePopup, openPopup} from "./utils";
import {createCard} from "./card";
import '../pages/index.css';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileUserName = document.querySelector('.profile__user-name');
const profileUserAbout = document.querySelector('.profile__user-about');
const profileAddButton = document.querySelector('.profile__add-button');

const popupList = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupImage = document.querySelector('.popup_type_image');

const popupImageElement = popupImage.querySelector('.card__image_type_popup');
const popupImageTitle = popupImage.querySelector('.card__title_type_popup');

const editProfileForm = document.forms['edit-profile-form'];
const addCardForm = document.forms['add-card-form'];
const userNameFormField = editProfileForm.elements.userName;
const userAboutFormField = editProfileForm.elements.userAbout;
const placeTitleFormField = addCardForm.elements.placeTitle;
const placeLinkFormField = addCardForm.elements.placeLink;

const cards = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;

function renderInitialCards() {
    for (let i = 0; i < initialCards.length; i++) {
        const card = createCard(initialCards[i].link, initialCards[i].name, cardTemplate);
        setCardImageListener(card);
        cards.append(card);
    }
}

function setCardImageListener(cardEl) {
    const cardImage = cardEl.querySelector('.card__image');
    cardImage.addEventListener('click', function (event) {
        setEscPopupListener(popupList);
        popupImageElement.src = event.target.src;
        popupImageElement.alt = event.target.alt;
        popupImageTitle.textContent = event.target.alt;
        openPopup(popupImage);
    });
}

profileEditButton.addEventListener('click', function () {
    setEscPopupListener(popupList);
    userNameFormField.value = profileUserName.textContent;
    userAboutFormField.value = profileUserAbout.textContent;
    openPopup(popupProfile);
});

profileAddButton.addEventListener('click', function () {
    setEscPopupListener(popupList);
    openPopup(popupAddCard);
});

editProfileForm.addEventListener('submit', function (event) {
    event.preventDefault();
    profileUserName.textContent = userNameFormField.value;
    profileUserAbout.textContent = userAboutFormField.value;
    closePopup(popupProfile);
});

addCardForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const newCard = createCard(placeLinkFormField.value, placeTitleFormField.value);
    setCardImageListener(newCard);
    cards.prepend(newCard);
    placeTitleFormField.value = '';
    placeLinkFormField.value = '';
    closePopup(popupAddCard);
});

setPopupCloseListeners(popupList);

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
});

renderInitialCards();