import 'dayjs/locale/ru';

// Redux
import { useDispatch } from 'react-redux';
import { useAddСounterpartyMutation } from '../../../../redux/services/counterpartiesApiActions';

// Hooks
import { useModal } from 'hooks/useModal';
import useToast from 'hooks/useToast';

// Components
import Modal from 'components/General/Modal/Modal';
import UniButton from 'components/General/UniButton/UniButton';

// Icons
import { ReactComponent as IconCloseBlack } from 'assets/icons/iconCloseBlack.svg';
import { ReactComponent as IconPlus } from 'assets/icons/iconPlusBlack.svg';
import { ReactComponent as IconDoneGrey } from 'assets/icons/iconDoneGrey.svg';
import { ReactComponent as IconDoneWhite } from 'assets/icons/iconDoneWhite.svg';

// Styles
import s from './AddCounterparty.module.scss';
import Switch from 'components/EmailSender/Switch/Switch';
import { useState } from 'react';
import InputCounterparty from './components/InputCounterparty/InputCounterparty';
import Field from 'components/General/Field/Field';

const AddСounterparty = () => {
    const { showToast } = useToast();
    const { modalProps, hideModal } = useModal();
    const { id } = modalProps;
    const [withInn, setWithInn] = useState(false);
    const [inputCounterparty, setInputCounterparty] = useState(null);

    const [addСounterparty, { isLoading }] = useAddСounterpartyMutation({
        id,
    });

    const handleRemove = async () => {
        await addСounterparty()
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
                        <IconPlus />
                        <p>Добавить контрагента</p>
                    </div>

                    <div onClick={hideModal} className={s.close}>
                        <IconCloseBlack />
                    </div>
                </div>

                <Field text="Контрагент">
                    <InputCounterparty
                        width={200}
                        value={inputCounterparty}
                        setValue={setInputCounterparty}
                        setField={() => {}}
                        disabled={withInn}
                        form={{}}
                    />
                </Field>

                <div className={s.content}>
                    <Switch
                        text="Без ИНН"
                        switchState={withInn}
                        handleSwitch={() => setWithInn(!withInn)}
                    />
                </div>
                <div className={s.btns}>
                    <UniButton
                        text={!withInn ? 'Подтвердить' : 'Заполнить карточку'}
                        iconPosition="right"
                        onClick={handleRemove}
                        type="primary"
                        isLoading={isLoading}
                        width={332}
                        disabled={!withInn}
                        icon={!withInn ? IconDoneGrey : IconDoneWhite}
                    />
                </div>
            </div>
        </Modal>
    );
};
export default AddСounterparty;
