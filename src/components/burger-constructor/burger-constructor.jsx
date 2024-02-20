import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import { DataType } from "../app/utils/data-type";
import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styleBurgerConstructor from './burger-constructor.module.css';
import BurgerElement from './burger-element.jsx';
export default function BurgerConstructor({ data }) {
  const [bunIngredient, setBunIngredient] = React.useState([]);
  const [ingredients, setIngredients] = React.useState([]);
  const [finalSum, setFinalSum] = React.useState();

  useEffect(() => {
     setBunIngredient(getBunIngredient(data));
     setIngredients(getRandomIngredients(data));
  }, [data]);

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
      <div className={styleBurgerConstructor.burger_constructor}>
        <BurgerElement data={bunIngredient} type={'top'} isLocked={true}/>
        <div className={styleBurgerConstructor.scroll}>
          <div className={styleBurgerConstructor.all_ingredients}>
            {ingredients.map((ingredient) => (
              <React.Fragment key={ingredient._id}>
                <BurgerElement
                  data={ingredient}
                  isLocked={false}
                />
              </React.Fragment>
            ))}
          </div>
        </div>
          <BurgerElement data={bunIngredient} type={'bottom'} isLocked={true} />
      </div>

      <div className={styleBurgerConstructor.finalSum}>
        <p>
          {finalSum}
          <span className={styleBurgerConstructor.finalSum_icon}>
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
  data: PropTypes.arrayOf(DataType)
};
