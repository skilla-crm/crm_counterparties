// Components
import Field from 'components/General/Field/Field';
import InputText from 'components/General/InputText/InputText';
import InputList from 'components/General/InputList/InputList';
import InputInn from 'components/General/InputInn/InputInn';
import InputCompanyName from 'components/General/InputCompanyName/InputCompanyName';

// Styles
import s from '../Company.module.scss';

const NDS_LIST = [
    { label: 'БЕЗ НДС', value: '' },
    { label: '5%', value: 5 },
    { label: '7%', value: 7 },
    { label: '10%', value: 10 },
    { label: '20%', value: 20 },
];

const CompanyMainInfo = ({ form, setField, parameters, data, isEditMode }) => {
    const companyTypes =
        parameters?.legal_forms?.map((el) => ({
            label: el.full_name,
            value: el.id,
        })) || [];

    const taxSystems =
        parameters?.tax_forms?.map((el) => ({
            label: el.name,
            value: el.id,
        })) || [];

    return (
        <div className={s.block}>
            <h3>Основная информация</h3>
            <div className={s.fields}>
                {/* <Field text="ИНН">
          <InputText
            width={186}
            text={form.inn}
            setText={(v) => setField("inn", v.replace(/[^0-9]/g, ""))}
          />
        </Field> */}
                <Field text="ИНН">
                    <InputInn
                        width={200}
                        types={parameters?.legal_forms}
                        value={form.inn}
                        setValue={(v) => setField('inn', v)}
                        valueKpp={form.kpp}
                        setField={setField}
                        disabled={!!data?.inn}
                        form={form}
                    />
                </Field>

                <Field text="КПП">
                    <InputText
                        width={200}
                        text={form.kpp}
                        setText={(v) => setField('kpp', v)}
                    />
                </Field>
                <Field text="ОГРН">
                    <InputText
                        width={200}
                        text={form.ogrn}
                        setText={(v) => setField('ogrn', v)}
                    />
                </Field>
            </div>
            <Field text="Наименование компании">
                <InputCompanyName
                    isEditMode={isEditMode}
                    form={form}
                    width={600}
                    value={form.name}
                    setValue={(v) => setField('name', v)}
                    setField={setField}
                    types={parameters?.legal_forms}
                    placeholder="В краткой форме, например ООО “Компания”"
                />
            </Field>

            <Field text="Правовая форма">
                <InputList
                    list={companyTypes}
                    value={form.legal_form_id || ''}
                    setValue={(v) => {
                        console.log(v);
                        setField('legal_form_id', Number(v));
                    }}
                    width={600}
                />
            </Field>
            <div className={s.fields}>
                <Field text="Форма налогообложения">
                    <InputList
                        list={taxSystems}
                        value={form.tax_form_id || ''}
                        setValue={(v) => {
                            setField('tax_form_id', Number(v));
                            if (Number(v) === 1 || Number(v) === 3)
                                setField('nds', '');
                        }}
                        width={200}
                    />
                </Field>
                <Field text="НДС">
                    <InputList
                        list={NDS_LIST}
                        value={form.nds ?? ''}
                        setValue={(v) => setField('nds', Number(v))}
                        width={120}
                        disabled={
                            form.tax_form_id === 1 || form.tax_form_id === 3
                        }
                    />
                </Field>
            </div>
        </div>
    );
};

export default CompanyMainInfo;
