import s from "./Act.module.scss";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { useDispatch, useSelector } from "react-redux";
import iconPreview from "../../assets/icons/iconPreview.png";
import { ReactComponent as BadgePro } from "../../assets/icons/badgePro.svg";
import historyblur from "../../assets/images/historyblur.png";
//Api
import { useGetParametersQuery } from "../../redux/updsApiActions";
//slice
import { setNumberBill } from "../../redux/mainInfo/slice";

//components
import HeaderDetail from "../HeaderDetail/HeaderDetail";
import MainInfoBlock from "../MainInfoBlock/MainInfoBlock";
import ServicesBlock from "../ServicesBlock/ServicesBlock";
import DocumentFlow from "../DocumentFlow/DocumentFlow";
import History from "../History/History";

const Act = ({ id, type, setType }) => {
  const ispro = document
    .getElementById(`root_reconciliation`)
    .getAttribute("ispro");
  const { data: parameters, isLoading: isLoadingParams } =
    useGetParametersQuery();
  const { customer, detail, numberBill, date } = useSelector(
    (state) => state.mainInfo
  );
  const { positionsValidation } = useSelector((state) => state.validation);
  const { exchange, logs } = useSelector((state) => state.logs);
  const dispatch = useDispatch();

  useEffect(() => {
    numberBill == "" &&
      parameters?.upd_num &&
      dispatch(setNumberBill(parameters?.acts_num));
  }, [parameters]);


  const openModalPro = () => {
    document?.getElementById("pro-open")?.click();
  };

  return (
    <div className={s.root}>
      <HeaderDetail id={id} type={type} setType={setType} />
      <div className={s.container}>
        <div className={s.left}>
          <MainInfoBlock
            parameters={parameters}
            disabled={type === "detail" || type === "detail_act"}
          />
          {/* <ServicesBlock
            disabled={type === "detail"}
            parameters={parameters}
            error={!positionsValidation}
            errorText={"Заполни все поля"}
            resetError={handleResetErrorPositions}
          /> */}
        </div>

        {(type === "detail" || type === "edit") && <div className={s.right}>

          <DocumentFlow id={id} exchange={exchange} />

          {/* <div className={s.preview}>
            <img src={iconPreview}></img>
            <p>Предварительный просмотр в разработке</p>
          </div> */}

          {ispro === "1" && <History logs={logs} />}


          {ispro === "0" && <div className={s.pro}>
            <h3>История изменений</h3>
            <img src={historyblur} alt="история доступна для про"></img>
            <p onClick={openModalPro}>
              Доступно только для <BadgePro />
            </p>
          </div>}

        </div>
        }
      </div>
    </div>
  );
};

export default Act;
