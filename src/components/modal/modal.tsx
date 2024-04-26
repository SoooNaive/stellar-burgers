import ReactDOM from 'react-dom';
import { FC, PropsWithChildren, useEffect } from 'react';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../modal-overlay/modal-overlay';

import style from './modal.module.css';

const modal = document.getElementById('react-modals');

interface IModal {
  onClose: () => void;
  header?: string;
}

export const Modal: FC<PropsWithChildren<IModal>> = ({
  onClose,
  children,
  header,
}) => {
  useEffect(() => {
    const onPressEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keyup', onPressEsc);
    return () => {
      document.removeEventListener('keyup', onPressEsc);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <div className={style.modal}>
        <div className={style.header_modal}>
          <h1 className={style.header_modal_text}>{header}</h1>
          <span className={style.close}>
            <CloseIcon type="primary" onClick={onClose} />
          </span>
        </div>
        {children}
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    modal!
  );
};
