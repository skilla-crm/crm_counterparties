import ReactDOM from "react-dom";
import { useEffect, useState, useRef } from "react";
import s from "./Modal.module.scss";
import classNames from "classnames";
//icons
import { ReactComponent as IconClose } from "./assets/iconCloseBlack.svg";

const Modal = ({ title, Icon, onClose, children }) => {
  const [anim, setAnim] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setAnim(true);
    });
  }, []);

  const handleClose = () => {
    setAnim(false);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  const handleCloseModalClick = (e) => {
    e.stopPropagation();
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleClose();
      return;
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleCloseModalClick);
    return () =>
      document.removeEventListener("mousedown", handleCloseModalClick);
  }, []);

  return (
    /* ReactDOM.createPortal */ <div
      className={classNames(s.root, anim && s.root_anim)}
    >
      <div ref={modalRef} className={classNames(s.modal, anim && s.modal_anim)}>
        <div className={s.header}>
          {
            <div className={s.title}>
              {Icon && <Icon />}
              <p>{title}</p>
            </div>
          }
          <div onClick={handleClose} className={s.close}>
            <IconClose />
          </div>
        </div>
        {children}
      </div>
    </div> /* , document.body */
  );
};

export default Modal;
