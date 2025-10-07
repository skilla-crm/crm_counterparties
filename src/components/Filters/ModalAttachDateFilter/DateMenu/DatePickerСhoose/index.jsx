import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//libs
import DatePicker, { registerLocale } from 'react-datepicker'; // Компонент календаря
import dayjs from 'dayjs'; // Лёгкая библиотека для работы с датами
import ru from 'date-fns/locale/ru';

// Redux
import {
  setModalDateStartPicker,
  setModalDateEndPicker,
  resetModalDates,
} from '../../../../../redux/filters/dateRangeAttachModalSlice';

// Styles
import 'react-datepicker/dist/react-datepicker.css';
import './DatePickerСhoose.scss';

export const DatePickerСhoose = ({
  setOpenDateFilter,
  setShouldResetPicker,
  shouldResetPicker,
}) => {
  const dispatch = useDispatch();
  const { modalDateStartPicker, modalDateEndPicker } = useSelector(
    (state) => state.dateAttachModalRange || {}
  );

  const [tempDates, setTempDates] = useState([
    modalDateStartPicker ? new Date(modalDateStartPicker) : null,
    modalDateEndPicker ? new Date(modalDateEndPicker) : null,
  ]);

  const onChange = (dates) => {
    setTempDates(dates);
    const [start, end] = dates;
    if (start && end) {
      dispatch(setModalDateStartPicker(dayjs(start).format('YYYY-MM-DD')));
      dispatch(setModalDateEndPicker(dayjs(end).format('YYYY-MM-DD')));

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
