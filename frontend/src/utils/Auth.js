const baseUrl = `${process.env.REACT_APP_API_URL}`;

function sendRequest(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export const register = (email, password) =>{
return fetch(`${baseUrl}/signup`, {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({ email, password })
})
.then((res) =>sendRequest(res));
}

export const login = (email, password) =>{
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ email, password })
  })
  .then((res) =>sendRequest(res))
  .then((data)=>{
    if(data.token){
      const token = data.token;
      localStorage.setItem('jwt', token);
      return token;
    }
  })
}

export const getData = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then((res) =>sendRequest(res))
  .then(data => data)
}