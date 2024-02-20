import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import { DataType } from "../app/utils/data-type";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styleBurgerIngredients from './burger-ingredients.module.css';

const ingredientsTypes = {
  main: 'Начинки',
  sauce: 'Соусы',
  bun: 'Булки',
};

const tabs = ['bun', 'sauce', 'main'].map((type) => ({
  type,
  title: ingredientsTypes[type],
}));

export default function BurgerIngredients({ data }) {
  const [current, setCurrent] = React.useState('bun');
  const [listIngredients, setListIngredients] = React.useState([]);

  useEffect(() => {
    setListIngredients(getDataList(data));
  }, [data]);

  function onTabClick(current) {
    setCurrent(current);
  }

  function getDataList(data) {
    const typesGroupIngregients = new Map();

    for (let i = 0; i < data.length; i++) {
      const ingredient = data[i];
      const typeIngredients = typesGroupIngregients.get(ingredient.type) || [];
      typeIngredients.push(ingredient);
      typesGroupIngregients.set(ingredient.type, typeIngredients);
    }
    return Array.from(typesGroupIngregients).map(([type, typeIngredients]) => ({
      typeTitle: ingredientsTypes[type],
      ingredients: typeIngredients,
    }));
  }

  return (
    <>
      <div className={styleBurgerIngredients.container_burgerIngredients}>
        <p className={styleBurgerIngredients.title_cards}>Соберите бургер</p>
        <div className={styleBurgerIngredients.burger_tabs}>
          {tabs.map(({ type, title }) => (
            <Tab
              key={type}
              value={type}
              active={current === type}
              onClick={onTabClick}
            >
              {title}
            </Tab>
          ))}
        </div>
        <div className={styleBurgerIngredients.container_cards}>
          {listIngredients.map(({ typeTitle, ingredients }) => (
            <div key={typeTitle}>
              <p className={styleBurgerIngredients.title_card}>{typeTitle}</p>
              <div className={styleBurgerIngredients.container_card}>
                {ingredients.map((ingredient) => (
                  <React.Fragment key={ingredient._id}>
                    <div className={styleBurgerIngredients.card}>
                      <Counter count={0} size="default" extraClass="m-1" />
                      <img
                        className={styleBurgerIngredients.image_card}
                        src={ingredient.image}
                        alt={ingredient.name}
                      />
                      <p className={styleBurgerIngredients.price_card}>
                        {ingredient.price}
                        <span
                          className={styleBurgerIngredients.icon_price_card}
                        >
                          <CurrencyIcon type="primary" />
                        </span>
                      </p>
                      <p className={styleBurgerIngredients.name_card}>
                        {ingredient.name}
                      </p>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(DataType),
};

