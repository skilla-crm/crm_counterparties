// React
import { useContractForm } from "hooks/useContractForm";
import { use, useEffect, useState } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { setPriceRates, setAllDataRate } from "../../redux/ratesContract/slice";

// Hooks
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
import { useGetCounterpartyInfoQuery } from "../../redux/services/counterpartyDetailsApiActions";
import { counterpartyDetailsApiActions } from "../../redux/services/counterpartyDetailsApiActions";
// Components
import ContractHeader from "./COMPONENTS/ContractHeader";
import ContractMainInfo from "./COMPONENTS/ContractMainInfo";
import DocumentFlow from "./COMPONENTS/DocumentFlow/DocumentFlow";
import DocumentsList from "./COMPONENTS/DocumentsList/DocumentsList";
import History from "./COMPONENTS/History/History";
import ContractSkeleton from "./ui/ContractSkeleton/ContractSkeleton";

// Styles
import s from "./Contract.module.scss";
import IndividualPriceList from "./COMPONENTS/IndividualPriceList/IndividualPriceList";
import { HistoryLog } from "./COMPONENTS/HistoryLog/HistoryLog";

const normalizeDate = (value) => {
  if (!value) return null;
  if (typeof value === "string" && value.startsWith("-000001")) return null;

  const d = dayjs(value);
  return d.isValid() ? d : null;
};

