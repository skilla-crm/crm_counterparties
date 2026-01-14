import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";

//icons
import { ReactComponent as IconPlusBlue } from "assets/icons/iconPlusBlue.svg";

//hooks
import { useModal } from "hooks/useModal";
import useToast from "hooks/useToast";

//components
import InputData from "components/General/InputData/InputData";
import Dropdown from "./Dropdown/Dropdown";
import Switch from "components/General/Switch/Switch";
import Field from "components/General/Field/Field";
import InputText from "components/General/InputText/InputText";
import InputNumRub from "components/General/InputNumRub/InputNumRub";
//styles
import s from "./ContractMainInfo.module.scss";
import UniButton from "components/General/UniButton/UniButton";
import { set } from "lodash";

const ContractMainInfo = ({
  form,
  setField,
  counterparty,
  settings,
  isEditMode,
  withoutExpiredDate,
  setWithoutExpiredDate,
  contract,
  isCreateMode,
  onBankAccountChange = () => {},
}) => {
  const { showModal } = useModal();
  const { showToast } = useToast();
  const { partnerships = [], contract_templates = [] } = settings || {};
  const [companyAccounts, setCompanyAccounts] = useState([]);

  useEffect(() => {
    setWithoutExpiredDate(form.expired_date === null);
  }, [form.expired_date]);

  // Валидация: если дата договора изменилась и срок действия раньше новой даты, сбросить срок действия
  useEffect(() => {
    if (!form.date || !form.expired_date || withoutExpiredDate) return;

    const contractDate = dayjs(form.date);
    const expiredDate = dayjs(form.expired_date);

    if (expiredDate.isBefore(contractDate, "day")) {
      showToast(
        "Срок действия не может быть раньше даты договора. Срок действия сброшен.",
        "error"
      );
      setField("expired_date", null);
    }
  }, [form.date]);

  //заказчик
  const company = {
    id: counterparty?.general?.company_id,
    name: counterparty?.general?.name,
    inn: counterparty?.general?.inn,
    kpp: counterparty?.general?.kpp,
  };
  //счета заказчика
  useEffect(() => {
    setCompanyAccounts(counterparty?.bank_accounts || []);
  }, [counterparty?.bank_accounts]);
  //шаблоны договоров
  const templates = useMemo(() => {
    const list = [
      ...(settings?.contract_templates || []),
      contract?.contract_template,
    ].filter(Boolean);

    const unique = new Map();
    list.forEach((item) => {
      if (!item?.id) return;
      if (!unique.has(item.id)) unique.set(item.id, item);
    });

    return Array.from(unique.values());
  }, [settings?.contract_templates, contract?.contract_template]);

  //подписанты заказчика
  const companySignPersons =
    settings?.company_signatories?.map((item) => ({
      id: item.id,
      name: item.name,
    })) || [];

  //список поставщиков
  const notArchivedPartnerships =
    (partnerships || []).filter((p) => p.is_archive !== 1) || [];
  //выбранный поставщик
  const selectedPartnership =
    (notArchivedPartnerships || []).find(
      (company) => company.id === form.partnership_id
    ) || [];
  //счета выбранного поставщика
  const partnershipAccounts = selectedPartnership?.details || [];
  //подписанты выбранногопоставщика

  const partnershipSignPersons =
    selectedPartnership?.signatories?.map((item) => ({
      id: item.id,
      name: item.name,
    })) || [];

  const handleOpenAddAccount = () => {
    if (!counterparty?.general?.company_id) return;
    showModal("BANK_ACCOUNT", {
      companyId: counterparty.general.company_id,
      onSuccess: () => {
        onBankAccountChange?.();
      },
    });
  };

  const handleExpiredDateChange = (date) => {
    if (!date) {
      setField("expired_date", null);
      return;
    }

    const contractDate = form.date ? dayjs(form.date) : null;
    const expiredDate = dayjs(date);

    if (contractDate && expiredDate.isBefore(contractDate, "day")) {
      showToast("Срок действия не может быть раньше даты договора", "error");
      return;
    }

    setField("expired_date", date);
  };

  return (
    <div className={s.mainInfo}>
      <h3>Основная информация</h3>
      <div className={s.row}>
        <Dropdown
          sub="Заказчик"
          width={600}
          value={company}
          onChange={(v) => setField("company_id", v?.id)}
          options={[company]}
          disabled={true}
        />

        {!isEditMode || companyAccounts.length > 0 ? (
          <Dropdown
            sub="Счет заказчика"
            width={312}
            value={companyAccounts.find(
              (a) => a.id === form.company_details_id
            )}
            onChange={(v) => setField("company_details_id", v?.id)}
            disabled={!isEditMode || companyAccounts.length === 0}
            options={companyAccounts}
            type="account"
          />
        ) : (
          <UniButton
            onClick={handleOpenAddAccount}
            width={312}
            type="outline"
            text="Добавить банковский счет"
            iconPosition="left"
            icon={IconPlusBlue}
          />
        )}
      </div>
      <div className={s.row}>
        <Dropdown
          sub="Поставщик"
          width={600}
          value={selectedPartnership}
          disabled={!isEditMode}
          onChange={(v) => {
            setField("partnership_id", v?.id);
            setField("number", v?.contract_num);
            setField("partnership_details_id", v?.details?.[0]?.id);
          }}
          options={notArchivedPartnerships}
        />
        <Dropdown
          sub="Счет поставщика"
          width={312}
          value={
            partnershipAccounts.find(
              (a) => a.id === form.partnership_details_id
            ) ||
            partnershipAccounts[0] ||
            null
          }
          onChange={(v) => setField("partnership_details_id", v?.id)}
          disabled={!isEditMode}
          options={partnershipAccounts}
          type="account"
        />
      </div>
      <div className={s.row}>
        <Dropdown
          sub="Тип договора"
          width={312}
          value={
            form.without_template
              ? null
              : templates.find((t) => t.id === form.contract_template_id)
          }
          disabled={!isEditMode || form.without_template}
          onChange={(v) => setField("contract_template_id", v?.id)}
          options={templates}
          type="type"
        />{" "}
        <div className={s.switch}>
          <Switch
            text="Нетиповой"
            switchState={!!form.without_template}
            setSwitchState={(v) => setField("without_template", v ? 1 : 0)}
            disabled={!isEditMode}
          />
        </div>
      </div>
      <div className={s.row}>
        {/* {!isCreateMode && (
                <Field text="Номер">
                    <InputText
                        width={150}
                        disabled={!isEditMode}
                        text={form.number}
                        setText={(v) => setField('number', v)}
                    />
                </Field>
               )} */}

        <Field text="Префикс">
          <InputText
            placeholder="Префикс"
            width={150}
            disabled={!isEditMode}
            text={form.prefix}
            setText={(v) => setField("prefix", v)}
          />
        </Field>

        <Field text="Номер">
          <InputText
            placeholder="Номер"
            width={150}
            disabled={!isEditMode}
            text={form.number}
            setText={(v) => setField("number", v)}
          />
        </Field>

        {/* <Field
                    width={300}
                    text="Лимит по сумме"
                    info="Используется для договоров с лимитом по сумме актов. Ты получишь уведомление, когда сумма актов достигнет заданного лимита и договор потребуется перезаключить."
                >
                    <InputNum
                        num={form.limit_sum}
                        setNum={(v) => setField('limit_sum', v)}
                        width={150}
                        disabled={!isEditMode}
                    />
                </Field> */}
        <InputData
          sub={"Дата"}
          nosub={true}
          setDate={(v) => setField("date", v)}
          date={form.date}
          disabled={!isEditMode}
        />
        <InputData
          sub={"Срок действия"}
          nosub={true}
          setDate={handleExpiredDateChange}
          date={!withoutExpiredDate ? form.expired_date : null}
          disabled={!isEditMode || withoutExpiredDate}
          minDate={form.date ? dayjs(form.date) : null}
        />
        <div className={s.switch}>
          <Switch
            text="Без срока действия"
            switchState={withoutExpiredDate}
            setSwitchState={() => {
              if (!isEditMode) {
                return;
              }
              const nextValue = !withoutExpiredDate;
              setWithoutExpiredDate(nextValue);
              if (nextValue) {
                setField("expired_date", "");
              }
            }}
            disabled={!isEditMode}
          />
        </div>
      </div>
      <Dropdown
        sub="Подписант заказчика"
        width={500}
        disabled={!isEditMode || companySignPersons.length === 0}
        type="person"
        value={
          companySignPersons.find((p) => p.id === form.company_signature_id) ||
          null
        }
        onChange={(v) => setField("company_signature_id", v?.id)}
        options={companySignPersons}
        placeholder={
          companySignPersons.length === 0
            ? "Не указан. Добавь подписанта в настройках компании"
            : "Не выбран"
        }
      />{" "}
      <Dropdown
        sub="Подписант поставщика"
        width={500}
        disabled={!isEditMode || partnershipSignPersons.length === 0}
        type="person"
        value={
          partnershipSignPersons.find(
            (p) => p.id === form.partnership_signature_id
          ) || null
        }
        onChange={(v) => setField("partnership_signature_id", v?.id)}
        options={partnershipSignPersons}
        placeholder={
          partnershipSignPersons.length === 0
            ? "Не указан. Добавь подписанта в реквизитах контрагента"
            : "Не выбран"
        }
      />{" "}
      <div className={s.row}>
        <Field text="Ярлык договора">
          <InputText
            placeholder="Ярлык договора"
            width={500}
            disabled={!isEditMode}
            text={form.label}
            setText={(v) => setField("label", v)}
          />
        </Field>
      </div>
      <div className={s.switch}>
        <Switch
          text="Индивидуальный прайс-лист"
          switchState={form.individual_pricelist === 1}
          setSwitchState={() =>
            setField(
              "individual_pricelist",
              form.individual_pricelist === 1 ? 0 : 1
            )
          }
          disabled={!isEditMode}
        />
      </div>
    </div>
  );
};

export default ContractMainInfo;
