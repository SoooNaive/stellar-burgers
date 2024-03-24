import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  onLogin,
  onUpdateUser,
  onRegister,
  onForgotPassword,
  onResetPassword,
} from '../utils/burger-api';

export function useForm(inputValues) {
  const userName = useSelector((store) => store.userState.userData.name);
  const userEmail = useSelector((store) => store.userState.userData.email);
  const [formData, setFormData] = useState(inputValues);
  const [isEdited, setIsEdited] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormData({ ...formData, [name]: value });
    setIsEdited(true);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (!formData.email || !formData.password) {
      return;
    }
    dispatch(onLogin(formData));
    setFormData({
      email: '',
      password: '',
    });
  };
  const handleResetForm = () => {
    setFormData({
      name: userName,
      email: userEmail,
      password: '',
    });
    setIsEdited(false);
  };
  const handleUpdateUser = (event) => {
    event.preventDefault();
    if (formData.name) {
      dispatch(onUpdateUser(formData));
      setFormData({
        password: '',
      });
      setIsEdited(false);
    }
  };
  const handleRegister = (event) => {
    event.preventDefault();
    dispatch(onRegister(formData));
    setFormData({
      name: '',
      email: '',
      password: '',
    });
  };
  const handleForgotPassword = (event) => {
    event.preventDefault();
    dispatch(onForgotPassword(formData));
  };
  const handleResetPassword = (event) => {
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
