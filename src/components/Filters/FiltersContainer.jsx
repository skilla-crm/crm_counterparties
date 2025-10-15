import { useState } from "react";
// redux
import { useSelector } from "react-redux";
import { isAnyFilterActive } from "../../redux/filters/selectors";

// components

import ResetFiltersBtn from "components/Filters/COMPONENTS/ResetFiltersAllBtn/ResetFiltersBtn";
import DateFilter from "components/Filters/DateFilter/DateFilter";

// styles
import s from "./FiltersContainer.module.scss";
import Sorting from "components/Sorting/Sorting";

const FiltersContainer = ({ type, isFetching }) => {
  const [activeFilter, setActiveFilter] = useState(null);
  const hasFilters = useSelector(isAnyFilterActive);

  const clearActiveFilter = () => setActiveFilter(null);

  const getFetching = (name) => (activeFilter === name ? isFetching : false);

  const filtersMap = {
    approved: [
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
      {/* {hasFilters && type !== 'details' && (
                <ResetFiltersBtn
                    animation={hasFilters}
                    onClear={() => {
                        setActiveFilter(null);
                    }}
                />
            )} */}
      {filtersMap[type] || null}
    </div>
  );
};
export default FiltersContainer;
