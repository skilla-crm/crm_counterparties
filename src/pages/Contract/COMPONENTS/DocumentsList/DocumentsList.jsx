// External
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import dayjs from 'dayjs';

// Hooks
import { useModal } from 'hooks/useModal';
import useToast from 'hooks/useToast';

// Redux
import { useDownloadAttachmentMutation } from '../../../../redux/services/contractApiActions';

// Components
import UniButton from 'components/General/UniButton/UniButton';
import Label from 'components/General/Label/Label';
import EllipsisWithTooltip from 'components/General/EllipsisWithTooltip/EllipsisWithTooltip';

// Icons
import { ReactComponent as IconKebab } from 'assets/icons/iconKebab.svg';
import { ReactComponent as IconPlus } from 'assets/icons/iconPlusBlue.svg';
import { ReactComponent as IconEmail } from 'assets/icons/IconMailBlack.svg';
import { ReactComponent as IconDownload } from 'assets/icons/iconDownloadBlack.svg';
import { ReactComponent as IconPrint } from 'assets/icons/IconPrintBlack.svg';
import { ReactComponent as IconDelete } from 'assets/icons/iconCloseRed.svg';

// Styles
import s from './DocumentsList.module.scss';

const DocumentsList = ({ data = [], contractId, docTypes = [] }) => {
    const { showModal } = useModal();

    const handleOpenUploadMoadal = () => {
        showModal('UPLOAD_DOC', { contractId: contractId, docTypes: docTypes });
    };
    return (
        <div className={s.root}>
            <div className={s.header}>
                <h3>Документы</h3>

                <UniButton
                    text="Добавить"
                    icon={IconPlus}
                    type="outline"
                    onClick={handleOpenUploadMoadal}
                />
            </div>
            {data.length > 0 && (
                <div className={s.objects}>
                    <div className={classNames(s.gridRow, s.tableHeader)}>
                        <div>Название</div>
                        <div>Категория</div>
                        <div>Добавлен</div>
                        <div>Кем добавлен </div>
                        <div></div>
                    </div>

                    {data.length > 0 ? (
                        data.map((doc, i) => (
                            <DocumentRow key={doc.id} doc={doc} />
                        ))
                    ) : (
                        <div className={s.empty}>
                            Пока не добавлен ни один документ
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
export default DocumentsList;

const DocumentRow = ({ doc }) => {
    const { showModal } = useModal();
    const { showToast } = useToast();
    const [openMenu, setOpenMenu] = useState(false);
    const optionsRef = useRef(null);
    const {
        id,
        name,
        type,
        date_add,
        person_id,
        person_name,
        person_surname,
        position,
    } = doc;
    const [downloadAttachment] = useDownloadAttachmentMutation();
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
    const handleDownload = async (id, name) => {
        try {
            const blob = await downloadAttachment({
                attachmentId: id,
            }).unwrap();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = name || 'file';
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (e) {
            showToast('Ошибка при скачивании файла', 'error');
        }
    };
    const handlePrint = async (id) => {
        try {
            const blob = await downloadAttachment({
                attachmentId: id,
            }).unwrap();
            const url = window.URL.createObjectURL(blob);

            const printWindow = window.open(url);

            printWindow.onload = () => {
                printWindow.focus();
                printWindow.print();
            };
        } catch (e) {
            showToast('Ошибка при подготовке печати', 'error');
        }
    };

    const handleDelete = () => {
        showModal('DELETE_DOC_FROM_CONTRACT', { id });
    };
    const operations = [
        {
            label: 'Отправить по e-mail',
            handler: () => handleSendEmail(),
            icon: <IconEmail />,
        },
        {
            label: 'Скачать',
            handler: () => handleDownload(id, name),
            icon: <IconDownload />,
        },
        {
            label: 'Печать',
            handler: () => handlePrint(id),
            icon: <IconPrint />,
        },
        {
            label: 'Удалить',
            handler: () => handleDelete(),
            icon: <IconDelete />,
        },
    ];

    return (
        <div className={classNames(s.gridRow)} onClick={hadleOpenContract}>
            <div className={s.flexCell}>
                <EllipsisWithTooltip text={name} />
            </div>

            <div className={s.flexCell}>{type}</div>
            <div>{dayjs(date_add).format('DD.MM.YYYY')}</div>
            <div className={s.personCell}>
                <div>{`${person_name || ''} ${person_surname || ''}`}</div>
                <div className={s.grayText}>{position}</div>
            </div>

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
                                className={classNames(
                                    s.dropDownItem,
                                    operation.label === 'Удалить' && s.delete
                                )}
                                onClick={operation.handler}
                            >
                                {operation.icon}
                                {operation.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
