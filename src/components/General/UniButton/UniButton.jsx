import classNames from 'classnames';
import LoaderButton from 'components/General/UniButton/LoaderButton/LoaderButton';

import s from './UniButton.module.scss';

const UniButton = ({
    hidden,
    className = '',
    style = {},
    type = 'primary', // primary | outline | danger | primaryRed
    iconPosition = 'left', // left | right
    icon: Icon,
    text,
    width,
    height,
    children,
    onClick,
    disabled = false,
    isLoading = false,
    loaderColor = '#fff',
}) => {
    const buttonStyle = {
        ...(width && { width: `${width}px` }),
        ...(height && { height: `${height}px` }),
        ...style,
    };

    const renderIcon = () => {
        if (isLoading) {
            return (
                <div className={classNames(s.icon, s.loader)}>
                    <LoaderButton

                        color={loaderColor}

                    />
                </div>

            );
        }

        return Icon ? <Icon className={s.icon} /> : null;
    };

    return (
        <button
            className={classNames(
                s.button,

                s[`button_${type}`],
                { [s.button_disabled]: disabled },
                { [s.button_loading]: isLoading },
                { [s.button_hidden]: hidden },
                className
            )}
            style={buttonStyle}
            onClick={(e) => onClick?.(e)}
            disabled={disabled}
        >
            {children ? (
                children
            ) : (
                <div
                    className={classNames(s.content, {
                        [s.icon_left]: iconPosition === 'left',
                        [s.icon_right]: iconPosition === 'right',
                    })}
                >
                    {renderIcon()}
                    {text && <span className={s.text}>{text}</span>}
                </div>
            )}
        </button>
    );
};

export default UniButton;

<button></button>;
