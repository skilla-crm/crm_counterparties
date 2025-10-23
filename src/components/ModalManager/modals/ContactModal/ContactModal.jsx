import 'dayjs/locale/ru';

// Redux

import {
    useCreateContactMutation,
    useUpdateContactMutation,
} from '../../../../redux/services/counterpartyDetailsApiActions';

// Hooks
import { useModal } from 'hooks/useModal';
import useToast from 'hooks/useToast';

// Components
import Modal from 'components/General/Modal/Modal';
import UniButton from 'components/General/UniButton/UniButton';

// Icons
import { ReactComponent as IconCloseBlack } from 'assets/icons/iconCloseBlack.svg';
import { ReactComponent as IconPlusBlack } from 'assets/icons/iconPlusBlack.svg';
import { ReactComponent as IconAccount } from 'assets/icons/iconAccountCard.svg';
import { ReactComponent as IconDoneWhite } from 'assets/icons/iconDoneWhite.svg';
import { ReactComponent as IconDoneGrey } from 'assets/icons/iconDoneGrey.svg';

// Styles
import s from './ContactModal.module.scss';
import InputEmail from 'components/General/InputEmail/InputEmail';
import Field from 'components/General/Field/Field';
import InputText from 'components/General/InputText/InputText';
import InputPhone from 'components/General/InputPhone/InputPhone';
import { useEffect, useState } from 'react';
import Switch from 'components/EmailSender/Switch/Switch';
import dayjs from 'dayjs';

const ContactModal = () => {
    const { showToast } = useToast();
    const { modalProps, hideModal } = useModal();
    const { companyId, contact = {} } = modalProps;
    const isCreateMode = Object.keys(contact).length === 0;
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [surname, setSurname] = useState('');
    const [position, setPosition] = useState('');
    const [dob, setDob] = useState('');
    const [activity, setActivity] = useState(0);

    const [phoneValidateError, setPhoneValidateError] = useState(false);
    const [emailValidateError, setEmailValidateError] = useState(false);
    const disabledBtn =
        !name ||
        !surname ||
        (!phone && !email) ||
        (phone && !phoneValidateError) ||
        (email && !emailValidateError);

    const [createContact, { isLoading: isCreating }] =
        useCreateContactMutation();

    const [updateContact, { isLoading: isUpdating }] =
        useUpdateContactMutation();

    useEffect(() => {
        if (!contact.id) return;
        setPhone(contact.phone);
        setEmail(contact.e_mail);
        setName(contact.name);
        setPatronymic(contact.patronymic);
        setSurname(contact.surname);
        setPosition(contact.position);
        setDob(contact.dob);
        setActivity(contact.is_active);
    }, [contact]);

    const handleCreateContact = async () => {
        const payload = {
            name,
            surname,
            patronymic,
            position,
            phone,
            dob,
            e_mail: email,
            is_active: activity,
        };

        try {
            const res = await createContact({
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

    const handleUpdateContact = async () => {
        if (!phoneValidateError) {
            showToast('Неверно введен номер телефона', 'error');
            return;
        }
        // if (!emailValidateError) {
        //     showToast('Неверно введен email', 'error');
        //     return;
        // }
        const payload = {
            name,
            surname,
            patronymic,
            position,
            phone,
            dob,
            e_mail: email || null,
            is_active: activity,
        };
        console.log(companyId);

        try {
            const res = await updateContact({
                companyId: companyId,
                contactId: contact.id,
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
                    {isCreateMode ? (
                        <div className={s.title}>
                            <IconPlusBlack />
                            <p>Новый представитель</p>
                        </div>
                    ) : (
                        <div className={s.title}>
                            <IconAccount />
                            <p>Представитель</p>
                        </div>
                    )}

                    <div onClick={hideModal} className={s.close}>
                        <IconCloseBlack />
                    </div>
                </div>

                <div className={s.content}>
                    <Field text="Фамилия">
                        <InputText
                            width={452}
                            text={surname}
                            setText={(v) => setSurname(v)}
                        />
                    </Field>
                    <Field text="Имя">
                        <InputText
                            width={452}
                            text={name}
                            setText={(v) => setName(v)}
                        />
                    </Field>
                    <Field text="Отчество">
                        <InputText
                            width={452}
                            text={patronymic}
                            setText={(v) => setPatronymic(v)}
                        />
                    </Field>

                    <Field text="Должность">
                        <InputText
                            width={452}
                            text={position}
                            setText={(v) => setPosition(v)}
                        />
                    </Field>

                    <div className={s.fields}>
                        <Field text="Моб. телефон">
                            <InputPhone
                                required={true}
                                phone={phone}
                                setPhone={(v) => {
                                    setPhone(v);
                                }}
                                width={282}
                                setValidate={(v) => {
                                    setPhoneValidateError(v);
                                }}
                            />
                        </Field>
                        <Field text="Добавочный">
                            <InputText
                                width={150}
                                text={dob}
                                setText={(v) => setDob(v)}
                            />
                        </Field>
                    </div>
                    <Field text="Эл. почта">
                        <InputEmail
                            width={452}
                            email={email}
                            required={false}
                            setEmail={(v) => {
                                setEmail(v);
                            }}
                            setValidate={(v) => {
                                setEmailValidateError(v);
                            }}
                        />
                    </Field>
                    <Switch
                        text="Активный"
                        switchState={activity}
                        handleSwitch={() => setActivity(!activity)}
                    />

                    {!isCreateMode && (
                        <span
                            className={s.date}
                        >{`Добавлен ${dayjs(contact.created_at).format('DD.MM.YYYY')}`}</span>
                    )}
                </div>
                <div className={s.btns}>
                    <UniButton
                        text={isCreateMode ? 'Готово' : 'Сохранить изменения'}
                        onClick={
                            isCreateMode
                                ? handleCreateContact
                                : handleUpdateContact
                        }
                        isLoading={isCreating || isUpdating}
                        icon={
                            !isCreateMode
                                ? IconDoneWhite
                                : disabledBtn
                                  ? IconDoneGrey
                                  : IconDoneWhite
                        }
                        width={452}
                        disabled={isCreateMode ? disabledBtn : false}
                    />
                </div>
            </div>
        </Modal>
    );
};
export default ContactModal;
