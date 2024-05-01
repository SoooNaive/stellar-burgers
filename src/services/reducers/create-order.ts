import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BURGER_API_URL } from '../../utils/burger-api';
import { checkResponse } from '../../utils/check-response';
import { getCookie } from '../../utils/cookie';

import { TCreateOrderState, AppDispatch } from '../../types/types';

const initialState: TCreateOrderState = {
  number: null,
  isOpened: false,
  error: false,
  isLoading: false,
};

export const sendOrder = (allIngredients: Array<string>) => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchUsersRequest());
    return fetch(`${BURGER_API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer ' + getCookie('accessToken'),
      },
      body: JSON.stringify({
        ingredients: allIngredients,
      }),
    })
      .then(checkResponse)
      .then((data) => {
        dispatch(fetchUsersSuccess(data.order.number));
      })
      .catch((error) => {
        dispatch(fetchUsersFailure(error.message));
      });
  };
};

export const modalOrder = createSlice({
  name: 'modalOrder',
  initialState,
  reducers: {
    fetchUsersRequest: (state) => {
      state.isLoading = true;
    },
    fetchUsersSuccess: (state, action: PayloadAction<number>) => {
      state.isLoading = false;
      state.number = action.payload;
    },
    fetchUsersFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    closeModalOrder: (state) => {
      state.isOpened = false;
      state.number = null;
      state.error = false;
      state.isLoading = false;
    },
    openModalOrder: (state) => {
      state.isOpened = true;
    },
  },
});
export const {
  openModalOrder,
  closeModalOrder,
  fetchUsersFailure,
  fetchUsersSuccess,
  fetchUsersRequest,
} = modalOrder.actions;
export const modalOrderReduser = modalOrder.reducer;
