// React
import { useContractForm } from 'hooks/useContractForm';
import { use, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';

// Hooks
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
import { useGetCounterpartyInfoQuery } from '../../redux/services/counterpartyDetailsApiActions';
import { counterpartyDetailsApiActions } from '../../redux/services/counterpartyDetailsApiActions';
// Components
import ContractHeader from './COMPONENTS/ContractHeader';
import ContractMainInfo from './COMPONENTS/ContractMainInfo';
import DocumentFlow from './COMPONENTS/DocumentFlow/DocumentFlow';
import DocumentsList from './COMPONENTS/DocumentsList/DocumentsList';
import History from './COMPONENTS/History/History';

// Styles
import s from './Contract.module.scss';

const normalizeDate = (value) => {
    if (!value) return null;
    if (typeof value === 'string' && value.startsWith('-000001')) return null;

    const d = dayjs(value);
    return d.isValid() ? d : null;
};

export const Contract = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const location = useLocation();
    const dispatch = useDispatch();
    const { counterparty: locationCounterparty, settings: locationSettings } =
        location.state || {};

    const [isEditMode, setIsEditMode] = useState(false);
    const [withoutExpiredDate, setWithoutExpiredDate] = useState(false);
    const isCreateMode = !id;
    const { form, setField, getFormData } = useContractForm();

    //данные контракта
    const { data: contractData, refetch: refetchContract } =
        useGetContractQuery({ contractId: id }, { skip: !id });
    const counterpartyIdForQuery =
        contractData?.company_id?.toString() ||
        locationCounterparty?.general?.company_id?.toString();
    //данные контрагента
    const {
        data: counterparty,
        isLoading: isLoadingCounterparty,
        refetch: refetchCounterparty,
    } = useGetCounterpartyInfoQuery(
        { counterpartyId: counterpartyIdForQuery },
        { skip: !counterpartyIdForQuery }
    );
    //данные настроек
    const { data: settings, isLoading: isLoadingSettings } =
        useGetSettingsQuery(
            { companyId: contractData?.company_id?.toString() },
            { skip: !contractData?.company_id }
        );

    useEffect(() => {
        if (id) return;
        setIsEditMode(isCreateMode);
    }, []);

    const CONTACTS_MAILS = Array.isArray(settings?.company_contacts)
        ? settings?.company_contacts
              .map((item) => ({
                  e_mail: item.e_mail,
                  name: `${item.name || ''} ${item.surname || ''}`,
              }))
              .filter((email) => email)
              .map((email) => ({
                  e_mail: email.e_mail,
                  name: `${email.name || ''} ${email.surname || ''}`,
              }))
        : [];

    const [createContract, { isLoading: isCreateLoading }] =
        useCreateContractMutation();

    const [updateContract, { isLoading: isUpdateLoading }] =
        useUpdateContractMutation();

    //заполнение формы при создании
    useEffect(() => {
        if (contractData || !isCreateMode) return;
        if (!locationCounterparty && !locationSettings) return;

        const scopedSettings = locationSettings || settings || {};

        const buildNumber = () => {
            const parts = [
                scopedSettings?.prefix ?? '',
                scopedSettings?.contract_num ?? '',
            ].filter((part) => part !== '');

            return parts.join('');
        };

        const fields = {
            company_id: locationCounterparty?.general?.company_id || '',
            company_details_id:
                locationCounterparty?.bank_accounts?.[0]?.id || null,
            number: buildNumber(),
            // contract_template_id: scopedSettings?.contract_templates?.[0]?.id || "",
            contract_template_id: 276,
            docs: [],
        };

        Object.entries(fields).forEach(([key, value]) => {
            if (value !== undefined) {
                setField(key, value);
            }
        });
    }, [
        contractData,
        isCreateMode,
        locationCounterparty,
        locationSettings,
        settings,
        setField,
    ]);

    // заполнение формы при редактировании
    useEffect(() => {
        if (!contractData || isCreateMode) return;

        const fields = {
            company_id: contractData.company_id || '',
            company_details_id: contractData.company_details_id || null,
            partnership_id: contractData.partnership_id || '',
            partnership_details_id: contractData.partnership_details_id || null,
            // contract_template_id: contractData.contract_template_id || "",
            contract_template_id: 276,
            without_template: contractData.without_template || 0,
            number: contractData.number || '',
            date: normalizeDate(contractData.date),
            expired_date: normalizeDate(contractData.expired_date),
            company_signature_id: contractData.company_signature_id || null,
            partnership_signature_id:
                contractData.partnership_signature_id || null,
            // label: data.label || "",
        };
        Object.entries(fields).forEach(([key, value]) => setField(key, value));
    }, [contractData, isEditMode]);

    const handleCreateContract = async () => {
        if (!form.number) return showToast('Введите номер договора', 'error');
        if (!form.company_id) return showToast('Выберите заказчика', 'error');
        if (!form.partnership_id)
            return showToast('Выберите исполнителя', 'error');
        if (!form.contract_template_id && !form.without_template)
            return showToast('Выберите шаблон договора', 'error');
        if (!form.date) return showToast('Выберите дату договора', 'error');
        if (!withoutExpiredDate && !form.expired_date)
            return showToast('Выберите срок дйствия', 'error');
        try {
            const fd = getFormData();
            const res = await createContract({ data: fd }).unwrap();
            if (res.success) {
                dispatch(
                    counterpartyDetailsApiActions.util.invalidateTags([
                        'counterparty',
                    ])
                );
                navigate(-1);
                showToast('Договор создан', 'success');
            }
        } catch (err) {
            showToast('Ошибка при создании договора', 'error');
        }
    };

    const handleSaveChanges = async () => {
        if (!withoutExpiredDate && !form.expired_date)
            return showToast('Выберите срок дйствия', 'error');
        if (!form.contract_template_id && !form.without_template)
            return showToast('Выберите шаблон договора', 'error');
        try {
            const fd = getFormData(['docs']);

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
                // refetch={refetchCounterparty}
                settings={isCreateMode ? locationSettings : settings}
                isLoading={isCreateLoading || isUpdateLoading}
                contract={contractData}
                contractId={id}
                isEditMode={isEditMode}
                isCreateMode={isCreateMode}
                setIsEditMode={setIsEditMode}
                handleSave={handleSaveChanges}
                handleCreate={handleCreateContract}
                contacts={CONTACTS_MAILS}
                isDeletableContract={
                    counterparty?.contracts?.length > 1 ? true : false
                }
            />
            <div className={s.content}>
                <div className={s.leftCol}>
                    <ContractMainInfo
                        form={form}
                        setField={setField}
                        counterparty={counterparty || locationCounterparty}
                        settings={isCreateMode ? locationSettings : settings}
                        isEditMode={isEditMode}
                        onBankAccountChange={refetchCounterparty}
                        withoutExpiredDate={withoutExpiredDate}
                        setWithoutExpiredDate={setWithoutExpiredDate}
                    />

                    <DocumentsList
                        settings={isCreateMode ? locationSettings : settings}
                        form={form}
                        setField={setField}
                        isCreateMode={isCreateMode}
                        data={contractData?.docs}
                        contractId={id}
                        contract={contractData}
                        docTypes={
                            isCreateMode
                                ? locationSettings?.doc_types
                                : settings?.doc_types
                        }
                        contacts={CONTACTS_MAILS}
                    />
                </div>

                <div
                    className={classNames(
                        s.rightCol,
                        (isCreateMode || isEditMode) && s.rightColHidden
                    )}
                >
                    <DocumentFlow id={id} exchange={contractData?.exchange} />
                    {contractData?.history?.length > 0 && (
                        <History history={contractData?.history} />
                    )}
                </div>
            </div>
        </div>
    );
};
export default Contract;
