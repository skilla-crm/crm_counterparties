// External
import { use, useEffect, useState } from "react";
import "dayjs/locale/ru";
import { Navigate, useNavigate } from "react-router-dom";

// Hooks
import { useModal } from "hooks/useModal";
import useToast from "hooks/useToast";

// Redux
import {
  useDeleteCounterpatyMutation,
  useCheckDeleteCounterpartyQuery,
  useHideCounterpartyMutation,
} from "../../../../redux/services/counterpartyDetailsApiActions";

// Components
import Modal from "components/General/Modal/Modal";
import UniButton from "components/General/UniButton/UniButton";

// Icons
import { ReactComponent as IconCloseBlack } from "assets/icons/iconCloseBlack.svg";
import { ReactComponent as IconCloseBlue } from "assets/icons/iconCloseBlue.svg";
import { ReactComponent as IconDelete } from "assets/icons/iconDeleteWhite.svg";
import { ReactComponent as IconDeleteBlack } from "assets/icons/iconDeleteBlackMedium.svg";
import { ReactComponent as EyeHide } from "assets/icons/EyeHide.svg";

// Styles
import s from "./DeleteCounterparty.module.scss";

import classNames from "classnames";

const DeleteCounterpaty = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { modalProps, hideModal } = useModal();
  const { companyId } = modalProps;
  const [isDelete, setIsDelete] = useState(0);

  const { data: checkDeleteResult, isChecking } =
    useCheckDeleteCounterpartyQuery({ companyId });
  console.log(checkDeleteResult);

  const [deleteCounterpaty, { isLoading: isLoadingDelete }] =
    useDeleteCounterpatyMutation();
  const [hideCounterpaty, { isLoading: isLoadingHide }] =
    useHideCounterpartyMutation();

  useEffect(() => {
    if (!checkDeleteResult) return;
    setIsDelete(checkDeleteResult?.data?.isDeletable === 1);
  }, [checkDeleteResult]);

  const handleDeleteCounterpaty = async () => {
    await deleteCounterpaty({
      companyId,
    })
      .unwrap()
      .then((res) => {
        if (res.success) {
          showToast("Контрагент удален", "success");
          navigate(-1);
          hideModal();
        }
      })
      .catch((e) => {
        showToast("Произошла ошибка", "error");
      });
  };
  const handleHideCounterpaty = async () => {
    await hideCounterpaty({
      companyId,
    })
      .unwrap()
      .then((res) => {
        if (res.success) {
          showToast("Контрагент скрыт", "success");
          navigate(-1);
          hideModal();
        }
      })
      .catch((e) => {
        showToast("Произошла ошибка", "error");
      });
  };

  return (
    <Modal isOpen={true} onClose={hideModal}>
      <div className={s.modal}>
        <div className={s.header}>
          <div className={s.title}>
            <IconDeleteBlack />
            <p>Удаление контрагента</p>
          </div>

          <div onClick={hideModal} className={s.close}>
            <IconCloseBlack />
          </div>
        </div>

        {!isChecking && (
          <div className={s.content}>
            {isDelete ? (
              <span className={s.info}>
                Все данные контрагента будут удалены без возможности
                восстановления.
              </span>
            ) : (
              <span className={s.info}>
                На данного контрагента уже созданы бухгалтерские документы,
                удаление невозможно. <br />
                Вы можете скрыть этого контрагента из списка...
              </span>
            )}
          </div>
        )}

        <div className={classNames(s.btns, !isChecking && s.btns_vis)}>
          <UniButton
            type="outline"
            iconPosition="right"
            text={"Отменить"}
            onClick={hideModal}
            icon={IconCloseBlue}
            width={200}
          />
          <UniButton
            type={"primaryRed"}
            iconPosition="right"
            text={isDelete ? "Безвозвратно удалить" : "Скрыть"}
            onClick={isDelete ? handleDeleteCounterpaty : handleHideCounterpaty}
            isLoading={isDelete ? isLoadingDelete : isLoadingHide}
            icon={isDelete ? IconDelete : EyeHide}
            width={340}
          />
        </div>
      </div>
    </Modal>
  );
};
export default DeleteCounterpaty;
