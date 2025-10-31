import { useEffect, useState, useMemo } from "react";
import "dayjs/locale/ru";

// Redux
import {
  useCreateBankAccountMutation,
  useUpdateBankAccountMutation,
  useDeleteBankAccountMutation,
} from "../../../../redux/services/counterpartyDetailsApiActions";
import { useGetBankByBikMutation } from "../../../../redux/services/dadataApiActions";

// Hooks
import { useModal } from "hooks/useModal";
import useToast from "hooks/useToast";

// Components
import Modal from "components/General/Modal/Modal";
import UniButton from "components/General/UniButton/UniButton";
import Field from "components/General/Field/Field";
import Switch from "components/EmailSender/Switch/Switch";
import InputBankAccount from "components/General/InputBankAccount/InputBankAccount";
import InputBik from "components/General/InputBik/InputBik";
import Label from "components/General/Label/Label";
import InputText from "components/General/InputText/InputText";

// Icons
import { ReactComponent as IconCloseBlack } from "assets/icons/iconCloseBlack.svg";
import { ReactComponent as IconPlusBlack } from "assets/icons/iconPlusBlack.svg";
import { ReactComponent as IconRuble } from "assets/icons/IconRubleBlack.svg";
import { ReactComponent as IconDelete } from "assets/icons/iconDeleteRed.svg";
import { ReactComponent as IconDoneWhite } from "assets/icons/iconDoneWhite.svg";
import { ReactComponent as IconDoneGrey } from "assets/icons/iconDoneGrey.svg";

// Styles
import s from "./BankAccount.module.scss";

const BankAccount = () => {
  const { showToast } = useToast();
  const { modalProps, hideModal } = useModal();
  const { companyId, bankAccount = {} } = modalProps;
  const isCreateMode = Object.keys(bankAccount).length === 0;

  const [bik, setBik] = useState("");
  const [bank, setBank] = useState("");
  const [ks, setKs] = useState("");
  const [rs, setRs] = useState("");
  const [isDefault, setIsDefault] = useState(0);
  const [dadata, setDadata] = useState({});

  const [getBankByBik] = useGetBankByBikMutation();
  const [createBankAccount, { isLoading: isCreating }] =
    useCreateBankAccountMutation();
  const [updateBankAccount, { isLoading: isUpdating }] =
    useUpdateBankAccountMutation();
  const [deleteBankAccount, { isLoading: isDeleting }] =
    useDeleteBankAccountMutation();

  const disabledBtn = useMemo(
    () => bik.length !== 9 || !bank || ks.length !== 20 || rs.length !== 20,
    [bik, bank, ks, rs]
  );

  useEffect(() => {
    if (bankAccount.id) {
      setBank(bankAccount.bank || "");
      setBik(bankAccount.bik || "");
      setKs(bankAccount.ks || "");
      setRs(bankAccount.rs || "");
      setIsDefault(bankAccount.is_active || 0);
    }
  }, [bankAccount]);

  useEffect(() => {
    if (bik.length !== 9) return;

    getBankByBik({ bik })
      .unwrap()
      .then(setDadata)
      .catch((error) => console.error("Ошибка получения банка по БИК:", error));
  }, [bik, getBankByBik]);

  const handleFillByBik = () => {
    setBank(dadata.value || "");
    setKs(dadata.data?.correspondent_account || "");
  };

  const getPayload = () => ({
    company_id: companyId,
    bank,
    bik,
    ks,
    rs,
    is_default: isDefault,
  });

  const handleSaveAccount = async () => {
    const mutation = isCreateMode ? createBankAccount : updateBankAccount;
    const params = isCreateMode
      ? { data: getPayload() }
      : { accountId: bankAccount.id, data: getPayload() };

    try {
      const res = await mutation(params).unwrap();
      if (res?.success) hideModal();
      showToast("Изменения сохранены", "success");
    } catch {
      showToast("Произошла ошибка", "error");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteBankAccount({ accountId: bankAccount.id }).unwrap();
      hideModal();
      showToast("Счет удален", "success");
    } catch {
      showToast("Произошла ошибка", "error");
    }
  };

  return (
    <Modal isOpen onClose={hideModal}>
      <div className={s.modal}>
        <div className={s.header}>
          <div className={s.title}>
            {isCreateMode ? <IconPlusBlack /> : <IconRuble />}
            <p>{isCreateMode ? "Добавить счет" : "Банковский счет"}</p>
          </div>
          <div onClick={hideModal} className={s.close}>
            <IconCloseBlack />
          </div>
        </div>

        <div className={s.content}>
          <Field text="БИК">
            <InputBik account={bik} setAccount={setBik} width={300} />
          </Field>

          {Object.keys(dadata).length > 0 && (
            <button onClick={handleFillByBik} className={s.fillBtn}>
              Заполнить по БИК
            </button>
          )}

          <Field text="Банк">
            <InputText width={300} text={bank} setText={setBank} />
          </Field>

          <Field text="Корреспондентский счет">
            <InputBankAccount account={ks} setAccount={setKs} width={300} />
          </Field>

          <Field text="Расчётный счет">
            <InputBankAccount account={rs} setAccount={setRs} width={300} />
          </Field>

          <Switch
            text="Назначить основным"
            switchState={isDefault}
            handleSwitch={() => setIsDefault((prev) => (prev === 0 ? 1 : 0))}
          />

          {!isCreateMode && Boolean(bankAccount?.is_default) && (
            <div className={s.warning}>
              <Label label="Основной счет" color="green" width={120} />
              <Field info="Этот счет используется по умолчанию, его нельзя удалить. Чтобы назначить другой счет в качестве основного, перейди в его карточку." />
            </div>
          )}
        </div>

        <div className={s.btns}>
          <UniButton
            text={isCreateMode ? "Готово" : "Сохранить изменения"}
            onClick={handleSaveAccount}
            isLoading={isCreating || isUpdating}
            icon={
              !isCreateMode
                ? IconDoneWhite
                : disabledBtn
                  ? IconDoneGrey
                  : IconDoneWhite
            }
            width={300}
            disabled={isCreateMode ? disabledBtn : false}
          />

          {!isCreateMode && !bankAccount?.is_active && (
            <UniButton
              text="Удалить"
              onClick={handleDeleteAccount}
              type="danger"
              icon={IconDelete}
              width={300}
              disabled={isDeleting}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default BankAccount;
