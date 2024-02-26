import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
  import style from './burger-constructor.module.css';
  import PropTypes from "prop-types";
  import { DataType } from '../app/utils/data-type';
  export default function BurgerElementBun({ data, type, isLocked, top }) {
  
    const text = `${data.name} (${top ? "верх" : "низ"})`;

    return (
      <>
        <div className={style.ingredient}>
          <ConstructorElement
            text={text}
            thumbnail={data.image_mobile}
            price={data.price}
            isLocked={isLocked}
            type={type}
          />
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
  