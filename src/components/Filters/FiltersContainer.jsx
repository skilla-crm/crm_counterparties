import { useState } from "react";
// redux
import { useSelector } from "react-redux";
import { isAnyFilterActive } from "../../redux/filters/selectors";

// mock
import { companies } from "mock/mockData";

// components

import DetailsFilter from "components/Filters/DetailsFilter/DetailsFilter";
import ResetFiltersBtn from "components/Filters/COMPONENTS/ResetFiltersAllBtn/ResetFiltersBtn";
import DateFilter from "components/Filters/DateFilter/DateFilter";
import CompanyFilter from "components/Filters/CompanyFilter/CompanyFilter";
import StatusFilter from "components/Filters/StatusFilter/StatusFilter";

// styles
import s from "./FiltersContainer.module.scss";
import Sorting from "components/Sorting/Sorting";
import ContractsFilter from "./ContractsFilter/ContractFilter";

const FiltersContainer = ({ type, isFetching }) => {
  const [activeFilter, setActiveFilter] = useState(null);
  const hasFilters = useSelector(isAnyFilterActive);

  const clearActiveFilter = () => setActiveFilter(null);

  const getFetching = (name) => (activeFilter === name ? isFetching : false);

  const filtersMap = {
    approved: [
      // <CompanyFilter
      //   key="companies"
      //   name="companies"
      //   isFetching={getFetching('companies')}
      //   activeFilter={activeFilter}
      //   setActiveFilter={setActiveFilter}
      //   clearActiveFilter={clearActiveFilter}
      // />,
      // <DetailsFilter
      //   key="company"
      //   name="company"
      //   data={companies}
      //   isFetching={getFetching('company')}
      //   activeFilter={activeFilter}
      //   setActiveFilter={setActiveFilter}
      //   clearActiveFilter={clearActiveFilter}
      // />,
      // <StatusFilter
      //   name="status"
      //   key="status"
      //   isFetching={getFetching('status')}
      //   activeFilter={activeFilter}
      //   setActiveFilter={setActiveFilter}
      //   clearActiveFilter={clearActiveFilter}
      // />,
      <Sorting
        type="approved"
        name="sort"
        key="sort"
        isFetching={getFetching("sort")}
        setActiveFilter={setActiveFilter}
        clearActiveFilter={clearActiveFilter}
      />,
    ],
    notApproved: [
      // <CompanyFilter
      //   key="companies"
      //   name="companies"
      //   isFetching={getFetching('companies')}
      //   activeFilter={activeFilter}
      //   setActiveFilter={setActiveFilter}
      //   clearActiveFilter={clearActiveFilter}
      // />,

      // <DetailsFilter
      //   key="company"
      //   name="company"
      //   data={companies}
      //   isFetching={getFetching("company")}
      //   activeFilter={activeFilter}
      //   setActiveFilter={setActiveFilter}
      //   clearActiveFilter={clearActiveFilter}
      // />,
      <Sorting
        type="notApproved"
        name="sort"
        key="sort"
        isFetching={getFetching("sort")}
        setActiveFilter={setActiveFilter}
        clearActiveFilter={clearActiveFilter}
      />,
    ],
    details: [
      // <ContractsFilter
      //   key="contract"
      //   name="contract"
      //   data={companies}
      //   isFetching={getFetching('contract')}
      //   activeFilter={activeFilter}
      //   setActiveFilter={setActiveFilter}
      //   clearActiveFilter={clearActiveFilter}
      // />,
      <DateFilter
        key="date"
        name="date"
        isFetching={getFetching("date")}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        clearActiveFilter={clearActiveFilter}
      />,
    ],
  };

  return (
    <div className={s.filters}>
      {hasFilters && type !== "details" && (
        <ResetFiltersBtn
          animation={hasFilters}
          onClear={() => {
            setActiveFilter(null);
          }}
        />
      )}
      {filtersMap[type] || null}
    </div>
  );
};
export default FiltersContainer;
