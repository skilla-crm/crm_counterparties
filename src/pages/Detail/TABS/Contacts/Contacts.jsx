import s from './Contacts.module.scss';
import { ReactComponent as IconInfo } from 'assets/icons/iconInfo.svg';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import Switch from 'components/EmailSender/Switch/Switch';
import useToast from 'hooks/useToast';
import { useSwitchContactStatusMutation } from '../../../../redux/services/counterpartiesApiActions';
import dayjs from 'dayjs';
import { useModal } from 'hooks/useModal';

const mockContacts = [
    {
        id: 1,
        surname: 'Иванов',
        name: 'Иван',
        patronymic: 'Иванович',
        phone: '+7 (900) 123-45-67',
        e_mail: 'ivanov@example.com',
        position: 'Менеджер',
        dob: '1985-05-10',
        is_active: 1,
        created_at: '2025-10-21',
    },
    {
        id: 2,
        surname: 'Петров',
        name: 'Пётр',
        patronymic: 'Петрович',
        phone: '+7 (901) 234-56-78',
        e_mail: 'petrov@example.com',
        position: 'Директор',
        dob: '1980-02-15',
        is_active: 0,
        created_at: '2025-10-20',
    },
    {
        id: 3,
        surname: 'Сидорова',
        name: 'Мария',
        patronymic: 'Александровна',
        phone: '+7 (902) 345-67-89',
        e_mail: 'sidorova@example.com',
        position: 'Бухгалтер',
        dob: '1990-07-25',
        is_active: 1,
        created_at: '2025-10-19',
    },
];

const Contacts = ({}) => {
    return (
        <div className={s.root}>
            <div className={s.infoTitle}>
                <IconInfo />
                <span>
                    Активные представители будут по умолчанию выбраны для
                    рассылок отчетов и документов
                </span>
            </div>
            <div className={s.contacts}>
                <div className={classNames(s.gridRow, s.header)}>
                    <div>Представитель</div>
                    <div>Должность</div>
                    <div>Телефон</div>
                    <div>E-mail</div>
                    <div className={s.switchContainer}>Активный</div>
                    <div>Добавлен</div>
                </div>
                {mockContacts.length > 0 ? (
                    mockContacts.map((contact) => (
                        <ContactRow key={contact.id} contact={contact} />
                    ))
                ) : (
                    <div className={s.empty}>Нет контактов</div>
                )}
            </div>
        </div>
    );
};
export default Contacts;

const ContactRow = ({ contact }) => {
    const { showModal } = useModal();
    const { showToast } = useToast();
    const [isActive, setIsActive] = useState(false);
    const [switchContactStatus] = useSwitchContactStatusMutation();

    useEffect(() => {
        setIsActive(Boolean(contact.is_active));
    }, [contact]);

    const handleSwitchStatus = () => {
        if (!contact.id) return;
        switchContactStatus(contact.id)
            .unwrap()
            .then((res) => {
                if (res.message === 'Request processed successfully') {
                    setIsActive(!isActive);
                }
            })
            .catch(() => {
                showToast('Произошла ошибка', 'error');
            });
    };

    const handleOpenConact = () => {
        showModal('CONTACT_DETAILS', { contact });
    };
    return (
        <div className={classNames(s.gridRow)} onClick={handleOpenConact}>
            <div>
                {`${contact.surname} ${contact.name} ${contact.patronymic}`.trim()}
            </div>
            <div>{contact.position || ''}</div>
            <div>{contact.phone || ''}</div>
            <div>{contact.e_mail || ''}</div>
            <div className={s.switchContainer}>
                <Switch
                    switchState={isActive}
                    handleSwitch={handleSwitchStatus}
                />
            </div>
            <div>{dayjs(contact.created_at).format('DD.MM.YYYY') || ''}</div>
        </div>
    );
};
