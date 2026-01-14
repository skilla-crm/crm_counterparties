import s from './InputNum.module.scss';

const InputNum = ({ num, setNum, width, maxLength, disabled }) => {

    const handleNum = (e) => {
        let reg = /[A-Za-zA-Яа-яЁё]/g;
        const value = e.currentTarget.value;
        setNum(Number(value.replace(reg, "")))
    }

    return (
        <input 
            maxLength={maxLength} 
            style={{ width: width ? `${width}px` : '' }} 
            className={s.input} 
            onChange={handleNum} 
            value={num || ''}
            disabled={disabled}
        ></input>
    )
};

export default InputNum;