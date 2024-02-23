import style from './order-details.module.css';
import image from '../../images/image.png';

export default function OrderDetails() {
  return (
    <>
      <div className={style.container_order}>
        <p className={style.order_number}>034536</p>
        <p className={style.order_number_title}>Идентификатор заказа</p>
        <img src={image} alt="Done image" className={style.order_image} />
        <p className={style.order_text}>Ваш заказ начали готовить</p>
        <p className={style.order_text_down}>
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </>
  );
}
