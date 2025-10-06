import s from "./MainInfoBlock.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { ReactComponent as IconWarning } from "../../assets/icons/iconWarning.svg";
//components
import DropDown from "../Genegal/DropDown/DropDown";
import Customer from "../Customer/Customer";
import Detail from "../Detail/Detail";
import Contact from "../Contact/Contact";
import InputData from "../InputData/InputData";
import InputBillNumber from "../InputBillNumber/InputBillNumber";

//slice
import {
  setCustomer,
  setDetail,
  setNumberBill,
  setDate,
  setDateStart,
  setDateEnd
} from "../../redux/mainInfo/slice";
import {
  setCustomerValidation,
  setNumberValidation,
  setDateRangeValidation
} from "../../redux/validation/slice";
import classNames from "classnames";

const MainInfoBlock = ({ parameters, disabled }) => {
  const role = document
    .getElementById("root_reconciliation")
    ?.getAttribute("role");
  const dispatch = useDispatch();
  const {
    customer,
    detail,
    numberBill,
    numberBillFirst,
    date,
    draft,
    dateContract,
    dateStart,
    dateEnd

  } = useSelector((state) => state.mainInfo);
  const {
    customerValidation,
    dateRangeValidation,
    numberValidation,
  } = useSelector((state) => state.validation);
  const [detailsList, setDetailsList] = useState([]);




  useEffect(() => {
    if (customer?.partnership_id) {
      const result = parameters?.partnerships_details?.filter(
        (el) => el.partnership_id === customer.partnership_id
      );
      setDetailsList(result);
    } else {
      setDetailsList(parameters?.partnerships_details);
    }
  }, [customer, parameters]);

  useEffect(() => {
    if (
      detail?.partnership_id &&
      customer?.partnership_id &&
      detail?.partnership_id !== customer?.partnership_id
    ) {
      dispatch(setDetail({}));
    }
  }, [customer, detail]);

  const handleResetErrorCustomer = () => {
    dispatch(setCustomerValidation(true));
  };



  const handleResetErrorNumber = () => {
    dispatch(setNumberValidation(true));
  };



  console.log(customer?.partnership_name);

  return (
    <div className={s.root}>
      <h3>Основная информация</h3>
      <div>
        {" "}
        <DropDown
          z={5}
          type={"customer"}
          sub={"Заказчик"}
          list={parameters?.companies}
          ListItem={Customer}
          activeItem={customer}
          setActiveItem={(data) => {
            dispatch(setCustomer(data));
            dispatch(
              setDetail(
                parameters?.partnerships_details?.find(
                  (el) => el.partnership_id === data?.partnership_id
                )
              )
            );
          }}
          disabled={disabled || draft === 1}
          error={!customerValidation}
          errorText={"Заказчик не определен"}
          resetError={handleResetErrorCustomer}
          overlay={true}
        />
        <div className={s.subs}>
          {customer?.partnership_name && <span>Договор с {customer?.partnership_name}</span>}

        </div>
      </div>




      <div className={s.contract}>
        <div className={s.range}>
          <InputData
            sub={"Период от"}
            nosub={true}
            setDate={(data) => {
              dispatch(setDateStart(data))
               dispatch(setDateRangeValidation(true))
            }}
            date={dateStart ? dateStart : null}
            disabled={disabled}
          />
          <InputData
            sub={"до"}
            nosub={true}
            setDate={(data) => {
              dispatch(setDateRangeValidation(true))
              dispatch(setDateEnd(data))
            }}
            date={dateEnd ? dateEnd : null}
            disabled={disabled}
          />
        </div>


        <span className={classNames(s.error, !dateRangeValidation && s.error_vis)}>
          <IconWarning /> Укажи за какой период создать акт сверки
        </span>
      </div>

      <div className={s.block}>
        <InputBillNumber
          sub={"Номер акта"}
          setNumber={(data) => dispatch(setNumberBill(data))}
          number={numberBill}
          numberFirst={numberBillFirst}
          errorEmpity={!numberValidation}
          errorText={"Введи номер"}
          resetError={handleResetErrorNumber}
          disabled={disabled}
          parameters={parameters}
          detail={detail}
        />
        <InputData
          sub={"Дата акта"}
          nosub={true}
          setDate={(data) => dispatch(setDate(data))}
          date={date}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default MainInfoBlock;
