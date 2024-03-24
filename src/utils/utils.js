import { getCookie } from './cookie';
import { checkResponse } from './check-response';
import { onRefreshToken } from './burger-api';

export const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

export const loginRequest = async ({ email, password }) => {
  return fetch(`${BURGER_API_URL}/auth/login`, {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
};
export const updateRequest = async ({ email, name, password }) => {
  return fetch(`${BURGER_API_URL}/auth/user`, {
    method: 'PATCH',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + getCookie('accessToken'),
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      email: email,
      name: name,
      password: password,
    }),
  });
};

export const logoutRequest = async () => {
  return fetch(`${BURGER_API_URL}/auth/logout`, {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      token: getCookie('refreshToken'),
    }),
  });
};
export const registerRequest = ({ email, password, name }) => {
  return fetch(`${BURGER_API_URL}/auth/register`, {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  });
};
export const forgotPasswordRequest = async ({ email }) => {
  return fetch(`${BURGER_API_URL}/password-reset`, {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      email: email,
    }),
  });
};

export const resetPasswordRequest = async ({ password, token }) => {
  return fetch(`${BURGER_API_URL}/password-reset/reset`, {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      password: password,
      token: token,
    }),
  });
};

export const userRequest = () => {
  return onRefreshToken(`${BURGER_API_URL}/auth/user`, {
    headers: {
      Authorization: 'Bearer ' + getCookie('accessToken'),
    },
  });
};

export const refreshTokenRequest = async () => {
  return fetch(`${BURGER_API_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: getCookie('refreshToken'),
    }),
  }).then(checkResponse);
};
