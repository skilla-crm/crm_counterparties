import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import s from './Modal.module.scss';

const Modal = ({ children, onClose }) => {
  const modalRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  return (
    <div className={classNames(s.root, (isVisible || isClosing) && s.anim)}>
      <div className={classNames(s.modal, isVisible && !isClosing && s.anim)} ref={modalRef}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
