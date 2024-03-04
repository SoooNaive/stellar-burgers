import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { modalIngredientsReducer } from './ingredient-details';
import { burgerConstructorReducer } from './burger-constructor';

export const rootReducer = combineReducers({
  ingredientsState: ingredientsReducer,
  ingredientDetails: modalIngredientsReducer,
  burgerConstructorState: burgerConstructorReducer,
});

export default rootReducer;
