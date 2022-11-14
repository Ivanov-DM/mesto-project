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

const popupEl = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');

const editProfileForm = document.forms['edit-profile-form'];
const userNameFormField = editProfileForm.elements.userName;
const userAboutFormField = editProfileForm.elements.userAbout;

const cards = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;

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

profileEditButton.addEventListener('click', openPopup);

popupCloseButton.addEventListener('click', closePopup);

editProfileForm.addEventListener('submit', editProfileFormSubmitHandler);

renderInitialCards();

