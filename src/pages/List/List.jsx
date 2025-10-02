import s from "./List.module.scss";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
//Api
import {
  useGetUpdsQuery,
  useGetParametersQuery,
} from "../../redux/updsApiActions";
import { getNextPage } from "../../api/Api";
//slice
import {
  setCustomer,
  setDetail,
  setNumberBill,
  setDate,
  setDateStart,
  setDateEnd

} from "../../redux/mainInfo/slice";
import { setPositions } from "../../redux/positions/slice";
import {
  setCustomerValidation,

  setNumberValidation,

} from "../../redux/validation/slice";
//components
import Header from "../../components/Header/Header";
import SubHeader from "../../components/SubHeader/SubHeader";
import Table from "../../components/Table/Table";
import TableSceleton from "../../components/TableSceleton/TableSceleton";
//constants
import { TITLE_UPD } from "../../constants/upds";
import { useEffect, useState } from "react";

const List = () => {
  const [anim, setAnim] = useState(false);
  const [bills, setBills] = useState([]);
  const [link, setLink] = useState(null);
  const { data: parameters, isLoading: isLoadingParams } =
    useGetParametersQuery();
  const { search, filterCompanys, filterCustomers, filterStatus } = useSelector(
    (state) => state.filters
  );
  const { dateStart, dateEnd } = useSelector((state) => state.dateRange);
  const params = {
    "filter[search]": search,
    "filter[company_ids]": JSON.stringify(filterCustomers),
    "filter[partnership_ids]": JSON.stringify(filterCompanys),
    "filter[date_start]": dateStart,
    "filter[date_end]": dateEnd,
  };
  const { data, isLoading, isError, isFetching } = useGetUpdsQuery(params, {
    refetchOnMountOrArgChange: true,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setAnim(true);
    });
  }, []);

  useEffect(() => {
    dispatch(setCustomer({}));
    dispatch(setDetail({}));
    dispatch(setDate(dayjs()));
    dispatch(setDateStart(null));
    dispatch(setDateEnd(null));
    dispatch(
      setPositions([
        {
          id: 1,
          rate: {},
          count: "",
          units: "ед",
          code: "642",
          price: "",
          total: "",
        },
      ])
    );
    dispatch(setCustomerValidation(true));
    dispatch(setNumberValidation(true));

  }, []);

  useEffect(() => {
    dispatch(setNumberBill(parameters?.acts_num));
  }, [parameters]);

  useEffect(() => {
    if (data) {
      setBills(data?.data);
      setLink(data?.links?.next);
    }
  }, [data]);

  const handleAddBill = () => {
    navigate("/create");
  };

  const handleLoadBills = () => {
    link &&
      getNextPage(link)
        .then((res) => {
          const data = res.data.data;
          const nextLink = res.data.links.next;
          setBills((prevState) => [...prevState, ...data]);
          setLink(nextLink);
        })
        .catch((err) => console.log(err));
  };

  return (
    <div className={classNames(s.root, anim && s.root_anim)}>
      <Header
        title={TITLE_UPD}
        type={"list"}
        handleAddBill={handleAddBill}
        params={params}
      />
      <SubHeader isFetching={isFetching} />
      <InfiniteScroll
        loader={false}
        scrollThreshold={0.3}
        dataLength={bills?.length || 0}
        next={handleLoadBills}
        hasMore={true}
        scrollableTarget="scrollableDiv"
        style={{ overflow: "visible" }}
        endMessage={<p style={{ textAlign: "center" }}></p>}
      >
        <div className={s.container}>
          <Table data={bills} />
          <TableSceleton isLoading={isLoading} />
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default List;
