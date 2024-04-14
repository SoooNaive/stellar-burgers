import { useState } from 'react';
import {
  onLogin,
  onUpdateUser,
  onRegister,
  onForgotPassword,
  onResetPassword,
} from '../services/actions/user';
import {
  TUser,
  useTypedSelector,
  TEventTarget,
  useTypedDispatch,
} from '../types/types';

export function useForm(inputValues: TUser) {
  const userName = useTypedSelector((store) => store.userState.userData.name);
  const userEmail = useTypedSelector((store) => store.userState.userData.email);
  const [formData, setFormData] = useState(inputValues);
  const [isEdited, setIsEdited] = useState(false);
  const dispatch = useTypedDispatch();

  const handleChange = (event: TEventTarget) => {
    const { value, name } = event.target;
    setFormData({ ...formData, [name]: value });
    setIsEdited(true);
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.email || !formData.password) {
      return;
    }
    dispatch(onLogin(formData));
    setFormData({
      name: '',
      email: '',
      password: '',
      token: '',
    });
  };
  const handleResetForm = () => {
    setFormData({
      name: userName,
      email: userEmail,
      password: '',
      token: '',
    });
    setIsEdited(false);
  };
  const handleUpdateUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.name) {
      dispatch(onUpdateUser(formData));
      setFormData({
        name: '',
        email: '',
        password: '',
        token: '',
      });
      setIsEdited(false);
    }
  };
  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(onRegister(formData));
    setFormData({
      name: '',
      email: '',
      password: '',
      token: '',
    });
  };
  const handleForgotPassword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(onForgotPassword(formData));
  };
  const handleResetPassword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(onResetPassword(formData));
  };
  return {
    formData,
    setFormData,
    isEdited,
    setIsEdited,
    handleChange,
    handleLogin,
    handleResetForm,
    handleUpdateUser,
    handleRegister,
    handleForgotPassword,
    handleResetPassword,
  };
}
