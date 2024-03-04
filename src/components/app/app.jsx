import { useEffect, useState } from 'react';
import styleApp from './app.module.css';
import { BURGER_API_URL } from '../../utils/burger-api.js';
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngredientsContext from '../../services/ingredients-context';

import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/ingredients';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const error = useSelector((state) => state.error);

  return (
    <>
      <AppHeader />

      {error && (
        <div className={styleApp.container_error}>
          <p className={styleApp.error_text}>Что-то пошло не так :(</p>
        </div>
      )}

      {!error && (
        <main className={styleApp.container_app}>
          <DndProvider backend={HTML5Backend}>
            <div className={styleApp.container_ingredients}>
              <BurgerIngredients />
            </div>
            <div className={styleApp.container_cunstructor}>
              <BurgerConstructor />
            </div>
          </DndProvider>
        </main>
      )}
    </>
  );
}

export default App;
