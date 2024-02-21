import ReactDOM from "react-dom";
import style from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";


export default function Modal() {

  return ReactDOM.createPortal(
    <>
      <ModalOverlay />
      <CloseIcon />
    </>
  );
}