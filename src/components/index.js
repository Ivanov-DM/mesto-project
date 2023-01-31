import {enableValidation, hideInputError} from "./validate";
import {setPopupCloseListeners} from "./modal";
import {closePopup, openPopup} from "./utils";
import {createCard} from "./card";
import '../pages/index.css';
import {addNewCard, changeUserAvatar, editUserData, getInitialCards, getUserData} from "./api";
import {globeVariables} from "../constants";

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileAvatar = document.querySelector('.profile__avatar');
const profileAvatarOverlay = document.querySelector('.profile__avatar-overlay');

const profileUserName = document.querySelector('.profile__user-name');
const profileUserAbout = document.querySelector('.profile__user-about');

const popupList = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupImage = document.querySelector('.popup_type_image');
const popupChangeAvatar = document.querySelector('.popup_type_change-avatar');

const editProfileForm = document.forms['edit-profile-form'];
const userNameFormField = editProfileForm.elements.userName;
const userAboutFormField = editProfileForm.elements.userAbout;
const addCardForm = document.forms['add-card-form'];
const placeTitleFormField = addCardForm.elements.placeTitle;
const placeLinkFormField = addCardForm.elements.placeLink;
const changeAvatarForm = document.forms['change-avatar-form'];
const avatarLinkFormField = changeAvatarForm.elements.avatarLink;

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
    likeButtonActiveClass: 'card__like-button_active',
    likeCountSelector: '.card__like-count'
}

const validationOptions = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
};

function renderInitialCards(cardsList) {
    for (let i = 0; i < cardsList.length; i++) {
        const card = createCard(
            cardsList[i],
            cardTemplate,
            popupImage,
            cardOptions
        );
        cards.append(card);
    }
}

function renderUserData(userName, userAbout, avatarLink) {
    profileUserName.textContent = userName;
    profileUserAbout.textContent = userAbout;
    profileAvatar.src = avatarLink;
}

function renderSubmitButtonLoading(buttonEl, isLoading) {
    const currentButtonText = buttonEl.textContent;
    if (isLoading) {
        buttonEl.textContent = 'Сохранение...';
    } else {
        buttonEl.textContent = currentButtonText;
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

profileAvatarOverlay.addEventListener('click', function () {
    openPopup(popupChangeAvatar);
})

editProfileForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const submitButton = event.target.querySelector(validationOptions.submitButtonSelector);
    renderSubmitButtonLoading(submitButton, true);

    editUserData(userNameFormField.value, userAboutFormField.value)
        .then(userData => renderUserData(userData.name, userData.about, userData.avatar))
        .catch(err => console.log(err))
        .finally(() => renderSubmitButtonLoading(submitButton, false));
    closePopup(popupProfile);
    event.target.reset();
});

changeAvatarForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const submitButton = event.target.querySelector(validationOptions.submitButtonSelector);
    renderSubmitButtonLoading(submitButton, true);

    changeUserAvatar(avatarLinkFormField.value)
        .then(userData => renderUserData(userData.name, userData.about, userData.avatar))
        .catch(err => console.log(err))
        .finally(() => renderSubmitButtonLoading(submitButton, false));
    closePopup(popupChangeAvatar);
    event.target.reset();
})

addCardForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const submitButton = event.target.querySelector(validationOptions.submitButtonSelector);
    renderSubmitButtonLoading(submitButton, true);

    addNewCard(placeTitleFormField.value, placeLinkFormField.value)
        .then(card => {
            const newCard = createCard(
                card,
                cardTemplate,
                popupImage,
                cardOptions
            );
            cards.prepend(newCard);
            closePopup(popupAddCard);
            event.target.reset();
        })
        .catch(err => console.log(err))
        .finally(() => renderSubmitButtonLoading(submitButton, false));
});

setPopupCloseListeners(popupList);

enableValidation(validationOptions);

Promise.all([getUserData(), getInitialCards()])
    .then(initialData => {
        const [userData, cards] = initialData;
        globeVariables.ownerId = userData._id;
        renderUserData(userData.name, userData.about, userData.avatar);
        renderInitialCards(cards);
    })
    .catch(err => console.log(err));


