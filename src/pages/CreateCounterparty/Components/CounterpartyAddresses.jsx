// Components
import Field from 'components/General/Field/Field';
import InputText from 'components/General/InputText/InputText';

// Styles
import s from '../CreateCounterparty.module.scss';

const CounterpartyAddresses = ({ form, setField }) => (
    <div className={s.block}>
        <h3>Адреса</h3>
        <Field text="Юридический адрес для договора">
            <InputText
                width={800}
                text={form.ur_address}
                setText={(v) => setField('ur_address', v)}
            />
        </Field>
        <Field text="Фактический адрес для почтовых отправлений">
            <InputText
                width={800}
                text={form.address}
                setText={(v) => setField('address', v)}
            />
        </Field>
    </div>
);

export default CounterpartyAddresses;
