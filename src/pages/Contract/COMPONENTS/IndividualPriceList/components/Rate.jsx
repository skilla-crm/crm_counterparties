import s from "./Rate.module.scss";
import { useDispatch } from "react-redux";
//icons
import { ReactComponent as IconCloseRed } from "assets/icons/iconCloseRed.svg";
//slice
import { deletePriceRate } from "../../../../../redux/ratesContract/slice";

//components
import InputText from "components/General/InputText/InputText";
import InputNum from "components/General/InputNum/InputNum";
import InputFinancial from "components/General/InputFinancial/InputFinancial";

const empityBaseRate = {
  id: null,
  name: "",
  label: "",
  unit: "Ед",
  okei: "",
  client_bit: "",
  worker_bit: "",
};

const Rate = ({ id, data, type, setValue, number, disabled }) => {
  const dispatch = useDispatch();

  const handleDeleteRate = (e) => {
    const id = e.currentTarget.id;
    dispatch(deletePriceRate(id));
  };

  return (
    <div id={id} className={s.root}>
      <span className={s.number}>{number}.</span>
      <InputText
        text={data.name}
        setText={(value) => setValue({ key: "name", value })}
        disabled={disabled}
      />

      <InputText
        width={100}
        text={data.unit}
        setText={(value) => setValue({ key: "unit", value })}
        disabled={disabled}
      />

      <InputNum
        width={120}
        maxLength={3}
        num={data.min_time}
        setNum={(value) => setValue({ key: "min_time", value })}
        disabled={disabled}
      />

      <InputFinancial
        width={120}
        amount={data.client_bit}
        setAmount={(value) => setValue({ key: "client_bit", value })}
        disabled={disabled}
      />

      <InputFinancial
        width={120}
        amount={data.worker_bit}
        setAmount={(value) => setValue({ key: "worker_bit", value })}
        disabled={disabled}
      />

      <button
        onClick={handleDeleteRate}
        id={id}
        className={s.button}
        style={{
          visibility: disabled ? "hidden" : "visible",
          pointerEvents: disabled ? "none" : "auto",
        }}
      >
        <IconCloseRed />
      </button>
    </div>
  );
};

export default Rate;
