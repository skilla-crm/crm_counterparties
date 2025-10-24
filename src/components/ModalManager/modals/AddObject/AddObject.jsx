// External
import { useEffect, useState } from 'react';
import 'dayjs/locale/ru';

// Hooks
import { useModal } from 'hooks/useModal';
import useToast from 'hooks/useToast';

// Redux
import { useCreateObjectMutation } from '../../../../redux/services/counterpartyDetailsApiActions';

// Components
import Modal from 'components/General/Modal/Modal';
import UniButton from 'components/General/UniButton/UniButton';
import Field from 'components/General/Field/Field';
import InputText from 'components/General/InputText/InputText';
import Switch from 'components/EmailSender/Switch/Switch';

// Icons
import { ReactComponent as IconCloseBlack } from 'assets/icons/iconCloseBlack.svg';
import { ReactComponent as IconPlusBlack } from 'assets/icons/iconPlusBlack.svg';
import { ReactComponent as IconDoneWhite } from 'assets/icons/iconDoneWhite.svg';

// Styles
import s from './AddObject.module.scss';

const AddObject = () => {
    const { showToast } = useToast();
    const { modalProps, hideModal } = useModal();
    const { companyId } = modalProps;

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    const [activity, setActivity] = useState(0);

    const [createObject, { isLoading }] = useCreateObjectMutation();

    const handleCreateObject = async () => {
        const payload = {
            name,
            address,
            is_active: activity,
        };

        try {
            const res = await createObject({
                companyId: companyId,
                data: payload,
            }).unwrap();

            if (res?.success) {
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
                        <IconPlusBlack />
                        <p>Добавить объект</p>
                    </div>

                    <div onClick={hideModal} className={s.close}>
                        <IconCloseBlack />
                    </div>
                </div>

                <div className={s.content}>
                    <Field text="Название">
                        <InputText
                            width={300}
                            text={name}
                            setText={(v) => setName(v)}
                        />
                    </Field>
                    <Field text="Адрес">
                        <InputText
                            width={300}
                            text={address}
                            setText={(v) => setAddress(v)}
                        />
                    </Field>

                    <Switch
                        text="Назначить основным"
                        switchState={activity}
                        handleSwitch={() => setActivity(!activity)}
                    />
                </div>
                <div className={s.btns}>
                    <UniButton
                        iconPosition="right"
                        text={'Готово'}
                        onClick={handleCreateObject}
                        isLoading={isLoading}
                        icon={IconDoneWhite}
                        width={300}
                    />
                </div>
            </div>
        </Modal>
    );
};
export default AddObject;
