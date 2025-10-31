// External
import { useEffect, useState } from "react";
import "dayjs/locale/ru";

// Redux
import { useUpdateOtherMutation } from "../../../../redux/services/counterpartyDetailsApiActions";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../../../redux/slices/detailTabSlice";
import { resetHasUnsavedChanges } from "../../../../redux/slices/detailChangesSlice";
import { resetDrafts } from "../../../../redux/slices/otherDataSlice";

// Hooks
import { useModal } from "hooks/useModal";
import useToast from "hooks/useToast";

// Components
import Modal from "components/General/Modal/Modal";
import UniButton from "components/General/UniButton/UniButton";

// Icons
import { ReactComponent as IconCloseBlack } from "assets/icons/iconCloseBlack.svg";
import { ReactComponent as IconCloseBlue } from "assets/icons/iconCloseBlue.svg";
import { ReactComponent as IconWarning } from "assets/icons/iconWarning.svg";
import { ReactComponent as IconDoneWhite } from "assets/icons/iconDoneWhite.svg";

// Styles
import s from "./UnsavedChanges.module.scss";

const UnsavedChanges = () => {
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const { modalProps, hideModal } = useModal();
  const { nextTab, currentTab, companyId } = modalProps;
  const { draftDebt, draftMinSum, draftActivity } = useSelector(
    (state) => state.otherData
  );
  const [updateOther, { isLoading }] = useUpdateOtherMutation();

  const handleUpdateOther = async () => {
    try {
      const res = await updateOther({
        companyId: companyId,
        data: {
          only_repayment: draftActivity === true ? 1 : 0,
          debt_threshold: draftDebt,
          min_acc_sum: draftMinSum,
        },
      }).unwrap();

      if (res?.success) {
        dispatch(resetHasUnsavedChanges());
        dispatch(setActiveTab(nextTab));
        hideModal();
        showToast("Изменения сохранены", "success");
      }
    } catch {
      showToast("Произошла ошибка", "error");
    }
  };

  const handleNotSave = () => {
    dispatch(resetDrafts());
    dispatch(resetHasUnsavedChanges());
    dispatch(setActiveTab(nextTab));
    hideModal();
  };

  return (
    <Modal isOpen={true} onClose={hideModal}>
      <div className={s.modal}>
        <div className={s.header}>
          <div className={s.title}>
            <IconWarning />
            <p>Несохраненные изменения</p>
          </div>

          <div onClick={hideModal} className={s.close}>
            <IconCloseBlack />
          </div>
        </div>

        <div className={s.content}>
          <span className={s.textAreaTitle}>
            {`В разделе "${currentTab}" есть несохраненные изменения.`}
          </span>
        </div>
        <div className={s.btns}>
          <UniButton
            text={"Не сохранять"}
            onClick={handleNotSave}
            icon={IconCloseBlue}
            width={200}
            type="outline"
          />
          <UniButton
            text={"Сохранить"}
            onClick={handleUpdateOther}
            isLoading={isLoading}
            icon={IconDoneWhite}
            width={240}
          />
        </div>
      </div>
    </Modal>
  );
};
export default UnsavedChanges;
