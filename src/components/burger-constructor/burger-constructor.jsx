import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { DataType } from "../app/utils/data-type";
import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-constructor.module.css';
import BurgerElement from './burger-element.jsx';
export default function BurgerConstructor({ dataIngredients }) {
  const [bunIngredient, setBunIngredient] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [finalSum, setFinalSum] = useState();

  useEffect(() => {
     setBunIngredient(getBunIngredient(dataIngredients));
     setIngredients(getRandomIngredients(dataIngredients));
     
  }, [dataIngredients]);


  useEffect(() => {
     setFinalSum(getFinalSum(ingredients, bunIngredient));
  }, [ingredients, bunIngredient]);

  function getBunIngredient(data) {
    return data.find(({ type }) => type === 'bun');
  }

  function getRandomIngredients(data) {
    const randomIngredients = data.filter(({ type }) => type !== 'bun');
    return randomIngredients.sort(() => Math.random() - Math.random()).slice(0, 5);
  }
  function getFinalSum(otherIngredients, bun) {
    const sumBun = bun.price;
    const sum = (otherIngredients.map(ingredient => ingredient.price).reduce((prev, curr) => prev + curr, 0) + 2 * sumBun);
    return sum;
  }

  return (
    <>
      <div className={style.burger_constructor}>
        <BurgerElement data={bunIngredient} type={'top'} isLocked={true}/>
        <div className={style.scroll}>
          <div className={style.all_ingredients}>
            {ingredients.map((ingredient) => (
                <BurgerElement
                  key={ingredient._id}
                  data={ingredient}
                  isLocked={false}
                />
            ))}
          </div>
        </div>
          <BurgerElement data={bunIngredient} type={'bottom'} isLocked={true} />
      </div>

      <div className={style.finalSum}>
        <p>
          {finalSum}
          <span className={style.finalSum_icon}>
            <CurrencyIcon type="primary" />
          </span>
        </p>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          extraClass="ml-10"
        >
          Оформить заказ
        </Button>
      </div>
    </>
  );
}
BurgerConstructor.propTypes = {
  dataIngredients: PropTypes.arrayOf(DataType).isRequired
};
