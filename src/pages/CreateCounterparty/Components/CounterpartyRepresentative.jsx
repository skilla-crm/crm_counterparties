// Components
import Field from 'components/General/Field/Field';
import InputText from 'components/General/InputText/InputText';
import InputEmail from 'components/General/InputEmail/InputEmail';
import InputPhone from 'components/General/InputPhone/InputPhone';

// Styles
import s from '../CreateCounterparty.module.scss';

const CounterpartyRepresentative = ({ form, setField, setError }) => (
    <div className={s.block}>
        <h3>Представитель</h3>
        <Field text="Фамилия">
            <InputText
                width={600}
                text={form.contacts.surname}
                setText={(v) => setField('surname', v)}
            />
        </Field>
        <Field text="Имя">
            <InputText
                width={600}
                text={form.contacts.name}
                setText={(v) => setField('name', v)}
            />
        </Field>

        <Field text="Должность">
            <InputText
                width={600}
                text={form.contacts.position}
                setText={(v) => setField('position', v)}
            />
        </Field>
        <Field text="Эл. почта">
            <InputEmail
                width={600}
                email={form.contacts.e_mail}
                required={false}
                setEmail={(v) => {
                    setField('e_mail', v);
                }}
                setValidate={(v) => {
                    setError('contacts_email_validate', v);
                }}
            />
        </Field>
        <div className={s.fields}>
            <Field text="Моб. телефон">
                <InputPhone
                    required={false}
                    phone={form.contacts.phone}
                    setPhone={(v) => {
                        setField('phone', v);
                    }}
                    width={390}
                    setValidate={(v) => {
                        setError('contacts_phone_validate', v);
                    }}
                />
            </Field>
            <Field text="Добавочный">
                <InputText
                    width={190}
                    text={form.contacts.dob}
                    setText={(v) => setField('dob', v)}
                />
            </Field>
        </div>
    </div>
);

export default CounterpartyRepresentative;
