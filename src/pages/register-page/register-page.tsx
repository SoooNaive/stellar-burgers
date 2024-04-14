import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { FC } from 'react';
import { useTypedSelector } from '../../types/types';

import style from '../login-page/login-page.module.css';
import { Link } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';

import { Navigate } from 'react-router-dom';

export const RegisterPage: FC = () => {
  const userName = useTypedSelector((store) => store.userState.userData.name);
  const error = useTypedSelector(
    (store) => store.userState.register.registerError
  );

  const userData = {
    name: '',
    email: '',
    password: '',
    token: '',
  };

  const { formData, handleChange, handleRegister } = useForm(userData);

  if (userName && !error) {
    return <Navigate to={'/'} />;
  }

  return (
    <>
      <div className={style.form_container}>
        <form
          className={style.form}
          name="register"
          action="#"
          onSubmit={handleRegister}
        >
          <div>
            <p className={style.form_title}>Регистрация</p>
          </div>
          <Input
            type={'text'}
            placeholder={'Имя'}
            name={'name'}
            onChange={handleChange}
            value={formData.name}
            error={false}
          />
          <EmailInput
            name={'email'}
            onChange={handleChange}
            value={formData.email}
          />
          <PasswordInput
            name={'password'}
            onChange={handleChange}
            value={formData.password}
          />
          <Button htmlType="submit">Регистрация</Button>
        </form>
        <div className={style.buttom_link}>
          <p>
            Уже зарегистрированы?{' '}
            <Link className={style.link} to="/login">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
