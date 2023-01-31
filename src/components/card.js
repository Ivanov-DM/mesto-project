import {openPopup} from "./utils";
import {globeVariables} from "../constants";
import {deleteCard, likeCard, unlikeCard} from "./api";

export function createCard(cardData, cardTemplate, popupImage, options) {
    const card = cardTemplate.querySelector(options.cardSelector).cloneNode(true);
    const cardImage = card.querySelector(options.imageSelector);
    const cardTitle = card.querySelector(options.titleSelector);
    const cardLikeButton = card.querySelector(options.likeButtonSelector);
    const cardDeleteButton = card.querySelector(options.deleteButtonSelector);
    const cardLikeCount = card.querySelector(options.likeCountSelector);
    const popupImageElement = popupImage.querySelector(options.imagePopupSelector);
    const popupImageTitle = popupImage.querySelector(options.titlePopupSelector);

    function isLiked(ownerId, likes) {
        return likes.some(likedUser => likedUser._id === globeVariables.ownerId)
    }

    function handleCardClick(src, title) {
        popupImageElement.src = src;
        popupImageElement.alt = title;
        popupImageTitle.textContent = title;
        openPopup(popupImage);
    }

    if (cardData.owner._id !== globeVariables.ownerId) {
        cardDeleteButton.remove();
    }

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    if (isLiked(globeVariables.ownerId, cardData.likes)) {
        cardLikeButton.classList.add(options.likeButtonActiveClass);
    }
    cardLikeCount.textContent = cardData.likes.length;

    cardImage.addEventListener('click', () => handleCardClick(cardData.link, cardData.name, popupImage));

    cardLikeButton.addEventListener('click', function (event) {
        if (cardLikeButton.classList.contains(options.likeButtonActiveClass)) {
            unlikeCard(cardData._id)
                .then(card => {
                    cardLikeCount.textContent = card.likes.length;
                    cardLikeButton.classList.remove(options.likeButtonActiveClass);
                })
                .catch(err => console.log(err));
        } else {
            likeCard(cardData._id)
                .then(card => {
                    cardLikeCount.textContent = card.likes.length;
                    cardLikeButton.classList.add(options.likeButtonActiveClass);
                })
                .catch(err => console.log(err));
        }
    });

    if (cardDeleteButton) {
        cardDeleteButton.addEventListener('click', function (event) {
            deleteCard(cardData._id)
                .then(() => event.target.closest(options.cardSelector).remove())
                .catch(err => console.log(err));
        });
    }

    return card
}