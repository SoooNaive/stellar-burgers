import { getOrderRequest } from '../../utils/burger-api';

import { TError, TOrders } from '../../types/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const onFetchOrder = createAsyncThunk<
  TOrders,
  string,
  { rejectValue: TError }
>('orderState/onFetchOrder', async function (number, { rejectWithValue }) {
  const response = await getOrderRequest(number);
  if (!response.ok) {
    return rejectWithValue({
      status: response.status,
      message: 'Server Error, take a look on method onFetchOrder',
    });
  }
  const data: TOrders = await response.json();
  return data;
});
