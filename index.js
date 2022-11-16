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

const profileEditButton = document.querySelector('.profile__edit-button');
const profileUserName = document.querySelector('.profile__user-name');
const profileUserAbout = document.querySelector('.profile__user-about');
const profileAddButton = document.querySelector('.profile__add-button');

const popupProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_add-card');

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

function editProfileFormSubmitHandler(event) {
    event.preventDefault();
    profileUserName.textContent = userNameFormField.value;
    profileUserAbout.textContent = userAboutFormField.value;
    closePopup(popupProfile);
}

function createCard(src, title) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    cardImage.src = src;
    card.alt = title;
    cardTitle.textContent = title;
    return card
}

function renderInitialCards() {
    for (let i = 0; i < initialCards.length; i++) {
        cards.append(createCard(initialCards[i].link, initialCards[i].name));
    }
}

function addPopupCloseButtonListeners () {
    document.querySelectorAll('.popup__close-button').forEach(el => {
        if (el.closest('.popup_type_profile')) {
            el.addEventListener('click', function() {
                console.log(el.closest('.popup_type_profile'));
                closePopup(popupProfile);
            });
        } else if (el.closest('.popup_type_add-card')) {
            el.addEventListener('click', function() {
                console.log(el.closest('.popup_type_add-card'));
                closePopup(popupAddCard);
            });
        }
    });
}

renderInitialCards();

addPopupCloseButtonListeners();

profileEditButton.addEventListener('click', function () {
    userNameFormField.value = profileUserName.textContent;
    userAboutFormField.value = profileUserAbout.textContent;
    openPopup(popupProfile);
});

profileAddButton.addEventListener('click', function () {
    openPopup(popupAddCard);
});

editProfileForm.addEventListener('submit', editProfileFormSubmitHandler);

addCardForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const newCard = createCard(placeLinkFormField.value, placeTitleFormField.value);
    cards.prepend(newCard);
    closePopup(popupAddCard);
})

