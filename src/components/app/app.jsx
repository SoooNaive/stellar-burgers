import { useEffect, useState } from 'react';
import styleApp from './app.module.css';
import { getData } from './utils/data';
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';


function App() {

  const urlFetch = getData();

  const [ingredients, setIngredients] =  useState({data: [], success: false});
  const [error, setError] = useState();


  useEffect(() => {
    const getIngregients = async () => {
      return fetch(urlFetch)
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
    <AppHeader />
      {error && 
        <div className={styleApp.container_error}>
          <p className={styleApp.error_text}>Что-то пошло не так :(</p>
        </div>}

      {!error && data.length &&
        <main className={styleApp.container_app}>
        <div className={styleApp.container_ingredients}>
          <BurgerIngredients dataIngredients={data} />
        </div>
        <div className={styleApp.container_cunstructor}>
          <BurgerConstructor dataIngredients={data} />
        </div>
      </main>
      }
    </>
  );
}

export default App;
