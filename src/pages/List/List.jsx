// External
import { useMemo, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { useGetCounterpartiesInfiniteQuery } from "../../redux/services/counterpartiesListApiActions";
import { resetSort } from "../../redux/sorting/sortSlice";
import { resetAllFilters } from "../../redux/filters/filtersSlice";

// Components
import Search from "components/General/Search/Search";
import SegmentButtons from "components/General/SegmentButtons/SegmentButtons";
import Table from "components/Table/Table";
import FiltersContainer from "components/Filters/FiltersContainer";
import ListHeader from "./ListHeader";

// Styles
import s from "./List.module.scss";

const List = () => {
  const COUNTERPARTIES_SUB_TYPES = [
    { value: 0, label: "Активные", ref: useRef() },
    { value: 1, label: "Стоп-лист", ref: useRef() },
  ];
  const containerRef = useRef();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("approved");
  const [counterpartiesType, setCounterpartiesType] = useState(0);
  //активные 0

  const [anim, setAnim] = useState(true);

  const { sortBy, sortDir } = useSelector((state) => state.sort);
  const { counterpartyInvalidKpp } = useSelector((state) => state.filters);


  const {
    data: approvedData,
    fetchNextPage: fetchNextPageApproved,
    hasNextPage: hasNextPageApproved,
    isLoading: isLoadingApproved,
    isFetching: isFetchingApproved,
    error: approvedDataError,
  } = useGetCounterpartiesInfiniteQuery({
    "sort[type]": sortBy,
    "sort[dir]": sortDir,
    "filter[verified]": 1,
    "filter[is_black]": activeTab === "approved" ? counterpartiesType : 0,
    ...(searchQuery.length > 0 && activeTab === "approved"
      ? { "filter[search]": searchQuery }
      : {}),
  });

  const {
    data: notApprovedData,
    fetchNextPage: fetchNextPageNotApproved,
    hasNextPage: hasNextPageNotApproved,
    isLoading: isLoadingNotApproved,
    isFetching: isFetchingNotApproved,
    error: notApprovedDataError,
  } = useGetCounterpartiesInfiniteQuery({
    "sort[type]": sortBy,
    "sort[dir]": sortDir,
    "filter[verified]": 0,
    'filter[to_correct_kpp]': activeTab === "notApproved" ? counterpartyInvalidKpp : '',
    "filter[is_black]": activeTab === "notApproved" ? counterpartiesType : 0,
    ...(searchQuery.length > 0 && activeTab === "notApproved"
      ? { "filter[search]": searchQuery }
      : {}),
   
  });
  //Если data.length > 0, то показываем предупреждение о некорректном КПП
  const { data: invalidKppList } = useGetCounterpartiesInfiniteQuery({
    "sort[type]": sortBy,
    "sort[dir]": sortDir,
    "filter[to_correct_kpp]": 1, 
  });
  
  const invalidKppCount = useMemo(
    () => invalidKppList?.pages?.[0]?.meta?.total || 0,
    [invalidKppList]
  );
 const hasInvalidKpp = invalidKppCount > 0;

  
  //////////////////////////////////////////////////////////////////////////////////
  const allRowsApproved =
    approvedData?.pages?.flatMap((page) => page.data) || [];
  const totalCountApproved = approvedData?.pages?.[0]?.meta?.total;

  const allRowsNotApproved =
    notApprovedData?.pages?.flatMap((page) => page.data) || [];
  const totalCountNotApproved = notApprovedData?.pages?.[0]?.meta?.total;

  const handleActiveTabChange = (value) => {
    dispatch(resetSort());
    dispatch(resetAllFilters());
    setActiveTab(value);
  };

  return (
    <div className={s.root} ref={containerRef}>
      <ListHeader
        activeTab={activeTab}
        setActiveTab={handleActiveTabChange}
        setCounterpartiesType={setCounterpartiesType}
        setAnim={setAnim}
        isLoading={isLoadingApproved || isLoadingNotApproved}
        counters={{
          approved: totalCountApproved,
          notApproved: totalCountNotApproved,
        }}
        isShowInformation={hasInvalidKpp && counterpartyInvalidKpp !== 1}
        countInvalidKpp={invalidKppCount}
      />
      <span
        key={activeTab}
        className={`${s.subtitle} ${activeTab === "approved" ? s.fadeIn : s.fadeOut}`}
      >
        {activeTab === "approved"
          ? "Проверены платформой"
          : "Реквизиты не найдены в базах и не могут быть проверены платформой "}
      </span>
      <div className={s.queryPanel}>
        <div className={s.searchPanel}>
          <Search
            isFetching={isFetchingApproved || isFetchingNotApproved}
            searchValue={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="Наименование, ИНН, ОГРН, телефон, e-mail, имя"
            style={{ width: "500px" }}
          />
          <SegmentButtons
            style={2}
            value={counterpartiesType}
            callback={(val) => setCounterpartiesType(val)}
            controlRef={useRef()}
            segments={COUNTERPARTIES_SUB_TYPES}
          />
        </div>

        <FiltersContainer
          type={activeTab}
          isFetching={
            activeTab === "approved"
              ? isFetchingApproved
              : isFetchingNotApproved
          }
        />
      </div>

      <div className={s.container}>
        <InfiniteScroll
          dataLength={
            activeTab === "approved"
              ? allRowsApproved.length
              : allRowsNotApproved.length
          }
          next={
            activeTab === "approved"
              ? fetchNextPageApproved
              : fetchNextPageNotApproved
          }
          hasMore={
            activeTab === "approved"
              ? hasNextPageApproved
              : hasNextPageNotApproved
          }
          scrollableTarget="scrollableDiv"
          style={{
            overflow: allRowsApproved.length === 0 ? "hidden" : "auto",
          }}
        >
          <Table
            anim={anim}
            type={activeTab}
            list={
              activeTab === "approved" ? allRowsApproved : allRowsNotApproved
            }
            totalCount={
              activeTab === "approved"
                ? totalCountApproved
                : totalCountNotApproved
            }
            isLoading={
              activeTab === "approved"
                ? isLoadingApproved
                : isLoadingNotApproved
            }
            isFetching={
              activeTab === "approved"
                ? isFetchingApproved
                : isFetchingNotApproved
            }
            error={
              activeTab === "approved"
                ? approvedDataError
                : notApprovedDataError
            }
          />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default List;
