import React, { useEffect, useState, useContext, useReducer } from 'react';
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
  const [modalOpen, setModalOpen] = useState(false);

  // Стейты для оформления заказа
  const [order, setOrder] = useState(false);
  const [allIngredients, setAllIngredients] = useState([]);
  const [numberOrder, setNumberOrder] = useState(null);
  const [error, setError] = useState();

  const [finalSumState, finalSumDispatch] = useReducer(
    finalSumReducer,
    initialState
  );

  // Запись в стейт ингредиентов и булки
  useEffect(() => {
     setBunIngredient(getBunIngredient(dataIngredients));
     setIngredients(getRandomIngredients(dataIngredients));
  }, [dataIngredients]);

  // Результирующая сумма
  useEffect(() => {
      ingredients.map(ingredient => {
        finalSumDispatch({ type: "ingredient", payload: ingredient });
      });
      bunIngredient.map(bun => {
        finalSumDispatch({ type: "bun", payload: bun });
      });
  }, [ingredients, bunIngredient]);

  // Если нажали на кнопку "оформить" и номер заказа пустой, то выполнить запрос
  useEffect(() => {
    if(order && !numberOrder) {
      sendOrder(allIngredients);
    }
  }, [allIngredients])

  // Получить рандомную булку
  function getBunIngredient(data) {
    const randomBunIngredients = data.filter(({ type }) => type === 'bun').sort(() => Math.random() - Math.random()).slice(0, 1);
    return randomBunIngredients;
  }

  // Получить 5 рандомных ингредиентов
  function getRandomIngredients(data) {
    const randomIngredients = data.filter(({ type }) => type !== 'bun');
    return randomIngredients.sort(() => Math.random() - Math.random()).slice(0, 5);
  }

  // Клик по кнопке "Оформить"
  function onBtnClick() {
    const idIngedients = ingredients.map(ingredient => {
      return ingredient._id });
    const idBun = bunIngredient.map(bun => {
        return bun._id });
    setAllIngredients(idIngedients.concat(idBun, idBun));
    setOrder(true);
    setModalOpen(!modalOpen);
  }

  const sendOrder = async () => {
    return fetch("https://norma.nomoreparties.space/api/orders", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            "ingredients": allIngredients
        })
    })
    .then((response) => {
      return response.ok ? response.json() : setNumberOrder({ ...numberOrder })
    })
    .then((number) => {
      setNumberOrder(number.order.number);
      })
    .catch(e => {
      setError(e);
    });
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
          <OrderDetails numberOrder={numberOrder} error={error} />
        </Modal>
      )}
    </>
  );
}
