class Api {
    constructor({baseUrl,headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getResponse(res) {
        if (res.ok) {
            return res.json();
        }
        else{
            Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this.getResponse)
    }

    getUserInfoApi() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this.getResponse)
    }

    updateUserInfo(formData) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: formData.name,
                about: formData.info
            })
        })
            .then(this.getResponse)
    }

    addNewCard(formData) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: formData.place,
                link: formData.image
            })
        })
            .then(this.getResponse)
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this.getResponse)
    }

    changeLikeCardStatus(cardId,liked) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: liked ? 'PUT' : 'DELETE',
            headers: this._headers
        })
            .then(this.getResponse)
    }

    updateUserAvatar(formData) {
        return fetch (`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar:formData.link})
        })
            .then(this.getResponse)
    }
}

const apiConfig = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-22',
    headers: {
        authorization: 'f2168467-af30-4c44-aa31-04a8fed6c871',
        'Content-Type': 'application/json'
    }
};

export const api = new Api(apiConfig);
