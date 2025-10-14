import 'dayjs/locale/ru';

// Redux
import { useDispatch } from 'react-redux';
import {
    useAddСounterpartyByIdMutation,
    useCheckCounterpartyMutation,
} from '../../../../redux/services/counterpartiesApiActions';

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
import { useNavigate } from 'react-router-dom';

const AddСounterparty = () => {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { modalProps, hideModal } = useModal();
    const { id } = modalProps;
    const [withInn, setWithInn] = useState(false);
    const [form, setForm] = useState({});
    const [inputCounterparty, setInputCounterparty] = useState(null);

    const [checkCounterparty, { isLoading: isLoadingCheck }] =
        useCheckCounterpartyMutation();

    const [addСounterpartyById, { isLoading: isLoadingAdd }] =
        useAddСounterpartyByIdMutation({
            id,
        });
    console.log(form);
    const handleConfirm = async () => {
        await addСounterpartyById()
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

    const handleOpenCreateCounterparty = () => {
        hideModal();
        navigate('/create');
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
                        setField={setForm}
                        disabled={withInn}
                        form={form}
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
                        onClick={
                            !withInn
                                ? handleConfirm
                                : handleOpenCreateCounterparty
                        }
                        type="primary"
                        // isLoading={isLoading}
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
