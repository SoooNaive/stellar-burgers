import { NavLink, Outlet } from 'react-router-dom';
import { onLogout } from '../../utils/burger-api';
import { useDispatch } from 'react-redux';

import style from './profile-page.module.css';

function ProfilePage() {
  const dispatch = useDispatch();

  let activeStyle = {
    color: 'white',
  };
  const onLogoutHandler = (e) => {
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
        <NavLink className={style.link} onClick={onLogoutHandler}>
          Выход
        </NavLink>
        <p className={style.bottom_text}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div className={style.container_info}>
        <Outlet />
      </div>
    </div>
  );
}

export default ProfilePage;
