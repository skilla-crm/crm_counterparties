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
    const { partnerships = [], contract_templates = [] } = settings || {};

    //заказчик
    const company = {
        id: counterparty?.general?.company_id,
        name: counterparty?.general?.name,
        inn: counterparty?.general?.inn,
        kpp: counterparty?.general?.kpp,
    };
    //счета заказчика
    const companyAccounts = counterparty?.bank_accounts || [];

    //подписанты заказчика
    const companySignPersons = counterparty?.requisites?.signatory
        ? [
              {
                  id: counterparty.requisites.signatory.id,
                  name: counterparty.requisites.signatory.full_name,
              },
          ]
        : [];

    //подписанты поставщика
    const partnershipSignPersons = counterparty?.contacts || [];
    //список поставщиков
    const notArchivedPartnerships =
        (partnerships || []).filter((p) => p.is_archive !== 1) || [];
    //выбранный поставщик
    const selectedPartnership =
        (notArchivedPartnerships || []).find(
            (company) => company.id === form.partnership_id
        ) || [];
    //счета выбранного поставщика
    const partnershipAccounts = selectedPartnership?.details || [];

    return (
        <div className={s.mainInfo}>
            <h3>Основная информация</h3>
            <div className={s.row}>
                <Dropdown
                    sub="Заказчик"
                    width={600}
                    value={company}
                    onChange={(v) => setField('company_id', v?.id)}
                    //   options={settings.partnerships}
                    disabled={true}
                />
                <Dropdown
                    sub="Счет заказчика"
                    width={312}
                    value={(counterparty?.bank_accounts || []).find(
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
                    sub="Поставщик"
                    width={600}
                    value={selectedPartnership}
                    disabled={!isEditMode}
                    onChange={(v) => setField('partnership_id', v?.id)}
                    options={notArchivedPartnerships}
                />
                <Dropdown
                    sub="Счет поставщика"
                    width={312}
                    value={partnershipAccounts.find(
                        (a) => a.id === form.partnership_details_id
                    )}
                    onChange={(v) => setField('partnership_details_id', v?.id)}
                    disabled={!isEditMode}
                    options={partnershipAccounts}
                    type="account"
                />
            </div>
            <div className={s.row}>
                <Dropdown
                    sub="Тип договора"
                    width={312}
                    value={
                        form.without_template
                            ? ''
                            : contract_templates.find(
                                  (t) => t.id === form.contract_template_id
                              )
                    }
                    disabled={!isEditMode || form.without_template}
                    onChange={(v) => setField('contract_template_id', v?.id)}
                    options={contract_templates}
                    type="type"
                />{' '}
                <div className={s.switch}>
                    <Switch
                        text="Нетиповой"
                        switchState={!!form.without_template}
                        setSwitchState={(v) =>
                            setField('without_template', v ? 1 : 0)
                        }
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
                type="person"
                value={companySignPersons.find(
                    (p) => p.id === form.company_signature_id
                )}
                onChange={(v) => setField('company_signature_id', v?.id)}
                options={companySignPersons}
            />{' '}
            <Dropdown
                sub="Подписант поставщика"
                width={500}
                disabled={!isEditMode}
                type="person"
                value={partnershipSignPersons.find(
                    (p) => p.id === form.partnership_signature_id
                )}
                onChange={(v) => setField('partnership_signature_id', v?.id)}
                options={partnershipSignPersons}
            />{' '}
        </div>
    );
};

export default ContractMainInfo;
