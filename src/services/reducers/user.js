import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCookie } from '../../utils/cookie';
import { userRequest } from '../../utils/utils';

const initialState = {
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
    dispatch(setUserRequest(true));
    return userRequest()
      .then((user) => {
        dispatch(setUser(user));
      })
      .catch((err) => {
        dispatch(setUserError(err));
      })
      .finally(() => {
        dispatch(setUserRequest(false));
      });
  }
);

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userData.email = action.payload.user.email;
      state.userData.name = action.payload.user.name;
    },
    setUserRequest: (state, action) => {
      state.user.userRequest = true;
      state.user.userError = null;
    },
    setUserError: (state, action) => {
      state.user.userError = action.payload;
    },
    setUpdateUser: (state, action) => {
      state.userData.email = action.payload.user.email;
      state.userData.name = action.payload.user.name;
    },
    setUpdateUserRequest: (state, action) => {
      state.update.updateRequest = action.payload;
    },
    setUpdateUserError: (state, action) => {
      state.update.updateError = action.payload;
    },
    setLogoutUser: (state, action) => {
      state.userData.email = '';
      state.userData.name = '';
    },
    setLogoutRequest: (state, action) => {
      state.logout.logoutRequest = action.payload;
    },
    setLogoutError: (state, action) => {
      state.logout.logoutError = action.payload;
    },
    setRegisterRequest: (state, action) => {
      state.register.registerRequest = action.payload;
    },
    setRegisterError: (state, action) => {
      state.register.registerError = action.payload;
    },
    setForgotPasswordRequest: (state, action) => {
      state.forgotPassword.forgotPasswordRequest = action.payload;
    },
    setForgotPasswordError: (state, action) => {
      state.forgotPassword.forgotPasswordError = action.payload;
    },
    setForgotPasswordConfirmed: (state, action) => {
      state.forgotPassword.forgotPasswordConfirmed = action.payload;
    },
    setChangePasswordRequest: (state, action) => {
      state.changePassword.changePasswordRequest = action.payload;
    },
    setChangePasswordConfirmed: (state, action) => {
      state.changePassword.changePasswordConfirmed = action.payload;
    },
    setChangePasswordError: (state, action) => {
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
