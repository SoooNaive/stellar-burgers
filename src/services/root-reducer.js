import { combineReducers } from "redux";
import { ingredientsReducer } from './ingredients';
import {modalIngredientsReducer} from './ingredient-details'

export const rootReducer = combineReducers({
    ingredientsState: ingredientsReducer,
    ingredientDetails: modalIngredientsReducer,
});

export default rootReducer;