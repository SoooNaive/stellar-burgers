import { useEffect, useState, useContext, useMemo } from 'react';
import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-constructor.module.css';
import BurgerElement from './burger-element.jsx';
import BurgerElementBun from './burger-element-bun.jsx';
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import IngredientsContext from "../services/ingredients-context";
import { getData } from '../utils/data';


const API_URL = getData();

export default function BurgerConstructor() {

  const dataIngredients = useContext(IngredientsContext);

  const [modalOpen, setModalOpen] = useState(false);

  // Стейты для оформления заказа
  const [order, setOrder] = useState(false);
  const [allIngredients, setAllIngredients] = useState([]);
  const [numberOrder, setNumberOrder] = useState(null);
  const [error, setError] = useState();

  const { bunIngredient, ingredients } = useMemo(() => {
    return {
      bunIngredient: dataIngredients.filter(item => item.type === 'bun').sort(() => Math.random() - Math.random()).slice(0, 1),
      ingredients: dataIngredients.filter(item => item.type !== 'bun').sort(() => Math.random() - Math.random()).slice(0, 5),
    };
  }, [dataIngredients]);
  
  // Результирующая сумма
  // Убирала StrictMode потому что он создавал проблемы при подсчете суммы заказа. 
  // Если оставлять StrictMode, то корректо считать получается только локально
  const finalSum = useMemo(() => {
    let sum = 0;
    ingredients.forEach(ingredient => {
      sum += ingredient.price;
    });
    bunIngredient.forEach(bun => {
      sum += bun.price * 2;
    });
    return sum;
  }, [ingredients, bunIngredient]);

  // Если нажали на кнопку "оформить" и номер заказа пустой, то выполнить запрос
  useEffect(() => {
    if(order && !numberOrder) {
      sendOrder(allIngredients);
    }
  }, [allIngredients]);

  // Клик по кнопке "Оформить"
  function onBtnClick() {
    const idIngedients = ingredients.map(ingredient => {
      return ingredient._id });
    const idBun = bunIngredient.map(bun => {
        return bun._id });
    setAllIngredients(allIngredients.concat(idBun, idIngedients, idBun));
    setOrder(true);
    setModalOpen(!modalOpen);
  }

  const sendOrder = async () => {
    return fetch(`${API_URL}/orders`, {
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