export const Contract = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const counterpartyIdUrl = searchParams.get("counterparty_id");
  const fromOrder = searchParams.get("order");
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const location = useLocation();
  const dispatch = useDispatch();
  const { counterparty: locationCounterparty, settings: locationSettings } =
    location.state || {};

  const [isEditMode, setIsEditMode] = useState(false);
  const [withoutExpiredDate, setWithoutExpiredDate] = useState(false);
  const isCreateMode = !id;
  const { form, setField, getFormData, getJsonData } = useContractForm();
  const { priceRates } = useSelector((state) => state.ratesContract);
  //параметры
  //данные контракта
  const {
    data: contractData,
    refetch: refetchContract,
    isLoading: isLoadingContract,
  } = useGetContractQuery({ contractId: id }, { skip: !id });
  const counterpartyIdForQuery =
    contractData?.company_id?.toString() ||
    locationCounterparty?.general?.company_id?.toString() ||
    counterpartyIdUrl;
  //данные контрагента
  const {
    data: counterparty,
    isLoading: isLoadingCounterparty,
    refetch: refetchCounterparty,
  } = useGetCounterpartyInfoQuery(
    { counterpartyId: counterpartyIdForQuery },
    { skip: !counterpartyIdForQuery }
  );
  //данные настроек
  const { data: settings, isLoading: isLoadingSettings } = useGetSettingsQuery(
    {
      companyId: counterpartyIdForQuery,
    },
    { skip: !counterpartyIdForQuery }
  );

  useEffect(() => {
    if (form) {
      document.title = `Договор ${form?.prefix || form?.number ? `№` : ""} ${form?.prefix ? `${form?.prefix}` : ""}${form?.number ? `${form?.number}` : ""}`;
    }
  }, [form]);

  useEffect(() => {
    if (id) return;
    setIsEditMode(isCreateMode);
  }, []);

  const CONTACTS_MAILS = Array.isArray(settings?.company_contacts)
    ? settings?.company_contacts
        .map((item) => ({
          e_mail: item.e_mail,
          name: `${item.name || ""} ${item.surname || ""}`,
        }))
        .filter((email) => email)
        .map((email) => ({
          e_mail: email.e_mail,
          name: `${email.name || ""} ${email.surname || ""}`,
        }))
    : [];

  const [createContract, { isLoading: isCreateLoading }] =
    useCreateContractMutation();

  const [updateContract, { isLoading: isUpdateLoading }] =
    useUpdateContractMutation();

  //заполнение формы при создании
  useEffect(() => {
    if (contractData || !isCreateMode) return;
    const scopedSettings = settings || locationSettings || {};

    const fields = {
      company_id:
        locationCounterparty?.general?.company_id ||
        Number(counterpartyIdUrl) ||
        "",
      company_details_id:
        locationCounterparty?.bank_accounts?.[0]?.id ||
        settings?.bank_accounts?.[0]?.id ||
        null,
      partnership_id:
        scopedSettings?.partnerships?.find((el) => el.is_main)?.id ||
        scopedSettings?.partnerships?.[0]?.id ||
        "",
      partnership_details_id:
        scopedSettings?.partnerships
          ?.find((el) => el.is_main)
          ?.details?.find((el) => el.is_main)?.id ||
        scopedSettings?.partnerships?.[0]?.details?.find((el) => el.is_main)
          ?.id ||
        null,
      number:
        scopedSettings?.partnerships?.find((el) => el.is_main)?.contract_num ||
        scopedSettings?.partnerships?.[0]?.contract_num ||
        "",
      number:
        scopedSettings?.partnerships?.find((el) => el.is_main)?.contract_num ||
        scopedSettings?.partnerships?.[0]?.contract_num ||
        "",
      prefix: scopedSettings?.prefix ?? "",
      contract_template_id: scopedSettings?.contract_templates?.[0]?.id || null,
      docs: [],
    };

    Object.entries(fields).forEach(([key, value]) => {
      if (value !== undefined) {
        setField(key, value);
      }
    });
  }, [
    contractData,
    isCreateMode,
    locationCounterparty,
    locationSettings,
    settings,
    setField,
  ]);

  // заполнение формы при редактировании
  useEffect(() => {
    if (!contractData || isCreateMode) return;

    const fields = {
      company_id: contractData.company_id || "",
      company_details_id: contractData.company_details_id || null,
      partnership_id: contractData.partnership_id || "",
      partnership_details_id: contractData.partnership_details_id || null,
      // contract_template_id: contractData.contract_template_id || "",
      contract_template_id: contractData.contract_template?.id,
      without_template: contractData.without_template || 0,
      number: contractData.number || "",
      prefix: contractData.prefix || "",
      date: normalizeDate(contractData.date),
      expired_date: contractData.expired_date || null,
      company_signature_id: contractData.company_signature_id || null,
      partnership_signature_id: contractData.partnership_signature_id || null,
      label: contractData.label || "",
      individual_pricelist: contractData.individual_pricelist || 0,
    };
    Object.entries(fields).forEach(([key, value]) => setField(key, value));
  }, [contractData]);

  // Инициализация прайс листа договора при редактировании
  useEffect(() => {
    if (!contractData || isCreateMode) return;

    if (form.individual_pricelist === 1) {
      const contractPriceList = Array.isArray(contractData.individual_pricelist)
        ? contractData.individual_pricelist
        : contractData.individual_pricelist_data ||
          contractData.price_list ||
          [];

      // Если price_list пустой или его нет, инициализация из settings
      let priceListData = [];
      if (Array.isArray(contractPriceList) && contractPriceList.length > 0) {
        priceListData = contractPriceList;
      } else if (
        Array.isArray(settings?.price_list) &&
        settings.price_list.length > 0
      ) {
        // Если прайс лист подтягивается из settings, в случае когла у договора пустой массив price_list, то при сохранении сервер выдает ошиьку изза использования id из настроек контрагента, которые не валидны для договора. По этому удаляю id из элементов settings - при сохранении назначатся новые id
        priceListData = settings.price_list.map((item, index) => ({
          ...item,
          id: `new-${Date.now()}-${index}`, // Временный id, чтобы не отправлять id из settings
        }));
      }

      dispatch(setAllDataRate({ individual_pricelist: priceListData }));
      dispatch(setPriceRates(priceListData));
    } else {
      dispatch(setAllDataRate({ individual_pricelist: [] }));
      dispatch(setPriceRates([]));
    }
  }, [
    contractData,
    form.individual_pricelist,
    settings,
    isCreateMode,
    dispatch,
  ]);

  // Инициализация прайс листа из settings при создании договора
  useEffect(() => {
    if (!isCreateMode) return;
    const scopedSettings = settings || locationSettings || {};

    if (form.individual_pricelist === 1) {
      const priceListData = Array.isArray(scopedSettings.price_list)
        ? scopedSettings.price_list
        : [];
      dispatch(setAllDataRate({ individual_pricelist: priceListData }));
      dispatch(setPriceRates(priceListData));
    } else {
      dispatch(setAllDataRate({ individual_pricelist: [] }));
      dispatch(setPriceRates([]));
    }
  }, [
    form.individual_pricelist,
    settings,
    locationSettings,
    isCreateMode,
    dispatch,
  ]);

  const handleCreateContract = async () => {
    if (!form.number) return showToast("Введите номер договора", "error");
    if (!form.company_id) return showToast("Выберите заказчика", "error");
    if (!form.partnership_id) return showToast("Выберите исполнителя", "error");
    if (!form.contract_template_id && !form.without_template)
      return showToast("Выберите шаблон договора", "error");
    if (!form.date) return showToast("Выберите дату договора", "error");
    if (!withoutExpiredDate && !form.expired_date)
      return showToast("Выберите срок дйствия", "error");
    if (form.individual_pricelist === 1 && priceRates.length === 0)
      return showToast("Нужно добавить прайс лист", "error");
    try {
      const fd = getFormData(priceRates);
      //   const data = await getJsonData();
      const res = await createContract({ data: fd }).unwrap();
      if (res.success) {
        dispatch(
          counterpartyDetailsApiActions.util.invalidateTags(["counterparty"])
        );
        fromOrder
          ? navigate(`/details/contract/${counterpartyIdUrl}`, {
              replace: true,
            })
          : navigate(-1);
        showToast("Договор создан", "success");
        setIsEditMode(false);
      }
    } catch (err) {
      showToast("Ошибка при создании договора", "error");
    }
  };

  const handleSaveChanges = async () => {
    if (!withoutExpiredDate && !form.expired_date)
      return showToast("Выберите срок дйствия", "error");
    if (!form.contract_template_id && !form.without_template)
      return showToast("Выберите шаблон договора", "error");
    if (form.individual_pricelist === 1 && priceRates.length === 0)
      return showToast("Нужно добавить прайс лист", "error");
    try {
      // const fd = getFormData(['docs'])
      const fd = getFormData(priceRates);
      //   const data = await getJsonData(["docs"]);

      const res = await updateContract({
        data: fd,
        contractId: id,
      }).unwrap();
      if (res.success) {
        showToast("Договор сохранен", "success");
        setIsEditMode(false);
        dispatch(
          counterpartyDetailsApiActions.util.invalidateTags(["counterparty"])
        );
      }
    } catch (err) {
      showToast("Ошибка при сохранении изменений", "error");
    }
  };

  const isContractLoading =
    (!isCreateMode &&
      (!contractData || isLoadingCounterparty || isLoadingSettings)) ||
    (isCreateMode && (isLoadingCounterparty || isLoadingSettings));
