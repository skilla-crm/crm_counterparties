import ContractHeader from './COMPONENTS/ContractHeader';
import s from './Contract.module.scss';
import {
    useGetContractQuery,
    useCreateContractMutation,
    useDeleteContractMutation,
    useUnmarkOriginalContractMutation,
    useSignOriginalContractMutation,
    useSendOriginalContractMutation,
    useSendByEmailContractMutation,
    useSendAttachmentsMutation,
    useDownloadContractMutation,
    useDownloadAttachmentMutation,
    useDeleteAttachmentMutation,
} from '../../redux/services/contractApiActions';
import { useLocation, useParams } from 'react-router-dom';
import InputData from 'components/General/InputData/InputData';

import History from './COMPONENTS/History/History';
import Dropdown from 'components/General/Dropdown/Dropdown';
import Switch from 'components/General/Switch/Switch';
import Field from 'components/General/Field/Field';
import InputText from 'components/General/InputText/InputText';
import InputNum from 'components/General/InputNum/InputNum';
import DocumentsList from './COMPONENTS/DocumentsList/DocumentsList';
export const Contract = () => {
    const { id } = useParams();
    const location = useLocation();
    const { counterparty } = location.state || {};
    const { data } = useGetContractQuery({ contractId: id });
    console.log(data);

    return (
        <div className={s.root}>
            <ContractHeader contract={data} />
            <div className={s.content}>
                <div className={s.leftCol}>
                    <div className={s.mainInfo}>
                        <h3>Основная информация</h3>
                        <div className={s.row}>
                            <Dropdown sub="Заказчик" width={600} />{' '}
                            <Dropdown sub="Счет заказчика" width={312} />
                        </div>
                        <div className={s.row}>
                            <Dropdown sub="Поставщик" width={600} />{' '}
                            <Dropdown sub="Счет поставщика" width={312} />
                        </div>
                        <div className={s.row}>
                            <Dropdown sub="Тип договора" width={312} />{' '}
                            <div className={s.switch}>
                                <Switch text="Нетиповой" />
                            </div>
                        </div>
                        <div className={s.row}>
                            <Field text="Номер">
                                <InputText width={150} />
                            </Field>
                            <InputData
                                sub={'Дата'}
                                nosub={true}
                                setDate={(data) => {}}
                                date={null}
                                disabled={false}
                                s
                            />
                            <InputData
                                sub={'Срок действия'}
                                nosub={true}
                                setDate={(data) => {}}
                                date={null}
                                disabled={false}
                            />
                            <Field
                                width={300}
                                text="Номер"
                                info="Используется для договоров с лимитом по сумме актов. Ты получишь уведомление, когда сумма актов достигнет заданного лимита и договор потребуется перезаключить."
                            >
                                <InputNum
                                    num={0}
                                    setNum={(num) => {}}
                                    width={150}
                                />
                            </Field>
                        </div>
                        <Dropdown sub="Подписант заказчика" width={500} />{' '}
                        <Dropdown sub="Подписант поставщика" width={500} />{' '}
                    </div>
                    <DocumentsList data={data?.docs} />
                </div>
                <div className={s.rightCol}>
                    <History history={data?.history} />
                </div>
            </div>
        </div>
    );
};
export default Contract;
