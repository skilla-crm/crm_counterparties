// React
import { useEffect, useState } from "react";

// Date
import dayjs from "dayjs";

// Components
import Field from "components/General/Field/Field";
import InputText from "components/General/InputText/InputText";

import DateInput from "components/General/DateInput/DateInput";
import DatePickerCalendar from "components/General/DatePickerCalendar/DatePickerCalendar";
import DropZone from "components/DropZone/DropZone";

// Styles
import s from "../CreateCounterparty.module.scss";
import Switch from "components/General/Switch/Switch";

const CounterpartySignatory = ({
  form,
  setField,
  setAdditionalField,
  isAdditionalSignature,
  isContractor,
}) => {
  const { additional_signature } = form;
  const {
    full_name = "",
    powers = "",
    doc_validity_period = "",
    doc = "",
    sign = "",
  } = additional_signature;
  const [openCalendar, setOpenCalendar] = useState(false);
  const [showAddOtherSignatory, setShowAddOtherSignatory] = useState(false);
  const [showAddResponsible, setShowAddResponsible] = useState(false);

  useEffect(() => {
    setShowAddOtherSignatory(isAdditionalSignature);
  }, [isAdditionalSignature]);
  useEffect(() => {
    setShowAddResponsible(isContractor);
  }, [isContractor]);

  useEffect(() => {
    if (!showAddResponsible) {
      setField("otv_act", "");
    }
  }, [showAddResponsible]);

  useEffect(() => {
    if (!showAddOtherSignatory) {
      setAdditionalField("full_name", "");
      setAdditionalField("powers", "");
      setAdditionalField("doc_validity_period", "");
      setAdditionalField("doc", "");
      setAdditionalField("sign", "");
    }
  }, [showAddOtherSignatory]);
  return (
    <div className={s.block}>
      <h3>Лицо, имеющее право действовать без доверенности</h3>

      <Field text="ФИО">
        <InputText
          width={600}
          text={form.signature}
          setText={(v) => setField("signature", v)}
        />
      </Field>
      <Field text="Должность">
        <InputText
          width={600}
          text={form.signature_position}
          setText={(v) => setField("signature_position", v)}
        />
      </Field>
      <Field text="Исполнитель в лице">
        <InputText
          width={600}
          text={form.contractor}
          setText={(v) => setField("contractor", v)}
          placeholder="например “генерального директора Иванова Ивана Ивановича”"
        />
      </Field>

      <Switch
        text="Добавить другого подписанта"
        switchState={showAddOtherSignatory}
        setSwitchState={setShowAddOtherSignatory}
      />

      {showAddOtherSignatory && (
        <>
          <Field text="ФИО подписанта">
            <InputText
              width={600}
              text={full_name}
              setText={(v) => setAdditionalField("full_name", v)}
            />
          </Field>

          <Field text="Полномочия подписанта">
            <InputText
              width={600}
              text={powers}
              setText={(v) => setAdditionalField("powers", v)}
            />
          </Field>

          <Field text="Срок действия документа">
            <div className={s.dateInputWrapper}>
              <DateInput
                width={200}
                selectedDate={dayjs(doc_validity_period)}
                setSelectedDate={(v) =>
                  setAdditionalField("doc_validity_period", dayjs(v))
                }
                setOpenCalendar={setOpenCalendar}
              />
              {openCalendar && (
                <DatePickerCalendar
                  value={dayjs(doc_validity_period)}
                  setValue={(v) =>
                    setAdditionalField("doc_validity_period", dayjs(v))
                  }
                  setOpenCalendar={setOpenCalendar}
                  nosub={false}
                />
              )}
            </div>
          </Field>
          <Field text="Файл приказа или доверенности PDF">
            <DropZone
              width={420}
              height={100}
              file={doc}
              setFile={(v) => setAdditionalField("doc", v)}
              type="doc"
            />
          </Field>
          <Field text="Подпись 200x200px, PNG">
            <DropZone
              width={200}
              height={200}
              file={sign}
              setFile={(v) => setAdditionalField("sign", v)}
              type="png"
            />
          </Field>
        </>
      )}
    </div>
  );
};

export default CounterpartySignatory;
