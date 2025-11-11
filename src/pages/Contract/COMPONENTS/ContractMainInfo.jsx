//components
import InputData from 'components/General/InputData/InputData';
import Dropdown from './Dropdown/Dropdown';
import Switch from 'components/General/Switch/Switch';
import Field from 'components/General/Field/Field';
import InputText from 'components/General/InputText/InputText';
import InputNum from 'components/General/InputNum/InputNum';
//styles
import s from './ContractMainInfo.module.scss';

const ContractMainInfo = ({
    form,
    setField,
    counterparty,
    settings,
    isEditMode,
}) => {
    const { partnerships, contract_templates } = settings;
    const selectedCompany = partnerships.find(
        (company) => company.id === form.partnership_id
    );
    const companyAccounts = selectedCompany?.details || [];
    console.log('companyAccounts', companyAccounts);
    console.log('selectedCompany', selectedCompany);
    return (
        <div className={s.mainInfo}>
            <h3>Основная информация</h3>
            <div className={s.row}>
                <Dropdown
                    sub="Заказчик"
                    width={600}
                    value={form.company_id}
                    onChange={(v) => setField('company_id', v?.id)}
                    options={settings.partnerships}
                    disabled={!isEditMode}
                    type="company"
                />
                <Dropdown
                    sub="Счет заказчика"
                    width={312}
                    value={form.company_details_id}
                    onChange={(v) => setField('company_details_id', v?.id)}
                    disabled={!isEditMode}
                    type="account"
                />
            </div>
            <div className={s.row}>
                <Dropdown
                    sub="Поставщик"
                    width={600}
                    value={partnerships.find(
                        (p) => p.id === form.partnership_id
                    )}
                    disabled={!isEditMode}
                    onChange={(v) => setField('partnership_id', v?.id)}
                    options={partnerships}
                />
                <Dropdown
                    sub="Счет поставщика"
                    width={312}
                    value={companyAccounts.find(
                        (a) => a.id === form.company_details_id
                    )}
                    onChange={(v) => setField('company_details_id', v?.id)}
                    disabled={!isEditMode}
                    options={companyAccounts}
                    type="account"
                />
            </div>
            <div className={s.row}>
                <Dropdown
                    sub="Тип договора"
                    width={312}
                    disabled={!isEditMode}
                />{' '}
                <div className={s.switch}>
                    <Switch
                        text="Нетиповой"
                        switchState={form.without_template}
                        setSwitchState={(v) => setField('without_template', v)}
                        disabled={!isEditMode}
                    />
                </div>
            </div>
            <div className={s.row}>
                <Field text="Номер">
                    <InputText
                        width={150}
                        disabled={!isEditMode}
                        text={form.number}
                        setText={(v) => setField('number', v)}
                    />
                </Field>
                <InputData
                    sub={'Дата'}
                    nosub={true}
                    setDate={(v) => setField('date', v)}
                    date={form.date}
                    disabled={!isEditMode}
                />
                <InputData
                    sub={'Срок действия'}
                    nosub={true}
                    setDate={(v) => setField('expired_date', v)}
                    date={form.expired_date}
                    disabled={!isEditMode}
                />
                <Field
                    width={300}
                    text="Лимит по сумме"
                    info="Используется для договоров с лимитом по сумме актов. Ты получишь уведомление, когда сумма актов достигнет заданного лимита и договор потребуется перезаключить."
                >
                    <InputNum
                        num={form.limit_sum}
                        setNum={(v) => setField('limit_sum', v)}
                        width={150}
                        disabled={!isEditMode}
                    />
                </Field>
            </div>
            <Dropdown
                sub="Подписант заказчика"
                width={500}
                disabled={!isEditMode}
            />{' '}
            <Dropdown
                sub="Подписант поставщика"
                width={500}
                disabled={!isEditMode}
            />{' '}
        </div>
    );
};

export default ContractMainInfo;
