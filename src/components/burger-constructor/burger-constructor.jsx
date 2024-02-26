import React, { useEffect, useState, useContext, useReducer } from 'react';
import PropTypes from "prop-types";
import { DataType } from "../app/utils/data-type";
import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-constructor.module.css';
import BurgerElement from './burger-element.jsx';
import BurgerElementBun from './burger-element-bun.jsx';
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import IngredientsContext from "../app/utils/ingredients-context";


const initialState = { finalSum: 0 };

function finalSumReducer(state, action) {
  switch (action.type) {
    case "bun":
      return { finalSum: state.finalSum + action.payload.price * 2 };
    case "ingredient":
      return { finalSum: state.finalSum + action.payload.price };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}


export default function BurgerConstructor() {
  const dataIngredients = useContext(IngredientsContext);

  const [bunIngredient, setBunIngredient] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  // const [finalSum, setFinalSum] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const [finalSumState, finalSumDispatch] = useReducer(
    finalSumReducer,
    initialState
  );


  useEffect(() => {
     setBunIngredient(getBunIngredient(dataIngredients));
     setIngredients(getRandomIngredients(dataIngredients));
  }, [dataIngredients]);


  // useEffect(() => {
  //    setFinalSum(getFinalSum(ingredients, bunIngredient));
  // }, [ingredients, bunIngredient]);


  useEffect(() => {
      ingredients.map(ingredient => {
        finalSumDispatch({ type: "ingredient", payload: ingredient });
      });
      // finalSumDispatch({ type: "bun", payload: bunIngredient }); 
  },
  [ingredients, bunIngredient]
);

  function getBunIngredient(data) {
    return data.find(({ type }) => type === 'bun');
  }

  function getRandomIngredients(data) {
    const randomIngredients = data.filter(({ type }) => type !== 'bun');
    return randomIngredients.sort(() => Math.random() - Math.random()).slice(0, 5);
  }
  // function getFinalSum(otherIngredients, bun) {
  //   const sumBun = bun.price;
  //   const sum = (otherIngredients.map(ingredient => ingredient.price).reduce((prev, curr) => prev + curr, 0) + 2 * sumBun);
  //   return sum;
  // }

  function onBtnClick() {
    // console.log(ingredients);
    setModalOpen(!modalOpen);
  }

  return (
    <>
      <div className={style.burger_constructor}>
        <BurgerElementBun data={bunIngredient} type={'top'} isLocked={true} top={true}/>
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
          <BurgerElementBun data={bunIngredient} type={'bottom'} isLocked={true} top={false}/>
      </div>

      <div className={style.finalSum}>
        <p>
          {finalSumState.finalSum}
          <span className={style.finalSum_icon}>
            <CurrencyIcon type="primary" />
          </span>
        </p>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          extraClass="ml-10"
          onClick={onBtnClick}
        >
          Оформить заказ
        </Button>
      </div>
      {modalOpen && (
        <Modal onClose={() => onBtnClick()}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}
BurgerConstructor.propTypes = {
  dataIngredients: DataType
};
