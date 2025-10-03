import s from "./Detail.module.scss";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
//Api
import { useGetUpdQuery } from "../../redux/updsApiActions";
//slice
import {
  setCustomer,
  setDetail,
  setNumberBill,
  setNumberBillFirst,
  setDate,
  setDateStart,
  setDateEnd
} from "../../redux/mainInfo/slice";
import { setLogs, setExchange } from "../../redux/logs/slice";
import { setPositions } from "../../redux/positions/slice";
//components
import Act from "../../components/Act/Act";
import SceletonBill from "../../components/SceletonBill/SceletonBill";

const Detail = () => {
  const [anim, setAnim] = useState(false);
  const [type, setType] = useState("detail");
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.pathname?.split("/").pop();
  const { data, isLoading, isFetching } = useGetUpdQuery(id);

  useEffect(() => {
    setTimeout(() => {
      setAnim(true);
    });
  }, []);

  useEffect(() => {
    if (data) {
      document.title = `Акт сверки №${data?.number} от ${dayjs(data?.date).format(
        "DD.MM.YYYY"
      )}`;
      dispatch(setDate(dayjs(data?.date)));
      dispatch(setNumberBill(data?.number));
      dispatch(setNumberBillFirst(data?.number));
      dispatch(setExchange(data?.exchange));
      dispatch(setLogs(data?.logs));

      dispatch(setCustomer(data?.company));
      dispatch(
        setDetail({
          ...data?.partnership,
          ...data?.details,
        })
      );

      dispatch(setDateStart(data?.date_start))
      dispatch(setDateEnd(data?.date_end))

    }
  }, [data]);

  return (
    <div className={classNames(s.root, anim && s.root_anim)}>
      <SceletonBill isLoading={isLoading} />
      <Act id={id} type={type} setType={setType} />
    </div>
  );
};

export default Detail;
