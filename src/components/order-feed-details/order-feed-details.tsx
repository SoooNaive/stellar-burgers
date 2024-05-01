import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, FC, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useTypedDispatch, useTypedSelector } from '../../types/types';
import { onFetchOrder } from '../../services/actions/order';

import style from './order-feed-details.module.css';

import { Oval } from 'react-loader-spinner';

export const OrderFeedDetails: FC = () => {
  const { id } = useParams<{ id: string }>();

  const dispatch = useTypedDispatch();

  const ingredients = useTypedSelector(
    (store) => store.ingredientsState.ingredients
  );

  useEffect(() => {
    if (id) {
      dispatch(onFetchOrder(id));
    }
  }, [dispatch, id]);

  const order = useTypedSelector((store) => store.orderState.order?.orders[0]);

  const returnIngredientsQuantity = useCallback(
    (id: string | undefined) => {
      let ingredientsQuantity = 0;
      order?.ingredients.map((ingredientId) => {
        if (ingredientId === id) ingredientsQuantity++;
      });
      return ingredientsQuantity;
    },
    [order?.ingredients]
  );
  const returnIngredients = useCallback(() => {
    const mutatedIngredients = Array.from(new Set(order?.ingredients));
    return mutatedIngredients.map((ingredient, index) => {
      return ingredients?.find((item) => item._id === ingredient);
    });
  }, [order?.ingredients, ingredients]);

  const returnIngredientsPrice = useCallback(() => {
    const arrOfIngredientsPrice = order?.ingredients?.map(
      (ingredient) =>
        ingredients?.find((item) => item._id === ingredient)?.price
    );

    return arrOfIngredientsPrice?.reduce(
      (acc: number, item: number | undefined) => {
        if (item) {
          acc += item;
        }
        return acc;
      },
      0
    );
  }, [order?.ingredients, ingredients]);

  return order ? (
    <div className={style.orderContainer}>
      <div className={style.number}>
        <p>{`#${order.number}`}</p>
      </div>
      <div className={style.textContainer}>
        <p className={style.nameTitle}>{order.name}</p>
        <p
          className={`mt-2 mb-15 text text_type_main-small ${
            order.status === 'done' ? 'text_color_success' : null
          }`}
        >
          {`${order.status === 'done' ? 'Выполнен' : 'Готовится'}`}
        </p>
      </div>
      <div className={style.ingredientsContainer}>
        <p className={style.title}>Состав:</p>
        <div className={style.ingredientInfo}>
          {returnIngredients().map((ingredient) => {
            return (
              <div key={ingredient?._id}>
                <div className={style.ingredient}>
                  <div className={style.ingredientLeft}>
                    <div className={style.imageContainer}>
                      <img
                        className={style.image}
                        src={ingredient?.image}
                        alt={ingredient?.name}
                      />
                    </div>
                    <p className={style.ingredientName}>{ingredient?.name}</p>
                  </div>

                  <p className={style.ingredientPrice}>
                    {`${returnIngredientsQuantity(ingredient?._id)} x ${
                      ingredient?.price
                    }`}
                    <span className={style.ingredientPriceIcon}>
                      <CurrencyIcon type="primary" />
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={style.orderFooter}>
        <p className={style.orderDate}>
          <FormattedDate date={new Date(order.createdAt)} /> i-GMT+3
        </p>
        <p className={style.orderPrice}>
          {returnIngredientsPrice()}{' '}
          <span>
            <CurrencyIcon type="primary" />
          </span>
        </p>
      </div>
    </div>
  ) : (
    <div className={style.spinner}>
      <Oval
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        color="white"
        secondaryColor="#8585ad"
      />
    </div>
  );
};
