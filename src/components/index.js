import {initialCards} from "../constants";
import {enableValidation, hideInputError} from "./validate";
import {setPopupCloseListeners} from "./modal";
import {closePopup, openPopup} from "./utils";
import {createCard} from "./card";
import '../pages/index.css';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const profileUserName = document.querySelector('.profile__user-name');
const profileUserAbout = document.querySelector('.profile__user-about');

const popupList = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupImage = document.querySelector('.popup_type_image');

const editProfileForm = document.forms['edit-profile-form'];
const userNameFormField = editProfileForm.elements.userName;
const userAboutFormField = editProfileForm.elements.userAbout;
const addCardForm = document.forms['add-card-form'];
const placeTitleFormField = addCardForm.elements.placeTitle;
const placeLinkFormField = addCardForm.elements.placeLink;

const cards = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;

const cardOptions = {
    cardSelector: '.card',
    imageSelector: '.card__image',
    imagePopupSelector: '.card__image_type_popup',
    titleSelector: '.card__title',
    titlePopupSelector: '.card__title_type_popup',
    likeButtonSelector: '.card__like-button',
    deleteButtonSelector: '.card__delete-button',
    likeButtonActiveClass: 'card__like-button_active'
}

const validationOptions = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
};

function renderInitialCards() {
    for (let i = 0; i < initialCards.length; i++) {
        const card = createCard(
            initialCards[i].link,
            initialCards[i].name,
            cardTemplate,
            popupImage,
            cardOptions
        );
        cards.append(card);
    }
}

profileEditButton.addEventListener('click', function () {
    userNameFormField.value = profileUserName.textContent;
    userAboutFormField.value = profileUserAbout.textContent;
    if (editProfileForm.querySelector('.form__input_type_error')) {
        hideInputError(editProfileForm, userNameFormField, validationOptions);
        hideInputError(editProfileForm, userAboutFormField, validationOptions);
    }
    openPopup(popupProfile);
});

profileAddButton.addEventListener('click', function () {
    openPopup(popupAddCard);
});

editProfileForm.addEventListener('submit', function (event) {
    event.preventDefault();
    profileUserName.textContent = userNameFormField.value;
    profileUserAbout.textContent = userAboutFormField.value;
    closePopup(popupProfile);
    event.target.reset();
});

addCardForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const newCard = createCard(
        placeLinkFormField.value,
        placeTitleFormField.value,
        cardTemplate,
        popupImage,
        cardOptions
    );
    cards.prepend(newCard);
    closePopup(popupAddCard);
    event.target.reset();
});

setPopupCloseListeners(popupList);

enableValidation(validationOptions);

renderInitialCards();