import {hideInputError, showInputError} from "./utils";

export const enableValidation = (options) => {

    const hasInvalidInput = inputList => {
        return inputList.some(inputElement => {
            return !inputElement.validity.valid
        })
    }

    const toggleButtonState = (inputList, buttonElement) => {
        if (hasInvalidInput(inputList)) {
            buttonElement.disabled = true;
            buttonElement.classList.add(options.inactiveButtonClass);
        } else {
            buttonElement.disabled = false;
            buttonElement.classList.remove(options.inactiveButtonClass);
        }
    }

    const isValid = (formElement, inputElement) => {
        if (inputElement.validity.patternMismatch) {
            inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        } else {
            inputElement.setCustomValidity('');
        }
        if (!inputElement.validity.valid) {
            showInputError(formElement, inputElement, inputElement.validationMessage, options);
        } else {
            hideInputError(formElement, inputElement, options);
        }
    }

    const setEventListeners = formElement => {
        const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
        const buttonElement = formElement.querySelector(options.submitButtonSelector);

        toggleButtonState(inputList, buttonElement);

        inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                isValid(formElement, inputElement);
                toggleButtonState(inputList, buttonElement);
            });
        });
    }

    const formList = document.querySelectorAll(options.formSelector);
    formList.forEach(formElement => {
        formElement.addEventListener('submit', evt => {
            evt.preventDefault();
        });
        setEventListeners(formElement);
    });
}