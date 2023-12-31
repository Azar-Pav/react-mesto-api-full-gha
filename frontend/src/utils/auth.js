export const BASE_URL = 'https://mesto.backend.azarpav.nomoredomainsrocks.ru';

function checkResponse(res) {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(`Ошибка: ${res.status}`)
  }
}

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: password,
      email: email
    })
  })
  .then(checkResponse)
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({
      password: password,
      email: email
    })
  })
  .then(checkResponse)
};

export const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, {credentials: 'include'})
  .then(checkResponse)
}
