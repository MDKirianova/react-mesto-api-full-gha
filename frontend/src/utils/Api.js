import { apiSettings } from './constants.js'

class Api {
  constructor({baseUrl}){
    this._baseUrl = baseUrl;
  }

  _sendRequest(baseUrl, options){
    return fetch(baseUrl,options)
    .then(res=>{
      if (res.ok) {
        return res.json()
      } 
      
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  getUserInfo() {
    return this._sendRequest(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
    })
  }

  getInitialCards() {
    return this._sendRequest(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
    })
  }

  setUserInfo(name, about) {
    return this._sendRequest(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, about})
    })
  }

  setUserAvatar(avatar){
    return this._sendRequest(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ avatar })

    })
  }
  
  createNewCard(name, link) {
    return this._sendRequest(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, link})
    })
  }

  deleteMyCard(id){
    return this._sendRequest(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
    })
  }

  changeLikeCardStatus(id, isLiked){
    if(isLiked){
      return this._sendRequest(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json'
        },
      })
    } else {
      return this._sendRequest(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json'
        },
      })
    }
  }
}

// const apiSettings = {
//   baseUrl: `${process.env.REACT_APP_API_URL}`,
//   headers: {
//     authorization: `Bearer ${localStorage.getItem('jwt')}`,
//     'Content-Type': 'application/json'
//   }
// }; 

export const api = new Api(apiSettings);
