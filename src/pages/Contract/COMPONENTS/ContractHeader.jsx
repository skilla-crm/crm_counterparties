// Components
import UniButton from "components/General/UniButton/UniButton";

// Icons
import { ReactComponent as IconDoneWhite } from "assets/icons/iconDoneWhite.svg";
import { ReactComponent as IconDelete } from "assets/icons/iconDeleteRed.svg";
// Styles
import s from "./ContractHeader.module.scss";

const ContractHeader = ({
  handler,
  isLoading,
  buttonText,
  isEditMode,
  contract = {},
}) => {
  return (
    <div className={s.header}>
      <h2>{!isEditMode ? "Реквизиты контрагента" : "Новый контрагент"}</h2>

      <div className={s.headerButtons}>
        <UniButton type="danger" icon={IconDelete} width={40} />
        <UniButton
          text={buttonText}
          icon={IconDoneWhite}
          width={200}
          onClick={handler}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default ContractHeader;
