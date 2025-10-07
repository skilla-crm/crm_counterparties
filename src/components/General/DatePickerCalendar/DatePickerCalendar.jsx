import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';

import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import './DatePickerCalendar.scss';
import 'dayjs/locale/ru';

const DatePickerCalendar = ({ value, setValue, setOpenCalendar, nosub }) => {
  const [anim, setAnim] = useState(false);

  const modalRef = useRef();
  const theme = createTheme({
    typography: {
      fontFamily: 'Inter, sans-serif',
    },
  });

  useEffect(() => {
    setTimeout(() => {
      setAnim(true);
    });
  }, []);

  function onChange(newValue) {
    setValue(dayjs(newValue));
    setTimeout(() => {
      setAnim(false);
    }, 200);

    setTimeout(() => {
      setOpenCalendar(false);
    }, 400);
  }

  useEffect(() => {
    const closeModal = (e) => {
      e.stopPropagation();
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setAnim(false);

        setTimeout(() => {
          setOpenCalendar(false);
        }, 200);
      }
    };
    document.addEventListener('mouseup', closeModal);

    return () => document.removeEventListener('mouseup', closeModal);
  }, [setOpenCalendar]);

  return (
    <div
      ref={modalRef}
      className={`calendar ${anim && 'calendar_anim'} ${nosub && 'calendar_nosub'}`}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
        <ThemeProvider theme={theme}>
          <DateCalendar
            value={value}
            onChange={onChange}
            views={['day']}
            showDaysOutsideCurrentMonth
          />
        </ThemeProvider>
      </LocalizationProvider>
    </div>
  );
};

export default DatePickerCalendar;
