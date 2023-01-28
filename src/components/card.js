import {openPopup} from "./utils";

export function createCard(src, title, cardTemplate, popupImage, options) {
    const card = cardTemplate.querySelector(options.cardSelector).cloneNode(true);
    const cardImage = card.querySelector(options.imageSelector);
    const cardTitle = card.querySelector(options.titleSelector);
    const cardLikeButton = card.querySelector(options.likeButtonSelector);
    const cardDeleteButton = card.querySelector(options.deleteButtonSelector);

    function handleCardClick(src, title) {
        const popupImageElement = popupImage.querySelector(options.imagePopupSelector);
        const popupImageTitle = popupImage.querySelector(options.titlePopupSelector);
        popupImageElement.src = src;
        popupImageElement.alt = title;
        popupImageTitle.textContent = title;
        openPopup(popupImage);
    }

    cardImage.src = src;
    cardImage.alt = title;
    cardTitle.textContent = title;

    cardImage.addEventListener('click', () => handleCardClick(src, title, popupImage));

    cardLikeButton.addEventListener('click', function (event) {
        event.target.classList.toggle(options.likeButtonActiveClass);
    });

    cardDeleteButton.addEventListener('click', function (event) {
        event.target.closest(options.cardSelector).remove();
    });

    return card
}