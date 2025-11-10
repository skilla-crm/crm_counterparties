// React
import { useContractForm } from "hooks/useContractForm";
import { use, useEffect, useState } from "react";

// Hooks
import { useModal } from "hooks/useModal";
import useToast from "hooks/useToast";

//libs
import dayjs from "dayjs";

// Router
import { useLocation, useNavigate, useParams } from "react-router-dom";

// API
import {
  useGetContractQuery,
  useCreateContractMutation,
  useUpdateContractMutation,
  useGetSettingsQuery,
} from "../../redux/services/contractApiActions";

// Components
import ContractHeader from "./COMPONENTS/ContractHeader";
import ContractMainInfo from "./COMPONENTS/ContractMainInfo";
import DocumentFlow from "./COMPONENTS/DocumentFlow/DocumentFlow";
import DocumentsList from "./COMPONENTS/DocumentsList/DocumentsList";
import History from "./COMPONENTS/History/History";

// Styles
import s from "./Contract.module.scss";
import classNames from "classnames";

export const Contract = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { counterparty, counterpartyId } = location.state || {};
  const [isEditMode, setIsEditMode] = useState(false);
  const isCreateMode = !id;
  const { form, setField, getFormData } = useContractForm();
  const { data } = useGetContractQuery({ contractId: id });
  const { data: settings, isLoading: isLoadingSettings } = useGetSettingsQuery({
    companyId: counterpartyId,
  });
  console.log("settings", counterparty?.general.company_id);
  const [createContract, { isLoading: isCreateLoading }] =
    useCreateContractMutation();

  const [updateContract, { isLoading: isUpdateLoading }] =
    useUpdateContractMutation();

  useEffect(() => {
    if (!data || isCreateMode) return;

    const normalizeDate = (value) => {
      if (!value) return "";
      if (typeof value === "string" && value.startsWith("-000001")) return "";
      return dayjs(value).isValid() ? dayjs(value).format("YYYY-MM-DD") : "";
    };
    const fields = {
      id: data.id || "",
      company_id: data.company_id || "",
      company_details_id: data.company_details_id || "",
      partnership_id: data.partnership_id || "",
      partnership_details_id: data.partnership_details_id || "",
      contract_template: data.contract_template || "",
      without_template: data.without_template || 0,
      number: data.number || "",
      prefix: data.prefix || "",
      date: normalizeDate(data.date),
      expired_date: normalizeDate(data.expired_date),
      company_signature_id: data.company_signature_id || "",
      partnership_signature_id: data.partnership_signature_id || null,
      label: data.label || "",
    };
    Object.entries(fields).forEach(([key, value]) => setField(key, value));
  }, [data]);

  useEffect(() => {}, []);

  const handleCreateContract = async () => {
    if (!form.company_id) return showToast("Выберите шаблон договора", "error");
    try {
      const fd = getFormData();
      const res = await createContract({ data: fd }).unwrap();
      if (res.success) {
        navigate(-1);
        showToast("Договор создан", "success");
      }
    } catch (err) {
      showToast("Ошибка при создании договора", "error");
    }
  };

  const handleSaveChanges = async () => {
    try {
      const fd = getFormData();
      const res = await updateContract({ data: fd }).unwrap();
      if (res.success) {
        showToast("Договор сохранен", "success");
      }
    } catch (err) {
      showToast("Ошибка при сохранении изменений", "error");
    }
  };

  return (
    <div className={s.root}>
      <ContractHeader
        isLoadingSettings={isLoadingSettings}
        settings={settings}
        isLoading={isCreateLoading || isUpdateLoading}
        contract={data}
        isEditMode={isEditMode}
        isCreateMode={isCreateMode}
        setIsEditMode={setIsEditMode}
        handleSave={handleSaveChanges}
        handleCreate={handleCreateContract}
      />
      <div className={s.content}>
        <div className={s.leftCol}>
          <ContractMainInfo
            form={form}
            setField={setField}
            counterparty={counterparty}
            settings={settings}
            isEditMode={isEditMode}
          />
          {!isCreateMode && (
            <DocumentsList
              data={data?.docs}
              contractId={form.id}
              docTypes={settings?.doc_types}
            />
          )}
        </div>

        <div
          className={classNames(
            s.rightCol,
            (isCreateMode || isEditMode) && s.rightColHidden
          )}
        >
          <DocumentFlow id={id} exchange={data?.exchange} />
          <History history={data?.history} />
        </div>
      </div>
    </div>
  );
};
export default Contract;
