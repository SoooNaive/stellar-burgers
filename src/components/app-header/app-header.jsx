import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { NavLink } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import style from './app-header.module.css';

export default function AppHeader() {
  const userName = useSelector((store) => store.userState.userData.name);
  const activeStyle = {
    color: 'white',
  };
  const location = useLocation();

  const path = location.pathname;

  return (
    <>
      <header className={style.header}>
        <div className={style.container_header}>
          <nav className={style.nav}>
            <div className={style.link}>
              <NavLink
                className={style.link_text}
                to="/"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <span className={style.icon}>
                  <BurgerIcon type={path === '/' ? 'primary' : 'secondary'} />
                </span>
                Конструктор
              </NavLink>
            </div>
            <div className={style.link}>
              <NavLink
                className={style.link_text}
                to="/feed"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <span className={style.icon}>
                  <ListIcon type={path === '/feed' ? 'primary' : 'secondary'} />
                </span>
                Лента заказов
              </NavLink>
            </div>
          </nav>

          <NavLink to="/" className={style.logo}>
            <Logo />
          </NavLink>

          <div className={style.user_account}>
            <NavLink
              className={style.link_text}
              to="/profile"
              style={
                path === '/login' ||
                path === '/profile' ||
                path === '/register' ||
                path === '/forgot-password'
                  ? activeStyle
                  : undefined
              }
            >
              <span className={style.icon}>
                <ProfileIcon
                  type={
                    path === '/login' ||
                    path === '/profile' ||
                    path === '/register' ||
                    path === '/forgot-password'
                      ? 'primary'
                      : 'secondary'
                  }
                />
              </span>
              {userName ? userName : 'Личный кабинет'}
            </NavLink>
          </div>
        </div>
      </header>
    </>
  );
}
