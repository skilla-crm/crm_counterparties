// Components
import Field from 'components/General/Field/Field';
import InputText from 'components/General/InputText/InputText';

// Styles
import s from '../CreateCounterparty.module.scss';

const CounterpartyEdo = ({ form, setField }) => (
    <div className={s.block}>
        <h3>Электронный документооборот</h3>
        <Field text="Идентификатор ЭДО">
            <InputText
                width={400}
                text={form.edo_id}
                setText={(v) => setField('edo_id', v)}
                copyable={true}
            />
        </Field>
        <div className={s.fields}>
            <Field text="Код региона">
                <InputText
                    width={100}
                    text={form.edo_region}
                    setText={(v) => setField('edo_region', v)}
                />
            </Field>
            <Field text="Индекс">
                <InputText
                    width={150}
                    text={form.edo_index}
                    setText={(v) => setField('edo_index', v)}
                />
            </Field>
            <Field text="Город">
                <InputText
                    width={300}
                    text={form.edo_city}
                    setText={(v) => setField('edo_city', v)}
                />
            </Field>
        </div>

        <div className={s.fields}>
            <Field text="Улица">
                <InputText
                    width={300}
                    text={form.edo_street}
                    setText={(v) => setField('edo_street', v)}
                />
            </Field>
            <Field text="Дом">
                <InputText
                    width={90}
                    text={form.edo_home}
                    setText={(v) => setField('edo_home', v)}
                />
            </Field>
            <Field text="Корпус">
                <InputText
                    width={90}
                    text={form.edo_k}
                    setText={(v) => setField('edo_k', v)}
                />
            </Field>
            <Field text="Кв/офис">
                <InputText
                    width={90}
                    text={form.edo_a}
                    setText={(v) => setField('edo_a', v)}
                />
            </Field>
        </div>
    </div>
);

export default CounterpartyEdo;
