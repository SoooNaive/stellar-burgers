
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
  initialState
} from "./user";


jest.mock("../../utils/timestamp", () => ({
  ...jest.requireActual("../../utils/timestamp"),
  getCurrentTimestamp: () => 123,
}));

describe("user reducer", () => {
  it("unknown action should return the initial state", () => {
    const result = userReducer(undefined, { type: "" });
    expect(result).toEqual(initialState);
  });

  it('setUser updates userData with the provided user info', () => {
    const user = { success: true, user: { email: 'test@example.com', name: 'John Doe', password: '1', token: '1' } };
    const userData = { email: 'test@example.com', name: 'John Doe' };
    const action = setUser(user);
    const newState = userReducer(initialState, action);
    expect(newState.userData).toEqual(userData);
  });

  it('setUserRequest sets userRequest to true and clears userError', () => {
    const modifiedState = { ...initialState, user: { userError: null, userRequest: false } };
    const action = setUserRequest();
    const newState = userReducer(modifiedState, action);
    expect(newState.user.userRequest).toBe(true);
    expect(newState.user.userError).toBeNull();
  });

  it('setUserError sets userError', () => {
    const error = { message: 'Failed to fetch user data' };
    const modifiedState = { ...initialState, user: { userRequest: false, userError: null } };
    const action = setUserError(error);
    const newState = userReducer(modifiedState, action);
    expect(newState.user.userError).toEqual(error);
    expect(newState.user.userRequest).toBe(false);
  });

  it('setUpdateUser updates userData when update succeeds', () => {
    const updatedUser = { success: true, user: { email: 'existing@example.com', name: 'Old Name', password: '1', token: '1' } };
    const userData = { email: 'existing@example.com', name: 'Old Name' };
    const action = setUpdateUser(updatedUser);
    const modifiedState = { ...initialState, userData: { email: 'test@example.com', name: 'John Doe' } };
    const newState = userReducer(modifiedState, action);
    expect(newState.userData).toEqual(userData);
  });

  it('setUpdateUserRequest sets updateRequest', () => {
    const modifiedState = { ...initialState, update: { updateRequest: false, updateError: null } };
    const action = setUpdateUserRequest(true);
    const newState = userReducer(modifiedState, action);
    expect(newState.update.updateRequest).toEqual(true);
    expect(newState.update.updateError).toBe(null);
  });

  it('setUpdateUserError sets updateError', () => {
    const modifiedState = { ...initialState, update: { updateRequest: false, updateError: null } };
    const error = {
      success: true,
      message: 'SomeError',
      status: 1,
    };
    const action = setUpdateUserError(error);
    const newState = userReducer(modifiedState, action);
    expect(newState.update.updateRequest).toEqual(false);
    expect(newState.update.updateError).toBe(error);
  });

  it('setLogoutUser resets userData to empty strings', () => {
    const modifiedState = { ...initialState, userData: { email: 'user@example.com', name: 'Test User' } };
    const action = setLogoutUser();
    const newState = userReducer(modifiedState, action);
    expect(newState.userData.email).toBe('');
    expect(newState.userData.name).toBe('');
  });

  it('setLogoutRequest sets logoutRequest', () => {
    const modifiedState = { ...initialState, logout: { logoutError: null, logoutRequest: false } };
    const action = setLogoutRequest(true);
    const newState = userReducer(modifiedState, action);
    expect(newState.logout.logoutError).toBe(null);
    expect(newState.logout.logoutRequest).toBe(true);
  });

  it('setLogoutError sets logoutErrort', () => {
    const modifiedState = { ...initialState, logout: { logoutError: null, logoutRequest: false } };
    const error = {
      success: true,
      message: 'SomeError',
      status: 1,
    };
    const action = setLogoutError(error);
    const newState = userReducer(modifiedState, action);
    expect(newState.logout.logoutError).toBe(error);
    expect(newState.logout.logoutRequest).toBe(false);
  });

  it('setRegisterRequest sets registerRequest', () => {
    const modifiedState = { ...initialState, register: { registerError: null, registerRequest: false } };
    const action = setRegisterRequest(true);
    const newState = userReducer(modifiedState, action);
    expect(newState.register.registerError).toBe(null);
    expect(newState.register.registerRequest).toBe(true);
  });

  it('setRegisterError sets registerError', () => {
    const modifiedState = { ...initialState, register: { registerError: null, registerRequest: false } };
    const error = {
      success: true,
      message: 'SomeError',
      status: 1,
    };
    const action = setRegisterError(error);
    const newState = userReducer(modifiedState, action);
    expect(newState.register.registerError).toBe(error);
    expect(newState.register.registerRequest).toBe(false);
  });

  it('setForgotPasswordRequest sets forgotPasswordRequest', () => {
    const modifiedState = { ...initialState, forgotPassword: { forgotPasswordError: null, forgotPasswordRequest: false, forgotPasswordConfirmed: false } };
    const action = setForgotPasswordRequest(true);
    const newState = userReducer(modifiedState, action);
    expect(newState.forgotPassword.forgotPasswordError).toBe(null);
    expect(newState.forgotPassword.forgotPasswordRequest).toBe(true);
    expect(newState.forgotPassword.forgotPasswordConfirmed).toBe(false);
  });

  it('setForgotPasswordConfirmed sets forgotPasswordConfirmed', () => {
    const modifiedState = { ...initialState, forgotPassword: { forgotPasswordError: null, forgotPasswordRequest: false, forgotPasswordConfirmed: false } };
    const action = setForgotPasswordConfirmed(true);
    const newState = userReducer(modifiedState, action);
    expect(newState.forgotPassword.forgotPasswordError).toBe(null);
    expect(newState.forgotPassword.forgotPasswordRequest).toBe(false);
    expect(newState.forgotPassword.forgotPasswordConfirmed).toBe(true);
  });

  it('setForgotPasswordError sets setForgotPassworError', () => {
    const modifiedState = { ...initialState, forgotPassword: { forgotPasswordError: null, forgotPasswordRequest: false, forgotPasswordConfirmed: false } };
    const error = {
      success: true,
      message: 'SomeError',
      status: 1,
    };
    const action = setForgotPasswordError(error);
    const newState = userReducer(modifiedState, action);
    expect(newState.forgotPassword.forgotPasswordError).toBe(error);
    expect(newState.forgotPassword.forgotPasswordRequest).toBe(false);
    expect(newState.forgotPassword.forgotPasswordConfirmed).toBe(false);
  });

  it('setChangePasswordRequest sets changePasswordRequest', () => {
    const modifiedState = { ...initialState, changePassword: { changePasswordError: null, changePasswordRequest: false, changePasswordConfirmed: false } };
    const action = setChangePasswordRequest(true);
    const newState = userReducer(modifiedState, action);
    expect(newState.changePassword.changePasswordError).toBe(null);
    expect(newState.changePassword.changePasswordRequest).toBe(true);
    expect(newState.changePassword.changePasswordConfirmed).toBe(false);
  });

  it('setChangePasswordConfirmed sets changePasswordConfirmed', () => {
    const modifiedState = { ...initialState, changePassword: { changePasswordError: null, changePasswordRequest: false, changePasswordConfirmed: false } };
    const action = setChangePasswordConfirmed(true);
    const newState = userReducer(modifiedState, action);
    expect(newState.changePassword.changePasswordError).toBe(null);
    expect(newState.changePassword.changePasswordRequest).toBe(false);
    expect(newState.changePassword.changePasswordConfirmed).toBe(true);
  });

  it('setChangePasswordError sets changePasswordError', () => {
    const modifiedState = { ...initialState, changePassword: { changePasswordError: null, changePasswordRequest: false, changePasswordConfirmed: false } };
    const error = {
      success: true,
      message: 'SomeError',
      status: 1,
    };
    const action = setChangePasswordError(error);
    const newState = userReducer(modifiedState, action);
    expect(newState.changePassword.changePasswordError).toBe(error);
    expect(newState.changePassword.changePasswordRequest).toBe(false);
    expect(newState.changePassword.changePasswordConfirmed).toBe(false);
  });


});