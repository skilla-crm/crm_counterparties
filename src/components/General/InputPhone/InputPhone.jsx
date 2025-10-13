import s from './InputPhone.module.scss';
import classNames from 'classnames';
import { useState } from 'react';
import InputMask from 'comigo-tech-react-input-mask';

const InputPhone = ({
    phone,
    setPhone,
    disabled,
    setValidate,
    errorRequired,
    resetErrorRequired,
    width,
    required = true,
}) => {
    const [errorValidate, setErrorValidate] = useState(false);

    const handleChangeValue = (e) => {
        const value = e.currentTarget.value;
        const regex = /[0-9]/g;
        const cleanValue = value?.match(regex)?.join('');
        setPhone(!cleanValue ? '' : cleanValue);

        // if (
        //     (cleanValue?.length > 0 && cleanValue?.length !== 11) ||
        //     !cleanValue
        // ) {
        //     setValidate(false);
        // } else {
        //     setValidate(true);
        // }

        if (!cleanValue) {
            setValidate(!required);
            return;
        }

        if (cleanValue.length !== 11) {
            setValidate(false);
        } else {
            setValidate(true);
        }
    };

    const handlePast = () => {
        navigator.clipboard.readText().then((text) => {
            if (text.length > 11) {
                const newValue = text.slice(-11);

                setPhone(`7${newValue.slice(1)}`);
            } else if (text.length === 11) {
                setPhone(`7${text.slice(1)}`);
            } else {
                setPhone(text);
            }
        });
    };

    const handleBlur = () => {
        phone.length > 1 && phone.length !== 11 && setErrorValidate(true);
    };

    const handleFocus = () => {
        setErrorValidate(false);
        resetErrorRequired && resetErrorRequired(false);
    };

    return (
        <div style={{ width: width ? width : '' }} className={s.root}>
            <InputMask
                className={classNames(s.input, errorValidate && s.input_error)}
                onBlur={handleBlur}
                onFocus={handleFocus}
                value={phone || ''}
                disabled={disabled}
                mask="+7 (999) 999-99-99"
                onPaste={handlePast}
                onChange={handleChangeValue}
                placeholder="+7"
            />

            <div
                className={classNames(
                    s.error,
                    (errorValidate || errorRequired) && s.error_vis
                )}
            >
                {errorValidate && <p>Введи корректный номер</p>}
                {errorRequired && <p>Заполни номер</p>}
            </div>
        </div>
    );
};

export default InputPhone;
