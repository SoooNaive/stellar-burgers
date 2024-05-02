import { useTypedSelector } from '../../types/types';
import { FC } from 'react';
import { Order } from '../order/order';
import { Oval } from 'react-loader-spinner';

import style from './order-feed.module.css';

export const OrderFeed: FC = () => {
  const ingredients = useTypedSelector(
    (store) => store.ingredientsState.ingredients
  );
  const orders = useTypedSelector((store) => store.orderState.orders);
  if (orders && ingredients) {
    return (
      <div className={style.container}>
        {orders?.orders?.map((order) => (
          <div key={order.number}>
            <Order orderInfo={order} />
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <Oval
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        color="white"
        secondaryColor="#8585ad"
      />
    );
  }
};
