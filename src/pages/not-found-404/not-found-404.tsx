import style from './not-found-404.module.css';
import { Link } from 'react-router-dom';
import { FC } from 'react';

export const NotFound404: FC = () => {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <p className={style.content_text}>Страница не найдена</p>
        <p className={style.content_text}>Ошибка 404</p>
        <Link className={style.content_link} to="/">
          Вернуться на главную страницу
        </Link>
      </div>
    </div>
  );
};
