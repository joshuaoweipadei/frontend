import { BehaviorSubject } from 'rxjs';
import { handleResponse, authHeader } from '../_helpers'

const accountSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('account')));
const baseUrl = `${process.env.REACT_APP_API_URL}/api/account`;

export const accountServices = {
  register,
  login,
  logout,
  updateUser,
  news,
  user: accountSubject.asObservable(),
  get accountValue() { return accountSubject.value }
}

function register(values) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values)
  };
  return fetch(`${baseUrl}/register`, requestOptions).then(handleResponse);
}

function login(values) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values)
  };
  return fetch(`${baseUrl}/login`, requestOptions).then(handleResponse)
    .then(account => {
      // save store owner's details and jwt token in local storage to keep store owner logged in between page refreshes
      localStorage.setItem('account', JSON.stringify(account));
      // publish store owner to subscribers
      accountSubject.next(account);
      window.location.replace("/");
    });
}

function logout() {
  // remove store owner from local storage and publish null to store owner subject
  localStorage.removeItem('account');
  accountSubject.next(null);
  window.location.replace(window.location.pathname);
}

function updateUser(id, values) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeader(`${baseUrl}/update-user/${id}`) },
    body: JSON.stringify(values)
  };
  return fetch(`${baseUrl}/update-user/${id}`, requestOptions).then(handleResponse)
    .then(({ account, message}) => {
      // update account if the logged in customer updated their delivery address
      account = { ...accountSubject.value, ...account };
      localStorage.setItem('account', JSON.stringify(account));
      // publish updated customer to subscribers
      accountSubject.next(account);
      return { message };
    })
}

async function news() {
  const url = 'https://news-api14.p.rapidapi.com/v2/trendings?topic=sports&language=en&limit=10';
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': `e893492f82mshfd6bff7518865b0p165704jsn8992c1bfd320`,
      'x-rapidapi-host': 'news-api14.p.rapidapi.com'
    }
  };
  // return fetch(url, options).then(handleResponse);
  try {
    const response = await fetch(url, options);
	  const result = await response.json();
	  // console.log(result.data, "dde");
    return result.data;
  } catch (error) {
    console.error(error);
  }
}