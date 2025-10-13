// Components
import Field from "components/General/Field/Field";
import InputText from "components/General/InputText/InputText";

// Styles
import s from "../CreateCounterparty.module.scss";

const CounterpartyEdo = ({ form, setField }) => (
  <div className={s.block}>
    <h3>Электронный документооборот</h3>
    <Field text="Идентификатор ЭДО">
      <InputText
        width={400}
        text={form.diadoc_id}
        setText={(v) => setField("diadoc_id", v)}
        copyable={true}
      />
    </Field>
    <div className={s.fields}>
      <Field text="Код региона">
        <InputText
          width={100}
          text={form.ur_region}
          setText={(v) => setField("ur_region", v)}
        />
      </Field>
      <Field text="Индекс">
        <InputText
          width={150}
          text={form.ur_index}
          setText={(v) => setField("ur_index", v)}
        />
      </Field>
      <Field text="Город">
        <InputText
          width={300}
          text={form.ur_city}
          setText={(v) => setField("ur_city", v)}
        />
      </Field>
      {/* <Field text="Регион">
        <InputText
          width={400}
          text={form.ur_region}
          setText={(v) => setField("ur_region", v)}
        />
      </Field> */}
      {/* <Field text="Район">
        <InputText
          width={300}
          text={form.ur_k}
          setText={(v) => setField("ur_k", v)}
        />
      </Field> */}
    </div>
    {/* <div className={s.fields}>
      <Field text="Населенный пункт">
        <InputText
          width={300}
          text={form.district}
          setText={(v) => setField("district", v)}
        />
      </Field>
    </div> */}
    <div className={s.fields}>
      <Field text="Улица">
        <InputText
          width={300}
          text={form.ur_street}
          setText={(v) => setField("ur_street", v)}
        />
      </Field>
      <Field text="Дом">
        <InputText
          width={90}
          text={form.ur_home}
          setText={(v) => setField("ur_home", v)}
        />
      </Field>
      <Field text="Корпус">
        <InputText
          width={90}
          text={form.ur_k}
          setText={(v) => setField("ur_k", v)}
        />
      </Field>
      <Field text="Кв/офис">
        <InputText
          width={90}
          text={form.ur_a}
          setText={(v) => setField("ur_a", v)}
        />
      </Field>
    </div>
  </div>
);

export default CounterpartyEdo;
