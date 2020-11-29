class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
        // this._groupID = groupID;
    }

    handleOriginalResponse = function(res){
        if (!res.ok) {
            return Promise.reject(`Error: ${res.status}`);
          }
          return res.json();
        
    }

    getAppInfo(token) {
        return Promise.all([this.getInitialCards(token), this.getUserInfo(token)]);
    }
    getInitialCards(token) {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            }
        })
            .then(this.handleOriginalResponse)
    }

    deletInitialCards(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this.handleOriginalResponse)
    }

    createInitialCards(item) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(item)
        })
        .then(this.handleOriginalResponse)
    }
///////////
    getUserInfo(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            }
        })
        .then(this.handleOriginalResponse)
    }

    likeCard(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: 'PUT',
            headers: this._headers
        })
        .then(this.handleOriginalResponse)
    }

    dislikeCard(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this.handleOriginalResponse)
    }

    creatProfile({name, about}) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({name, about})
        })
        .then(this.handleOriginalResponse)
    }

    creatAvatar(userAvatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({avatar: userAvatar})
        })
        .then(this.handleOriginalResponse)
    }
}

const api = new Api({
    baseUrl: 'http://localhost:3001',
    headers: {
        // authorization: '251eb665-7100-400a-a869-0fac2a58b885',
        'Content-Type': 'application/json'
    }
    // groupID: 'cohort-14'
})

export default api;