// External
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

// Redux
import { useUpdateOtherMutation, useUpdatePriceListMutation } from "../../../../redux/services/counterpartyDetailsApiActions";
import { useSelector, useDispatch } from "react-redux";
import { resetHasUnsavedChanges } from "../../../../redux/slices/detailChangesSlice";

// Hooks
import { useModal } from "hooks/useModal";
import useToast from "hooks/useToast";

// Components
import UniButton from "components/General/UniButton/UniButton";

// Icons
import { ReactComponent as IconDelete } from "assets/icons/iconDeleteRed.svg";
import { ReactComponent as IconEdit } from "assets/icons/iconEditWhite.svg";
import { ReactComponent as IconPlus } from "assets/icons/iconPlus.svg";
import { ReactComponent as IconDone } from "assets/icons/iconDoneWhite.svg";

//utils
import { handlePreparePriceData } from "utils/handlePreparePriceData";

// Styles
import s from "./Header.module.scss";

const Header = ({
  isChecked,
  tab = "general",
  counterparty,
  settings,
  counterpartyId,
}) => {
  const navigate = useNavigate();
  const { showModal } = useModal();
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const { draftDebt, draftMinSum, draftActivity } = useSelector((state) => state.otherData);
  const { priceRates, rateChanged } = useSelector((state) => state.rates);

  const [updateOther, { isLoading }] = useUpdateOtherMutation();
  const [updatePriceList, { isLoading: isLoadingPrice }] = useUpdatePriceListMutation();

  //GENERAL HANDLERS
  const handleOpenDeleteCounterparty = () => {
    showModal("DELETE_COUNTERPARTY", { companyId: counterpartyId });
  };

  //DETAILS HANDLERS
  const handleEditDetails = () => {
    navigate(`/create/${counterpartyId}`, { state: { counterpartyId } });
  };

  //CONTRACTS HANDLERS
  const handleCreateContract = () => {
    navigate(`/details/contract/create`, {
      state: { counterparty, settings },
    });
  };

  //BANK HANDLERS
  const handleOpenAccount = () => {
    showModal("BANK_ACCOUNT", { companyId: counterpartyId });
  };

  //CONTACTS HANDLERS
  const handleOpenConact = () => {
    showModal("CONTACT", { companyId: counterpartyId });
  };

  //OBJECTS HANDLERS
  const handleOpenAddObject = () => {
    showModal("ADD_OBJECT", { companyId: counterpartyId });
  };

  // //OTHER HANDLERS
  const handleUpdateOther = async () => {
    try {
      const res = await updateOther({
        companyId: counterpartyId,
        data: {
          only_repayment: draftActivity === true ? 1 : 0,
          debt_threshold: draftDebt,
          min_acc_sum: draftMinSum,
        },
      }).unwrap();

      if (res?.success) {
        dispatch(resetHasUnsavedChanges());
        showToast("Изменения сохранены", "success");
      }
    } catch {
      showToast("Произошла ошибка", "error");
    }
  };

  //PRICE HANDLER
  const handleUpdatePrice = () => {
    const data = handlePreparePriceData(priceRates)
    console.log(data)
    updatePriceList({ companyId: counterpartyId, data })
  }

  const renderBtns = (tab) => {
    switch (tab) {
      case "general":
        return (
          <div className={classNames(s.headerBtns)}>
            <UniButton
              text="Удалить"
              type="danger"
              icon={IconDelete}
              onClick={handleOpenDeleteCounterparty}
            />
          </div>
        );
      case "details":
        return (
          <div className={classNames(s.headerBtns)}>
            <UniButton
              text="Редактировать"
              icon={IconEdit}
              onClick={handleEditDetails}
            />
          </div>
        );
      case "contracts":
        return (
          <div className={classNames(s.headerBtns)}>
            <UniButton
              text="Добавить договор"
              icon={IconPlus}
              onClick={handleCreateContract}
            />
          </div>
        );
      case "contacts":
        return (
          <div className={classNames(s.headerBtns)}>
            <UniButton
              text="Добавить представителя"
              icon={IconPlus}
              onClick={handleOpenConact}
            />
          </div>
        );
      case "objects":
        return (
          <div className={classNames(s.headerBtns)}>
            <UniButton
              text="Добавить объект"
              icon={IconPlus}
              onClick={handleOpenAddObject}
            />
          </div>
        );
      case "bank":
        return (
          <div className={classNames(s.headerBtns)}>
            <UniButton
              text="Добавить счет"
              icon={IconPlus}
              onClick={handleOpenAccount}
            />
          </div>
        );
      case "other":
        return (
          <div className={classNames(s.headerBtns)}>
            <UniButton
              text="Сохранить изменения"
              icon={IconDone}
              onClick={handleUpdateOther}
            />
          </div>
        );

      case "price":
        return (
          <div className={classNames(s.headerBtns)}>
            <UniButton
              hidden={!rateChanged}
              text="Сохранить изменения"
              icon={IconDone}
              onClick={handleUpdatePrice}
            />
          </div>
        );



      default:
        return <div className={classNames(s.headerBtns)}></div>;
    }
  };
  return (
    <div className={classNames(s.header)}>
      <h2 style={{ fontSize: "22px" }}>
        {isChecked ? "Контрагент" : "Непроверенный контрагент"}
      </h2>

      {renderBtns(tab)}
    </div>
  );
};
export default Header;
