// Components
import UniButton from "components/General/UniButton/UniButton";

// Icons
import { ReactComponent as IconDoneWhite } from "assets/icons/iconDoneWhite.svg";

// Styles
import s from "./CounterpartyHeader.module.scss";

const CounterpartyHeader = ({ handler, isLoading, buttonText, isEditMode }) => {
  return (
    <div className={s.header}>
      <h2>{!isEditMode ? "Реквизиты контрагента" : "Новый контрагент"}</h2>

      <div className={s.headerButtons}>
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

export default CounterpartyHeader;
