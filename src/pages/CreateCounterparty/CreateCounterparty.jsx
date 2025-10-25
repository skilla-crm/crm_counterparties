// External
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';

// Redux
import {
    useGetCounterparyRequisitesQuery,
    useUpdateCounterpartyRequisitesMutation,
} from '../../redux/services/counterpartyDetailsApiActions';
import { useCreateCounterpartyMutation } from '../../redux/services/counterpartiesListApiActions';

// Hooks
import { useCounterpartyForm } from 'hooks/useCounterpartyForm';
import useToast from 'hooks/useToast';

// Components
import CounterpartyHeader from './Components/CounterpartyHeader';
import CounterpartyMainInfo from './Components/CounterpartyMainInfo';
import CounterpartyAddresses from './Components/CounterpartyAddresses';
import CounterpartyEdo from './Components/CounterpartyEdo';
import CounterpartySignatory from './Components/CounterpartySignatory';
import CounterpartyRepresentative from './Components/CounterpartyRepresentative';

// Styles
import s from './CreateCounterparty.module.scss';

const CreateCounterparty = () => {
    const location = useLocation();
    const dadataState = location.state;

    const { id } = useParams();
    const isCreateMode = !!id;
    const navigate = useNavigate();
    const [anim, setAnim] = useState(false);
    const { showToast } = useToast();

    const { data: counterparty, isLoading } = useGetCounterparyRequisitesQuery(
        id,
        {
            skip: !id,
        }
    );

    const {
        form,
        setField,
        getFormData,
        setAdditionalSignatureField,
        setContactsField,
        setError,
    } = useCounterpartyForm();

    const [createCounterparty, { isLoading: isCreating }] =
        useCreateCounterpartyMutation();

    const [updateCounterparty, { isLoading: isUpdating }] =
        useUpdateCounterpartyRequisitesMutation();

    const [isAdditionalSignature, setIsAdditionalSignature] = useState(false);
    const [isPercent, setIsPercent] = useState(false);
    // const [isContractor, setIsContractor] = useState(false);

    useEffect(() => {
        setIsAdditionalSignature(Object.values(!!counterparty?.signatory) > 0);
        setIsPercent(!!counterparty?.is_percent);
    }, [counterparty]);
    useEffect(() => {
        !isLoading && setAnim(true);
    }, [isLoading]);

    useEffect(() => {
        if (isCreateMode && dadataState) {
            const fields = {
                name: dadataState.name || '',
                inn: dadataState.inn || '',
                kpp: dadataState.kpp || '',
                ogrn: dadataState.ogrn || '',
                address: dadataState.address || '',
                ur_address: dadataState.ur_address || '',
                is_percent: dadataState.is_percent || '',
                director: dadataState.signature || '',
                director_position: dadataState.signature_position || '',
            };
            Object.entries(fields).forEach(([key, value]) =>
                setField(key, value)
            );
            return;
        }
        if (!counterparty) return;

        const fields = {
            name: counterparty.name || '',
            inn: counterparty.inn || '',
            kpp: counterparty.kpp || '',
            ogrn: counterparty.ogrn || '',
            address: counterparty.address || '',
            ur_address: counterparty.ur_adress || '',
            is_percent: counterparty.is_percent || '',
            director: counterparty.director || '',
            director_position: counterparty.director_position || '',
            director_rod: counterparty.director_rod || '',
            logo: counterparty.logo || null,
            site: counterparty.site || '',
            edo_id: counterparty.edo_id || '',
            edo_region: counterparty.edo_region || '',
            edo_index: counterparty.edo_index || '',
            edo_city: counterparty.edo_city || '',
            edo_street: counterparty.edo_street || '',
            edo_home: counterparty.edo_home || '',
            edo_k: counterparty.edo_k || '',
            edo_a: counterparty.edo_a || '',
        };

        Object.entries(fields).forEach(([key, value]) => setField(key, value));

        const additional = counterparty.signatory || {};
        setField('signatory', {
            full_name: additional.full_name || '',
            powers: additional.powers || '',
            doc_validity_period: additional.doc_validity_period || '',
        });
        setField('signatory', additional);

        const contacts = counterparty.contacts || {};

        setField('contacts', {
            name: contacts.name || '',
            surname: contacts.surname || '',
            position: contacts.position || '',
            phone: contacts.phone || '',
            dob: contacts.dob || '',
            e_mail: contacts.e_mail || '',
        });
    }, [counterparty, setField]);

    const handleCreate = async () => {
        if (!form.inn || !form.name) {
            showToast(
                'Поля "ИНН" и "Наименование контрагента" обязательны',
                'error'
            );
            return;
        }
        try {
            const excludeKeys = isCreateMode
                ? [
                      'otv_act',
                      'edo_id',
                      'edo_region',
                      'edo_index',
                      'edo_city',
                      'edo_street',
                      'edo_home',
                      'edo_k',
                      'edo_a',
                  ]
                : [];

            const fd = getFormData(excludeKeys);

            const res = await createCounterparty(fd).unwrap();
            if (res.success) {
                navigate(`/details/${res.data.id}`);
            }
        } catch (err) {
            console.error(err);
            showToast('Ошибка при добавлении контрагента', 'error');
        }
    };
    const handleEdit = async () => {
        if (!form.name) {
            showToast('Поле "Наименование контрагента" обязательно', 'error');
            return;
        }
        try {
            const excludeKeys = !isCreateMode ? ['contacts'] : [];

            const fd = getFormData(excludeKeys);

            const res = await updateCounterparty({ id: id, data: fd }).unwrap();
            if (res.success) {
                navigate(`/details/${res.data.id}`);
            }
        } catch (err) {
            console.error(err);
            showToast('Ошибка при сохранении изменений', 'error');
        }
    };

    return (
        <div className={classNames(s.root, anim && s.root_anim)}>
            <CounterpartyHeader
                isEditMode={!isCreateMode}
                data={counterparty}
                isLoading={isCreateMode ? isUpdating : isCreating}
                handler={isCreateMode ? handleEdit : handleCreate}
                // handler={handleEdit}
                buttonText={isCreateMode ? 'Сохранить изменения' : 'Сохранить'}
            />

            <div className={s.wrapper}>
                <CounterpartyMainInfo
                    isEditMode={!isCreateMode}
                    data={counterparty}
                    form={form}
                    setField={setField}
                    isPercent={isPercent}
                />
                <CounterpartyAddresses form={form} setField={setField} />
                {isCreateMode && (
                    <CounterpartyEdo form={form} setField={setField} />
                )}
                {!isCreateMode && (
                    <CounterpartyRepresentative
                        form={form}
                        setField={setContactsField}
                        setError={setError}
                    />
                )}

                <CounterpartySignatory
                    form={form}
                    setField={setField}
                    setAdditionalField={setAdditionalSignatureField}
                    isAdditionalSignature={isAdditionalSignature}
                    // isContractor={isContractor}
                />
            </div>
        </div>
    );
};

export default CreateCounterparty;
