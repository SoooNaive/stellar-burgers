import style from './order-details.module.css';
import image from '../../images/image.png';
import PropTypes from "prop-types";

export default function OrderDetails( {numberOrder, error} ) {
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
        <img src={image} alt="Done image" className={style.order_image} />
        <p className={style.order_text}>Ваш заказ начали готовить</p>
        <p className={style.order_text_down}>
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
      }
    </>
  );
}

OrderDetails.propTypes = {
  numberOrder: PropTypes.number,
  error: PropTypes.object,
};
