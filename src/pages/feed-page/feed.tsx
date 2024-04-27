import { useEffect, FC } from 'react';
import { setWebsocketConnection, setWebsocketOffline } from '../../services/reducers/orders';
import { BASE_WSS } from '../../utils/burger-api';

import { useLocation } from 'react-router-dom';
import { useTypedSelector } from '../../types/types';
import { useTypedDispatch } from '../../types/types';

import { OrderFeed } from '../../components/order-feed/order-feed';

import style from './feed-page.module.css'

export const FeedPage: FC = () => {

  const dispatch = useTypedDispatch();
  const orders = useTypedSelector(store => store.orderState?.orders);
  const location = useLocation();

  useEffect(() => {
    dispatch(setWebsocketConnection(`${BASE_WSS}/orders/all`))
    return () => {
      dispatch(setWebsocketOffline())
    }
  }, [location.pathname])

  console.log(orders);


  return (
    <div className={style.container}>
      <div className={style.containerOrder}>
        <h3> Лента заказов </h3>
        <OrderFeed />
      </div>
      <div className={style.containerInfo}>
      </div>
    </div>
  )
}