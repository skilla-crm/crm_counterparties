// External
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

// Hooks
import { useModal } from "hooks/useModal";

// Components
import UniButton from "components/General/UniButton/UniButton";

// Icons
import { ReactComponent as IconDelete } from "assets/icons/iconDeleteRed.svg";
import { ReactComponent as IconEdit } from "assets/icons/iconEditWhite.svg";
import { ReactComponent as IconPlus } from "assets/icons/iconPlus.svg";

// Styles
import s from "./Header.module.scss";

const Header = ({ isChecked, tab = "general", counterpartyId }) => {
  const navigate = useNavigate();
  const { showModal } = useModal();

  //GENERAL HANDLERS

  const handleOpenDeleteCounterparty = () => {
    showModal("DELETE_COUNTERPARTY", { companyId: counterpartyId });
  };

  //DETAILS HANDLERS
  const handleEditDetails = () => {
    navigate(`/create/${counterpartyId}`);
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

      default:
        return <div className={classNames(s.headerBtns)}></div>;
    }
  };
  return (
    <div className={classNames(s.header)}>
      <h1>{isChecked ? "Контрагент" : "Не проверенный контрагент"}</h1>

      {renderBtns(tab)}
    </div>
  );
};
export default Header;
