import './DataPickerCalendar.scss';
import { useEffect, useRef, useState, useMemo } from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

const DataPickerCalendar = ({ value, setValue, setOpenCalendar, nosub, minDate }) => {
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

    // Нормализация value: убеждаемся, что это dayjs объект или null
    const normalizedValue = useMemo(() => {
        if (!value || value === '') return null;
        // Проверяем, является ли значение уже dayjs объектом (имеет метод isValid)
        if (value && typeof value.isValid === 'function') {
            return value.isValid() ? value : null;
        }
        // Если нет, пытаемся преобразовать в dayjs
        const dayjsValue = dayjs(value);
        return dayjsValue.isValid() ? dayjsValue : null;
    }, [value]);

    // Нормализация minDate: убеждаемся, что это dayjs объект или null
    const normalizedMinDate = useMemo(() => {
        if (!minDate || minDate === '') return null;
        // Проверяем, является ли значение уже dayjs объектом (имеет метод isValid)
        if (minDate && typeof minDate.isValid === 'function') {
            return minDate.isValid() ? minDate : null;
        }
        // Если нет, пытаемся преобразовать в dayjs
        const dayjsMinDate = dayjs(minDate);
        return dayjsMinDate.isValid() ? dayjsMinDate : null;
    }, [minDate]);

    function onChange(newValue) {
        setValue(dayjs(newValue).locale('ru'));
        setTimeout(() => {
            setAnim(false);
        }, 200);

        setTimeout(() => {
            setOpenCalendar(false);
        }, 400);
    }

    const closeModal = (e) => {
        e.stopPropagation();
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setAnim(false);

            setTimeout(() => {
                setOpenCalendar(false);
            }, 200);
        }
    };

    useEffect(() => {
        document.addEventListener('mouseup', closeModal);

        return () => document.removeEventListener('mouseup', closeModal);
    }, []);

    return (
        <div
            ref={modalRef}
            className={`calendar ${anim && 'calendar_anim'} ${nosub && 'calendar_nosub'}`}
        >
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                <ThemeProvider theme={theme}>
                    <DateCalendar
                        value={normalizedValue}
                        onChange={onChange}
                        views={['day']}
                        showDaysOutsideCurrentMonth
                        minDate={normalizedMinDate}
                    />
                </ThemeProvider>
            </LocalizationProvider>
        </div>
    );
};

export default DataPickerCalendar;
