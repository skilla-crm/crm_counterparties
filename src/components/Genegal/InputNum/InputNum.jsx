import s from './InputNum.module.scss';

const InputNum = ({ num, setNum }) => {

    const handleNum = (e) => {
        let reg = /[A-Za-zA-Яа-яЁё]/g;
        const value = e.currentTarget.value;
        setNum(value.replace(reg, ""))
       setNum(value)
    }

    return (
        <input className={s.input} onChange={handleNum} value={num || ''}></input>
    )
};

export default InputNum;