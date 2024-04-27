import { useCallback, FC, useState, useEffect } from 'react';
import { TOrder } from '../../types/types';
import { useTypedSelector } from '../../types/types';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { TIngredient } from '../../types/types';
import style from './order.module.css';

import { nanoid } from 'nanoid';

interface IOrderProps {
  orderInfo: TOrder
}

export const Order: FC<IOrderProps> = ({ orderInfo }) => {

  const ingredients = useSelector(
    (store: { ingredientsState: { ingredients: { data: TIngredient[] } } }) =>
      store.ingredientsState.ingredients.data
  );

  const filterIngredients = (arr: string[], data: TIngredient[]) => arr.map(item => {
    return data.filter(i => i._id === item);
  }).reduce((acc, item) => {
    return acc.concat(item)
  }).filter((value, index, self) => self.indexOf(value) === index);

  const filter = filterIngredients(orderInfo.ingredients, ingredients);


  let offset = -45;

  return (
    <div className={style.containerOrder}>
      <div className={style.containerTitle}>
        <p className={style.orderTitle}>
          {`#${orderInfo.number}`}
        </p>
        <p className={style.orderDate}>
          <FormattedDate date={new Date(orderInfo.createdAt)} /> i-GMT+3
        </p>
      </div>
      <div>
        <p className={style.orderName}>{orderInfo.name}</p>
      </div>
      <div>
        <div className={style.orderList}>
          {filter.map((item, index) => {
            offset = offset + 45;
            if (index > 5) {
              return null
            } else if (index < 5) {
              return <div key={nanoid()} className={style.imgContainer} style={{ zIndex: 6 - index, left: offset + 'px' }}>
                <img src={item.image_mobile} alt={item.name}
                  style={{ zIndex: 6 - index }}
                  className={style.image}
                />
              </div>
            } else if (index === 5) {
              return <div key={nanoid()} className={style.imgContainer} style={{ zIndex: 6 - index, left: offset + 'px', opacity: 0.7  }}>
                <img src={item.image_mobile} alt={item.name}
                  style={{ zIndex: 6 - index, opacity: 0.7  }}
                  className={style.image}
                />
                {filter.length > 5 ? <p className={style.counter}>+{filter.length - 5}</p> : null}
              </div>
            }
          })}
        </div>
      </div>
    </div>
  )

};
