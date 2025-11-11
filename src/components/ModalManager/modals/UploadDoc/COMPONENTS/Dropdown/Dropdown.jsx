import { useEffect, useRef, useState, useCallback } from 'react';
import classNames from 'classnames';

// icons
import { ReactComponent as IconChevron } from 'assets/icons/iconChewron.svg';

// styles
import s from './Dropdown.module.scss';

const Dropdown = ({
    options = [],
    value = null, // объект или id
    onChange = () => {},
    placeholder = 'Выберите...',
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

    const wrapperStyle =
        width && typeof width === 'number' ? { width: `${width}px` } : {};

    const selectedName = value
        ? typeof value === 'object'
            ? value.name
            : options.find((opt) => opt.id === value)?.name
        : '';

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
                        [s.value]: selectedName,
                        [s.placeholder]: !selectedName,
                    })}
                >
                    {selectedName || placeholder}
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
                        {options.map((option) => (
                            <div
                                key={option.id}
                                className={classNames(s.option, {
                                    [s.selected]:
                                        value &&
                                        (value.id === option.id ||
                                            value === option.id),
                                })}
                                onClick={() => handleOptionClick(option)}
                            >
                                {renderOption
                                    ? renderOption(option)
                                    : option.name}
                            </div>
                        ))}
                    </div>
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
