
import {
  userReducer,
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
} from "./user";

jest.mock("../../utils/timestamp", () => ({
  ...jest.requireActual("../../utils/timestamp"),
  getCurrentTimestamp: () => 123,
}));

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

describe("user reducer", () => {
  it("unknown action should return the initial state", () => {
    const result = userReducer(undefined, { type: "" });
    expect(result).toEqual(initialState);
  });

});