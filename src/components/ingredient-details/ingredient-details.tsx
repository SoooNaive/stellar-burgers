import style from './ingredient-details.module.css';

import { FC } from 'react';

import { TIngredient } from '../../types/types';

interface IIngredientDetails {
  ingredient: TIngredient;
}

export const IngredientDetails: FC<IIngredientDetails> = (ingredient) => {
  const details = [
    ['Калории,ккал', ingredient.ingredient.calories],
    ['Белки, г', ingredient.ingredient.proteins],
    ['Жиры, г', ingredient.ingredient.fat],
    ['Углеводы, г', ingredient.ingredient.carbohydrates],
  ];
  return (
    <>
      <div className={style.container_details}>
        <img
          src={ingredient.ingredient.image_large}
          alt={ingredient.ingredient.name}
        />
        <p className={style.details_name}>{ingredient.ingredient.name}</p>
        <div className={style.details}>
          {details.map(([text, value]) => (
            <div key={text}>
              <p className={style.details_text}>{text}</p>
              <p className={style.details_value}>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
