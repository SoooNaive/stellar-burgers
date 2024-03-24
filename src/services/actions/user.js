import { setCookie, deleteCookie } from '../../utils/cookie';
import { checkResponse } from '../../utils/check-response';
import {
  loginRequest,
  updateRequest,
  logoutRequest,
  registerRequest,
  forgotPasswordRequest,
  resetPasswordRequest,
  refreshTokenRequest,
} from '../../utils/burger-api';

import {
  setUser,
  setUserRequest,
  setUserError,
  setUpdateUserRequest,
  setUpdateUser,
  setUpdateUserError,
  setLogoutRequest,
  setLogoutError,
  setLogoutUser,
  setForgotPasswordError,
  setForgotPasswordRequest,
  setForgotPasswordConfirmed,
  setChangePasswordError,
  setChangePasswordConfirmed,
  setChangePasswordRequest,
} from '../reducers/user';

export const onLogin = (body) => {
  return async function (dispatch) {
    dispatch(setUserRequest(true));
    loginRequest(body)
      .then(checkResponse)
      .then((res) => {
        const accessToken = res.accessToken.split('Bearer ')[1];
        const refreshToken = res.refreshToken;
        setCookie('accessToken', accessToken);
        setCookie('refreshToken', refreshToken);
        dispatch(setUser(res));
      })
      .catch((err) => {
        dispatch(setUserError(err));
        console.warn(err);
      });
  };
};

export const onUpdateUser = (user) => {
  return async function (dispatch) {
    dispatch(setUpdateUserRequest(true));
    updateRequest(user)
      .then(checkResponse)
      .then((res) => {
        dispatch(setUpdateUser(res));
      })
      .then(() => {
        dispatch(setUpdateUserRequest(false));
      })
      .catch((err) => {
        dispatch(setUpdateUserError(err));
        console.warn(err);
      });
  };
};

export const onLogout = () => {
  return async function (dispatch) {
    dispatch(setLogoutRequest(true));
    logoutRequest()
      .then(checkResponse)
      .then((res) => {
        dispatch(setLogoutUser());
        deleteCookie('refreshToken');
        deleteCookie('accessToken');
      })
      .then(() => {
        dispatch(setLogoutRequest(false));
      })
      .catch((err) => {
        dispatch(setLogoutError(err));
        console.warn(err);
      });
  };
};

export const onRegister = (body) => {
  return async function (dispatch) {
    dispatch(setUserRequest(true));
    return registerRequest(body)
      .then(checkResponse)
      .then((res) => {
        const accessToken = res.accessToken.split('Bearer ')[1];
        const refreshToken = res.refreshToken;
        setCookie('accessToken', accessToken);
        setCookie('refreshToken', refreshToken);
        dispatch(setUser(res));
      })
      .then(() => {
        dispatch(setUserRequest(false));
      })
      .catch((err) => {
        dispatch(setUserError(err));
        console.warn(err);
      });
  };
};
export const onForgotPassword = (body) => {
  return async function (dispatch) {
    dispatch(setForgotPasswordRequest(true));
    forgotPasswordRequest(body)
      .then(checkResponse)
      .then((res) => {
        if (res.success) {
          dispatch(setForgotPasswordConfirmed(res.success));
        }
      })
      .then(() => {
        dispatch(setForgotPasswordRequest(false));
      })
      .catch((err) => {
        dispatch(setForgotPasswordError(err));
        console.warn(err);
      });
  };
};

export const onResetPassword = (body) => {
  return async function (dispatch) {
    dispatch(setChangePasswordRequest(true));
    resetPasswordRequest(body)
      .then(checkResponse)
      .then((res) => {
        if (res.success) {
          dispatch(setChangePasswordConfirmed(res.success));
        }
      })
      .then(() => {
        dispatch(setChangePasswordRequest(false));
      })
      .catch((err) => {
        dispatch(setChangePasswordError(err));
        console.warn(err);
      });
  };
};

export const onRefreshToken = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (error) {
    if (error.message === 'jwt expired') {
      const refreshData = await refreshTokenRequest();
      if (!refreshData.success) {
        Promise.reject(refreshData);
      }
      setCookie('accessToken', refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(error);
    }
  }
};
