import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

//icons
import { ReactComponent as CalendarIcon } from 'assets/icons/iconCalendar.svg';

//styles
import s from './DateInput.module.scss';

import 'dayjs/locale/ru';

const DateInput = ({ selectedDate, setSelectedDate, setOpenCalendar }) => {
  dayjs.locale('ru');

  const [inputValue, setInputValue] = useState(
    selectedDate?.isValid?.() ? selectedDate.format('DD.MM.YYYY') : ''
  );

  useEffect(() => {
    if (selectedDate?.isValid?.()) {
      setInputValue(selectedDate.format('DD.MM.YYYY'));
    }
  }, [selectedDate]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const parsed = dayjs(value, 'DD.MM.YYYY', true);
    if (parsed.isValid()) {
      setSelectedDate(parsed);
    }
  };

  return (
    <div className={s.wrapper} onClick={() => setOpenCalendar(true)}>
      <input
        className={s.inputBox}
        value={inputValue}
        onChange={handleChange}
        onFocus={() => setOpenCalendar(true)}
        placeholder="дд.мм.гггг"
      />
      <CalendarIcon className={s.icon} />
    </div>
  );
};
export default DateInput;
