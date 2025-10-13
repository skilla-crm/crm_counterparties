import Field from "components/General/Field/Field";
import InputText from "components/General/InputText/InputText";

import s from "../CreateCounterparty.module.scss";
const CounterpartyAddresses = ({ form, setField }) => (
  <div className={s.block}>
    <h3>Адреса</h3>
    <Field text="Юридический адрес для договора">
      <InputText
        width={800}
        text={form.ur_adress}
        setText={(v) => setField("ur_adress", v)}
      />
    </Field>
    <Field text="Фактический адрес для почтовых отправлений">
      <InputText
        width={800}
        text={form.adress}
        setText={(v) => setField("adress", v)}
      />
    </Field>
  </div>
);

export default CounterpartyAddresses;
