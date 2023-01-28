import {closePopup} from "./utils";

export function setPopupCloseListeners(popupList) {
    popupList.forEach(popupEl => popupEl.addEventListener('mousedown', function (evt) {
        if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
            closePopup(popupEl);
        }
    }));
}