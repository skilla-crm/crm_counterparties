import { useEffect, useRef, useState, useCallback } from 'react';
import classNames from 'classnames';

// icons
import { ReactComponent as IconChevron } from 'assets/icons/iconChewron.svg';

// styles
import s from './Dropdown.module.scss';

const Dropdown = ({
    options = [],
    value = '',
    onChange = () => {},
    placeholder = '',
    sub,
    disabled = false,
    renderOption,
    width,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    const hasOptions = options.length > 0;

    const toggleDropdown = () => {
        if (!disabled && hasOptions) setIsOpen((prev) => !prev);
    };

    const handleOptionClick = (option) => {
        onChange(option);
        setIsOpen(false);
    };

    const wrapperStyle =
        width && typeof width === 'number' ? { width: `${width}px` } : {};

    return (
        <div className={s.root} ref={wrapperRef} style={wrapperStyle}>
            {sub && <span className={s.sub}>{sub}</span>}

            <div
                className={classNames(
                    s.field,
                    disabled && s.field_disabled,
                    disabled && s.field_disabledover
                )}
                onClick={toggleDropdown}
            >
                <span
                    className={classNames({
                        [s.value]: value,
                        [s.placeholder]: !value,
                    })}
                >
                    {value || placeholder}
                </span>

                {hasOptions && !disabled && (
                    <IconChevron
                        className={classNames(
                            s.chewron,
                            isOpen && s.chewron_open
                        )}
                    />
                )}
            </div>

            {hasOptions && isOpen && (
                <ul
                    className={classNames(
                        s.block,
                        isOpen && s.block_open,
                        options.length > 6 && s.block_scroll
                    )}
                    style={wrapperStyle}
                >
                    <div className={s.list}>
                        {options.map((option, i) => (
                            <div
                                key={i}
                                className={classNames(s.option, {
                                    [s.selected]: option === value,
                                })}
                                onClick={() => handleOptionClick(option)}
                            >
                                {renderOption ? renderOption(option) : option}
                            </div>
                        ))}
                    </div>
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
