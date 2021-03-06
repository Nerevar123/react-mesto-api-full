import { apiOptions } from "./utils";

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  async _checkError(res) {
    if (res.ok) {
      return res.json();
    }
    await res
      .text()
      .then((text) => JSON.parse(text))
      .then((text) => {
        return Promise.reject(text.message || text.error);
      });
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      credentials: "include",
    }).then(this._checkError);
  }

  getInitCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      credentials: "include",
    }).then(this._checkError);
  }

  patchUserInfo(info) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify(info),
    }).then(this._checkError);
  }

  addCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify(card),
    }).then(this._checkError);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: "include",
    }).then(this._checkError);
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "PUT",
        headers: this._headers,
        credentials: "include",
      }).then(this._checkError);
    } else {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "DELETE",
        headers: this._headers,
        credentials: "include",
      }).then(this._checkError);
    }
  }

  patchAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify(avatar),
    }).then(this._checkError);
  }

  register(user) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify(user),
    }).then(this._checkError);
  }

  authorize(user) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify(user),
    }).then(this._checkError);
  }

  logout() {
    return fetch(`${this._baseUrl}/logout`, {
      headers: this._headers,
      credentials: "include",
    }).then(this._checkError);
  }

  checkCookies() {
    return fetch(`${this._baseUrl}/check`, {
      headers: this._headers,
      credentials: "include",
    }).then(this._checkError);
  }
}

export const api = new Api(apiOptions);
