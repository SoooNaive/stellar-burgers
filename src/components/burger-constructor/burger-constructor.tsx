import { useMemo, FC } from 'react';
import { useDrop } from 'react-dnd';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import {
  sendOrder,
  closeModalOrder,
  openModalOrder,
} from '../../services/reducers/create-order';

import { openOrderModal } from '../../services/reducers/burger-constructor';
import { addIngredient } from '../../services/reducers/burger-constructor';

import { BurgerElement } from './burger-element';
import { BurgerElementBun } from './burger-element-bun';
import { OrderDetails } from '../order-details/order-details';
import { Modal } from '../modal/modal';

import {
  useTypedSelector,
  useTypedDispatch,
  TIngredient,
} from '../../types/types';

import style from './burger-constructor.module.css';

export const BurgerConstructor: FC = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const ondropHeandler = (ingredient: TIngredient) => {
    dispatch(addIngredient(ingredient));
  };
  const ingredients = useTypedSelector(
    (state) => state.burgerConstructorState.ingredients
  );
  const bun = useTypedSelector((state) => state.burgerConstructorState.bun);
  const modal = useTypedSelector((state) => state.modalOrderState.isOpened);
  const userName = useTypedSelector((state) => state.userState.userData.name);

  const [, dropRef] = useDrop({
    accept: 'ingredient',
    drop(itemId: TIngredient) {
      ondropHeandler(itemId);
    },
  });
  const finalSum = useMemo(() => {
    let sum = 0;
    ingredients.forEach((ingredient) => {
      sum += ingredient.price;
    });
    if (bun) {
      sum += bun?.price * 2;
    }
    return sum;
  }, [ingredients, bun]);

  const onClickOrder = () => {
    if (!userName) {
      navigate('/login');
      return null;
    }
    let allIngredients: string[] = [];

    const idIngedients = ingredients?.map((ingredient) => {
      return ingredient._id;
    });
    const idBun = bun?._id;
    if (idBun) {
      allIngredients = allIngredients.concat(idBun, idIngedients, idBun);
    }
    if (!modal) {
      dispatch(sendOrder(allIngredients));
      dispatch(openModalOrder());
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
};
