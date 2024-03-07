import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';

import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';

import PropTypes from 'prop-types';
import { DataType } from '../../utils/data-type';

import style from './burger-ingredients.module.css';

export default function IngredientCard({ ingredient, onIngredientClick }) {
  const ingredients = useSelector(
    (state) => state.burgerConstructorState.ingredients
  );
  const buns = useSelector((state) => state.burgerConstructorState.bun);

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const count = useMemo(() => {
    const result =
      ingredient.type === 'bun'
        ? buns?._id === ingredient._id
          ? 2
          : 0
        : ingredients.filter((item) => item._id === ingredient._id).length;
    return result;
  }, [ingredient._id, ingredients, ingredient.type, buns]);

  return (
    <>
      <div
        ref={dragRef}
        className={style.card}
        onClick={() => onIngredientClick(ingredient)}
      >
        {count !== 0 && (
          <Counter count={count} size="default" extraClass="m-1" />
        )}
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
    </>
  );
}
IngredientCard.propTypes = {
  ingredient: DataType.isRequired,
  onIngredientClick: PropTypes.func.isRequired,
};
