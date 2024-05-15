import {
  addIngredient,
  deleteIngredient,
  openOrderModal,
  moveIngredient,
  burgerConstructorReducer
} from './burger-constructor';
import { TIngredient } from '../../types/types';

import { ingredientOne, ingredientTwo, ingredientThree } from '../tests/index'

describe('burger-constructor reducer', () => {
  it('unknown action should return the initial state', () => {
    const result = burgerConstructorReducer(undefined, { type: '' });

    expect(result).toEqual({
      bun: null,
      ingredients: [],
    });
  });

  it('should handle addIngredient', () => {
    const result = burgerConstructorReducer(
      {
        bun: null,
        ingredients: [],
      },
      addIngredient(ingredientOne as TIngredient)
    );
    expect(result).toEqual({
      bun: null,
      ingredients: [{
        ...ingredientOne,
        uuid: expect.any(String)
      }]
    });
  });

  it("should handle deleteIngredient", () => {
    const result = burgerConstructorReducer(
      {
        bun: null,
        ingredients: [ingredientOne as TIngredient, ingredientTwo as TIngredient],
      },
      deleteIngredient(0)
    );

    expect(result).toEqual({
      bun: null,
      ingredients: [ingredientTwo],
    });
  });

  it("should handle openOrderModal", () => {
    const result = burgerConstructorReducer(
      {
        bun: null,
        ingredients: [ingredientOne as TIngredient],
      },
      openOrderModal()
    );

    expect(result).toEqual({
      bun: null,
      ingredients: [],
    });
  });

  it("should handle moveIngredient", () => {
    const result = burgerConstructorReducer(
      {
        bun: null,
        ingredients: [ingredientOne as TIngredient, ingredientTwo as TIngredient, ingredientThree as TIngredient],
      },
      moveIngredient({
        dragIndex: 1,
        hoverIndex: 0
      })
    );

    expect(result).toEqual({
      bun: null,
      ingredients: [ingredientTwo, ingredientOne, ingredientThree],
    });
  });
});