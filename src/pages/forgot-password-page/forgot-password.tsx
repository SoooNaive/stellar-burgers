import {
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { FC } from 'react';
import { useTypedSelector } from '../../types/types';

import style from '../login-page/login-page.module.css';

import { useForm } from '../../hooks/useForm';
import { Navigate } from 'react-router-dom';

export const ForgotPasswordPage: FC = () => {
  const forgotPasswordRequest = useTypedSelector(
    (store) => store.userState.forgotPassword.forgotPasswordConfirmed
  );
  const userName = useTypedSelector((store) => store.userState.userData.name);
  const userData = {
    name: '',
    email: '',
    password: '',
    token: '',
  };

  const { formData, handleChange, handleForgotPassword } = useForm(userData);

  if (forgotPasswordRequest) {
    return <Navigate to={'/reset-password'} />;
  }

  if (userName) {
    return <Navigate to={'/'} />;
  }

  return (
    <>
      <div className={style.form_container}>
        <form
          className={style.form}
          name="forgot-password"
          action="#"
          onSubmit={handleForgotPassword}
        >
          <div>
            <p className={style.form_title}>Восстановление пароля</p>
          </div>
          <EmailInput
            onChange={handleChange}
            value={formData.email}
            name={'email'}
            autoComplete="email"
          />
          <Button htmlType="submit">Восстановить</Button>
        </form>
        <div className={style.buttom_link}>
          <p>
            Вспомнили пароль?{' '}
            <Link className={style.link} to="/login">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
