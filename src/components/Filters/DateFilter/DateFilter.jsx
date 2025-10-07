import { use, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setDateEndPicker, setDateStartPicker } from '../../../redux/filters/dateRangeSlice';

// Components
import { FilterButtonDate } from 'components/Filters/COMPONENTS/FilterButton/FilterButton';
import { DateMenu } from './DateMenu/DateMenu';
import { getTitleDateDuration } from './DateMenu/utils/date';

// Icons
import { ReactComponent as IconCalendar } from 'assets/icons/iconCalendar.svg';

// Styles
import s from './DateFilter.module.scss';

const DateFilter = ({ isFetching, setActiveFilter, clearActiveFilter }) => {
  const { dateStartPicker, dateEndPicker } = useSelector((state) => state.dateRange || {});
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [load, setLoad] = useState(isFetching);

  const [done, setDone] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [shouldResetPicker, setShouldResetPicker] = useState(false);

  const isSelected = Boolean(dateStartPicker && dateEndPicker);
  const title = isSelected ? getTitleDateDuration(dateStartPicker, dateEndPicker) : 'Период';

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleReset = (e) => {
    e.preventDefault();
    e.stopPropagation();
    clearActiveFilter();
    dispatch(setDateStartPicker(null));
    dispatch(setDateEndPicker(null));
    setDone(false);
    setShouldResetPicker(true);
  };

  useEffect(() => {
    setLoad(!!isFetching);
    setDone(!!dateStartPicker && !!dateEndPicker && !isFetching);
  }, [isFetching, dateStartPicker, dateEndPicker]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !e.composedPath().includes(ref.current)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className={s.root}>
      <div ref={ref} onClick={handleOpen} className={classNames(s.filter)}>
        <FilterButtonDate
          title={title}
          Icon={IconCalendar}
          isSelected={isSelected}
          handleReset={handleReset}
          handleOpen={handleOpen}
          buttonRef={ref}
          load={load}
          done={done}
        />
      </div>

      <DateMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setActiveFilter={setActiveFilter}
        shouldResetPicker={shouldResetPicker}
        setShouldResetPicker={setShouldResetPicker}
      />
    </div>
  );
};

export default DateFilter;
