import { createSlice } from '@reduxjs/toolkit';
import { BURGER_API_URL } from '../../utils/burger-api';
import { checkResponse } from '../../utils/check-response';

const initialState = {
  ingredients: [],
  error: false,
  isLoading: false,
};

export const getIngredients = () => {
  return async (dispatch) => {
    dispatch(fetchUsersRequest());
    return fetch(`${BURGER_API_URL}/ingredients`)
      .then(checkResponse)
      .then((data) => {
        dispatch(fetchUsersSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchUsersFailure(error.message));
      });
  };
};

export const ingredientsData = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    fetchUsersRequest: (state) => {
      state.isLoading = true;
    },
    fetchUsersSuccess: (state, action) => {
      state.isLoading = false;
      state.ingredients = action.payload;
    },
    fetchUsersFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure } =
  ingredientsData.actions;

export const ingredientsReducer = ingredientsData.reducer;
