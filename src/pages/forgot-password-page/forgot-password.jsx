import {
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

import style from '../login-page/login-page.module.css';

import { useForm } from '../../hooks/useForm';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ForgotPasswordPage() {
  const forgotPasswordRequest = useSelector(
    (store) => store.userState.forgotPassword.forgotPasswordConfirmed
  );
  const userName = useSelector((store) => store.userState.userData.name);
  const userData = {
    email: '',
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
}

export default ForgotPasswordPage;
