import style from './ingredient-details.module.css';

import { DataType } from '../../utils/data-type';

export default function IngredientDetails(ingredient) {
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
}
IngredientDetails.propTypes = {
  ingredient: DataType.isRequired,
};
