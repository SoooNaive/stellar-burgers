import {
  closeIngredientDetails,
  openIngredientDetails,
  modalIngredientsReducer
} from './ingredient-details';

describe('burger-constructor reducer', () => {
  it('unknown action should return the initial state', () => {
    const result = modalIngredientsReducer(undefined, { type: '' });

    expect(result).toEqual({
      isOpened: false,
    });
  });

  it("should handle openIngredientDetails", () => {
    const result = modalIngredientsReducer(
      {
        isOpened: false,
      },
      openIngredientDetails()
    );

    expect(result).toEqual({
      isOpened: true,
    });
  });

  it("should handle closeIngredientDetails", () => {
    const result = modalIngredientsReducer(
      {
        isOpened: true,
      },
      closeIngredientDetails()
    );

    expect(result).toEqual({
      isOpened: false,
    });
  });
});