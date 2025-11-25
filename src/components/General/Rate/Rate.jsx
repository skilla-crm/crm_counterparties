import s from "./Rate.module.scss";
import { useDispatch } from "react-redux";
//icons
import { ReactComponent as IconCloseRed } from "assets/icons/iconCloseRed.svg";
//slice
/* import { deleteBaseRate, deletePriceRate } from "../../../redux/rates/slice"; */

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

const Rate = ({ id, data, type, setValue, number }) => {
  const dispatch = useDispatch();

  /* const handleDeleteRate = (e) => {
    const id = Number(e.currentTarget.id);
    type === "base" && dispatch(deleteBaseRate(id));
    type === "price" && dispatch(deletePriceRate(id));
  }; */

  return (
    <div id={id} className={s.root}>
      <span className={s.number}>{number}.</span>
      <InputText
        text={data.name}
        setText={(value) => setValue({ key: "name", value })}
      />

      {type === "base" && (
        <InputText
          width={300}
          text={data.label}
          setText={(value) => setValue({ key: "label", value })}
        />
      )}

      <InputText
        width={100}
        text={data.unit}
        setText={(value) => setValue({ key: "unit", value })}
      />

      {type === "base" && (
        <InputNum
          width={60}
          maxLength={3}
          num={data.okei}
          setNum={(value) => setValue({ key: "okei", value })}
        />
      )}

      {type === "price" && (
        <InputNum
          width={120}
          maxLength={3}
          num={data.min_time}
          setNum={(value) => setValue({ key: "min_time", value })}
        />
      )}

      <InputFinancial
        width={120}
        amount={data.client_bit}
        setAmount={(value) => setValue({ key: "client_bit", value })}
      />

      <InputFinancial
        width={120}
        amount={data.worker_bit}
        setAmount={(value) => setValue({ key: "worker_bit", value })}
      />
      <button /* onClick={handleDeleteRate} */ id={id} className={s.button}>
        <IconCloseRed />
      </button>
    </div>
  );
};

export default Rate;
