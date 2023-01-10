const profileEditButton = document.querySelector('.profile__edit-button');
const profileUserName = document.querySelector('.profile__user-name');
const profileUserAbout = document.querySelector('.profile__user-about');
const profileAddButton = document.querySelector('.profile__add-button');

const popupProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupImage = document.querySelector('.popup_type_image');
const popups = document.querySelectorAll('.popup');

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

function openPopup(popupEl) {
    popupEl.classList.add('popup_opened');
}

function closePopup(popupEl) {
    popupEl.classList.remove('popup_opened');
}

function createCard(src, title) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const cardLikeButton = card.querySelector('.card__like-button');
    const cardDeleteButton = card.querySelector('.card__delete-button');

    cardImage.src = src;
    cardImage.alt = title;
    cardTitle.textContent = title;

    cardImage.addEventListener('click', function (event) {
        popupImageElement.src = event.target.src;
        popupImageElement.alt = event.target.alt;
        popupImageTitle.textContent = event.target.alt;
        openPopup(popupImage);
    });

    cardLikeButton.addEventListener('click', function (event) {
        event.target.classList.toggle('card__like-button_active');
    });

    cardDeleteButton.addEventListener('click', function (event) {
        event.target.closest('.card').remove();
    });

    return card
}

function renderInitialCards() {
    for (let i = 0; i < initialCards.length; i++) {
        cards.append(createCard(initialCards[i].link, initialCards[i].name));
    }
}

profileEditButton.addEventListener('click', function () {
    userNameFormField.value = profileUserName.textContent;
    userAboutFormField.value = profileUserAbout.textContent;
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
});

addCardForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const newCard = createCard(placeLinkFormField.value, placeTitleFormField.value);
    cards.prepend(newCard);
    placeTitleFormField.value = '';
    placeLinkFormField.value = '';
    closePopup(popupAddCard);
});

document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
        popups.forEach(popupEl => {
            if (popupEl.classList.contains('popup_opened')) {
                closePopup(popupEl);
            }
        })
    }
});

popups.forEach(popupEl => popupEl.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
        if (popupEl.classList.contains('popup_type_add-card')) {
            placeTitleFormField.value = '';
            placeLinkFormField.value = '';
        }
        closePopup(popupEl);
    }
}));

renderInitialCards();

