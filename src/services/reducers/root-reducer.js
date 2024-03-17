import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { modalIngredientsReducer } from './ingredient-details';
import { burgerConstructorReducer } from './burger-constructor';
import { modalOrderReduser } from './order';

export const rootReducer = combineReducers({
  ingredientsState: ingredientsReducer,
  ingredientDetails: modalIngredientsReducer,
  burgerConstructorState: burgerConstructorReducer,
  modalOrderState: modalOrderReduser,
});

export default rootReducer;
