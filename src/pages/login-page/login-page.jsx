import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

import style from './login-page.module.css';

import { useForm } from '../../hooks/useForm';

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function LoginPage() {
  const userName = useSelector((store) => store.userState.userData.name);
  const error = useSelector((store) => store.userState.user.userError);

  const userData = {
    email: '',
    password: '',
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
          />
          <PasswordInput
            name={'password'}
            value={formData.password}
            onChange={handleChange}
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
}

export default LoginPage;
