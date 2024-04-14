import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm } from '../../hooks/useForm';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { FC } from 'react';
import { useTypedSelector } from '../../types/types';

import style from '../login-page/login-page.module.css';

export const ResetPasswordPage: FC = () => {
  const changeRequest = useTypedSelector(
    (store) => store.userState.changePassword.changePasswordConfirmed
  );
  const userName = useTypedSelector((store) => store.userState.userData.name);
  const forgotPasswordCheck = useTypedSelector(
    (store) => store.userState.forgotPassword.forgotPasswordConfirmed
  );

  const userData = {
    name: '',
    email: '',
    password: '',
    token: '',
  };

  const { formData, handleChange, handleResetPassword } = useForm(userData);

  if (!forgotPasswordCheck) {
    return <Navigate to={'/forgot-password'} />;
  }

  if (changeRequest) {
    return <Navigate to={'/profile'} />;
  }
  if (userName) {
    return <Navigate to={'/'} />;
  }
  return (
    <>
      <div className={style.form_container}>
        <form
          className={style.form}
          name="register"
          action="#"
          onSubmit={handleResetPassword}
        >
          <div>
            <p className={style.form_title}>Восстановление пароля</p>
          </div>
          <PasswordInput
            extraClass={`mb-6`}
            onChange={handleChange}
            value={formData.password}
            name={'password'}
            placeholder={'Введите новый пароль'}
          />
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={handleChange}
            value={formData.token}
            name={'token'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass={`mb-6`}
          />
          <Button htmlType="submit">Сохранить</Button>
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
