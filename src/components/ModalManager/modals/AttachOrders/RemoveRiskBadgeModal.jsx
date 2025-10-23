import 'dayjs/locale/ru';

// Redux
import { useDispatch } from 'react-redux';
import { useRemoveRiskBadgeMutation } from '../../../../redux/services/counterpartiesListApiActions';

// Hooks
import { useModal } from 'hooks/useModal';
import useToast from 'hooks/useToast';

// Components
import Modal from 'components/General/Modal/Modal';
import UniButton from 'components/General/UniButton/UniButton';

// Icons
import { ReactComponent as IconCloseBlack } from 'assets/icons/iconCloseBlack.svg';
import { ReactComponent as IconClock } from 'assets/icons//removeRiskModal/Clock.svg';
import { ReactComponent as IconTrendUp } from 'assets/icons/removeRiskModal/TrendUp.svg';
import { ReactComponent as IconShield } from 'assets/icons/removeRiskModal/ShieldWarning.svg';
import { ReactComponent as IconFile } from 'assets/icons/removeRiskModal/FileText.svg';
import { ReactComponent as IconCircle } from 'assets/icons/removeRiskModal/XCircle.svg';
import { ReactComponent as IconCoins } from 'assets/icons/removeRiskModal/Coins.svg';
import { ReactComponent as IconEye } from 'assets/icons/removeRiskModal/Eye.svg';

// Styles
import s from './RemoveRiskBadgeModal.module.scss';

const RemoveRiskBadgeModal = () => {
    const { showToast } = useToast();
    const { modalProps, hideModal } = useModal();
    const { id } = modalProps;

    const [removeRiskBadge, { isLoading }] = useRemoveRiskBadgeMutation({
        id,
    });

    const handleRemove = async () => {
        await removeRiskBadge()
            .unwrap()
            .then((res) => {
                if (res.data.success) {
                    hideModal();
                }
            })
            .catch(() => {
                showToast('Произошла ошибка', 'error');
            });
    };
    return (
        <Modal isOpen={true} onClose={hideModal}>
            <div className={s.modal}>
                <div className={s.header}>
                    <div className={s.title}>
                        <IconShield />
                        <p>Риск</p>
                    </div>

                    <div onClick={hideModal} className={s.close}>
                        <IconCloseBlack />
                    </div>
                </div>
                <div className={s.subTitle}>
                    Скилла IS проверяет каждого контрагента на предмет риска
                </div>

                <div className={s.content}>
                    <div className={s.contentItem}>
                        <div className={s.contentSubItem}>
                            <div className={s.contentBadge}>
                                <IconClock />
                                <IconFile />
                            </div>
                            <span className={s.contentText}>
                                Срок действия договора истекает
                            </span>
                        </div>
                        <div className={s.contentText}>12.06.2025</div>
                    </div>
                    <div className={s.contentItem}>
                        <div className={s.contentSubItem}>
                            <div className={s.contentBadge}>
                                <IconCircle />
                                <IconFile />
                            </div>
                            <span className={s.contentText}>
                                Срок действия договора истек
                            </span>
                        </div>
                        <div className={s.contentText}>12.06.2025</div>
                    </div>
                    <div className={s.contentItem}>
                        <div className={s.contentSubItem}>
                            <div className={s.contentBadge}>
                                <IconTrendUp />
                                <IconCoins />
                            </div>
                            <span className={s.contentText}>
                                Лимит суммы актов по договору исчерпан
                            </span>
                        </div>
                    </div>
                </div>
                <div className={s.btns}>
                    <UniButton
                        text="Скрыть метку риска"
                        iconPosition="right"
                        onClick={handleRemove}
                        type="outline"
                        isLoading={isLoading}
                        icon={IconEye}
                        loaderColor="blue"
                        width={230}
                    />
                </div>
            </div>
        </Modal>
    );
};
export default RemoveRiskBadgeModal;
