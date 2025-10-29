// External
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';

// Hooks
import { useModal } from 'hooks/useModal';
import useToast from 'hooks/useToast';

// Redux
import { useSwitchContactStatusMutation } from '../../../../redux/services/counterpartyDetailsApiActions';

// Components
import Switch from 'components/EmailSender/Switch/Switch';
import EllipsisWithTooltip from 'components/General/EllipsisWithTooltip/EllipsisWithTooltip';

// Styles
import s from './Contacts.module.scss';

const Contacts = ({ data = [], counterpartyId }) => {
    return (
        <div className={s.root}>
            <div className={s.infoTitle}>
                {/* <IconInfo /> */}
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
                {data.length > 0 ? (
                    data.map((contact) => (
                        <ContactRow
                            key={contact.id}
                            contact={contact}
                            counterpartyId={counterpartyId}
                        />
                    ))
                ) : (
                    <div className={s.empty}>Нет контактов</div>
                )}
            </div>
        </div>
    );
};
export default Contacts;

const ContactRow = ({ contact, counterpartyId }) => {
    console.log(contact);
    const { showModal } = useModal();
    const { showToast } = useToast();
    const [isActive, setIsActive] = useState(false);
    const [switchContactStatus] = useSwitchContactStatusMutation();

    useEffect(() => {
        setIsActive(Boolean(contact.is_active));
    }, [contact]);

    const handleSwitchStatus = (e) => {
        e.stopPropagation();

        if (!contact.id) return;
        switchContactStatus({
            contactId: contact.id,
            companyId: counterpartyId,
        })
            .unwrap()
            .then((res) => {
                if (
                    res.message ===
                    'Company contact active status changed successfully'
                ) {
                    setIsActive(!isActive);
                }
            })
            .catch(() => {
                showToast('Произошла ошибка', 'error');
            });
    };

    const handleOpenConact = () => {
        showModal('CONTACT', {
            companyId: counterpartyId,
            contact: contact,
        });
    };
    return (
        <div className={classNames(s.gridRow)} onClick={handleOpenConact}>
            <div>
                {`${contact.surname} ${contact.name} ${contact.patronymic}`.trim()}
            </div>
            <div>
                <EllipsisWithTooltip text={contact.position} />
            </div>
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
