import styleApp from './app.module.css';
import { getData } from './utils/data';
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';


function App() {

  const ingredients = getData();

  return (
    <>
      <AppHeader />
      <main className={styleApp.container_app}>
        <div className={styleApp.container_ingredients}>
          <BurgerIngredients dataIngredients={ingredients} />
        </div>
        <div className={styleApp.container_cunstructor}>
          <BurgerConstructor dataIngredients={ingredients} />
        </div>
      </main>
    </>
  );
}

export default App;
