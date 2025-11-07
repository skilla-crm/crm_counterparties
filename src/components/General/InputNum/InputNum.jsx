import { ReactComponent as IconRuble } from 'assets/icons/IconRuble.svg';

import s from './InputNum.module.scss';
const InputNum = ({ num, setNum, width, maxLength, disabled = false }) => {
    const formatNum = (value) => {
        if (!value && value !== 0) return '';
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    };

    const handleNum = (e) => {
        if (disabled) return;
        const value = e.currentTarget.value.replace(/[^\d]/g, '');
        setNum(Number(value));
    };

    return (
        <div
            className={s.wrapper}
            style={{ width: width ? `${width}px` : '100%' }}
        >
            <input
                maxLength={maxLength}
                className={s.input}
                onChange={handleNum}
                value={formatNum(num) || ''}
                style={{ textAlign: 'right' }}
                disabled={disabled}
            />
            <span className={s.currency}>
                <IconRuble />
            </span>
        </div>
    );
};

export default InputNum;
