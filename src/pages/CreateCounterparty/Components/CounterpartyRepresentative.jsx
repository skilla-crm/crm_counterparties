import Field from 'components/General/Field/Field';
import InputText from 'components/General/InputText/InputText';

// Styles
import s from '../CreateCounterparty.module.scss';
import InputEmail from 'components/General/InputEmail/InputEmail';
import InputPhone from 'components/General/InputPhone/InputPhone';

const CounterpartyRepresentative = ({ form, setField, setError }) => (
    <div className={s.block}>
        <h3>Представитель</h3>
        <Field text="Фамилия">
            <InputText
                width={600}
                text={form.company_contact.name}
                setText={(v) => setField('', v)}
            />
        </Field>
        <Field text="Имя">
            <InputText
                width={600}
                text={form.diadoc_id}
                setText={(v) => setField('diadoc_id', v)}
            />
        </Field>
        <Field text="Отчество">
            <InputText
                width={600}
                text={form.diadoc_id}
                setText={(v) => setField('diadoc_id', v)}
            />
        </Field>
        <Field text="Должность">
            <InputText
                width={600}
                text={form.diadoc_id}
                setText={(v) => setField('diadoc_id', v)}
            />
        </Field>
        <div className={s.fields}>
            <Field text="Моб. телефон">
                <InputPhone
                    required={false}
                    phone={form.phone}
                    setPhone={(v) => {
                        setField('phone', v);
                    }}
                    width={210}
                    setValidate={(v) => {
                        setError('phone_validate', v);
                    }}
                />
            </Field>
            <Field text="Эл. почта">
                <InputEmail
                    email={form.email}
                    required={false}
                    setEmail={(v) => {
                        setField('email', v);
                    }}
                    setValidate={(v) => {
                        setError('email_validate', v);
                    }}
                />
            </Field>
        </div>
        <InputText
            width={400}
            text={form.diadoc_id}
            setText={(v) => setField('diadoc_id', v)}
            copyable={true}
        />
    </div>
);

export default CounterpartyRepresentative;
