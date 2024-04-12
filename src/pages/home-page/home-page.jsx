import { useSelector } from 'react-redux';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styleApp from '../../components/app/app.module.css';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';

function HomePage() {
  const error = useSelector((state) => state.ingredientsState.error);
  return (
    <>
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

export default HomePage;
