import s from './InputFinancial.module.scss';
import { NumericFormat } from 'react-number-format';

const InputFinancial = ({ sum, setSum }) => {

    const handleChangeSum = (e) => {
        const value = e.target.value.replaceAll(' ', '').replaceAll(',', '.')
        setSum(value)
    }

    return (
        <NumericFormat
            className={s.input}
            placeholder=''
            decimalScale={4}
            decimalSeparator=","
            value={sum}
            onChange={handleChangeSum}
            thousandSeparator=" " />
    )
};

export default InputFinancial;