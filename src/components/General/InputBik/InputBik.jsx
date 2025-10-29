import classNames from 'classnames';
import { useState } from 'react';
import s from './InputBik.module.scss';

const InputBik = ({
    account,
    setAccount,
    width,
    setValidationError,
    maxLength = 9,
}) => {
    const [touched, setTouched] = useState(false);
    const [errorText, setErrorText] = useState(null);

    const handleAccount = (e) => {
        const value = e.currentTarget.value.replace(/[^\d]/g, '');
        setAccount(value);
    };

    const handleBlur = () => {
        setTouched(true);
        validate(account);
    };

    const validate = (value) => {
        const isValid = value.length === maxLength;
        const error = isValid
            ? null
            : `Длина БИК должна быть ${maxLength} цифр`;
        setErrorText(error);

        if (setValidationError) {
            setValidationError(error);
        }
    };

    const handleChange = (e) => {
        handleAccount(e);
        if (touched) {
            validate(e.currentTarget.value.replace(/[^\d]/g, ''));
        }
    };

    return (
        <div
            className={s.wrapper}
            style={{ width: width ? `${width}px` : '100%' }}
        >
            <input
                maxLength={maxLength}
                className={`${s.input} ${errorText ? s.invalid : ''}`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={account || ''}
            />
            <div
                className={classNames(
                    s.error,
                    touched && errorText && s.error_vis
                )}
            >
                <p>{errorText}</p>
            </div>
        </div>
    );
};

export default InputBik;
