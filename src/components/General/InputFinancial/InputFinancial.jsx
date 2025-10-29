import classNames from 'classnames';
import s from './InputFinancial.module.scss';
import { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { ReactComponent as IconRuble } from './assets/IconRuble.svg';

const InputFinancial = ({
    amount,
    setAmount,
    disabled,
    placeholder,
    width,
    icon,
}) => {
    const [focus, setFocus] = useState(false);

    const handleChange = (e) => {
        const value = e.currentTarget.value.replace(' ', '').replace(',', '.');
        setAmount(Number(value));
    };

    const handleBlur = () => {
        setFocus(false);
    };

    const handleFocus = () => {
        setFocus(true);
    };

    return (
        <div
            className={classNames(
                s.root,
                disabled && s.root_disabled,
                focus && s.root_focus
            )}
            style={{ width: width ? `${width}px` : '100%' }}
        >
            <NumericFormat
                className={s.input}
                onBlur={handleBlur}
                onFocus={handleFocus}
                placeholder={placeholder}
                decimalScale={4}
                decimalSeparator=","
                value={amount || ''}
                onChange={handleChange}
                thousandSeparator=" "
            />
            {<div className={s.icon}>{icon && <IconRuble />}</div>}
        </div>
    );
};

export default InputFinancial;
