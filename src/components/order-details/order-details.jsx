import { useSelector } from 'react-redux';

import style from './order-details.module.css';
import image from '../../images/image.png';

export default function OrderDetails() {
  const numberOrder = useSelector((state) => state.modalOrderState.number);
  const error = useSelector((state) => state.modalOrderState.error);
  return (
    <>
      {error && 
        <div className={style.container_error}>
          <p className={style.error_text}>Что-то пошло не так :(</p>
        </div>
      }
      {!error &&
      <div className={style.container_order}>
        <p className={style.order_number}>{numberOrder}</p>
        <p className={style.order_number_title}>Идентификатор заказа</p>
        <img src={image} alt="Done" className={style.order_image} />
        <p className={style.order_text}>Ваш заказ начали готовить</p>
        <p className={style.order_text_down}>
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
      }
    </>
  );
}