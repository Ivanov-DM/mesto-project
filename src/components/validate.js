export const hideInputError = (formElement, inputElement, options) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(options.inputErrorClass);
    errorElement.classList.remove(options.errorClass);
    errorElement.textContent = '';
}

export const enableValidation = (options) => {

    const showInputError = (formElement, inputElement, errorMessage) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(options.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(options.errorClass);
    }

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
            showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            hideInputError(formElement, inputElement, options);
        }
    }

    const setEventListeners = formElement => {
        const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
        const buttonElement = formElement.querySelector(options.submitButtonSelector);

        toggleButtonState(inputList, buttonElement);

        formElement.addEventListener('reset', () => {
            setTimeout(() => {
                toggleButtonState(inputList, buttonElement);
            }, 0);
        });

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