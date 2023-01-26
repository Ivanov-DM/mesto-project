import {closePopup, hideInputError} from "./utils";

export function setEscPopupListener(popupList) {

    function deleteEscPopupListener() {
        document.removeEventListener('keydown', escPopupHandler);
    }

    function escPopupHandler(evt) {
        if (evt.key === 'Escape') {
            popupList.forEach(popupEl => {
                if (popupEl.classList.contains('popup_opened')) {
                    closePopup(popupEl);
                }
            });
            deleteEscPopupListener();
        }
    }

    document.addEventListener('keydown', escPopupHandler);
}

export function setPopupCloseListeners(popupList) {
    popupList.forEach(popupEl => popupEl.addEventListener('mousedown', function (evt) {
        if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
            if (popupEl.classList.contains('popup_type_add-card')) {
                popupEl.querySelector('.form').reset();
            }
            const formElement = popupEl.querySelector('.form');
            if (formElement) {
                const inputList = Array.from(formElement.querySelectorAll('.form__input'));
                inputList.forEach(inputElement => hideInputError(formElement, inputElement, {
                    inputErrorClass: 'form__input_type_error',
                    errorClass: 'form__input-error_active'
                }));
            }
            const buttonElement = formElement.querySelector('.form__submit-button');
            buttonElement.disabled = true;
            buttonElement.classList.add('form__submit-button_inactive');
            closePopup(popupEl);
        }
    }));
}
