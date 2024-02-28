import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
  import style from './burger-constructor.module.css';
  import PropTypes from "prop-types";
  import { DataType } from '../utils/data-type';
  export default function BurgerElementBun({ data, type, isLocked, top }) {
    return (
      <>
        <div className={style.ingredient}>
          {data.map((bun) => (
            <ConstructorElement
              key={bun._id}
              text={`${bun.name} (${top ? "верх" : "низ"})`}
              thumbnail={bun.image_mobile}
              price={bun.price}
              isLocked={isLocked}
              type={type}
            />
          ))} 
        </div>
      </>
    );
  }
  BurgerElementBun.propTypes = {
    data: PropTypes.oneOfType([DataType, PropTypes.arrayOf(DataType)]),
    type: PropTypes.string,
    isLocked: PropTypes.bool,
    top: PropTypes.bool,
  };
  