import { NavLink, Outlet } from 'react-router-dom';
import { onLogout } from '../../services/actions/user';
import { FC } from 'react';
import { useTypedDispatch } from '../../types/types';

import style from './profile-page.module.css';

export const ProfilePage: FC = () => {
  const dispatch = useTypedDispatch();

  let activeStyle = {
    color: 'white',
  };
  const onLogoutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(onLogout());
  };
  return (
    <div className={style.container_profile}>
      <div className={style.container_link}>
        <NavLink
          className={style.link}
          to="/profile"
          end
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Профиль
        </NavLink>
        <NavLink
          className={style.link}
          to="/profile/orders"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          История заказов
        </NavLink>
        <button className={style.logout} onClick={onLogoutHandler}>
          Выход
        </button>
        <p className={style.bottom_text}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div className={style.container_info}>
        <Outlet />
      </div>
    </div>
  );
};
