// React & Hooks
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// Redux API
import {
  useAddСounterpartyMutation,
  useGetCounterpartyInfoQuery,
} from "../../../src/redux/services/counterpartiesApiActions";

// Custom Hooks
import { useCounterpartyForm } from "hooks/useCounterpartyForm";
import useToast from "hooks/useToast";

// Components
import CounterpartyHeader from "./Components/CounterpartyHeader";
import CounterpartyMainInfo from "./Components/CounterpartyMainInfo";
import CounterpartyAddresses from "./Components/CounterpartyAddresses";
import CounterpartyEdo from "./Components/CounterpartyEdo";
import CounterpartySignatory from "./Components/CounterpartySignatory";

// import CounterpartyBankDetails from "./Components/CompanyBankDetails/CompanyBankDetails";

// Utils
import classNames from "classnames";

// Styles
import s from "./CreateCounterparty.module.scss";
import CounterpartyRepresentative from "./Components/CounterpartyRepresentative";

const CreateCounterparty = ({ initialData }) => {
  const isEditMode = false;

  const { id } = 123;
  const navigate = useNavigate();
  const [anim, setAnim] = useState(false);
  const { showToast } = useToast();

  const { data: counterparty, isLoading } = useGetCounterpartyInfoQuery(id);

  const { form, setField, getFormData, setAdditionalSignatureField } =
    useCounterpartyForm();

  const [addCounterparty, { isLoading: isSaving }] =
    useAddСounterpartyMutation();

  const [isAdditionalSignature, setIsAdditionalSignature] = useState(false);
  const [isPercent, setIsPercent] = useState(false);
  const [isContractor, setIsContractor] = useState(false);

  useEffect(() => {
    setIsAdditionalSignature(!!counterparty?.additional_signature);
    setIsPercent(!!counterparty?.otv_act);
  }, [counterparty]);
  useEffect(() => {
    !isLoading && setAnim(true);
  }, [isLoading]);

  useEffect(() => {
    if (!counterparty) return;

    const fields = {
      name: counterparty.name || "",
      inn: counterparty.inn || "",
      kpp: counterparty.kpp || "",
      ogrn: counterparty.ogrn || "",
      address: counterparty.address || "",
      ur_adress: counterparty.ur_adress || "",
      is_percent: counterparty.is_percent || "",
      director: counterparty.director || "",
      director_position: counterparty.director_position || "",
      director_rod: counterparty.director_rod || "",
      logo: counterparty.logo || null,
      site: counterparty.site || "",
      edo_id: counterparty.edo_id || "",
      edo_region: counterparty.edo_region || "",
      edo_index: counterparty.edo_index || "",
      edo_city: counterparty.edo_city || "",
      edo_street: counterparty.edo_street || "",
      edo_home: counterparty.edo_home || "",
      edo_k: counterparty.edo_k || "",
      edo_a: counterparty.edo_a || "",
    };

    Object.entries(fields).forEach(([key, value]) => setField(key, value));

    const additional = counterparty.additional_signature || {};
    setField("additional_signature", {
      full_name: additional.full_name || "",
      powers: additional.powers || "",
      doc_validity_period: additional.doc_validity_period || "",
      doc: additional.doc || "",
      sign: additional.sign || "",
    });

    const company_contacts = counterparty.company_contacts || {};
    setField("company_contacts", {
      name: company_contacts.name || "",
      surname: company_contacts.surname || "",
      position: company_contacts.position || "",
      phone: company_contacts.phone || "",
      dob: company_contacts.dob || "",
      e_mail: company_contacts.e_mail || "",
    });
  }, [counterparty, setField]);

  const handleSave = async () => {
    if (!form.inn || !form.name) {
      showToast('Поля "ИНН" и "Наименование контрагента" обязательны', "error");
      return;
    }
    try {
      const fd = getFormData();
      // await addCounterparty({ id, formData: fd }).unwrap();

      navigate(`/detail/${id}`);
    } catch (err) {
      console.error(err);
      showToast("Ошибка при добавлении контрагента", "error");
    }
  };

  return (
    <div className={classNames(s.root, anim && s.root_anim)}>
      <CounterpartyHeader
        data={counterparty}
        isLoading={isSaving}
        onSave={handleSave}
      />

      <div className={s.wrapper}>
        <CounterpartyMainInfo
          isEditMode={isEditMode}
          data={counterparty}
          form={form}
          setField={setField}
          isPercent={isPercent}
        />
        <CounterpartyAddresses form={form} setField={setField} />
        <CounterpartyEdo form={form} setField={setField} />
        <CounterpartyRepresentative form={form} setField={setField} />

        <CounterpartySignatory
          form={form}
          setField={setField}
          setAdditionalField={setAdditionalSignatureField}
          isAdditionalSignature={isAdditionalSignature}
          isContractor={isContractor}
        />
      </div>
    </div>
  );
};

export default CreateCounterparty;
