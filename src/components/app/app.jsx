import { useEffect, useState } from 'react';
import styleApp from './app.module.css';
import { BURGER_API_URL } from '../../utils/burger-api.js'
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngredientsContext from "../../services/ingredients-context";


function App() {

  const [ingredients, setIngredients] =  useState({data: [], success: false});
  const [error, setError] = useState();


  useEffect(() => {
    const getIngregients = async () => {
      return fetch(`${BURGER_API_URL}/ingredients`)
            .then((response) => {
              return response.ok ? response.json() : setIngredients({ ...ingredients, success: false });
            })
            .then(data => setIngredients({data: data.data, success: data.success}))
            .catch(e => {
              setError(e);
            });
    }
    getIngregients(); 
  }, []);

  const data = ingredients.data;

  return (
    <>
      <IngredientsContext.Provider value={data}>
        <AppHeader />
        {error && 
          <div className={styleApp.container_error}>
            <p className={styleApp.error_text}>Что-то пошло не так :(</p>
          </div>}

        {!error && data.length &&
          <main className={styleApp.container_app}>
            <div className={styleApp.container_ingredients}>
              <BurgerIngredients />
            </div>
            <div className={styleApp.container_cunstructor}>
              <BurgerConstructor />
            </div>
          </main>
        }
      </IngredientsContext.Provider>
    </>
  );
}

export default App;
