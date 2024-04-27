import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrderState, TOrders } from '../../types/types';


const orderState: TOrderState = {
  wsOpen: false,
  wsUrl: '',
  wsConnectionStatus: true,
  wsError: null,
  orders: null
};

export const orderSlice = createSlice({
  name: 'orderState',
  initialState: orderState,
  reducers: {
    setWebsocketOpen: (state, action: PayloadAction<boolean>) => {
        state.wsOpen = action.payload;
        state.wsError = null;
    },
    setWebsocketClose: (state, action: PayloadAction<boolean>) => {
        state.wsOpen = false;
        state.wsUrl = ''
        state.wsError = null;
        state.orders = null;
    },
    setWebsocketConnection: (state, action: PayloadAction<string>) => {
        state.wsConnectionStatus = true;
        state.wsUrl = action.payload
    },
    setWebsocketOffline: (state) => {
        state.wsConnectionStatus = false;
    },
    setWebsocketConnectionError: (state, action: PayloadAction<null | string>) => {
        state.wsError = action.payload;
    },
    setWebsocketGetOrders: (state, action: PayloadAction<TOrders>) => {
        state.orders = action.payload;
    },
},
});

export const { setWebsocketOpen, setWebsocketClose, setWebsocketConnection, setWebsocketOffline, setWebsocketConnectionError, setWebsocketGetOrders } = orderSlice.actions;
export const orderSReducer = orderSlice.reducer;