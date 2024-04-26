import { FC, PropsWithChildren } from 'react';
import style from './modal-overlay.module.css';

interface IModalOverlay {
  onClick: () => void;
}

export const ModalOverlay: FC<PropsWithChildren<IModalOverlay>> = ({
  children,
  onClick,
}) => {
  function onOverlayClick() {
    onClick();
  }

  return (
    <>
      <div className={style.overlay} onClick={onOverlayClick}>
        {children}
      </div>
    </>
  );
};
