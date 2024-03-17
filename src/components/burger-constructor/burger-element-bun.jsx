import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";

import { DataType } from '../../utils/data-type';
import style from './burger-constructor.module.css';

export default function BurgerElementBun({ data, type, isLocked, top }) {
  return (
    <>
      {data ? ( 
        <div className={style.ingredient}>
          <ConstructorElement
            key={data._id}
            text={`${data.name} (${top ? "верх" : "низ"})`}
            thumbnail={data.image_mobile}
            price={data.price}
            isLocked={isLocked}
            type={type}
          />
        </div> 
      ) : (
        <div className={style.emptyBlock}>
          <span className={style.emptyText}>
            Перенесите сюда булочку
          </span>
        </div>
      )}
    </>
  );
}
  BurgerElementBun.propTypes = {
    data: PropTypes.oneOfType([DataType, PropTypes.arrayOf(DataType)]),
    type: PropTypes.string,
    isLocked: PropTypes.bool,
    top: PropTypes.bool,
  };
  