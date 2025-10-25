// External
import { useEffect, useState } from 'react';
import classNames from 'classnames';

// Components
import Field from 'components/General/Field/Field';
import InputText from 'components/General/InputText/InputText';
import InputInn from 'components/General/InputInn/InputInn';
import InputCompanyName from 'components/General/InputCompanyName/InputCompanyName';
import Switch from 'components/General/Switch/Switch';
import LogoUpload from 'components/General/LogoUpload/LogoUpload';

// Styles
import s from '../CreateCounterparty.module.scss';

const CompanyMainInfo = ({ form, setField, data, isEditMode, isPercent }) => {
    const [showPercent, setShowPercent] = useState(false);
    useEffect(() => {
        setShowPercent(Boolean(isPercent));
    }, [isPercent]);
    return (
        <div className={s.block}>
            <h3>Основная информация</h3>
            <div className={s.fields}>
                <Field text="ИНН">
                    <InputInn
                        width={200}
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
                    placeholder="В краткой форме, например ООО “Компания”"
                />
            </Field>
            <Field text="Сайт">
                <InputText
                    width={200}
                    text={form.site}
                    setText={(v) => setField('site', v)}
                />
            </Field>
            <Field text="Сайт">
                <LogoUpload
                    disabled={false}
                    width={317}
                    height={80}
                    logo={form.logo}
                    setLogo={async (val) => {
                        if (val?.handle?.getFile) {
                            const file = await val.handle.getFile();
                            console.log(val);
                            setField('logo', file);
                        } else {
                            setField('logo', val);
                        }
                    }}
                />
            </Field>
            <Switch
                text="Индивидуальный процент менеджера по персоналу"
                switchState={showPercent}
                setSwitchState={setShowPercent}
            />

            <div
                className={classNames(
                    s.percent,
                    !showPercent && s.percent_hidden
                )}
            >
                <Field text="Процент менеджера по персоналу">
                    <InputText
                        width={200}
                        text={form.is_percent}
                        setText={(v) => setField('is_percent', v)}
                    />
                </Field>
            </div>
        </div>
    );
};

export default CompanyMainInfo;
