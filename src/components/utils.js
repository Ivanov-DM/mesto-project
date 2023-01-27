export const hideInputError = (formElement, inputElement, options) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(options.inputErrorClass);
    errorElement.classList.remove(options.errorClass);
    errorElement.textContent = '';
}

export const showInputError = (formElement, inputElement, errorMessage, options) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(options.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(options.errorClass);
}

export function openPopup(popupEl) {
    popupEl.classList.add('popup_opened');
}

export function closePopup(popupEl) {
    popupEl.classList.remove('popup_opened');
}

export function disablePopupButtonSubmit(buttonElement) {
    buttonElement.disabled = true;
    buttonElement.classList.add('form__submit-button_inactive');
}