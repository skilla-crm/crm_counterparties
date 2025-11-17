// External
import { useEffect, useState } from "react";
import "dayjs/locale/ru";

// Hooks
import { useModal } from "hooks/useModal";
import useToast from "hooks/useToast";

// Redux
import {
  useCreateObjectMutation,
  useUpdateObjectMutation,
  useDeleteObjectMutation,
} from "../../../../redux/services/counterpartyDetailsApiActions";

// Components
import Modal from "components/General/Modal/Modal";
import UniButton from "components/General/UniButton/UniButton";
import Field from "components/General/Field/Field";
import InputText from "components/General/InputText/InputText";
import Switch from "components/EmailSender/Switch/Switch";
import Address from "components/General/Address/Address";

// Icons
import { ReactComponent as IconCloseBlack } from "assets/icons/iconCloseBlack.svg";
import { ReactComponent as IconPlusBlack } from "assets/icons/iconPlusBlack.svg";
import { ReactComponent as IconDoneWhite } from "assets/icons/iconDoneWhite.svg";
import { ReactComponent as IconDelete } from "assets/icons/iconDeleteWhite.svg";

// Styles
import s from "./AddObject.module.scss";

const AddObject = () => {
  const { showToast } = useToast();
  const { modalProps, hideModal } = useModal();
  const { companyId, object } = modalProps;
  const isCreateMode = !object;
  const [name, setName] = useState("");
  const [address, setAddress] = useState({});
  const [activity, setActivity] = useState(0);
  const [query, setQuery] = useState("");

  const [createObject, { isLoading: isLoadingCreate }] =
    useCreateObjectMutation();
  const [updateObject, { isLoading: isLoadingUpdate }] =
    useUpdateObjectMutation();
  const [deleteObject, { isLoading: isLoadingDelete }] =
    useDeleteObjectMutation();

  useEffect(() => {
    if (!object) return;
    setName(object.name);
    setAddress({
      city: object.city,
      street: object.street,
      house: object.home,
      lat: object.lat,
      lng: object.lng,
    });
    setQuery(
      `${object.city || ""} ${object.street || ""} ${object.home || ""}`
    );
    setActivity(object.is_default);
  }, [object]);
  const handleCreateObject = async () => {
    const payload = {
      name: name,
      city: address.city,
      street: address.street,
      home: address.house,
      lat: address.lat,
      lng: address.lng,
      is_default: activity,
    };

    try {
      const res = await createObject({
        companyId: companyId,
        data: payload,
      }).unwrap();

      if (res?.success) {
        hideModal();
      }
    } catch {
      showToast("Произошла ошибка", "error");
    }
  };

  const handleUpdateObject = async () => {
    const payload = {
      name: name,
      city: address.city,
      street: address.street,
      home: address.house,
      lat: address.lat,
      lng: address.lng,
      is_default: activity,
    };
    try {
      const res = await updateObject({
        objectId: object.id,
        data: payload,
      }).unwrap();

      if (res?.success) {
        hideModal();
        showToast("Изменения сохранены", "success");
      }
    } catch {
      showToast("Произошла ошибка", "error");
    }
  };

  const handleDeleteObject = async () => {
    try {
      const res = await deleteObject({
        objectId: object.id,
      }).unwrap();

      if (res?.success) {
        hideModal();
        showToast("Объект удален", "success");
      }
    } catch {
      showToast("Произошла ошибка", "error");
    }
  };

  return (
    <Modal isOpen={true} onClose={hideModal}>
      <div className={s.modal}>
        <div className={s.header}>
          <div className={s.title}>
            <IconPlusBlack />
            <p>Добавить объект</p>
          </div>

          <div onClick={hideModal} className={s.close}>
            <IconCloseBlack />
          </div>
        </div>

        <div className={s.content}>
          <Field text="Название">
            <InputText
              width={450}
              text={name}
              setText={(v) => setName(v)}
              placeholder={"Склад, магазин..."}
            />
          </Field>
          <Field text="Адрес" containerWidth={450}>
            <Address
              defaultCordinate={
                address.lat && address.lng ? [address.lat, address.lng] : [0, 0]
              }
              address={address}
              setAddress={setAddress}
              query={query}
              setQuery={setQuery}
              width={450}
            />
          </Field>

          <Switch
            text="Назначить основным"
            switchState={activity}
            handleSwitch={() => setActivity(!activity)}
          />
        </div>
        <div className={s.btns}>
          {!isCreateMode && (
            <UniButton
              iconPosition="right"
              text={"Сохранить"}
              onClick={handleUpdateObject}
              isLoading={isLoadingUpdate}
              icon={IconDoneWhite}
              width={268}
            />
          )}
          {isCreateMode && (
            <UniButton
              iconPosition="right"
              text={"Добавить объект"}
              onClick={handleCreateObject}
              isLoading={isLoadingCreate}
              icon={IconDoneWhite}
              width={450}
            />
          )}
          {!isCreateMode && (
            <UniButton
              type="primaryRed"
              iconPosition="right"
              text={"Удалить объект"}
              onClick={handleDeleteObject}
              isLoading={isLoadingDelete}
              icon={IconDelete}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};
export default AddObject;
