import { useRef, useCallback } from 'react';

import { useDrop, useDrag, XYCoord } from 'react-dnd';

import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';

import {
  deleteIngredient,
  moveIngredient,
} from '../../services/reducers/burger-constructor';

import {
  TIngredient,
  useTypedDispatch,
  useTypedSelector,
} from '../../types/types';

import style from './burger-constructor.module.css';

export const BurgerElement = ({
  data,
  isLocked,
  index,
  id,
}: {
  data: TIngredient;
  isLocked: boolean;
  index: number;
  id: string;
}) => {
  const ref = useRef(null);

  const dispatch = useTypedDispatch();
  const ingredients = useTypedSelector(
    (state) => state.burgerConstructorState.ingredients
  );

  const handleDeleteIngredient = (ingredient: TIngredient) => {
    const index = ingredients.indexOf(ingredient);
    dispatch(deleteIngredient(index));
  };

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      dispatch(moveIngredient({ dragIndex, hoverIndex }));
    },
    [dispatch]
  );

  const [, drop] = useDrop({
    accept: 'ingredientCard',
    hover(item: { index: number }, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const rect: HTMLElement = ref.current;
      const hoverBoundingRect = rect?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [, drag] = useDrag({
    type: 'ingredientCard',
    item: () => {
      return { id, index };
    },
  });
  drag(drop(ref));

  return (
    <div className={style.ingredient} ref={ref} draggable>
      <div className={style.icon}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={data.name}
        thumbnail={data.image_mobile}
        price={data.price}
        isLocked={isLocked}
        handleClose={() => handleDeleteIngredient(data)}
      />
    </div>
  );
};
