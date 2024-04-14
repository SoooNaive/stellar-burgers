import { createSlice } from '@reduxjs/toolkit';
import { TIngredientsModalState } from '../../types/types';

const initialState: TIngredientsModalState = {
  isOpened: false,
};

export const modalIngredientDetails = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    closeIngredientDetails: (state) => {
      state.isOpened = false;
    },
    openIngredientDetails: (state) => {
      state.isOpened = true;
    },
  },
});
export const { openIngredientDetails, closeIngredientDetails } =
  modalIngredientDetails.actions;
export const modalIngredientsReducer = modalIngredientDetails.reducer;
