// External
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

// Hooks
import { useModal } from 'hooks/useModal';

// Redux
import { useSwitchObjectStatusMutation } from '../../../../redux/services/counterpartyDetailsApiActions';

// Components
import EllipsisWithTooltip from 'components/General/EllipsisWithTooltip/EllipsisWithTooltip';
import UniButton from 'components/General/UniButton/UniButton';

import Label from 'components/General/Label/Label';

// Icons
import { ReactComponent as IconAttach } from 'assets/icons/iconAttachGrey.svg';
import { ReactComponent as IconKebab } from 'assets/icons/iconKebab.svg';
import { ReactComponent as IconPlus } from 'assets/icons/iconPlusBlue.svg';

// Styles
import s from './DocumentsList.module.scss';
import dayjs from 'dayjs';
const mockDocuments = [
    {
        id: 1,
        contract_id: 42,
        name: 'Договор поставки №12',
        type_id: 1,
        date_add: '2025-11-01T14:10:00Z',
        person_id: 5,
        file: {
            name: 'dogovor_postavki.pdf',
            size: '1.2MB',
            url: '/uploads/documents/dogovor_postavki.pdf',
        },
    },
    {
        id: 2,
        contract_id: 42,
        name: 'Счёт на оплату №56',
        type_id: 2,
        date_add: '2025-11-03T09:45:00Z',
        person_id: 7,
        file: {
            name: 'schet_na_oplatu_56.pdf',
            size: '340KB',
            url: '/uploads/documents/schet_na_oplatu_56.pdf',
        },
    },
    {
        id: 3,
        contract_id: 42,
        name: 'Акт выполненных работ',
        type_id: 3,
        date_add: '2025-11-06T10:30:00Z',
        person_id: 17,
        file: {
            name: 'akt_vypolnennykh_rabot.pdf',
            size: '420KB',
            url: '/uploads/documents/akt_vypolnennykh_rabot.pdf',
        },
    },
];

const DocumentsList = ({ data = [] }) => {
    return (
        <div className={s.root}>
            <div className={s.header}>
                <h3>Документы</h3>
                <UniButton text="Добавить" icon={IconPlus} type="outline" />
            </div>
            <div className={s.objects}>
                <div className={classNames(s.gridRow, s.tableHeader)}>
                    <div>Название</div>
                    <div>Категория</div>
                    <div>Добавлен</div>
                    <div>Кем добавлен </div>
                    <div></div>
                </div>

                {mockDocuments.length > 0 ? (
                    mockDocuments.map((doc, i) => (
                        <DocumentRow key={doc.id} doc={doc} />
                    ))
                ) : (
                    <div className={s.empty}>
                        Пока не добавлен ни один документ
                    </div>
                )}
            </div>
        </div>
    );
};
export default DocumentsList;

const DocumentRow = ({ doc }) => {
    const { showModal } = useModal();
    const [openMenu, setOpenMenu] = useState(false);
    const optionsRef = useRef(null);
    const { id, contract_id, name, type_id, date_add, person_id, file } = doc;
    // const {} = documnet;
    const navigate = useNavigate();
    const hadleOpenContract = () => {
        // navigate(`/details/contract/${id}`, {
        //     state: { counterparty: counterparty },
        // });
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (optionsRef.current && !optionsRef.current.contains(e.target)) {
                setOpenMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const handleOpenOptions = (e) => {
        e.stopPropagation();
        setOpenMenu(!openMenu);
    };

    const handleSendEmail = () => {
        showModal('sendEmail', { id });
    };
    const handleDownload = () => {
        showModal('download', { id });
    };
    const handlePrint = () => {
        showModal('print', { id });
    };
    const handleDelete = () => {
        showModal('delete', { id });
    };
    const operations = [
        { label: 'Отправить по e-mail', handler: handleSendEmail },
        { label: 'Скачать', handler: handleDownload },
        { label: 'Печать', handler: handlePrint },
        { label: 'Удалить', handler: handleDelete },
    ];
    return (
        <div className={classNames(s.gridRow)} onClick={hadleOpenContract}>
            <div className={s.flexCell}>{file.name}</div>

            <div className={s.flexCell}>{type_id}</div>
            <div>{dayjs(date_add).format('DD.MM.YYYY')}</div>
            <div>{person_id}</div>

            <div
                className={s.optionsBtn}
                onClick={handleOpenOptions}
                ref={optionsRef}
            >
                <IconKebab />
                {openMenu && (
                    <div className={s.dropDownMenu}>
                        {operations.map((operation) => (
                            <div
                                key={operation.label}
                                className={s.dropDownItem}
                                onClick={operation.handler}
                            >
                                {operation.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
