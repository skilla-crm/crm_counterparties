
import DatePicker, { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDateEnd,
  setDateEndPicker,
  setDateStart,
  setDateStartPicker
} from '../../../../../redux/dateRange/slice';
import { getDatePicker } from '../utils/date';
import './DatePickerСhoose.scss';



export const DatePickerСhoose = ({ setOpenDateFilter, setLoadFilter }) => {
  const dispatch = useDispatch();

  const { dateStartPicker, dateEndPicker, dateEnd } = useSelector((state) => state.dateRange);
  const onChange = (dates) => {

    const [start, end] = dates;
    dispatch(setDateEndPicker(end));
    dispatch(setDateStartPicker(start));
    if (end) {
      getDatePicker(end) !== dateEnd && setLoadFilter(true)
      dispatch(setDateStart(getDatePicker(start)));
      dispatch(setDateEnd(getDatePicker(end)));
      setOpenDateFilter(false);
    }
  };

  registerLocale('ru', ru);

  return (
    <DatePicker
      selected={dateStartPicker}
      onChange={onChange}
      startDate={dateStartPicker}
      endDate={dateEndPicker}
      selectsRange
      inline
      locale={'ru'}
    />
  );
};
