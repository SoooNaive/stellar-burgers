import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { modalIngredientsReducer } from './ingredient-details';
import { burgerConstructorReducer } from './burger-constructor';
import { modalOrderReduser } from './order';
import { userReducer } from './user';

export const rootReducer = combineReducers({
  ingredientsState: ingredientsReducer,
  ingredientDetails: modalIngredientsReducer,
  burgerConstructorState: burgerConstructorReducer,
  modalOrderState: modalOrderReduser,
  userState: userReducer,
});

export default rootReducer;
