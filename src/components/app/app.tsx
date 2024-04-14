import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import { HomePage } from '../../pages/home-page/home-page';
import { LoginPage } from '../../pages/login-page/login-page';
import { RegisterPage } from '../../pages/register-page/register-page';
import { ProfilePage } from '../../pages/profile-page/profile-page';
import { ProfileUser } from '../../pages/profile-page/profile-user/profile-user';
import { ProfileOrder } from '../../pages/profile-page/profile-order/profile-order';
import { BurgerIngredientPage } from '../../pages/burger-ingredient-page/burger-ingredient-page';
import { BurgerIngredientModal } from '../../pages/burger-ingredient-page/burger-ingredient-modal';
import { ForgotPasswordPage } from '../../pages/forgot-password-page/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password-page/reset-password';
import { FeedPage } from '../../pages/feed-page/feed';
import { NotFound404 } from '../../pages/not-found-404/not-found-404';

import { AppHeader } from '../app-header/app-header';

import { checkAuth } from '../../services/reducers/user';
import { getIngredients } from '../../services/reducers/ingredients';
import { OnlyUnAuth, OnlyAuth } from '../protected-route/protected-route';
import { FC } from 'react';
import { useTypedDispatch } from '../../types/types';

export const App: FC = () => {
  const location = useLocation();
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Routes location={location.state?.backgroundLocation || location}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={<OnlyUnAuth component={<LoginPage />} />}
        />
        <Route
          path="/register"
          element={<OnlyUnAuth component={<RegisterPage />} />}
        />
        <Route
          path="/forgot-password"
          element={<OnlyUnAuth component={<ForgotPasswordPage />} />}
        />
        <Route
          path="/reset-password"
          element={<OnlyUnAuth component={<ResetPasswordPage />} />}
        />
        <Route
          path="/profile"
          element={<OnlyAuth component={<ProfilePage />} />}
        >
          <Route index element={<ProfileUser />} />
          <Route path="orders" element={<ProfileOrder />} />
        </Route>
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/ingredients/:id" element={<BurgerIngredientPage />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>

      {location.state?.backgroundLocation && (
        <Routes>
          <Route path="/ingredients/:id" element={<BurgerIngredientModal />} />
        </Routes>
      )}
    </>
  );
};

export default App;
