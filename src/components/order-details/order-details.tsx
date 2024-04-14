import { useTypedSelector } from '../../types/types';
import { FC } from 'react';

import style from './order-details.module.css';
import image from '../../images/image.png';
import { Oval } from 'react-loader-spinner';

export const OrderDetails: FC = () => {
  const numberOrder = useTypedSelector((state) => state.modalOrderState.number);
  const error = useTypedSelector((state) => state.modalOrderState.error);
  return (
    <>
      {error && (
        <div className={style.container_error}>
          <p className={style.error_text}>Что-то пошло не так :(</p>
        </div>
      )}
      {!error && (
        <div className={style.container_order}>
          <div>
            {!numberOrder && (
              <Oval
                visible={true}
                height="80"
                width="80"
                ariaLabel="color-ring-loading"
                color="white"
                secondaryColor="#8585ad"
              />
            )}
            {numberOrder && <p className={style.order_number}>{numberOrder}</p>}
          </div>
          <p className={style.order_number_title}>Идентификатор заказа</p>
          <img src={image} alt="Done" className={style.order_image} />
          <p className={style.order_text}>Ваш заказ начали готовить</p>
          <p className={style.order_text_down}>
            Дождитесь готовности на орбитальной станции
          </p>
        </div>
      )}
    </>
  );
};
