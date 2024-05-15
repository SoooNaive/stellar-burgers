import {
  openModalOrder,
  closeModalOrder,
  fetchUsersFailure,
  fetchUsersSuccess,
  fetchUsersRequest,
} from './create-order';
import { modalOrderReduser } from './create-order';

describe('burger-constructor reducer', () => {
  it('unknown action should return the initial state', () => {
    const result = modalOrderReduser(undefined, { type: '' });

    expect(result).toEqual({
      number: null,
      isOpened: false,
      error: false,
      isLoading: false,
    });
  });

  it("should handle openModalOrder", () => {
    const result = modalOrderReduser(
      {
        number: null,
        isOpened: false,
        error: false,
        isLoading: false,
      },
      openModalOrder()
    );

    expect(result).toEqual({
      number: null,
      isOpened: true,
      error: false,
      isLoading: false,
    });
  });

  it("should handle closeModalOrder", () => {
    const result = modalOrderReduser(
      {
        number: 1,
        isOpened: true,
        error: false,
        isLoading: false,
      },
      closeModalOrder()
    );

    expect(result).toEqual({
      number: null,
      isOpened: false,
      error: false,
      isLoading: false,
    });
  });

  it("should handle fetchUsersFailure", () => {
    const result = modalOrderReduser(
      {
        number: null,
        isOpened: false,
        error: false,
        isLoading: false,
      },
      fetchUsersFailure()
    );

    expect(result).toEqual({
      number: null,
      isLoading: false,
      error: true,
      isOpened: false,
    });
  });

  it("should handle fetchUsersSuccess", () => {
    const result = modalOrderReduser(
      {
        number: null,
        isOpened: false,
        error: false,
        isLoading: false,
      },
      fetchUsersSuccess(2)
    );

    expect(result).toEqual({
      number: expect.any(Number),
      isLoading: false,
      error: false,
      isOpened: false,
    });
  });

  it("should handle fetchUsersRequest", () => {
    const result = modalOrderReduser(
      {
        number: null,
        isOpened: false,
        error: false,
        isLoading: false,
      },
      fetchUsersRequest()
    );

    expect(result).toEqual({
      number: null,
      isLoading: true,
      error: false,
      isOpened: false,
    });
  });
});