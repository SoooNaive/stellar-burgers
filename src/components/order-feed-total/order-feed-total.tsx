import { useTypedSelector } from '../../types/types';
import { useCallback, FC } from 'react';

import style from './order-feed-total.module.css';

export const OrderFeedTotal: FC = () => {
  const orders = useTypedSelector((store) => store.orderState.orders);
  const totalOrders = orders?.total;
  const totalOrdersToday = orders?.totalToday;

  const today = new Date();
  const formattedDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    today.getHours(),
    today.getMinutes() - 1,
    0
  )
    .toISOString()
    .split('T')[0];

  const doneOrders = useCallback(() => {
    return orders?.orders
      ?.filter(
        (order) =>
          order.status === 'done' &&
          order.createdAt.toString().split('T')[0] === formattedDate
      )
      .map((order) => order.number);
  }, [orders?.orders, formattedDate]);

  const unfinishedOrders = useCallback(() => {
    return orders?.orders
      ?.filter(
        (order) =>
          order.status !== 'done' &&
          order.createdAt?.toString().split('T')[0] === formattedDate
      )
      .map((order) => order.number);
  }, [orders?.orders, formattedDate]);

  return (
    <div className={style.containerTotal}>
      <div className={style.containerNumbers}>
        <div className={style.containerDone}>
          <p className={style.orderDoneTitle}>Готовы:</p>
          <div className={style.containerOrderNumberDone}>
            {doneOrders()?.map((order, index) => {
              return (
                <p className={style.orderDoneNumber} key={order}>
                  {order}
                </p>
              );
            })}
          </div>
        </div>
        <div className={style.containerUnfinished}>
          <p className={style.orderUnfinishedTitle}>В работе:</p>
          <div className={style.containerOrderUnfinished}>
            {unfinishedOrders()?.map((order, index) => {
              return (
                <p className={style.orderUnfinishedNumber} key={order}>
                  {order}
                </p>
              );
            })}
          </div>
        </div>
      </div>

      <div className={style.containerTotalInfo}>
        <p className={style.totalInfoTitle}>Выполнено за все время:</p>
        <p className={style.totalInfo}>{totalOrders}</p>
        <p className={style.totalInfoTitle}>Выполнено за сегодня:</p>
        <p className={style.totalInfo}>{totalOrdersToday}</p>
      </div>
    </div>
  );
};
