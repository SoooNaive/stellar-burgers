import PropTypes from "prop-types";
import style from "./modal-overlay.module.css";

export default function ModalOverlay({children, onClick}) {
    function onOverlayClick() {
          onClick();
      }
    return (
        <>
            <div className={style.overlay} onClick={onOverlayClick}>
                {children}
            </div>
        </>
    )
}
ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired,
};