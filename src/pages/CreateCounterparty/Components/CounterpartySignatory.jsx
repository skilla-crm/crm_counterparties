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
  const { signatory } = form;
  const { full_name = "", powers = "", doc_validity_period = "" } = signatory;

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
    if (!showAddOtherSignatory) {
      setAdditionalField("full_name", "");
      setAdditionalField("powers", "");
      setAdditionalField("doc_validity_period", "");
    }
  }, [showAddOtherSignatory]);
  return (
    <div className={s.block}>
      <h3>Лицо, имеющее право действовать без доверенности</h3>

      <Field text="ФИО">
        <InputText
          width={600}
          text={form.signature}
          setText={(v) => setField("director", v)}
        />
      </Field>
      <Field text="Должность">
        <InputText
          width={600}
          text={form.signature_position}
          setText={(v) => setField("director_position", v)}
        />
      </Field>
      <Field text="Исполнитель в лице">
        <InputText
          width={600}
          text={form.contractor}
          setText={(v) => setField("director_rod", v)}
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
                selectedDate={
                  doc_validity_period ? dayjs(doc_validity_period) : null
                }
                setSelectedDate={(v) => {
                  setAdditionalField(
                    "doc_validity_period",
                    v ? v.format("YYYY-MM-DD") : ""
                  );
                }}
                setOpenCalendar={setOpenCalendar}
              />

              {openCalendar && (
                <DatePickerCalendar
                  value={
                    doc_validity_period
                      ? dayjs(doc_validity_period, "YYYY-MM-DD")
                      : null
                  }
                  setValue={(v) => {
                    console.log("Выбрана дата:", v.format("YYYY-MM-DD"));
                    setAdditionalField(
                      "doc_validity_period",
                      v.format("YYYY-MM-DD")
                    );
                  }}
                  setOpenCalendar={setOpenCalendar}
                  nosub={false}
                />
              )}
            </div>
          </Field>
        </>
      )}
    </div>
  );
};

export default CounterpartySignatory;
