import s from "./MainInfoBlock.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
//components
import DropDown from "../Genegal/DropDown/DropDown";
import Customer from "../Customer/Customer";
import Detail from "../Detail/Detail";
import Contact from "../Contact/Contact";
import InputData from "../InputData/InputData";
import InputBillNumber from "../InputBillNumber/InputBillNumber";
import InputText from "../Genegal/InputText/InputText";
import ContractInput from "../ContractInput/ContractInput";
import DropDownNds from "../DropDownNds/DropDownNds";
//slice
import {
  setCustomer,
  setDetail,
  setNumberBill,
  setDate,
  setSignatory,
  setContract,
  setDateContract,
  setNumContract,
  setNds,
} from "../../redux/mainInfo/slice";
import {
  setCustomerValidation,
  setDetailValidation,
  setNumberValidation,
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
    orders,
    signatory,
    draft,
    contract,
    numContract,
    dateContract,
    nds,
  } = useSelector((state) => state.mainInfo);
  const {
    customerValidation,
    detailValidation,
    signatoryValidation,
    numberValidation,
  } = useSelector((state) => state.validation);
  const [detailsList, setDetailsList] = useState([]);
  const [signatureList, setSignatureList] = useState([]);

  useEffect(() => {
    if (customer.id) {
      customer?.gendir?.replace(/\s+/g, "") === ""
        ? setSignatureList([
            /* ...customer?.contacts?.filter(el => el.name !== ''), */ {
              id: "no",
              name: "Без подписанта",
            },
          ])
        : setSignatureList([
            {
              id: "dir",
              name: customer?.gendir,
            } /* , ...customer?.contacts?.filter(el => el.name !== '') */,
            { id: "no", name: "Без подписанта" },
          ]);
      return;
    }
  }, [customer]);

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

  const handleResetErrorDetail = () => {
    dispatch(setDetailValidation(true));
  };

  const handleResetErrorNumber = () => {
    dispatch(setNumberValidation(true));
  };

  const handleOpenOrder = (e) => {
    const orderId = e.currentTarget.id;
    role === "director" &&
      window.open(
        `https://lk.skilla.ru/new/orders/order_detail/${orderId}`,
        "_blank"
      );
  };

  console.log(signatory);

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
            dispatch(setContract("Договор"));
            dispatch(setNumContract(`${data?.contract_n}`));
            dispatch(
              setDateContract(dayjs(data?.contract_date).format("YYYY-MM-DD"))
            );
            dispatch(
              setSignatory(
                data?.gendir && data?.gendir?.replace(/\s+/g, "") !== ""
                  ? { id: "dir", name: data?.gendir }
                  : { id: "no", name: "Без подписанта" }
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
          <span>ИНН {customer?.inn}</span>
          <span>КПП {customer?.kpp}</span>
        </div>
      </div>

      {/* <DropDown
        z={4}
        type={"detail"}
        sub={"Компания"}
        list={detailsList}
        ListItem={Detail}
        activeItem={detail}
        setActiveItem={(data) => {
          dispatch(setDetail(data));
          if (detail?.partnership_id !== data?.partnership_id) {
            dispatch(setNumberBill(data?.upd_num));
          }
        }}
        disabled={disabled}
        error={!detailValidation}
        errorText={"Реквизиты не выбраны"}
        resetError={handleResetErrorDetail}
        overlay={true}
      />

      <DropDown
        z={3}
        type={"signatory"}
        sub={"Подписант плательщика"}
        list={signatureList}
        ListItem={Contact}
        activeItem={signatory}
        setActiveItem={(data) => dispatch(setSignatory(data))}
        disabled={disabled}
        noActive={signatureList?.length === 0}
        error={false}
        errorText={"Выбери подписанта"}
        overlay={true}
      /> */}
      <div className={s.contract}>
        {/* <ContractInput
          text={contract}
          disabled={disabled}
          setText={(value) => dispatch(setContract(value))}
        /> */}

        {/* <div className={s.number}>
          <span>Номер акта</span>
          <InputText
            text={numContract}
            disabled={disabled}
            setText={(value) => dispatch(setNumContract(value))}
          />
        </div> */}

        <InputData
          sub={"Период от"}
          nosub={true}
          setDate={(data) => dispatch(setDateContract(data))}
          date={dateContract ? dayjs(dateContract) : null}
          disabled={disabled}
        />
        <InputData
          sub={"до"}
          nosub={true}
          setDate={(data) => dispatch(setDateContract(data))}
          date={dateContract ? dayjs(dateContract) : null}
          disabled={disabled}
        />
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

      {/* <DropDownNds
        value={nds}
        setValue={(value) => dispatch(setNds(value))}
        disabled={disabled}
      /> */}

      {/* {orders.length > 0 && (
        <div
          className={classNames(
            s.orders,
            role === "accountant" && s.orders_dis
          )}
        >
          <p>Связанные заказы</p>
          <ul>
            {orders?.map((el, i) => {
              return (
                <li onClick={handleOpenOrder} key={el.id} id={el.id}>
                  <p>
                    {dayjs(el.date).format("DD.MM.YYYY")}
                    {orders[i + 1] ? ", " : ""}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default MainInfoBlock;
