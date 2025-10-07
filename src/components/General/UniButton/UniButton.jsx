import classNames from 'classnames';
import LoaderButton from 'components/General/UniButton/LoaderButton/LoaderButton';

import s from './UniButton.module.scss';

const UniButton = ({
  className = '',
  style = {},
  type = 'primary', // primary | outline | danger
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
      return <LoaderButton color={loaderColor} className={classNames(s.icon, s.loader)} />;
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
          <span>{text}</span>
        </div>
      )}
    </button>
  );
};

export default UniButton;
