import s from './InputBillNumber.module.scss';
import classNames from 'classnames';
import { useRef, useState, useEffect } from 'react';
import { ReactComponent as IconUpdate } from '../../assets/icons/iconUpdate.svg';
//Api
import { getRandomNumber, getCheckNumber } from '../../api/Api';

const InputBillNumber = ({ sub, number, numberFirst, setNumber, errorEmpity, errorText, resetError, disabled, parameters, detail }) => {
    const [focus, setFocus] = useState(false);
    const [count, setCount] = useState(0);
    const [load, setLoad] = useState(false)
    const [done, setDone] = useState(false);
    const [error, setError] = useState(false)
    const inputRef = useRef()

    useEffect(() => {
        disabled && setDone(false)
    }, [disabled])


    useEffect(() => {
        setDone(false)
    }, [detail])

    const handleNumberValue = (e) => {
        let reg = /[A-Za-zA-Яа-яЁё]/g;
        const value = e.currentTarget.value;
        setError(false)
        setDone(false)
        setNumber(value.replace(reg, ""))
        resetError()
    }

    const handleFocus = () => {
        setFocus(true)
    }

    const handleBlur = () => {
        Number(numberFirst) !== Number(number) && getCheckNumber(3, number, detail?.partnership_id)
            .then(res => setError(false))
            .catch(err => { number !== '' && setError(true) })
        setFocus(false)
    }

    const handleRandomNumber = () => {
        resetError()
        setError(false)
        setDone(false)
        setLoad(true)

        setTimeout(() => {
            if (detail?.upd_num) {
                detail?.upd_num === number ? setNumber(detail?.upd_num + 1) : setNumber(detail?.upd_num)
            } else {
                parameters?.upd_num === number ? setNumber(parameters?.upd_num + 1) : setNumber(parameters?.upd_num)
            }

            setDone(true)
            setLoad(false)
        }, 200)
        setCount(prevState => prevState + 1)
    }

    return (
        <div className={s.root}>
            <span className={classNames(s.sub)}>{sub}</span>
            <div className={classNames(s.field, (focus || done) && s.field_focus, (error || errorEmpity) && s.field_error, disabled && s.field_disabled)}>
                <input className={classNames(s.input, load && s.input_hidden)} ref={inputRef} onFocus={handleFocus} onBlur={handleBlur} type='text' onChange={handleNumberValue} value={number || ''} placeholder=''></input>
                <button onClick={handleRandomNumber} className={s.update}>
                    <IconUpdate style={{ transform: `rotate(${180 * count}deg)` }} />
                </button>
            </div>

            <span className={classNames(s.text, done && s.text_blue, (error || errorEmpity) && s.text_red)}>
                {done && 'Номер обновлен'}
                {error && 'Этот номер уже занят'}
                {errorEmpity && errorText}
            </span>
        </div>
    )
};

export default InputBillNumber;