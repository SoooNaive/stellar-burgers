import React, { useEffect, useState, useContext } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-ingredients.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import IngredientCard from './ingredient-card';
import IngredientsContext from "../app/utils/ingredients-context";

const ingredientsTypes = {
  main: 'Начинки',
  sauce: 'Соусы',
  bun: 'Булки',
};

const tabs = ['bun', 'sauce', 'main'].map((type) => ({
  type,
  title: ingredientsTypes[type],
}));

export default function BurgerIngredients() {
  const [current, setCurrent] = useState('bun');
  const [listIngredients, setListIngredients] = useState([]);
  const [ingredientDetails, setIngredientDetails] = useState();

  const dataIngredients = useContext(IngredientsContext);

  useEffect(() => {
    setListIngredients(getDataList(dataIngredients));
  }, [dataIngredients]);

  function onTabClick(current) {
    setCurrent(current);
  }

  function onIngredientClick(ingredient) {
    setIngredientDetails(ingredient);
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
            <IngredientCard
              key={typeTitle}
              ingredients={ingredients}
              typeTitle={typeTitle}
              onIngredientClick={onIngredientClick}
            />
          ))}
        </div>
      </div>
      {ingredientDetails && (
        <Modal header="Детали ингредиента" onClose={() => onIngredientClick()}>
          <IngredientDetails ingredient={ingredientDetails} />
        </Modal>
      )}
    </>
  );
}
