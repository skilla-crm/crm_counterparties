import s from './InputNumFloat.module.scss';
import { NumericFormat } from 'react-number-format';

const InputNumFloat = ({ sum, setSum }) => {

    const handleChangeSum = (e) => {
        const value = e.target.value.replaceAll(' ', '').replaceAll(',', '.')
        value && setSum(value)
        !value && setSum('')
        console.log(value)
    }

    return (
        <NumericFormat
            className={s.input}
            placeholder=''
            decimalScale={4}
            decimalSeparator=","
            value={sum}
            onChange={handleChangeSum}
        />
    )
};

export default InputNumFloat;