import { ReactComponent as IconRuble } from 'assets/icons/IconRuble.svg';

import s from './InputNum.module.scss';

const InputNum = ({ num, setNum, width, maxLength }) => {
    const formatNum = (value) => {
        if (!value && value !== 0) return '';
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    };
    const handleNum = (e) => {
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
            />
            <span className={s.currency}>
                <IconRuble />
            </span>
        </div>
    );
};

export default InputNum;
