import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './profile-user.module.css';
import { useForm } from '../../../hooks/useForm';

import { useEffect } from 'react';

import { FC } from 'react';
import { useTypedSelector } from '../../../types/types';

export const ProfileUser: FC = () => {
  const userName = useTypedSelector((store) => store.userState.userData.name);
  const userEmail = useTypedSelector((store) => store.userState.userData.email);

  const userData = {
    name: userName,
    email: userEmail,
    password: '',
    token: '',
  };

  const {
    formData,
    handleChange,
    isEdited,
    handleResetForm,
    handleUpdateUser,
  } = useForm(userData);

  const isActive = isEdited && (formData.name.length ? true : false);

  useEffect(() => {
    handleResetForm();
  }, []);

  return (
    <div className={style.form_container}>
      <form
        className={style.form}
        name="edit-data"
        action="#"
        onSubmit={handleUpdateUser}
      >
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={handleChange}
          icon={'EditIcon'}
          value={formData.name}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          autoComplete="name"
        />
        <EmailInput
          onChange={handleChange}
          value={formData.email}
          name={'email'}
          isIcon={true}
          autoComplete="email"
        />
        <PasswordInput
          onChange={handleChange}
          value={formData.password}
          name={'password'}
          icon="EditIcon"
          autoComplete="current-password"
        />
        <div className={style.profileButtons}>
          <Button
            htmlType="button"
            type="secondary"
            size="large"
            disabled={!isEdited}
            onClick={handleResetForm}
          >
            Отмена
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            disabled={!isActive}
          >
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
};
