import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styleHeader from './app-header.module.css';

export default function AppHeader() {
  return (
    <>
      <header className={styleHeader.header}>
        <div className={styleHeader.container_header}>
          <nav className={styleHeader.nav}>
            <div className={styleHeader.link}>
              <a className={styleHeader.link_active}>
                <span className={styleHeader.icon}>
                  <BurgerIcon type="primary" />
                </span>
                Конструктор
              </a>
            </div>
            <div className={styleHeader.link}>
              <a
                className={styleHeader.link_text}
              >
                <span className={styleHeader.icon}>
                  <ListIcon type="secondary" />
                </span>
                Лента заказов
              </a>
            </div>
          </nav>

          <div className={styleHeader.logo}>
            <Logo />
          </div>

          <div className={styleHeader.user_account}>
            <a
              className={styleHeader.link_text}
            >
              <span className={styleHeader.icon}>
                <ProfileIcon type="secondary" />
              </span>
              Личный кабинет
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
