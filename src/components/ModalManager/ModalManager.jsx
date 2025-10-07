import React from 'react';
import ReactDOM from 'react-dom';
//hooks
import { useModal } from 'hooks/useModal';
//components
import { MODALS } from './modals/modalsRegistry';

const ModalManager = () => {
  const { activeModal, modalProps, hideModal } = useModal();

  if (!activeModal) return null;

  const ModalComponent = MODALS[activeModal];
  if (!ModalComponent) return null;

  return ReactDOM.createPortal(
    <React.Suspense fallback={null}>
      <ModalComponent {...modalProps} onClose={hideModal} />
    </React.Suspense>,
    document.getElementById('root_debts')
  );
};

export default ModalManager;
