import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { TConstructorState, TIngredient, TDrag } from '../../types/types';

const initialState: TConstructorState = {
  bun: null,
  ingredients: [],
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients = [action.payload, ...state.ingredients];
        }
      },
      prepare: (ingredient) => {
        return { payload: { ...ingredient, uuid: nanoid() } };
      },
    },
    deleteIngredient: (state, action: PayloadAction<number>) => {
      state.ingredients = [...state.ingredients].filter(
        (item, index) => index !== action.payload
      );
    },
    openOrderModal: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    moveIngredient: (state, action: PayloadAction<TDrag>) => {
      const ingredients = [...state.ingredients];
      ingredients.splice(
        action.payload.hoverIndex,
        0,
        ingredients.splice(action.payload.dragIndex, 1)[0]
      );
      state.ingredients = ingredients;
    },
  },
});

export const {
  addIngredient,
  deleteIngredient,
  openOrderModal,
  moveIngredient,
} = burgerConstructorSlice.actions;
export const burgerConstructorReducer = burgerConstructorSlice.reducer;
