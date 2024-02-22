import PropTypes from 'prop-types';
import { DataType } from '../app/utils/data-type';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-ingredients.module.css';

export default function IngredientCard({
  ingredients,
  typeTitle,
  onIngredientClick,
}) {
  return (
    <>
      <p className={style.title_card}>{typeTitle}</p>
      <div className={style.container_card}>
        {ingredients.map((ingredient) => (
          <div
            key={ingredient._id}
            className={style.card}
            onClick={() => onIngredientClick(ingredient)}
          >
            <Counter count={0} size="default" extraClass="m-1" />
            <img
              className={style.image_card}
              src={ingredient.image}
              alt={ingredient.name}
            />
            <p className={style.price_card}>
              {ingredient.price}
              <span className={style.icon_price_card}>
                <CurrencyIcon type="primary" />
              </span>
            </p>
            <p className={style.name_card}>{ingredient.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}
IngredientCard.propTypes = {
  ingredients: PropTypes.arrayOf(DataType).isRequired,
  onIngredientClick: PropTypes.func.isRequired,
  typeTitle: PropTypes.string,
};