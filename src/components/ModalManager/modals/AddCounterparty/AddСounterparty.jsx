import "dayjs/locale/ru";

// Redux
import { useDispatch } from "react-redux";
import {
  useAddСounterpartyByIdMutation,
  useCheckCounterpartyMutation,
} from "../../../../redux/services/counterpartiesApiActions";

// Hooks
import { useModal } from "hooks/useModal";
import useToast from "hooks/useToast";

// Components
import Modal from "components/General/Modal/Modal";
import UniButton from "components/General/UniButton/UniButton";

// Icons
import { ReactComponent as IconCloseBlack } from "assets/icons/iconCloseBlack.svg";
import { ReactComponent as IconPlus } from "assets/icons/iconPlusBlack.svg";
import { ReactComponent as IconDoneGrey } from "assets/icons/iconDoneGrey.svg";
import { ReactComponent as IconDoneWhite } from "assets/icons/iconDoneWhite.svg";
import { ReactComponent as IconBackForward } from "assets/icons/iconBackForward.svg";

// Styles
import s from "./AddCounterparty.module.scss";
import Switch from "components/EmailSender/Switch/Switch";
import { use, useEffect, useMemo, useState } from "react";
import InputCounterparty from "./components/InputCounterparty/InputCounterparty";
import Field from "components/General/Field/Field";
import { useNavigate } from "react-router-dom";
import { check } from "prettier";
import { set } from "lodash";

const AddCounterparty = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { modalProps, hideModal } = useModal();
  const { id } = modalProps;

  const [withInn, setWithInn] = useState(false);
  const [dadataState, setDadataState] = useState({});
  const [inputCounterparty, setInputCounterparty] = useState("");
  const [checkResult, setCheckResult] = useState(null);

  const [isNotFound, setIsNotFound] = useState(false);
  const [isAlreadyAdded, setIsAlreadyAdded] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false);

  const [checkCounterparty, { isLoading: isLoadingCheck }] =
    useCheckCounterpartyMutation();
  const [addCounterpartyById, { isLoading: isLoadingAdd }] =
    useAddСounterpartyByIdMutation({ id });

  useEffect(() => {
    const validInn =
      inputCounterparty.length === 10 || inputCounterparty.length === 12;
    setDisabledBtn(!withInn && (!validInn || !checkResult));
  }, [inputCounterparty, withInn, checkResult]);
  useEffect(() => {
    if (withInn) {
      setCheckResult(null);
      setInputCounterparty("");
    }
  }, [withInn]);
  useEffect(() => {
    if (!checkResult) {
      setIsNotFound(false);
      setIsAlreadyAdded(false);
      return;
    }

    setIsNotFound(checkResult?.message === "Не найден в реестре");
    setIsAlreadyAdded(checkResult?.message === "Уже есть в твоей базе");
  }, [checkResult]);

  useEffect(() => {
    const validInn =
      inputCounterparty.length === 10 || inputCounterparty.length === 12;
    if (withInn) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(!validInn || !checkResult);
    }
  }, [inputCounterparty, withInn, checkResult]);

  const handleConfirm = async () => {
    try {
      const res = await addCounterpartyById(checkResult?.data?.id).unwrap();
      if (res.data.success) hideModal();
    } catch {
      showToast("Произошла ошибка", "error");
    }
  };

  const handleOpenCreateCounterparty = () => {
    hideModal();
    navigate("/create", { state: dadataState });
  };

  const handleOpenDetailsCounterparty = () => {
    hideModal();
    navigate(`/details/${checkResult?.data?.id}`);
  };

  const buttonText = useMemo(() => {
    if (withInn || isNotFound) return "Заполнить карточку вручную";
    if (isAlreadyAdded) return "Перейти в карточку контрагента";
    return "Подтвердить";
  }, [withInn, isAlreadyAdded, isNotFound]);

  const btnIcon = useMemo(() => {
    if (withInn || isNotFound) return IconBackForward;
    if (isAlreadyAdded) return IconDoneWhite;
    return IconDoneGrey;
  }, [withInn, isAlreadyAdded, isNotFound]);

  const handleButtonClick = useMemo(() => {
    if (withInn || isNotFound) return handleOpenCreateCounterparty;
    if (isAlreadyAdded) return handleOpenDetailsCounterparty;
    return handleConfirm;
  }, [withInn, isAlreadyAdded, isNotFound, checkResult]);

  return (
    <Modal isOpen={true} onClose={hideModal}>
      <div className={s.modal}>
        <div className={s.header}>
          <div className={s.title}>
            <IconPlus />
            <p>Добавить контрагента</p>
          </div>
          <div onClick={hideModal} className={s.close}>
            <IconCloseBlack />
          </div>
        </div>

        <Field text="Контрагент">
          <InputCounterparty
            width={200}
            value={inputCounterparty}
            setValue={setInputCounterparty}
            setField={setDadataState}
            disabled={withInn && !inputCounterparty}
            form={dadataState}
            checker={checkCounterparty}
            setCheckResult={setCheckResult}
            withInn={withInn}
          />
        </Field>

        <div className={s.content}>
          <Switch
            text="Без ИНН"
            switchState={withInn}
            handleSwitch={() => {
              setInputCounterparty("");
              setWithInn((prev) => !prev);
            }}
          />
        </div>

        <div className={s.btns}>
          <UniButton
            text={buttonText}
            iconPosition="right"
            onClick={handleButtonClick}
            type="primary"
            isLoading={isLoadingAdd}
            width={332}
            disabled={disabledBtn}
            icon={btnIcon}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddCounterparty;
