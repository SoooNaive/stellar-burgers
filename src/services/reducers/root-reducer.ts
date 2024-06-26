import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { modalIngredientsReducer } from './ingredient-details';
import { burgerConstructorReducer } from './burger-constructor';
import { modalOrderReduser } from './create-order';
import { userReducer } from './user';
import {orderSReducer} from './orders'

export const rootReducer = combineReducers({
  ingredientsState: ingredientsReducer,
  ingredientDetails: modalIngredientsReducer,
  burgerConstructorState: burgerConstructorReducer,
  modalOrderState: modalOrderReduser,
  userState: userReducer,
  orderState: orderSReducer,
});

export default rootReducer;
