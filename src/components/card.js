export function createCard(src, title, cardTemplate) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const cardLikeButton = card.querySelector('.card__like-button');
    const cardDeleteButton = card.querySelector('.card__delete-button');

    cardImage.src = src;
    cardImage.alt = title;
    cardTitle.textContent = title;

    // cardImage.addEventListener('click', function (event) {
    //     setEscPopupListener();
    //     popupImageElement.src = event.target.src;
    //     popupImageElement.alt = event.target.alt;
    //     popupImageTitle.textContent = event.target.alt;
    //     openPopup(popupImage);
    // });

    cardLikeButton.addEventListener('click', function (event) {
        event.target.classList.toggle('card__like-button_active');
    });

    cardDeleteButton.addEventListener('click', function (event) {
        event.target.closest('.card').remove();
    });

    return card
}