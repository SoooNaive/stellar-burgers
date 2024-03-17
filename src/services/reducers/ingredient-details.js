import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  details: null,
  isOpened: false,
};

export const modalIngredientDetails = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    closeIngredientDetails: (state, action) => {
      state.isOpened = false;
      state.details = null;
    },
    openIngredientDetails: (state, action) => {
      state.isOpened = true;
      state.details = action.payload;
    },
  },
});
export const { openIngredientDetails, closeIngredientDetails } = modalIngredientDetails.actions;
export const modalIngredientsReducer = modalIngredientDetails.reducer;
