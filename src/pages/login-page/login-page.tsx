import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { FC } from 'react';

import { Link } from 'react-router-dom';

import style from './login-page.module.css';

import { useForm } from '../../hooks/useForm';

import { useTypedSelector } from '../../types/types';
import { Navigate } from 'react-router-dom';

export const LoginPage: FC = () => {
  const userName = useTypedSelector((store) => store.userState.userData.name);
  const error = useTypedSelector((store) => store.userState.user.userError);

  const userData = {
    name: '',
    email: '',
    password: '',
    token: '',
  };

  const { formData, handleChange, handleLogin } = useForm(userData);

  if (userName && !error) {
    return <Navigate to={'/'} />;
  }

  return (
    <>
      <div className={style.form_container}>
        <form
          className={style.form}
          name="login"
          onSubmit={handleLogin}
          action="#"
        >
          <div>
            <p className={style.form_title}>Вход</p>
          </div>
          <EmailInput
            name={'email'}
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
          />
          <PasswordInput
            name={'password'}
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
          <Button htmlType="submit">Войти</Button>
        </form>
        <div className={style.buttom_link}>
          <p>
            Вы - новый пользователь?{' '}
            <Link className={style.link} to="/register">
              Зарегистрироваться
            </Link>
          </p>
          <p>
            Забыли пароль?{' '}
            <Link className={style.link} to="/forgot-password">
              Восстановить пароль
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
