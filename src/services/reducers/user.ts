import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCookie } from '../../utils/cookie';
import { userRequest } from '../../utils/burger-api';

import { TUserState, TUserFetchResponse, TError } from '../../types/types';

export const initialState: TUserState = {
  userData: {
    email: '',
    name: '',
  },
  user: {
    userError: null,
    userRequest: false,
  },
  update: {
    updateError: null,
    updateRequest: false,
  },
  logout: {
    logoutError: null,
    logoutRequest: false,
  },
  register: {
    registerError: null,
    registerRequest: false,
  },
  forgotPassword: {
    forgotPasswordError: null,
    forgotPasswordRequest: false,
    forgotPasswordConfirmed: false,
  },
  changePassword: {
    changePasswordError: null,
    changePasswordRequest: false,
    changePasswordConfirmed: false,
  },
};

export const checkAuth = createAsyncThunk(
  'user/checkAuth',
  async function (_, { dispatch }) {
    if (getCookie('accessToken')) {
      dispatch(getUser());
    }
  }
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async function (_, { dispatch }) {
    dispatch(setUserRequest());
    return userRequest()
      .then((user) => {
        dispatch(setUser(user));
      })
      .finally(() => {
        dispatch(setUserRequest());
      });
  }
);

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUserFetchResponse>) => {
      state.userData.email = action.payload.user.email;
      state.userData.name = action.payload.user.name;
    },
    setUserRequest: (state) => {
      state.user.userRequest = true;
      state.user.userError = null;
    },
    setUserError: (state, action: PayloadAction<TError>) => {
      state.user.userError = action.payload;
    },
    setUpdateUser: (state, action: PayloadAction<TUserFetchResponse>) => {
      state.userData.email = action.payload.user.email;
      state.userData.name = action.payload.user.name;
    },
    setUpdateUserRequest: (state, action: PayloadAction<boolean>) => {
      state.update.updateRequest = action.payload;
    },
    setUpdateUserError: (state, action: PayloadAction<TError>) => {
      state.update.updateError = action.payload;
    },
    setLogoutUser: (state) => {
      state.userData.email = '';
      state.userData.name = '';
    },
    setLogoutRequest: (state, action: PayloadAction<boolean>) => {
      state.logout.logoutRequest = action.payload;
    },
    setLogoutError: (state, action: PayloadAction<TError>) => {
      state.logout.logoutError = action.payload;
    },
    setRegisterRequest: (state, action: PayloadAction<boolean>) => {
      state.register.registerRequest = action.payload;
    },
    setRegisterError: (state, action: PayloadAction<TError>) => {
      state.register.registerError = action.payload;
    },
    setForgotPasswordRequest: (state, action: PayloadAction<boolean>) => {
      state.forgotPassword.forgotPasswordRequest = action.payload;
    },
    setForgotPasswordError: (state, action: PayloadAction<TError>) => {
      state.forgotPassword.forgotPasswordError = action.payload;
    },
    setForgotPasswordConfirmed: (state, action: PayloadAction<boolean>) => {
      state.forgotPassword.forgotPasswordConfirmed = action.payload;
    },
    setChangePasswordRequest: (state, action: PayloadAction<boolean>) => {
      state.changePassword.changePasswordRequest = action.payload;
    },
    setChangePasswordConfirmed: (state, action: PayloadAction<boolean>) => {
      state.changePassword.changePasswordConfirmed = action.payload;
    },
    setChangePasswordError: (state, action: PayloadAction<TError>) => {
      state.changePassword.changePasswordError = action.payload;
    },
  },
});
export const {
  setUser,
  setUserRequest,
  setUserError,
  setUpdateUser,
  setUpdateUserRequest,
  setUpdateUserError,
  setLogoutError,
  setLogoutRequest,
  setLogoutUser,
  setRegisterError,
  setRegisterRequest,
  setForgotPasswordError,
  setForgotPasswordRequest,
  setForgotPasswordConfirmed,
  setChangePasswordError,
  setChangePasswordConfirmed,
  setChangePasswordRequest,
} = userSlice.actions;
export const userReducer = userSlice.reducer;
