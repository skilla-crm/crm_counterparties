//components
import InputData from 'components/General/InputData/InputData';
import Dropdown from 'components/General/Dropdown/Dropdown';
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
    // const selectedType = settings.doc_types.find(
    //     (item) => item.id === form.contract_template
    // );

    console.log('settings', settings);
    return (
        <div className={s.mainInfo}>
            <h3>Основная информация</h3>
            <div className={s.row}>
                <Dropdown
                    sub="Заказчик"
                    width={600}
                    value={form.partnership_id}
                    disabled={!isEditMode}
                />
                <Dropdown
                    sub="Счет заказчика"
                    width={312}
                    options={counterparty}
                    value={form.partnership_details_id}
                    disabled={!isEditMode}
                />
            </div>
            <div className={s.row}>
                <Dropdown
                    sub="Поставщик"
                    width={600}
                    value={form.company_id}
                    disabled={!isEditMode}
                />{' '}
                <Dropdown
                    sub="Счет поставщика"
                    width={312}
                    vakue={form.company_details_id}
                    disabled={!isEditMode}
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
