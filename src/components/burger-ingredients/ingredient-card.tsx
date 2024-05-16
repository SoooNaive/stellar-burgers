import { useMemo } from 'react';
import { useDrag } from 'react-dnd';

import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';

import style from './burger-ingredients.module.css';

import { useTypedSelector, TIngredient } from '../../types/types';

export const IngredientCard = ({
  ingredient,
  onIngredientClick,
}: {
  ingredient: TIngredient;
  onIngredientClick: (ingredient: TIngredient) => void;
}) => {
  const ingredients = useTypedSelector(
    (state) => state.burgerConstructorState.ingredients
  );
  const buns = useTypedSelector((state) => state.burgerConstructorState.bun);

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
    <div
      className={style.card}
      ref={dragRef}
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
  );
};
