import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  setModalDateStartPicker,
  setModalDateEndPicker,
  resetModalDates,
} from '../../../redux/filters/dateRangeAttachModalSlice';

// Components
import { FilterButtonDate } from 'components/Filters/COMPONENTS/FilterButton/FilterButton';
import { DateMenu } from './DateMenu/DateMenu';
import { getTitleDateDuration } from './DateMenu/utils/date';

// Icons
import { ReactComponent as IconCalendar } from 'assets/icons/iconCalendar.svg';

// Styles
import s from './ModalAttachDateFilter.module.scss';

const ModalAttachDateFilter = ({ isFetching }) => {
  const { modalDateStartPicker, modalDateEndPicker } = useSelector(
    (state) => state.dateAttachModalRange || {}
  );

  const dispatch = useDispatch();

  const ref = useRef(null);
  const [load, setLoad] = useState(isFetching);
  const [done, setDone] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [shouldResetPicker, setShouldResetPicker] = useState(false);

  const isSelected = Boolean(modalDateStartPicker && modalDateEndPicker);
  const title = isSelected
    ? getTitleDateDuration(modalDateStartPicker, modalDateEndPicker)
    : 'Период';

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleReset = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(setModalDateStartPicker(null));
    dispatch(setModalDateEndPicker(null));
    setDone(false);
    setShouldResetPicker(true);
  };

  useEffect(() => {
    setLoad(!!isFetching);
    setDone(!!modalDateStartPicker && !!modalDateEndPicker && !isFetching);
  }, [isFetching, modalDateStartPicker, modalDateEndPicker]);

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
          className={s.filter}
        />
      </div>

      <DateMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        shouldResetPicker={shouldResetPicker}
        setShouldResetPicker={setShouldResetPicker}
      />
    </div>
  );
};

export default ModalAttachDateFilter;
