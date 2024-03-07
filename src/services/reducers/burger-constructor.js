import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bun: null,
  ingredients: [],
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients = [action.payload, ...state.ingredients];
      }
    },
    deleteIngredient: (state, action) => {
      state.ingredients = [...state.ingredients].filter((item, index) => index !== action.payload);
    },
    openOrderModal: (state, action) => {
      state.bun = null;
      state.ingredients = [];
    },
    moveIngredient: (state, action) => {
      const ingredients = [...state.ingredients];
      ingredients.splice(action.payload.hoverIndex, 0, ingredients.splice(action.payload.dragIndex, 1)[0]);
      state.ingredients = ingredients;
    },
  },
});

export const { addIngredient, deleteIngredient, openOrderModal, moveIngredient } = burgerConstructorSlice.actions;
export const burgerConstructorReducer = burgerConstructorSlice.reducer;
