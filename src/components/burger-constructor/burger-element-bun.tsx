import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import { TIngredient } from '../../types/types';

import style from './burger-constructor.module.css';

export const BurgerElementBun = ({
  data,
  type,
  isLocked,
  top,
}: {
  data: TIngredient | null;
  type: 'top' | 'bottom' | undefined;
  isLocked: boolean;
  top: boolean;
}) => {
  return (
    <>
      {data ? (
        <div className={style.ingredient}>
          <ConstructorElement
            key={data._id}
            text={`${data.name} (${top ? 'верх' : 'низ'})`}
            thumbnail={data.image_mobile}
            price={data.price}
            isLocked={isLocked}
            type={type}
          />
        </div>
      ) : (
        <div className={style.emptyBlock}>
          <span className={style.emptyText}>Перенесите сюда булочку</span>
        </div>
      )}
    </>
  );
};
