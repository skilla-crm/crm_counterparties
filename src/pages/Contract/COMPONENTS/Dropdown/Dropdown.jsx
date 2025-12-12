import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

// icons
import { ReactComponent as IconChevron } from 'assets/icons/iconChewron.svg';

// styles
import s from './Dropdown.module.scss';


const isValidField = (field) => {
    if (field === null || field === undefined) {
        return false;
    }
    const stringValue = String(field).trim();
    return stringValue !== '' && stringValue !== '0';
};

const Dropdown = ({
    sub = '',
    options = [],
    value = null,
    onChange = () => { },
    placeholder = '',
    width,
    renderOption,
    type = 'company', // 'company' | 'account'  | 'type' | 'person
    disabled = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    const hasOptions = options.length > 0;
    const hasSelectedValue = !!value?.id || !!value;
    const canOpen = hasOptions && (!hasSelectedValue || options.length > 1);

    const toggleDropdown = () => {
        if (disabled || !canOpen) return;
        setIsOpen((prev) => !prev);
    };

    const handleOptionClick = (option) => {
        if (disabled) return;
        onChange(option);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    useEffect(() => {
        if (!disabled && options.length > 0 && !hasSelectedValue) {
            onChange(options[0]);
        }
    }, [options, hasSelectedValue, disabled]);

    const wrapperStyle =
        width && typeof width === 'number' ? { width: `${width}px` } : {};

    const formatInnKpp = (inn, kpp) => {
        const parts = [];
        if (isValidField(inn)) {
            parts.push(`ИНН ${inn}`);
        }
        if (isValidField(kpp)) {
            parts.push(`КПП ${kpp}`);
        }
        return parts.join(' ');
    };

    // Отображение выбранного значения
    const renderValue = () => {
        if (!value) return placeholder;
        if (disabled && placeholder && !isValidField(value?.id ?? value)) {
            return placeholder;
        }

        switch (type) {
            case 'company':
                return (
                    <div className={s.optionCompany}>
                        <div className={s.companyName}>{value.name ?? ''}</div>
                        {formatInnKpp(value?.inn, value?.kpp) && (
                            <div className={s.companyDetails}>
                                {formatInnKpp(value?.inn, value?.kpp)}
                            </div>
                        )}
                    </div>
                );
            case 'account':
                return (
                    <div className={s.optionAccount}>
                        <div className={s.accountName}>{value.bank ?? ''}</div>
                        <div>{`*${value?.rs?.slice(-4)}`}</div>
                    </div>
                );
            case 'type':
                return (
                    <div className={s.optionType}>
                        {/*  <div className={s.optionTypeIcon}></div> */}
                        <p className={s.text}>{value?.type_name ?? ''}</p>
                        {value?.is_delete && <Label text="Архив" disabled={disabled} />}
                        {value?.default === 1 && <Label text="Стандартный" disabled={disabled} />}
                        {String(value?.active) == '0' && value?.default !== 1 && <Label text="Не активный" disabled={disabled} />}
                    </div>
                );

            case 'person':
                return (
                    <div className={s.optionPerson}>
                        {`${value?.surname ?? ''} ${value?.name ?? ''} ${value?.patronomyc ?? ''}`}
                    </div>
                );
            default:
                return value?.toString?.() || placeholder;
        }
    };

    // Список опций
    const renderOptionsList = () =>
        options.map((option) => {
            let content;

            if (renderOption) {
                content = renderOption(option);
            } else {
                switch (type) {
                    case 'company':
                        content = (
                            <div className={s.optionCompany}>
                                <div className={s.companyName}>
                                    {option.name ?? ''}
                                </div>
                                {formatInnKpp(option?.inn, option?.kpp) && (
                                    <div className={s.companyDetails}>
                                        {formatInnKpp(option?.inn, option?.kpp)}
                                    </div>
                                )}
                            </div>
                        );
                        break;
                    case 'account':
                        content = (
                            <div className={s.optionAccount}>
                                <div className={s.accountName}>
                                    {option.bank ?? ''}
                                </div>
                                <div>{`*${option?.rs?.slice(-4)}`}</div>
                            </div>
                        );

                        break;

                    case 'type':
                        content = (
                            <div key={option?.id} id={option?.id} className={s.optionType}>
                                <p className={s.text}>{option?.type_name ?? ''}</p>
                                {option?.is_delete ? <Label text="Архив" /> : ''}
                                {option?.default === 1 && <Label text="Стандартный" disabled={disabled} />}
                                {String(option?.active) === '0' && option?.default !== 1 && <Label text="Не активный" disabled={disabled} />}
                            </div>
                        );
                        break;

                    case 'person':
                        content = (
                            <div className={s.optionPerson}>
                                {`${option?.surname ?? ''} ${option?.name ?? ''} ${option?.patronomyc ?? ''}`}
                            </div>
                        );
                        break;
                    default:
                        content = option?.toString() || '';
                        break;
                }
            }

            const isSelected = value?.id === option.id;

            return (
                <div
                    id={option.id}
                    key={option.id}
                    className={classNames(s.option, {
                        [s.selected]: isSelected,
                    })}
                    onClick={() => handleOptionClick(option)}
                >
                    {content}
                </div>
            );
        });

    return (
        <div className={classNames(s.root, !canOpen && s.root_disabled)} style={wrapperStyle} ref={wrapperRef}>
            {sub && <div className={s.sub}>{sub}</div>}

            <div
                className={classNames(s.field, disabled && s.field_disabled)}
                onClick={toggleDropdown}
            >
                {renderValue()}
                {!disabled && canOpen && (
                    <IconChevron
                        className={classNames(
                            s.chevron,
                            isOpen && s.chevron_open
                        )}
                    />
                )}
            </div>

            {hasOptions && isOpen && !disabled && (
                <ul
                    className={classNames(
                        s.block,
                        options.length > 6 && s.block_scroll,
                        s.block_open
                    )}
                >
                    <div className={s.list}>{renderOptionsList()}</div>
                </ul>
            )}
        </div>
    );
};

export default Dropdown;

const Label = ({ text, disabled }) => {
    return (
        <div className={classNames(s.label, disabled && s.label_disabled)}>
            {text}
        </div>
    );
};