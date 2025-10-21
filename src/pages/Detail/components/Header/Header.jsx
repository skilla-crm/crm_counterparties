import UniButton from "components/General/UniButton/UniButton";
import { ReactComponent as IconDelete } from "assets/icons/iconDeleteRed.svg";
import { ReactComponent as IconEdit } from "assets/icons/iconEditWhite.svg";
import s from "./Header.module.scss";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
const Header = ({ isChecked, tab = "general" }) => {
  const companyId = 3441;
  const navigate = useNavigate();
  const handleEditDetails = () => {
    navigate(`/create/${companyId}`);
  };
  const renderBtns = (tab) => {
    switch (tab) {
      case "general":
        return (
          <div className={classNames(s.headerBtns)}>
            <UniButton text="Удалить" type="danger" icon={IconDelete} />
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
