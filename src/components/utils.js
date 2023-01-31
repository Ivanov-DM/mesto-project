export function openPopup(popupEl) {
    popupEl.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
}

export function closePopup(popupEl) {
    popupEl.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
}

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

export function request(url, options) {
    return fetch(url, options).then(checkResponse)
}