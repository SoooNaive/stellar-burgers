import ReactDOM from "react-dom";
import { useEffect } from "react";
import PropTypes from "prop-types";
import style from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modal = document.getElementById("react-modals");

export default function Modal({ onClose, children, header }) {

  useEffect(() => {
    document.addEventListener("keyup", onPressEsc);
    return () => {
      document.removeEventListener("keyup", onPressEsc);
    };
  }, [onClose]);

  function onPressEsc(e) {
    if (e.key === "Escape") {
      onClose();
    }
  }

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClick={onClose}>
        <div className={style.modal}>
          <div className={style.header_modal}>
            <h1 className={style.header_modal_text}>{header}</h1>
            <span className={style.close}>
            <CloseIcon onClick={onClose} />
          </span>
          </div>
          {children}
        </div>
      </ModalOverlay>
    </>,
    modal
  );
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  header: PropTypes.string,
};