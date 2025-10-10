// React & Hooks
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

// Redux API
import {
    useEditCompanyMutation,
    useGetCompanyParametersQuery,
    useGetCompanyQuery,
} from '../../redux/companiesApiActions';

// Custom Hooks
import { useCompanyForm } from 'hooks/useCompanyForm';

// Components
import CompanyHeader from './Components/CompanyHeader';
import CompanyMainInfo from './Components/CompanyMainInfo';
import CompanyAddresses from './Components/CompanyAddresses';
import CompanyEdo from './Components/CompanyEdo';
import CompanySignatory from './Components/CompanySignatory';
import CompanyStatus from './Components/CompanyStatus';
import CompanyBankDetails from './Components/CompanyBankDetails/CompanyBankDetails';

// Utils
import classNames from 'classnames';

// Styles
import s from './Company.module.scss';
import useToast from 'hooks/useToast';

const Company = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [anim, setAnim] = useState(false);
    const { showToast } = useToast();
    const location = useLocation();
    let isEditMode = !location.pathname.startsWith('/companies/add');

    const { form, setField, getFormData, setAdditionalSignatureField } =
        useCompanyForm();
    const { data: parameters } = useGetCompanyParametersQuery();
    const { data: company, isLoading } = useGetCompanyQuery(id);
    const [editCompany, { isLoading: isSaving }] = useEditCompanyMutation();

    const [isAdditionalSignature, setIsAdditionalSignature] = useState(false);
    const [isContractor, setIsContractor] = useState(false);

    useEffect(() => {
        !isLoading && setAnim(true);
    }, [isLoading]);

    useEffect(() => {
        setIsAdditionalSignature(!!company?.additional_signature);
        setIsContractor(!!company?.otv_act);
    }, [company]);

    useEffect(() => {
        if (!company) return;

        const fields = {
            connect_to: company.connect_to || '',
            name: company.partnership_name || '',
            inn: company.inn || '',
            kpp: company.kpp || '',
            ogrn: company.ogrn || '',
            nds: company.nds ?? 0,
            legal_form_id: company.legal_form?.id ?? '',
            tax_form_id: company.tax_form?.id ?? '',
            ur_adress: company.ur_adress || '',
            adress: company.adress || '',
            diadoc_id: company.diadoc_id || '',
            ur_region: company.ur_region ?? '',
            ur_index: company.ur_index || '',
            ur_city: company.ur_city || '',
            ur_street: company.ur_street || '',
            ur_home: company.ur_home || '',
            ur_k: company.ur_k || '',
            ur_a: company.ur_a || '',
            signature: company.signature || '',
            signature_position: company.signature_position || '',
            contractor: company.contractor || '',
            sign: company.sign || '',
            stamp: company.stamp || '',
            otv_act: company.otv_act || '',
            bank: company.bank || '',
            bank2: company.bank2 || '',
            bank3: company.bank3 || '',
            bik: company.bik || '',
            bik2: company.bik2 || '',
            bik3: company.bik3 || '',
            ks: company.ks || '',
            ks2: company.ks2 || '',
            ks3: company.ks3 || '',
            rs: company.rs || '',
            rs2: company.rs2 || '',
            rs3: company.rs3 || '',
        };

        Object.entries(fields).forEach(([key, value]) => setField(key, value));

        const additional = company.additional_signature || {};
        setField('additional_signature', {
            full_name: additional.full_name || '',
            powers: additional.powers || '',
            doc_validity_period: additional.doc_validity_period || '',
            doc: additional.doc || '',
            sign: additional.sign || '',
        });
    }, [company, setField]);

    const handleSave = async () => {
        if (!form.inn || !form.name) {
            showToast(
                'Поля "ИНН" и "Наименование компании" обязательны',
                'error'
            );
            return;
        }
        try {
            const fd = getFormData();
            await editCompany({ id, formData: fd }).unwrap();
            showToast('Компания успешно сохранена', 'success');
            navigate('/companies');
        } catch (err) {
            console.error(err);
            showToast('Ошибка при сохранении компании', 'error');
        }
    };

    return (
        <div className={classNames(s.root, anim && s.root_anim)}>
            <CompanyHeader
                data={company}
                isLoading={isSaving}
                onSave={handleSave}
            />

            <div className={s.wrapper}>
                <CompanyStatus form={form} setField={setField} data={company} />
                <CompanyMainInfo
                    isEditMode={isEditMode}
                    data={company}
                    form={form}
                    setField={setField}
                    parameters={parameters}
                />
                <CompanyAddresses form={form} setField={setField} />
                <CompanyEdo form={form} setField={setField} />
                <CompanyBankDetails form={form} setField={setField} />
                <CompanySignatory
                    form={form}
                    setField={setField}
                    setAdditionalField={setAdditionalSignatureField}
                    isAdditionalSignature={isAdditionalSignature}
                    isContractor={isContractor}
                />
            </div>
        </div>
    );
};

export default Company;
