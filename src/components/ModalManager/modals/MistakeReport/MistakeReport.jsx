// External
import { useEffect, useState } from 'react';
import 'dayjs/locale/ru';

// Redux
import { useSentReportMutation } from '../../../../redux/services/counterpartyDetailsApiActions';

// Hooks
import { useModal } from 'hooks/useModal';
import useToast from 'hooks/useToast';

// Components
import Modal from 'components/General/Modal/Modal';
import UniButton from 'components/General/UniButton/UniButton';
import Field from 'components/General/Field/Field';

// Icons
import { ReactComponent as IconCloseBlack } from 'assets/icons/iconCloseBlack.svg';
import { ReactComponent as IconEditBlack } from 'assets/icons/iconEditBlack.svg';
import { ReactComponent as IconDoneWhite } from 'assets/icons/iconDoneWhite.svg';
import { ReactComponent as IconDoneGrey } from 'assets/icons/iconDoneGrey.svg';

// Styles
import s from './MistakeReport.module.scss';
import TextArea from 'components/General/TextArea/TextArea';

const MistakeReport = () => {
    const { showToast } = useToast();
    const { modalProps, hideModal } = useModal();
    const { companyId } = modalProps;
    const [message, setMessage] = useState('');

    const [sentReport, { isLoading }] = useSentReportMutation();

    const handleSentReport = async () => {
        const payload = { message };

        try {
            const res = await sentReport({
                companyId: companyId,
                data: payload,
            }).unwrap();

            if (res?.success) {
                hideModal();
                showToast('Замечание отправлено', 'success');
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
                        <IconEditBlack />
                        <p>Сообщить о неточности</p>
                    </div>

                    <div onClick={hideModal} className={s.close}>
                        <IconCloseBlack />
                    </div>
                </div>

                <div className={s.content}>
                    <span className={s.textAreaTitle}>
                        Опиши неточность или проблему
                    </span>
                    <TextArea value={message} setValue={setMessage} rows={4} />
                </div>
                <div className={s.btns}>
                    <UniButton
                        text={'Готово'}
                        onClick={handleSentReport}
                        isLoading={isLoading}
                        icon={
                            message.length === 0 ? IconDoneGrey : IconDoneWhite
                        }
                        width={452}
                        disabled={message.length === 0}
                    />
                </div>
            </div>
        </Modal>
    );
};
export default MistakeReport;
