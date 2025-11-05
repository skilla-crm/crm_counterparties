// Components
import UniButton from 'components/General/UniButton/UniButton';
import dayjs from 'dayjs';

import {
    useDeleteContractMutation,
    useDownloadContractMutation,
} from '../../../redux/services/contractApiActions';

// Icons
import { ReactComponent as IconDoneWhite } from 'assets/icons/iconDoneWhite.svg';
import { ReactComponent as IconDelete } from 'assets/icons/iconDeleteRed.svg';
import { ReactComponent as IconEdit } from 'assets/icons/iconEdit.svg';

import { ReactComponent as IconMail } from 'assets/icons/iconMail.svg';

import { ReactComponent as IconDownload } from 'assets/icons/iconDownload.svg';
import { ReactComponent as IconPrint } from 'assets/icons/iconPrint.svg';
import { ReactComponent as IconDoc } from 'assets/icons/iconDoc.svg';
import { ReactComponent as IconDocPdf } from 'assets/icons/iconDocPdf.svg';
import { ReactComponent as IconDocDoc } from 'assets/icons/iconDocDoc.svg';
import { ReactComponent as IconXml } from 'assets/icons/iconXml.svg';

// Styles
import s from './ContractHeader.module.scss';
import useToast from 'hooks/useToast';
import { useNavigate } from 'react-router-dom';
import ButtonOptions from 'components/General/ButtonOptions/ButtonOptions';

const ContractHeader = ({
    handler,
    isLoading,
    buttonText,
    isEditMode,
    contract = {},
}) => {
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
    // const printOptions = [
    //     {
    //         id: 1,
    //         name: 'С печатью',
    //         icon: IconDoc,
    //         default: true,
    //         handler: () => handlePrint(params1),
    //     },

    //     {
    //         id: 2,
    //         name: 'Без печати',
    //         icon: IconDoc,
    //         default: false,
    //         handler: () => handlePrint(params2),
    //     },
    // ];

    const { showToast } = useToast();
    const navigate = useNavigate();
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
    const handleDownload = async (params) => {
        const data = await downloadContract({
            params,
            contractId: contract.id,
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
                    onClick={handleDelete}
                />
                <ButtonOptions
                    handler={() => handleDownload(params1)}
                    buttonText={'Скачать'}
                    Icon={IconDownload}
                    isLoading={isLoadingDownload}
                    options={downloadOptions}
                />

                {/* <ButtonOptions
                    handler={() => handlePrint(params1)}
                    buttonText={'Печать'}
                    Icon={IconPrint}
                    isLoading={loadPrint}
                    options={printOptions}
                /> */}

                <UniButton
                    text={buttonText}
                    icon={IconDoneWhite}
                    width={200}
                    onClick={handler}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};

export default ContractHeader;
