import { FC } from 'react';
import { useTypedDispatch, useTypedSelector } from '../../../types/types';
import { useLocation } from 'react-router-dom';
import { BURGER_API_WSS } from '../../../utils/burger-api';
import {
  setWebsocketConnection,
  setWebsocketOffline,
} from '../../../services/reducers/orders';
import { useEffect } from 'react';
import { getCookie } from '../../../utils/cookie';

import { OrderFeed } from '../../../components/order-feed/order-feed';

import style from './profile-order.module.css';

export const ProfileOrder: FC = () => {
  const dispatch = useTypedDispatch();
  const location = useLocation();
  const accessToken = getCookie('accessToken');

  const orders = useTypedSelector((store) => store.orderState.orders);

  useEffect(() => {
    dispatch(
      setWebsocketConnection(`${BURGER_API_WSS}/orders?token=${accessToken}`)
    );
    return () => {
      dispatch(setWebsocketOffline());
    };
  }, [location.pathname, accessToken, dispatch]);
  if (orders) {
    return (
      <div className={style.containerOrders}>
        <OrderFeed />
      </div>
    );
  } else {
    return (
      <div>
        <p>Здась будут отображаться ваши заказы</p>
      </div>
    );
  }
};
