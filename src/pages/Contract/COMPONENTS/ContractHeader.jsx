// React
import { useNavigate } from 'react-router-dom';

// Libs
import dayjs from 'dayjs';

// Hooks
import useToast from 'hooks/useToast';

// API
import {
    useDeleteContractMutation,
    useDownloadContractMutation,
} from '../../../redux/services/contractApiActions';

// Components
import ButtonOptions from 'components/General/ButtonOptions/ButtonOptions';
import UniButton from 'components/General/UniButton/UniButton';
import EmailSender from 'components/EmailSender/EmailSender';

// Icons
import { ReactComponent as IconDelete } from 'assets/icons/iconDeleteRed.svg';
import { ReactComponent as IconDoc } from 'assets/icons/iconDoc.svg';
import { ReactComponent as IconDocDoc } from 'assets/icons/iconDocDoc.svg';
import { ReactComponent as IconDocPdf } from 'assets/icons/iconDocPdf.svg';
// import { ReactComponent as IconMail } from 'assets/icons/iconMail.svg';
import { ReactComponent as IconDownload } from 'assets/icons/iconDownload.svg';
import { ReactComponent as IconEdit } from 'assets/icons/iconEdit.svg';
import { ReactComponent as IconMail } from 'assets/icons/iconMail.svg';
import { ReactComponent as IconPrint } from 'assets/icons/iconPrint.svg';
import { ReactComponent as IconXml } from 'assets/icons/iconXml.svg';

// Styles
import s from './ContractHeader.module.scss';
import { useState } from 'react';

const ContractHeader = ({
    handler,
    isLoading,
    buttonText,
    isEditMode,
    setIsEditMode,
    contract = {},
}) => {
    const parameters = [];
    console.log(contract, 'contract');
    const params1 = {
        sign: 1,
        format: 'pdf',
    };
    const params2 = {
        sign: 0,
        format: 'pdf',
    };
    const params3 = {
        sign: 0,
        format: 'docx',
    };

    const downloadOptions = [
        {
            id: 1,
            name: 'PDF с печатью',
            icon: IconDocPdf,
            default: true,
            handler: () => handleDownload(params1),
        },

        {
            id: 2,
            name: 'PDF без печати',
            icon: IconDocPdf,
            default: false,
            handler: () => handleDownload(params2),
        },

        {
            id: 3,
            name: 'WORD без печати',
            icon: IconDocDoc,
            default: false,
            handler: () => handleDownload(params3),
        },
    ];
    const printOptions = [
        {
            id: 1,
            name: 'С печатью',
            icon: IconDoc,
            default: true,
            handler: () => handlePrint(params1),
        },

        {
            id: 2,
            name: 'Без печати',
            icon: IconDoc,
            default: false,
            handler: () => handlePrint(params2),
        },
    ];

    const { showToast } = useToast();
    const navigate = useNavigate();
    const [isOpenSender, setIsOpenSender] = useState(false);
    const [deleteContract, { isLoading: isLoadingDelete }] =
        useDeleteContractMutation();

    const [downloadContract, { isLoading: isLoadingDownload }] =
        useDownloadContractMutation();
    const handleDelete = async () => {
        try {
            const res = await deleteContract(contract.id).unwrap();

            if (res.success) {
                showToast('Договор удален', 'success');
                navigate('/details');
            } else {
                showToast('Не удалось удалить договор', 'error');
            }
        } catch (e) {
            showToast('Произошла ошибка', 'error');
        }
    };
    // const handleSendEmailSuccess = () => {
    //     handleCloseNotification();
    //     clearTimeout(timerId);
    //     setTimeout(() => {
    //         setTimerId(setTimeout(() => handleCloseNotification(), 2500));
    //         setNotification({
    //             state: true,
    //             type: 'email',
    //             text: 'Письмо отправлено',
    //         });
    //     }, 200);
    // };
    const handlePrint = async (id) => {
        try {
            const blob = await downloadContract({
                contractId: id,
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
    const handleDownload = async (params) => {
        console.log('arams', params);
        const data = await downloadContract({
            params,
            contractId: contract.company_details_id,
        }).unwrap();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(data);
        link.setAttribute(
            'download',
            `Договор №${contract.number} от ${dayjs(contract.date).format('DD.MM.YYYY')}.${
                params.format
            }`
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className={s.header}>
            <h2>
                {!isEditMode
                    ? `Договор №${contract.number} от ${dayjs(
                          contract.date
                      ).format('DD.MM.YYYY')}`
                    : 'Новый договор'}
            </h2>

            <div className={s.headerButtons}>
                <UniButton
                    type="danger"
                    icon={IconDelete}
                    width={40}
                    onClick={handleDelete}
                />
                <UniButton
                    text="Редактировать"
                    type="outline"
                    icon={IconEdit}
                    onClick={() => setIsEditMode(true)}
                />
                <ButtonOptions
                    handler={() => handleDownload(params1)}
                    buttonText={'Скачать'}
                    Icon={IconDownload}
                    isLoading={isLoadingDownload}
                    options={downloadOptions}
                />

                <ButtonOptions
                    handler={() => handlePrint(params1)}
                    buttonText={'Печать'}
                    Icon={IconPrint}
                    isLoading={isLoadingDownload}
                    options={printOptions}
                />

                <UniButton
                    text="Отправить по e-mail"
                    icon={IconMail}
                    width={200}
                    onClick={() => setIsOpenSender(true)}
                    isLoading={isLoading}
                />
                <EmailSender
                    id={123}
                    open={isOpenSender}
                    setOpen={setIsOpenSender}
                    contacts={[]}
                    theme={`Договор № ${2323} от ${dayjs('').format(
                        'DD.MM.YYYY'
                    )}`}
                    text={parameters?.act_message}
                    formats={[
                        { id: 1, name: 'PDF с печатью' },
                        { id: 2, name: 'Word с печатью' },
                    ]}
                    partnerEmail={parameters?.email || []}
                    handleSendEmailSuccess={() =>
                        showToast('Сообщение отправлено', 'success')
                    }
                    detailState={true}
                />
            </div>
        </div>
    );
};

export default ContractHeader;
