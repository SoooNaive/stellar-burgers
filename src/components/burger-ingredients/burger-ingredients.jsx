import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { DataType } from "../app/utils/data-type";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-ingredients.module.css';

const ingredientsTypes = {
  main: 'Начинки',
  sauce: 'Соусы',
  bun: 'Булки',
};

const tabs = ['bun', 'sauce', 'main'].map((type) => ({
  type,
  title: ingredientsTypes[type],
}));

export default function BurgerIngredients({ dataIngredients }) {
  const [current, setCurrent] = useState('bun');
  const [listIngredients, setListIngredients] = useState([]);

  useEffect(() => {
    setListIngredients(getDataList(dataIngredients));
  }, [dataIngredients]);

  function onTabClick(current) {
    setCurrent(current);
  }

  function getDataList(data) {
    const typesGroupIngredients = new Map();

    for (let i = 0; i < data.length; i++) {
      const ingredient = data[i];
      const typeIngredients = typesGroupIngredients.get(ingredient.type) || [];
      typeIngredients.push(ingredient);
      typesGroupIngredients.set(ingredient.type, typeIngredients);
    }
    return Array.from(typesGroupIngredients).map(([type, typeIngredients]) => ({
      typeTitle: ingredientsTypes[type],
      ingredients: typeIngredients,
    }));
  }

  function onIngredientClick(ingredient) {
   console.log(ingredient);
  }

  return (
    <>
      <div className={style.container_burgerIngredients}>
        <p className={style.title_cards}>Соберите бургер</p>
        <div className={style.burger_tabs}>
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
        <div className={style.container_cards}>
          {listIngredients.map(({ typeTitle, ingredients }) => (
            <div key={typeTitle}>
              <p className={style.title_card}>{typeTitle}</p>
              <div className={style.container_card}>
                {ingredients.map((ingredient) => (
                  <div key={ingredient._id} className={style.card} onClick={() => onIngredientClick(ingredient)}>
                      <Counter count={0} size="default" extraClass="m-1" />
                      <img
                        className={style.image_card}
                        src={ingredient.image}
                        alt={ingredient.name}
                      />
                      <p className={style.price_card}>
                        {ingredient.price}
                        <span
                          className={style.icon_price_card}
                        >
                          <CurrencyIcon type="primary" />
                        </span>
                      </p>
                      <p className={style.name_card}>
                        {ingredient.name}
                      </p>
                    </div>
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
  dataIngredients: PropTypes.arrayOf(DataType).isRequired,
};

