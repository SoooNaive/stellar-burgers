import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getIngredients } from '../../services/reducers/ingredients';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { Link } from 'react-router-dom';
import style from './burger-ingredient-page.module.css';

export default function BurgerIngredientPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const ingredients = useSelector(
    (store) => store.ingredientsState.ingredients.data
  );
  const [product, setProduct] = useState();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    setProduct(ingredients?.find(({ _id }) => _id === id));
  }, [ingredients, id]);

  return (
    <>
      {product && (
        <div className={style.container_ingredients}>
          <p className={style.title}>Детали ингредиента</p>
          <IngredientDetails ingredient={product} />
        </div>
      )}
      {!product && (
        <div className={style.container_notfound}>
          <p className={style.title_notfound}>Такого ингредиента нет</p>
          <Link className={style.content_link} to="/">
            Вернуться на главную страницу
          </Link>
        </div>
      )}
    </>
  );
}
