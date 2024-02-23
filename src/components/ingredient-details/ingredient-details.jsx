import PropTypes from "prop-types";
import { DataType } from "../app/utils/data-type";
import style from "./ingredient-details.module.css";

export default function IngredientDetails({ingredient}) {

  const details = [
    ["Калории,ккал", ingredient.calories],
    ["Белки, г", ingredient.proteins],
    ["Жиры, г", ingredient.fat],
    ["Углеводы, г", ingredient.carbohydrates],
  ];

  return (
    <>
    <div className={style.container_details}>
      <img src={ingredient.image_large} alt={ingredient.name}/>
      <p className={style.details_name}>{ingredient.name}</p>
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

