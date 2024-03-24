import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import IngredientCard from './ingredient-card';

import { useLocation, useNavigate } from 'react-router-dom';

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

export default function BurgerIngredients() {
  const navigate = useNavigate();
  let location = useLocation();

  const ingredients = useSelector(
    (state) => state.ingredientsState.ingredients.data
  );

  const [current, setCurrent] = useState('bun');

  const [listIngredients, setListIngredients] = useState([]);

  useEffect(() => {
    setListIngredients(getDataList(ingredients));
  }, [ingredients]);

  function onTabClick(current) {
    setCurrent(current);
    typesRefs[current].current?.scrollIntoView();
  }

  const typesRefs = {
    main: useRef(),
    bun: useRef(),
    sauce: useRef(),
  };

  useEffect(() => {
    const handleScroll = () => {
      const container = document.querySelector('.scroll');
      const titles = container.querySelectorAll('h2');
      let closestTitle = null;
      let closestDistance = Infinity;
      titles.forEach((title) => {
        const rect = title.getBoundingClientRect();
        const distance = Math.abs(rect.left) + Math.abs(rect.top);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestTitle = title;
        }
      });
      if (closestTitle) {
        setCurrent(
          Object.keys(ingredientsTypes).find(
            (key) => ingredientsTypes[key] === closestTitle.innerText
          )
        );
      }
    };
    const container = document.querySelector('.scroll');
    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function onIngredientClick(ingredient) {
    navigate(`ingredients/${ingredient._id}`, {
      state: { backgroundLocation: location },
    });
  }

  function getDataList(data) {
    if (!data) {
      return [];
    }
    const typesGroupIngredients = new Map();
    for (let i = 0; i < data.length; i++) {
      const ingredient = data[i];
      const typeIngredients = typesGroupIngredients.get(ingredient.type) || [];
      typeIngredients.push(ingredient);
      typesGroupIngredients.set(ingredient.type, typeIngredients);
    }
    return Array.from(typesGroupIngredients).map(([type, typeIngredients]) => ({
      type: type,
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
        <div className={`scroll ${style.container_cards}`}>
          {listIngredients.map(({ typeTitle, ingredients, type }) => (
            <div key={typeTitle}>
              <h2 className={style.title_card} ref={typesRefs[type]}>
                {typeTitle}
              </h2>
              <div className={style.container_card}>
                {ingredients.map((ingredient) => (
                  <IngredientCard
                    key={ingredient._id}
                    ingredient={ingredient}
                    onIngredientClick={onIngredientClick}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
