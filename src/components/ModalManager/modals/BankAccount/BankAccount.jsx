// External
import { useEffect, useState } from "react";
import "dayjs/locale/ru";
import dayjs from "dayjs";

// Redux
import {
  useCreateContactMutation,
  useUpdateContactMutation,
} from "../../../../redux/services/counterpartyDetailsApiActions";

// Hooks
import { useModal } from "hooks/useModal";
import useToast from "hooks/useToast";

// Components
import Modal from "components/General/Modal/Modal";
import UniButton from "components/General/UniButton/UniButton";
import Field from "components/General/Field/Field";
import InputText from "components/General/InputText/InputText";
import InputEmail from "components/General/InputEmail/InputEmail";
import InputPhone from "components/General/InputPhone/InputPhone";
import Switch from "components/EmailSender/Switch/Switch";

// Icons
import { ReactComponent as IconCloseBlack } from "assets/icons/iconCloseBlack.svg";
import { ReactComponent as IconPlusBlack } from "assets/icons/iconPlusBlack.svg";
import { ReactComponent as IconAccount } from "assets/icons/iconAccountCard.svg";
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

  const [activity, setActivity] = useState(0);

  const disabledBtn = !bik || !bank || ks.length !== 20 || rs.length !== 20;

  const [createContact, { isLoading: isCreating }] = useCreateContactMutation();

  const [updateContact, { isLoading: isUpdating }] = useUpdateContactMutation();

  useEffect(() => {
    if (!bankAccount.id) return;

    setBank(bankAccount.bank);
    setBik(bankAccount.bik);
    setKs(bankAccount.ks);
    setRs(bankAccount.rs);
    setActivity(bankAccount.is_active);
  }, [bankAccount]);

  //   const handleCreateContact = async () => {
  //     const payload = {
  //       name,
  //       surname,
  //       patronymic,
  //       position,
  //       phone,
  //       dob,
  //       e_mail: email,
  //       is_active: activity,
  //     };

  //     try {
  //       const res = await createContact({
  //         companyId: companyId,
  //         data: payload,
  //       }).unwrap();

  //       if (res?.success) {
  //         hideModal();
  //       }
  //     } catch {
  //       showToast("Произошла ошибка", "error");
  //     }
  //   };

  //   const handleUpdateContact = async () => {
  //     if (!phoneValidateError) {
  //       showToast("Неверно введен номер телефона", "error");
  //       return;
  //     }
  //     // if (!emailValidateError) {
  //     //     showToast('Неверно введен email', 'error');
  //     //     return;
  //     // }
  //     const payload = {
  //       name,
  //       surname,
  //       patronymic,
  //       position,
  //       phone,
  //       dob,
  //       e_mail: email || null,
  //       is_active: activity,
  //     };

  //     try {
  //       const res = await updateContact({
  //         companyId: companyId,
  //         contactId: contact.id,
  //         data: payload,
  //       }).unwrap();

  //       if (res?.success) {
  //         hideModal();
  //       }
  //     } catch {
  //       showToast("Произошла ошибка", "error");
  //     }
  //   };

  return (
    <Modal isOpen={true} onClose={hideModal}>
      <div className={s.modal}>
        <div className={s.header}>
          {isCreateMode ? (
            <div className={s.title}>
              <IconPlusBlack />
              <p>Новый представитель</p>
            </div>
          ) : (
            <div className={s.title}>
              <IconAccount />
              <p>Представитель</p>
            </div>
          )}

          <div onClick={hideModal} className={s.close}>
            <IconCloseBlack />
          </div>
        </div>

        {/* <div className={s.content}>
          <Field text="Фамилия">
            <InputText
              width={452}
              text={surname}
              setText={(v) => setSurname(v)}
            />
          </Field>
          <Field text="Имя">
            <InputText width={452} text={name} setText={(v) => setName(v)} />
          </Field>
          <Field text="Отчество">
            <InputText
              width={452}
              text={patronymic}
              setText={(v) => setPatronymic(v)}
            />
          </Field>

          <Field text="Должность">
            <InputText
              width={452}
              text={position}
              setText={(v) => setPosition(v)}
            />
          </Field>

          <div className={s.fields}>
            <Field text="Моб. телефон">
              <InputPhone
                required={true}
                phone={phone}
                setPhone={(v) => {
                  setPhone(v);
                }}
                width={282}
                setValidate={(v) => {
                  setPhoneValidateError(v);
                }}
              />
            </Field>
            <Field text="Добавочный">
              <InputText width={150} text={dob} setText={(v) => setDob(v)} />
            </Field>
          </div> */}
        {/* <Field text="Эл. почта">
            <InputEmail
              width={452}
              email={email}
              required={false}
              setEmail={(v) => {
                setEmail(v);
              }}
              setValidate={(v) => {
                setEmailValidateError(v);
              }}
            />
          </Field>
          <Switch
            text="Активный"
            switchState={activity}
            handleSwitch={() => setActivity(!activity)}
          /> */}
        {/* 
          {!isCreateMode && (
            <span
              className={s.date}
            >{`Добавлен ${dayjs(contact.created_at).format("DD.MM.YYYY")}`}</span>
          )}
        </div> */}
        {/* <div className={s.btns}>
          <UniButton
            text={isCreateMode ? "Готово" : "Сохранить изменения"}
            onClick={isCreateMode ? handleCreateContact : handleUpdateContact}
            isLoading={isCreating || isUpdating}
            icon={
              !isCreateMode
                ? IconDoneWhite
                : disabledBtn
                  ? IconDoneGrey
                  : IconDoneWhite
            }
            width={452}
            disabled={isCreateMode ? disabledBtn : false}
          />
        </div> */}
      </div>
    </Modal>
  );
};
export default BankAccount;
