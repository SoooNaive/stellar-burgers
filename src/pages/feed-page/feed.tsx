import { useEffect, FC } from 'react';
import {
  setWebsocketConnection,
  setWebsocketOffline,
} from '../../services/reducers/orders';
import { BURGER_API_WSS } from '../../utils/burger-api';

import { useLocation } from 'react-router-dom';
import { useTypedDispatch } from '../../types/types';

import { OrderFeed } from '../../components/order-feed/order-feed';
import { OrderFeedTotal } from '../../components/order-feed-total/order-feed-total';

import style from './feed-page.module.css';

export const FeedPage: FC = () => {
  const dispatch = useTypedDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(setWebsocketConnection(`${BURGER_API_WSS}/orders/all`));
    return () => {
      dispatch(setWebsocketOffline());
    };
  }, [location.pathname, dispatch]);

  return (
    <div className={style.container}>
      <div className={style.containerOrder}>
        <h3> Лента заказов </h3>
        <OrderFeed />
      </div>
      <div className={style.containerInfo}>
        <OrderFeedTotal />
      </div>
    </div>
  );
};
