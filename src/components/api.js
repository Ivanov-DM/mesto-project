import {request} from "./utils";

const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-19',
    headers: {
        authorization: 'fd1f9321-dc5e-4b74-bfda-10a57b1d8938',
        'Content-Type': 'application/json'
    }
}

export const getUserData = () => request(
    `${config.baseUrl}/users/me`,
    {
        headers: config.headers
    }
);

export const getInitialCards = () => request(
    `${config.baseUrl}/cards`,
    {
        headers: config.headers
    }
);

export const editUserData = (userName, userAbout) => request(
    `${config.baseUrl}/users/me`,
    {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: `${userName}`,
            about: `${userAbout}`
        })
    }
);

export const addNewCard = (title, link) => request(
    `${config.baseUrl}/cards`,
    {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: title,
            link: link
        })
    }
);

export const deleteCard = (cardId) => request(
    `${config.baseUrl}/cards/${cardId}`,
    {
        method: 'DELETE',
        headers: config.headers,
    }
)

export const likeCard = (cardId) => request(
    `${config.baseUrl}/cards/likes/${cardId}`,
    {
        method: 'PUT',
        headers: config.headers,
    }
);

export const unlikeCard = (cardId) => request(
    `${config.baseUrl}/cards/likes/${cardId}`,
    {
        method: 'DELETE',
        headers: config.headers,
    }
);

export const changeUserAvatar = (linkAvatar) => request(
    `${config.baseUrl}/users/me/avatar`,
    {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: linkAvatar,
        })
    }
);