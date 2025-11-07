// React
import { useContractForm } from 'hooks/useContractForm';
import { useEffect, useState } from 'react';

//libs
import dayjs from 'dayjs';

// Router
import { useLocation, useParams } from 'react-router-dom';

// API
import {
    useGetContractQuery,
    useCreateContractMutation,
    useUpdateContractMutation,
    useGetSettingsQuery,
} from '../../redux/services/contractApiActions';

// Components
import ContractHeader from './COMPONENTS/ContractHeader';
import ContractMainInfo from './COMPONENTS/ContractMainInfo';
import DocumentFlow from './COMPONENTS/DocumentFlow/DocumentFlow';
import DocumentsList from './COMPONENTS/DocumentsList/DocumentsList';
import History from './COMPONENTS/History/History';

// Styles
import s from './Contract.module.scss';

export const Contract = () => {
    const { id } = useParams();
    const location = useLocation();
    const { counterparty } = location.state || {};
    const [isEditMode, setIsEditMode] = useState(false);
    const [isCreateMode, setIsCreateMode] = useState(false);
    const { form, setField } = useContractForm();
    const { data } = useGetContractQuery({ contractId: id });
    const { data: settings } = useGetSettingsQuery({
        companyId: counterparty?.general.company_id,
    });

    useEffect(() => {
        if (!data || isCreateMode) return;

        const normalizeDate = (value) => {
            if (!value) return '';
            if (typeof value === 'string' && value.startsWith('-000001'))
                return '';
            return dayjs(value).isValid()
                ? dayjs(value).format('YYYY-MM-DD')
                : '';
        };
        const fields = {
            id: data.id || '',
            company_id: data.company_id || '',
            company_details_id: data.company_details_id || '',
            partnership_id: data.partnership_id || '',
            partnership_details_id: data.partnership_details_id || '',
            contract_template: data.contract_template || '',
            without_template: data.without_template || 0,
            number: data.number || '',
            prefix: data.prefix || '',
            date: normalizeDate(data.date),
            expired_date: normalizeDate(data.expired_date),
            company_signature_id: data.company_signature_id || '',
            partnership_signature_id: data.partnership_signature_id || null,
            label: data.label || '',
        };
        Object.entries(fields).forEach(([key, value]) => setField(key, value));
    }, [data]);

    return (
        <div className={s.root}>
            <ContractHeader
                contract={data}
                isEditMode={isEditMode}
                setIsEditMode={setIsEditMode}
            />
            <div className={s.content}>
                <div className={s.leftCol}>
                    <ContractMainInfo
                        form={form}
                        setField={setField}
                        counterparty={counterparty}
                        settings={settings}
                    />
                    <DocumentsList data={data?.docs} />
                </div>
                <div className={s.rightCol}>
                    <DocumentFlow id={id} exchange={data?.exchange} />
                    <History history={data?.history} />
                </div>
            </div>
        </div>
    );
};
export default Contract;
