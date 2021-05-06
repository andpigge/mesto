export default class Api {
  #baseUrl
  #headers
  #pathUser
  #pathCards
  #cardLikes
  constructor({baseUrl, headers, paths: {user, cards, cardLikes}}) {
    this.#baseUrl = baseUrl;
    this.#headers = headers;
    this.#pathUser = user;
    this.#pathCards = cards;
    this.#cardLikes = cardLikes;
  }

  _serverConnectionGet(path) {
    return fetch(`${this.#baseUrl}/${path}`, {
      headers: this.#headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  _serverConnectionSend(path, method, body) {
    return fetch(`${this.#baseUrl}/${path}`, {
      method,
      headers: this.#headers,
      body: JSON.stringify(body)
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  _serverConnectionEdit(path, method, dataItem) {
    return fetch(`${this.#baseUrl}/${path}/${dataItem}`, {
      method,
      headers: this.#headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }


  _catchError(err) {
    throw new Error(err);
  }

  getInitialCards() {
    return this._serverConnectionGet(this.#pathCards)
      .then(dataCards => dataCards)
      .catch(err => {
        this._catchError(err);
      });
  }

  getInitialUser() {
    return this._serverConnectionGet(this.#pathUser)
      .then(dataUsers => dataUsers)
      .catch(err => {
        this._catchError(err);
      });
  }

  patchUpdateProfile(name, about) {
    return this._serverConnectionSend(this.#pathUser, 'PATCH', {
      name,
      about
    })
      .then(profile => profile)
      .catch(err => {
        this._catchError(err);
      });
  }

  postAddCard(name, link) {
    return this._serverConnectionSend(this.#pathCards, 'POST', {
      name,
      link
    })
      .then(post => post)
      .catch(err => {
        this._catchError(err);
      });
  }


  deleteCard(cardId) {
    this._serverConnectionEdit(this.#pathCards, 'DELETE', cardId)
      .catch(err => {
        this._catchError(err);
      });
  }

  putAppendLike(cardId) {
    return this._serverConnectionEdit(this.#cardLikes, 'PUT', cardId)
      .then(like => like)
      .catch(err => {
        this._catchError(err);
      });
  }

  deleteLike(cardId) {
    return this._serverConnectionEdit(this.#cardLikes, 'DELETE', cardId)
      .then(like => like)
      .catch(err => {
        this._catchError(err);
      });
  }

  patchUpdateUserAvatar(avatarUrl) {
    return this._serverConnectionSend(`${this.#pathUser}/avatar`, 'PATCH', {avatar: avatarUrl})
      .then(url => url)
      .catch(err => {
        this._catchError(err);
      });
  }
}
