import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './profile-user.module.css';
import { useSelector } from 'react-redux';
import { useForm } from '../../../hooks/useForm';

import { useEffect } from 'react';

function ProfileUser() {
  const userName = useSelector((store) => store.userState.userData.name);
  const userEmail = useSelector((store) => store.userState.userData.email);

  const userData = {
    name: userName,
    email: userEmail,
    password: '',
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
        />
        <EmailInput
          onChange={handleChange}
          value={formData.email}
          name={'email'}
          isIcon={true}
        />
        <PasswordInput
          onChange={handleChange}
          value={formData.password}
          name={'password'}
          icon="EditIcon"
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
}

export default ProfileUser;
