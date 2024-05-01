import store from '../services/store';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { rootReducer } from '../services/reducers/root-reducer';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = ReturnType<typeof store>['dispatch'];

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDispatch = () => useDispatch<AppThunkDispatch>();
export type AppThunkDispatch = ThunkDispatch<RootState, never, Action<string>>;

export type TPlaceOrder = {
  order: TOrder;
  name: string;
  success: boolean;
};

export type TwsActions = {
  wsConnection: string;
  wsOffline: string;
  wsOpen: string;
  wsError: string;
  wsMessage: string;
  wsClose: string;
};

export type TEventTarget = {
  target: {
    value: string;
    name: string;
  };
};

export type TUser = {
  email: string;
  name: string;
  password: string;
  token: string;
};

export type TError = {
  success?: boolean;
  message?: string;
  status?: number;
};

export type TUserState = {
  userData: { name: string; email: string };
  user: { userError: null | undefined | TError; userRequest: boolean };
  update: { updateError: null | undefined | TError; updateRequest: boolean };
  logout: { logoutError: null | undefined | TError; logoutRequest: boolean };
  register: {
    registerError: null | undefined | TError;
    registerRequest: boolean;
  };
  forgotPassword: {
    forgotPasswordError: null | undefined | TError;
    forgotPasswordRequest: boolean;
    forgotPasswordConfirmed: boolean;
  };
  changePassword: {
    changePasswordError: null | undefined | TError;
    changePasswordRequest: boolean;
    changePasswordConfirmed: boolean;
  };
};

export type TRefreshToken = {
  success: boolean;
  refreshToken: string;
  accessToken: string;
};

export type TRefreshData = {
  success: boolean;
  accessToken: string;
};

export type TUserFetchResponse = {
  success: boolean;
  user: TUser;
};

export type TIngredient = {
  _id: string;
  name: string;
  type: TIngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v?: number;
  uuid?: string;
};

export type TDataState = {
  ingredients: TIngredient[];
  error: boolean;
  isLoading: boolean;
};

export type TIngredientsModalState = {
  isOpened: boolean;
};

export type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TIngredient[];
};

export type TDrag = {
  dragIndex: number;
  hoverIndex: number;
};

export type TCreateOrderState = {
  number: null | number;
  isOpened: boolean;
  error: boolean;
  isLoading: boolean;
};

export type TOrders = {
  success: boolean;
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
};
export type TOrder = {
  _id: string;
  ingredients: Array<string>;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};

export type TOneOrder = {
  success: boolean;
  orders: TOrder[];
};

export type TOrderState = {
  wsOpen: boolean;
  wsUrl: string;
  wsConnectionStatus: boolean;
  wsError: null | string;
  orders: null | TOrders;
  fetchError: null | undefined | TError;
  fetchRequest: boolean;
  order: null | TOneOrder;
};

export type TIngredientType = 'bun' | 'sauce' | 'main';
