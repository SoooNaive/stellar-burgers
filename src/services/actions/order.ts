import { getOrderRequest } from '../../utils/burger-api';

import { AppDispatch } from '../../types/types';

import { checkResponse } from '../../utils/check-response';

import {
  onFetchOrderPending,
  onFetchOrderFulfilled,
  onFetchOrderRejected,
} from '../reducers/orders';

export const onFetchOrder = (number: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(onFetchOrderPending());
    getOrderRequest(number)
      .then(checkResponse)
      .then((data) => {
        dispatch(onFetchOrderFulfilled(data));
      })
      .catch((error) => {
        dispatch(onFetchOrderRejected(error.message));
      });
  };
};
