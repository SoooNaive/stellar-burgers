import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

import style from './modal.module.css';

const modal = document.getElementById('react-modals');

export default function Modal({ onClose, children, header }) {
  useEffect(() => {
    const onPressEsc = (e) => {
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
            <CloseIcon onClick={onClose} />
          </span>
        </div>
        {children}
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    modal
  );
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  header: PropTypes.string,
};
