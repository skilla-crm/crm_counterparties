// External
import { useEffect, useState } from 'react';
import 'dayjs/locale/ru';

// Redux
import { useDeleteAttachmentMutation } from '../../../../redux/services/contractApiActions';
import { useDispatch, useSelector } from 'react-redux';

// Hooks
import { useModal } from 'hooks/useModal';
import useToast from 'hooks/useToast';

// Components
import Modal from 'components/General/Modal/Modal';
import UniButton from 'components/General/UniButton/UniButton';

// Icons
import { ReactComponent as IconCloseBlack } from 'assets/icons/iconCloseBlack.svg';
import { ReactComponent as IconCloseBlue } from 'assets/icons/iconCloseBlue.svg';
import { ReactComponent as IconDeleteBlack } from 'assets/icons/iconDeleteBlack.svg';
import { ReactComponent as IconDelete } from 'assets/icons/iconDeleteWhite.svg';

// Styles
import s from './DeleteDocFromContract.module.scss';

const DeleteDocFromContract = () => {
    const { showToast } = useToast();
    const dispatch = useDispatch();
    const { modalProps, hideModal } = useModal();
    const { id } = modalProps;

    const [deleteAttachment, { isLoading }] = useDeleteAttachmentMutation();

    const handleDelete = async () => {
        try {
            const res = await deleteAttachment({
                attachmentId: id,
            }).unwrap();

            if (res?.success) {
                showToast('Документ успешно удален', 'success');
                hideModal();
            }
        } catch {
            showToast('Произошла ошибка', 'error');
        }
    };

    return (
        <Modal isOpen={true} onClose={hideModal}>
            <div className={s.modal}>
                <div className={s.header}>
                    <div className={s.title}>
                        <IconDeleteBlack />
                        <p>Удаление документа</p>
                    </div>

                    <div onClick={hideModal} className={s.close}>
                        <IconCloseBlack />
                    </div>
                </div>

                <div className={s.content}>
                    <span className={s.textAreaTitle}>
                        {`Все данные будут безвозвратно удалены`}
                    </span>
                </div>
                <div className={s.btns}>
                    <UniButton
                        text={'Отменить'}
                        onClick={hideModal}
                        icon={IconCloseBlue}
                        type="outline"
                    />
                    <UniButton
                        type="primaryRed"
                        text={'Удалить безвозвратно'}
                        onClick={handleDelete}
                        isLoading={isLoading}
                        icon={IconDelete}
                        width={300}
                    />
                </div>
            </div>
        </Modal>
    );
};
export default DeleteDocFromContract;
