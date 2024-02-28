import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-constructor.module.css';
import PropTypes from "prop-types";
import { DataType } from '../utils/data-type';
export default function BurgerElement({ data, isLocked }) {


  return (
    <>
      <div className={style.ingredient}>
        <div className={style.icon}>
          <DragIcon type="primary" />
        </div>
        <ConstructorElement
          text={data.name}
          thumbnail={data.image_mobile}
          price={data.price}
          isLocked={isLocked}
        />
      </div>
    </>
  );
}
BurgerElement.propTypes = {
  data: PropTypes.oneOfType([DataType, PropTypes.arrayOf(DataType)]),
  isLocked: PropTypes.bool,
};
