import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//libs
import DatePicker, { registerLocale } from 'react-datepicker';
import dayjs from 'dayjs';
import ru from 'date-fns/locale/ru';

// Redux
import { setDateEndPicker, setDateStartPicker } from '../../../../../redux/filters/dateRangeSlice';

// Styles
import 'react-datepicker/dist/react-datepicker.css';
import './DatePickerСhoose.scss';

export const DatePickerСhoose = ({
  setOpenDateFilter,
  setActiveFilter,
  setShouldResetPicker,
  shouldResetPicker,
}) => {
  const dispatch = useDispatch();
  const { dateStartPicker, dateEndPicker } = useSelector((state) => state.dateRange);

  const [tempDates, setTempDates] = useState([
    dateStartPicker ? new Date(dateStartPicker) : null,
    dateEndPicker ? new Date(dateEndPicker) : null,
  ]);

  const onChange = (dates) => {
    setTempDates(dates);
    const [start, end] = dates;
    if (start && end) {
      dispatch(setDateStartPicker(dayjs(start).format('YYYY-MM-DD')));
      dispatch(setDateEndPicker(dayjs(end).format('YYYY-MM-DD')));
      setActiveFilter('date');
      setOpenDateFilter(false);
    }
  };

  registerLocale('ru', ru);

  useEffect(() => {
    if (shouldResetPicker) {
      setTempDates([null, null]);
      setShouldResetPicker(false);
    }
  }, [shouldResetPicker]);

  return (
    <DatePicker
      selected={tempDates[0]}
      onChange={onChange}
      startDate={tempDates[0]}
      endDate={tempDates[1]}
      selectsRange
      inline
      locale={'ru'}
    />
  );
};
