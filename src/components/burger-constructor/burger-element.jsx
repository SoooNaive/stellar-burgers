import { useRef, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useDrop, useDrag } from 'react-dnd';

import PropTypes from "prop-types";

import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import { DataType } from '../../utils/data-type';

import { deleteIngredient, moveIngredient } from '../../services/reducers/burger-constructor';

import style from './burger-constructor.module.css';

export default function BurgerElement({ data, isLocked, index, id }) {
  const ref = useRef(null);

  const dispatch = useDispatch();
  const ingredients = useSelector(
    (state) => state.burgerConstructorState.ingredients
  );

  const handleDeleteIngredient = (event, ingredient) => {
    event.preventDefault();
    const index = ingredients.indexOf(ingredient)
    dispatch(deleteIngredient(index));
  };

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    dispatch(moveIngredient({ dragIndex, hoverIndex }));
  }, [dispatch]);

  const [{ handlerId }, drop] = useDrop({
    accept: 'ingredientCard',
    collect: (monitor) => {
      return {
          handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
          return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
          return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  const [, drag] = useDrag({
    type: 'ingredientCard',
    item: () => {
      return { id, index };
    },
  });
  drag(drop(ref));
  
  return (
    <>
      <div className={style.ingredient} ref={ref} data-handler-id={handlerId} draggable >
        <div className={style.icon}>
          <DragIcon type="primary" />
        </div>
        <ConstructorElement
          text={data.name}
          thumbnail={data.image_mobile}
          price={data.price}
          isLocked={isLocked}
          handleClose={(event) => handleDeleteIngredient(event, data)}
        />
      </div>
    </>
  );
}
BurgerElement.propTypes = {
  data: PropTypes.oneOfType([DataType, PropTypes.arrayOf(DataType)]),
  isLocked: PropTypes.bool,
  index: PropTypes.number,
  id: PropTypes.string,
};
