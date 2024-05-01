import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IngredientDetails } from '../../components/ingredient-details/ingredient-details';
import { Modal } from '../../components/modal/modal';
import { FC } from 'react';
import { TIngredient, useTypedSelector } from '../../types/types';

export const BurgerIngredientModal: FC = () => {
  const { id } = useParams<{ id: string }>();
  const ingredients = useTypedSelector(
    (store) => store.ingredientsState.ingredients
  );
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState<TIngredient>();

  const onCloseModal = useCallback(() => {
    navigate(location.state?.backgroundLocation);
  }, [location.state?.backgroundLocation, navigate]);

  useEffect(() => {
    setProduct(ingredients?.find(({ _id }) => _id === id));
  }, [ingredients, id]);

  return (
    <Modal header="Детали ингредиента" onClose={onCloseModal}>
      {product && <IngredientDetails ingredient={product} />}
    </Modal>
  );
};
