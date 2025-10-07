import { useDispatch, useSelector } from 'react-redux';

import { closeModal, openModal } from '../redux/modalManager/modalSlice';

export const useModal = () => {
  const dispatch = useDispatch();
  const { activeModal, modalProps } = useSelector((state) => state.modal);

  const showModal = (name, props = {}) => {
    dispatch(openModal({ name, props }));
  };

  const hideModal = () => {
    dispatch(closeModal());
  };

  return { activeModal, modalProps, showModal, hideModal };
};
