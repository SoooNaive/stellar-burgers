import { useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import {
  sendOrder,
  closeModalOrder,
  openModalOrder,
} from '../../services/reducers/order';

import { openOrderModal } from '../../services/reducers/burger-constructor';
import { addIngredient } from '../../services/reducers/burger-constructor';

import BurgerElement from './burger-element.jsx';
import BurgerElementBun from './burger-element-bun.jsx';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';

import style from './burger-constructor.module.css';

export default function BurgerConstructor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ondropHeandler = (ingredient) => {
    dispatch(addIngredient(ingredient));
  };
  const ingredients = useSelector(
    (state) => state.burgerConstructorState.ingredients
  );
  const bun = useSelector((state) => state.burgerConstructorState.bun);
  const modal = useSelector((state) => state.modalOrderState.isOpened);
  const userName = useSelector((state) => state.userState.userData.name);

  const [, dropRef] = useDrop({
    accept: 'ingredient',
    drop(itemId) {
      ondropHeandler(itemId);
    },
  });
  const finalSum = useMemo(() => {
    let sum = 0;
    ingredients.forEach((ingredient) => {
      sum += ingredient.price;
    });
    sum += bun?.price * 2;
    return sum;
  }, [ingredients, bun]);

  const onClickOrder = () => {
    if (!userName) {
      navigate('/login');
      return null;
    }
    let allIngredients = [];
    const idIngedients = ingredients?.map((ingredient) => {
      return ingredient._id;
    });
    const idBun = bun?._id;
    allIngredients = allIngredients.concat(idBun, idIngedients, idBun);
    if (!modal) {
      dispatch(sendOrder(allIngredients));
      dispatch(openModalOrder(allIngredients));
      dispatch(openOrderModal());
    } else {
      dispatch(closeModalOrder());
    }
  };

  return (
    <>
      <div className={style.burger_constructor} ref={dropRef}>
        <BurgerElementBun data={bun} type={'top'} isLocked={true} top={true} />
        <div className={style.scroll}>
          {ingredients.length ? (
            <div className={style.all_ingredients}>
              {ingredients.map((ingredient, index) => (
                <BurgerElement
                  key={ingredient.uuid}
                  data={ingredient}
                  isLocked={false}
                  index={index}
                  id={ingredient._id}
                />
              ))}
            </div>
          ) : (
            <div className={style.emptyBlock}>
              <span className={style.emptyText}>
                Перенесите сюда ингредиент
              </span>
            </div>
          )}
        </div>
        <BurgerElementBun
          data={bun}
          type={'bottom'}
          isLocked={true}
          top={false}
        />
      </div>
      <div className={style.finalSum}>
        {!isNaN(finalSum) && (
          <p>
            {finalSum}
            <span className={style.finalSum_icon}>
              <CurrencyIcon type="primary" />
            </span>
          </p>
        )}

        <Button
          htmlType="button"
          type="primary"
          size="large"
          extraClass="ml-10"
          onClick={onClickOrder}
          disabled={!ingredients.length || !bun}
        >
          Оформить заказ
        </Button>
      </div>
      {modal && (
        <Modal onClose={() => onClickOrder()}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}
