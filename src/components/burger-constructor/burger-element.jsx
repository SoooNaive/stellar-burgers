import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styleBurgerConstructor from './burger-constructor.module.css';
import PropTypes from "prop-types";
import { DataType } from '../app/utils/data-type';
export default function BurgerElement({ data, type, isLocked }) {
 
  return (
    <>
      <div className={styleBurgerConstructor.ingredient}>
        <div className={styleBurgerConstructor.icon}>
          {type === undefined && <DragIcon type="primary" />}
        </div>
        <ConstructorElement
          text={data.name}
          thumbnail={data.image_mobile}
          price={data.price}
          isLocked={isLocked}
          type={type}
        />
      </div>
    </>
  );
}
BurgerElement.propTypes = {
  data: PropTypes.oneOfType([DataType, PropTypes.arrayOf(DataType)]),
  type: PropTypes.string,
  isLocked: PropTypes.bool,
};
