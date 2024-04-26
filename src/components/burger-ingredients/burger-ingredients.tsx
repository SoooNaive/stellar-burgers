import { useEffect, useState, useRef, FC, MutableRefObject } from 'react';
import { useSelector } from 'react-redux';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import { IngredientCard } from './ingredient-card';

import { useLocation, useNavigate } from 'react-router-dom';

import style from './burger-ingredients.module.css';

import { TIngredientType, TIngredient } from '../../types/types';

interface IIngredientGroup {
  type?: TIngredientType;
  title?: string;
  ingredients: TIngredient[];
  typeTitle?: string;
  onTabClick?: (tab: TIngredientType) => void;
  current?: TIngredientType;
}

const ingredientsTypes: Record<TIngredientType, string> = {
  bun: 'Булки',
  main: 'Начинки',
  sauce: 'Соусы',
};

const tabs: { type: TIngredientType; title: string }[] = (
  Object.keys(ingredientsTypes) as TIngredientType[]
).map((type) => ({
  type,
  title: ingredientsTypes[type],
}));

export const BurgerIngredients: FC = () => {
  const navigate = useNavigate();
  let location = useLocation();

  const ingredients = useSelector(
    (store: { ingredientsState: { ingredients: { data: TIngredient[] } } }) =>
      store.ingredientsState.ingredients.data
  );

  const [current, setCurrent] = useState<TIngredientType | undefined | string>(
    'bun'
  );

  const [listIngredients, setListIngredients] = useState<IIngredientGroup[]>(
    []
  );

  useEffect(() => {
    setListIngredients(getDataList(ingredients));
  }, [ingredients]);

  function onTabClick(current: TIngredientType) {
    setCurrent(current);
    typesRefs[current].current?.scrollIntoView();
  }

  const typesRefs: Record<
    TIngredientType,
    MutableRefObject<HTMLDivElement | null>
  > = {
    bun: useRef(null),
    main: useRef(null),
    sauce: useRef(null),
  };

  useEffect(() => {
    const handleScroll = () => {
      const container = document.querySelector('.scroll');
      const titles = container?.querySelectorAll('h2');
      let closestTitle: HTMLHeadingElement | null = null;
      let closestDistance = Infinity;
      titles?.forEach((title) => {
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
            (key) =>
              ingredientsTypes[key as TIngredientType] ===
              closestTitle?.innerText
          )
        );
      }
    };
    const container = document.querySelector('.scroll');
    container?.addEventListener('scroll', handleScroll);
    return () => {
      container?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function onIngredientClick(ingredient: TIngredient) {
    navigate(`ingredients/${ingredient._id}`, {
      state: { backgroundLocation: location },
    });
  }

  function getDataList(data: TIngredient[]) {
    if (!data) {
      return [];
    }
    const typesGroupIngredients = new Map<TIngredientType, TIngredient[]>();
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
              onClick={(item: string) => onTabClick(item as TIngredientType)}
            >
              {title}
            </Tab>
          ))}
        </div>
        <div className={`scroll ${style.container_cards}`}>
          {listIngredients.map(({ typeTitle, ingredients, type }) => (
            <div key={typeTitle}>
              <h2
                className={style.title_card}
                ref={typesRefs[type!]}
                data-type={type}
              >
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
};
