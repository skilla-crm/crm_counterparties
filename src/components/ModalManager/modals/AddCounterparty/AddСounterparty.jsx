// External
import { use, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'dayjs/locale/ru';

// Redux
import { useDispatch } from 'react-redux';
import {
    useAddСounterpartyByIdMutation,
    useCheckCounterpartyMutation,
} from '../../../../redux/services/counterpartiesListApiActions';

// Hooks
import { useModal } from 'hooks/useModal';
import useToast from 'hooks/useToast';

// Components
import Modal from 'components/General/Modal/Modal';
import UniButton from 'components/General/UniButton/UniButton';
import Field from 'components/General/Field/Field';
import Switch from 'components/EmailSender/Switch/Switch';
import InputCounterparty from './components/InputCounterparty/InputCounterparty';

// Icons
import { ReactComponent as IconCloseBlack } from 'assets/icons/iconCloseBlack.svg';
import { ReactComponent as IconPlus } from 'assets/icons/iconPlusBlack.svg';
import { ReactComponent as IconDoneGrey } from 'assets/icons/iconDoneGrey.svg';
import { ReactComponent as IconDoneWhite } from 'assets/icons/iconDoneWhite.svg';
import { ReactComponent as IconBackForward } from 'assets/icons/iconBackForward.svg';

// Styles
import s from './AddCounterparty.module.scss';

const AddCounterparty = () => {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { modalProps, hideModal } = useModal();
    // const { id } = modalProps;

    const [withoutInn, setWithoutInn] = useState(false);
    const [dadataState, setDadataState] = useState({});
    const [inputCounterparty, setInputCounterparty] = useState('');
    const [checkResult, setCheckResult] = useState(null);
    const [parentSaggestions, setParentSuggestions] = useState([]);
    const [successCheck, setSuccessCheck] = useState(false);
    const [isNotFound, setIsNotFound] = useState(false);
    const [isAlreadyAdded, setIsAlreadyAdded] = useState(false);
    const [disabledBtn, setDisabledBtn] = useState(false);

    const [checkCounterparty, { isLoading: isLoadingCheck }] =
        useCheckCounterpartyMutation();
    const [addCounterpartyById, { isLoading: isLoadingAdd }] =
        useAddСounterpartyByIdMutation();

    useEffect(() => {
        const validInn =
            inputCounterparty.length === 10 || inputCounterparty.length === 12;
        setDisabledBtn(!withoutInn && (!validInn || !checkResult));
    }, [inputCounterparty, withoutInn, checkResult]);
    useEffect(() => {
        if (withoutInn) {
            setCheckResult(null);
            setInputCounterparty('');
        }
    }, [withoutInn]);
    useEffect(() => {
        if (!checkResult) {
            setIsNotFound(false);
            setIsAlreadyAdded(false);
            return;
        }

        setIsNotFound(
            checkResult?.message === 'Не найден в реестре' &&
                parentSaggestions.length === 0
        );

        setIsAlreadyAdded(checkResult?.message === 'Уже есть в твоей базе');
    }, [checkResult, parentSaggestions]);

    useEffect(() => {
        const validInn =
            inputCounterparty.length === 10 || inputCounterparty.length === 12;
        if (withoutInn) {
            setDisabledBtn(false);
        } else {
            setDisabledBtn(!validInn || !checkResult);
        }
    }, [inputCounterparty, withoutInn, checkResult]);

    const handleConfirm = async () => {
        try {
            const res = await addCounterpartyById({
                id: checkResult?.data?.id,
            }).unwrap();
            if (res.success) hideModal();
            showToast('Контрагент добавлен', 'success');
            navigate(`/details/${res.data.id}`);
        } catch {
            showToast('Произошла ошибка', 'error');
        }
    };

    const handleOpenCreateCounterparty = () => {
        hideModal();
        navigate('/create', { state: dadataState });
    };

    const handleOpenDetailsCounterparty = () => {
        hideModal();
        navigate(`/details/${checkResult?.data?.id}`);
    };

    const buttonText = useMemo(() => {
        if (withoutInn || isNotFound) return 'Заполнить карточку вручную';
        if (isAlreadyAdded) return 'Подтвердить';
        return 'Продолжить';
    }, [withoutInn, isAlreadyAdded, isNotFound]);

    const btnIcon = useMemo(() => {
        if (withoutInn || isNotFound) return IconBackForward;
        if (isAlreadyAdded) return IconDoneWhite;
        if (successCheck) return IconDoneWhite;
        if (disabledBtn) return IconDoneGrey;
        return IconDoneWhite;
    }, [withoutInn, isAlreadyAdded, isNotFound, disabledBtn, successCheck]);

    const handleButtonClick = () => {
        if (
            withoutInn ||
            (checkResult?.message === 'Не найден в реестре' &&
                parentSaggestions.length > 0)
        ) {
            return handleOpenCreateCounterparty();
        }

        if (checkResult?.message === 'Уже есть в твоей базе') {
            return handleOpenDetailsCounterparty();
        }

        if (checkResult?.message === 'Проверен платформой Скилла Работа') {
            return handleConfirm();
        }

        return handleOpenCreateCounterparty();
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
                        setField={setDadataState}
                        disabled={withoutInn && !inputCounterparty}
                        form={dadataState}
                        checker={checkCounterparty}
                        setCheckResult={setCheckResult}
                        withoutInn={withoutInn}
                        setParentSaggestions={setParentSuggestions}
                    />
                </Field>

                <div className={s.content}>
                    <Switch
                        text="Без ИНН"
                        switchState={withoutInn}
                        handleSwitch={() => {
                            setInputCounterparty('');
                            setWithoutInn((prev) => !prev);
                        }}
                    />
                </div>

                <div className={s.btns}>
                    <UniButton
                        text={buttonText}
                        iconPosition="right"
                        onClick={handleButtonClick}
                        type="primary"
                        isLoading={isLoadingAdd}
                        width={332}
                        disabled={disabledBtn}
                        icon={btnIcon}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default AddCounterparty;
