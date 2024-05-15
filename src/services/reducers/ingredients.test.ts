import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  ingredientsReducer
} from './ingredients';
import { TIngredient } from '../../types/types';

describe('ingredients reducer', () => {
  it('unknown action should return the initial state', () => {
    const result = ingredientsReducer(undefined, { type: '' });

    expect(result).toEqual({
      ingredients: [],
      error: false,
      isLoading: false,
    });
  });

  it('should handle fetchUsersRequest', () => {
    const result = ingredientsReducer(
      {
        ingredients: [{ _id: '1' } as TIngredient],
        error: false,
        isLoading: false,
      },
      fetchUsersRequest()
    );

    expect(result).toEqual({
      ingredients: [{ _id: '1' } as TIngredient],
      error: false,
      isLoading: true,
    });
  });

  it('should handle fetchUsersRequest with initial state', () => {
    const result = ingredientsReducer(undefined, fetchUsersRequest());

    expect(result).toEqual({
      ingredients: [],
      error: false,
      isLoading: true,
    });
  });

  it('should handle fetchUsersSuccess', () => {
    const result = ingredientsReducer(
      {
        ingredients: [{ _id: '1' } as TIngredient],
        error: false,
        isLoading: false,
      },
      fetchUsersSuccess({ data: [{ _id: '2' } as TIngredient] })
    );

    expect(result).toEqual({
      ingredients: [{ _id: '2' } as TIngredient],
      error: false,
      isLoading: false,
    });
  });

  it('should handle fetchUsersSuccess with initial state', () => {
    const result = ingredientsReducer(
      undefined,
      fetchUsersSuccess({ data: [{ _id: '2' } as TIngredient] })
    );

    expect(result).toEqual({
      ingredients: [{ _id: '2' } as TIngredient],
      error: false,
      isLoading: false,
    });
  });

  it('should handle fetchUsersFailure', () => {
    const result = ingredientsReducer(
      {
        ingredients: [{ _id: '1' } as TIngredient],
        error: false,
        isLoading: false,
      },
      fetchUsersFailure()
    );

    expect(result).toEqual({
      ingredients: [{ _id: '1' } as TIngredient],
      error: true,
      isLoading: false,
    });
  });
});