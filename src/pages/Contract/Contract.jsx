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
import { useParams } from 'react-router-dom';
import InputData from 'components/General/InputData/InputData';

import History from './COMPONENTS/History/History';
export const Contract = () => {
    const { id } = useParams();
    const { data } = useGetContractQuery({ contractId: id });
    console.log(data);

    return (
        <div className={s.root}>
            <ContractHeader contract={data} />
            <div className={s.content}>
                <div className={s.leftCol}>
                    <div className={s.mainInfo}>
                        <h3>Основная информация</h3>
                        <div>
                            {' '}
                            {/* <DropDown
                        z={5}
                        type={'customer'}
                        sub={'Заказчик'}
                        list={parameters?.companies}
                        ListItem={Customer}
                        activeItem={customer}
                        setActiveItem={() => {}}
                        disabled={false}
                        error={!customerValidation}
                        errorText={'Заказчик не определен'}
                        resetError={handleResetErrorCustomer}
                        overlay={true}
                    />
                    <DropDown
                        z={5}
                        type={'customer'}
                        sub={'Заказчик'}
                        list={parameters?.companies}
                        ListItem={Customer}
                        activeItem={customer}
                        setActiveItem={() => {}}
                        disabled={false}
                        error={!customerValidation}
                        errorText={'Заказчик не определен'}
                        resetError={handleResetErrorCustomer}
                        overlay={true}
                    /> */}
                        </div>

                        <div className={s.contract}>
                            <div className={s.range}>
                                <InputData
                                    sub={'Дата'}
                                    nosub={true}
                                    setDate={(data) => {}}
                                    date={null}
                                    disabled={false}
                                />
                                <InputData
                                    sub={'Срок действия'}
                                    nosub={true}
                                    setDate={(data) => {}}
                                    date={null}
                                    disabled={false}
                                />
                            </div>
                            {/* <DocumentFlow id={data?.id} exchange={data?.exchange} /> */}
                        </div>
                    </div>
                </div>
                <div className={s.rightCol}>
                    <History history={data?.history} />
                </div>
            </div>
        </div>
    );
};
export default Contract;