console.log(contractData?.history)
  return (
    <div className={s.wrapper}>
      {/* <ContractSkeleton isLoading={true} /> */}
      <div className={classNames(s.root, isContractLoading && s.rootLoading)}>
        <ContractHeader
          // refetch={refetchCounterparty}

          settings={settings}
          isLoadingContract={isLoadingContract}
          isLoading={isCreateLoading || isUpdateLoading}
          contract={contractData}
          contractNumber={form?.number}
          contractDate={form?.date}
          contractPrefix={form?.prefix}
          contractId={id}
          isEditMode={isEditMode}
          isCreateMode={isCreateMode}
          setIsEditMode={setIsEditMode}
          handleSave={handleSaveChanges}
          handleCreate={handleCreateContract}
          contacts={CONTACTS_MAILS}
          isDeletableContract={
            counterparty?.contracts?.length > 1 ? true : false
          }
        />
        <div className={s.content}>
          <div className={s.leftCol}>
            <ContractMainInfo
              form={form}
              setField={setField}
              counterparty={counterparty || locationCounterparty}
              settings={settings}
              isEditMode={isEditMode}
              onBankAccountChange={refetchCounterparty}
              withoutExpiredDate={withoutExpiredDate}
              setWithoutExpiredDate={setWithoutExpiredDate}
              contract={contractData}
              isCreateMode={isCreateMode}
            />

            {Boolean(form.individual_pricelist) && (
              <IndividualPriceList disabled={!isCreateMode && !isEditMode} />
            )}

            <DocumentsList
              settings={settings}
              form={form}
              setField={setField}
              isCreateMode={isCreateMode}
              data={contractData?.docs}
              contractId={id}
              contract={contractData}
              docTypes={settings?.doc_types}
              contacts={CONTACTS_MAILS}
            />
          </div>

          <div
            className={classNames(
              s.rightCol,
              (isCreateMode || isEditMode) && s.rightColHidden
            )}
          >
            <DocumentFlow id={id} exchange={contractData?.exchange} />
            {contractData?.history?.length > 0 && (
              <HistoryLog logs={contractData?.history} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contract;
