// React
import { useContractForm } from 'hooks/useContractForm';
import { use, useEffect, useState } from 'react';

// Hooks
import { useModal } from 'hooks/useModal';
import useToast from 'hooks/useToast';

//libs
import dayjs from 'dayjs';

// Router
import { useLocation, useNavigate, useParams } from 'react-router-dom';

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
import classNames from 'classnames';

const normalizeDate = (value) => {
    if (!value) return '';
    if (typeof value === 'string' && value.startsWith('-000001')) return '';
    return dayjs(value).isValid() ? dayjs(value).format('YYYY-MM-DD') : '';
};

export const Contract = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { counterparty = {} } = location.state || {};
    const [isEditMode, setIsEditMode] = useState(false);
    const isCreateMode = !id;
    const { form, setField, getFormData } = useContractForm();
    const { data } = useGetContractQuery({ contractId: id }, { skip: !id });
    const { data: settings, isLoading: isLoadingSettings } =
        useGetSettingsQuery({
            companyId: id,
        });

    useEffect(() => {
        if (id) return;
        setIsEditMode(isCreateMode);
    }, []);

    const CONTACTS_MAILS = Array.isArray(counterparty?.contacts)
        ? counterparty.contacts
              .map((item) => item.e_mail)
              .filter((email) => email)
              .map((email) => ({ e_mail: email }))
        : [];

    const [createContract, { isLoading: isCreateLoading }] =
        useCreateContractMutation();

    const [updateContract, { isLoading: isUpdateLoading }] =
        useUpdateContractMutation();

    //заполнение формы при создании
    useEffect(() => {
        if (data || !isCreateMode) return;
        const fields = {
            company_id: counterparty.general.company_id || '',
            company_details_id: counterparty.bank_accounts[0].id || '',
        };
        Object.entries(fields).forEach(([key, value]) => setField(key, value));
    }, []);

    //заполнение формы при редактировании
    useEffect(() => {
        if (!data || isCreateMode) return;

        const fields = {
            company_id: data.company_id || '',
            company_details_id: data.company_details_id || '',
            partnership_id: data.partnership_id || '',
            partnership_details_id: data.partnership_details_id || '',
            contract_template_id: data.contract_template_id || '',
            without_template: data.without_template || 0,
            number: data.number || '',
            date: normalizeDate(data.date),
            expired_date: normalizeDate(data.expired_date),
            company_signature_id: data.company_signature_id || '',
            partnership_signature_id: data.partnership_signature_id || '',
            // label: data.label || "",
        };
        Object.entries(fields).forEach(([key, value]) => setField(key, value));
    }, [data]);

    const handleCreateContract = async () => {
        // if (!form.number) return showToast("Введите номер договора", "error");
        // if (!form.company_id) return showToast("Выберите заказчика", "error");
        // if (!form.partnership_id) return showToast("Выберите исполнителя", "error");
        // if (!form.contract_template_id && !form.without_template)
        //   return showToast("Выберите шаблон договора", "error");
        // if (!form.partnership_signature_id)
        //   return showToast("Выберите подписанта поставщика", "error");
        // if (!form.company_signature_id)
        //   return showToast("Выберите подписанта заказчика", "error");
        try {
            const fd = getFormData();
            const res = await createContract({ data: fd }).unwrap();
            if (res.success) {
                navigate(-1);
                showToast('Договор создан', 'success');
            }
        } catch (err) {
            showToast('Ошибка при создании договора', 'error');
        }
    };

    const handleSaveChanges = async () => {
        try {
            const fd = getFormData();

            const res = await updateContract({
                data: fd,
                contractId: id,
            }).unwrap();
            if (res.success) {
                showToast('Договор сохранен', 'success');
            }
        } catch (err) {
            showToast('Ошибка при сохранении изменений', 'error');
        }
    };

    return (
        <div className={s.root}>
            <ContractHeader
                settings={settings}
                isLoading={isCreateLoading || isUpdateLoading}
                contract={data}
                contractId={id}
                isEditMode={isEditMode}
                isCreateMode={isCreateMode}
                setIsEditMode={setIsEditMode}
                handleSave={handleSaveChanges}
                handleCreate={handleCreateContract}
                contacts={CONTACTS_MAILS}
            />
            <div className={s.content}>
                <div className={s.leftCol}>
                    <ContractMainInfo
                        form={form}
                        setField={setField}
                        counterparty={counterparty}
                        settings={settings}
                        isEditMode={isEditMode}
                    />
                    {!isCreateMode && (
                        <DocumentsList
                            data={data?.docs}
                            contractId={id}
                            contract={data}
                            docTypes={settings?.doc_types}
                            contacts={CONTACTS_MAILS}
                        />
                    )}
                </div>

                <div
                    className={classNames(
                        s.rightCol,
                        (isCreateMode || isEditMode) && s.rightColHidden
                    )}
                >
                    <DocumentFlow id={id} exchange={data?.exchange} />
                    <History history={data?.history} />
                </div>
            </div>
        </div>
    );
};
export default Contract;
