import s from './InputData.module.scss';
import { useState, useRef, useEffect } from 'react';
import dayjs from 'dayjs';
import { ReactComponent as IconCalendar } from '../../assets/icons/iconCalendar.svg';
//components
import DataPickerCalendar from '../Genegal/DataPickerCalendar/DataPickerCalendar'

const InputData = ({ sub, nosub, setDate, date, disabled }) => {
    const [fieldFocus, setFieldFocus] = useState(false);
    const [openCalendar, setOpenCalendar] = useState(false);
    const [dateVis, setDateVis] = useState('');

    const inputRef = useRef();
    const fieldRef = useRef();

    useEffect(() => {
        handleDateStandart()
    }, [date])

    const handleDateStandart = () => {
        const dateFormat = dayjs(date).format('DD.MM.YYYY');
        dayjs(date).isValid() && setDateVis(dateFormat);
    }

    const handleDateValue = (e) => {
        setOpenCalendar(true)
        let reg = /[A-Za-zA-Яа-яЁё]/g;
        const value = e.currentTarget.value;
        value.length < 11 && setDateVis(value.replace(reg, ""))

        value.length == 2 && dateVis.length < 2 && setDateVis(prevState => prevState + '.')
        value.length == 5 && dateVis.length < 5 && setDateVis(prevState => prevState + '.')
        const isValid = dayjs(value, 'DD.MM.YYYY', true).isValid()
        isValid ? setDate(dayjs(value, 'DD.MM.YYYY').locale('ru')) : setDate(null)
        value == '' && setDate(null)

    }

    const handleFocus = () => {
        setFieldFocus(true)
    }

    const handleBlur = () => {
        setFieldFocus(false);
        !date && setDate(dayjs())
        !date && setDateVis(dayjs().format('DD.MM.YYYY'))
    }

    const handleOpenCalendar = () => {
        if (openCalendar) {
            !fieldFocus && setOpenCalendar(false)
        } else {
            setOpenCalendar(true)
            inputRef.current.focus()
        }
    }

    const handleBage = (e) => {
        const id = e.currentTarget.id;
        setDate(dayjs().add(id, 'day').locale('ru'))
    }

    return (
        <div className={`${s.container} ${s.container_data}`}>
            {<span className={s.sub}>{sub}</span>}
            <div ref={fieldRef} onClick={handleOpenCalendar} className={`${s.field} ${s.field_data} ${fieldFocus && s.field_focus} ${disabled && s.field_disabled}`}>
                <input ref={inputRef} onFocus={handleFocus}/*  onKeyDown={handleBackSpace} */ onBlur={handleBlur} type='text' onChange={handleDateValue} value={dateVis || ''} placeholder='дд.мм.гггг'></input>
                <IconCalendar />
            </div>

            {!nosub && <div className={s.bages}>
                <p onClick={handleBage} id='1'>Завтра</p>
                <p onClick={handleBage} id='2'>Послезавтра</p>
            </div>
            }
            {openCalendar && <DataPickerCalendar value={date === '' ? null : date} setValue={setDate} setOpenCalendar={setOpenCalendar} nosub={nosub} />}
        </div>
    )
};

export default InputData;