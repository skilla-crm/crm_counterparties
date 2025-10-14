import { useState } from 'react';
import { ReactComponent as IconCopy } from 'assets/icons/iconCopy.svg';
import s from './InputText.module.scss';
import CopyButton from '../CopyButton/CopyButton';

const InputText = ({
    text,
    setText,
    disabled,
    placeholder,
    width,
    required,
    copyable = false,
    icon,
}) => {
    const [copied, setCopied] = useState(false);

    const handleText = (e) => {
        !disabled && setText(e.currentTarget.value);
    };

    return (
        <div
            className={s.wrapper}
            style={{
                width: width ? `${width}px` : '100%',
                flexShrink: width ? '0' : '',
            }}
        >
            <input
                disabled={disabled}
                className={s.input}
                onChange={handleText}
                value={text || ''}
                placeholder={placeholder}
                required={required}
                autoComplete="off"
            />
            {icon && <div className={s.copyIcon}>{icon}</div>}
            {copyable && (
                <CopyButton
                    textToCopy={text || ''}
                    className={s.copyIcon}
                    value={text}
                />
            )}
            {/* {copied && <span className={s.copied}>Скопировано!</span>} */}
        </div>
    );
};

export default InputText;
