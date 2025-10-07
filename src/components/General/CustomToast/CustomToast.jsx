import { ReactComponent as IconClose } from 'assets/icons/iconClose.svg';
import { ReactComponent as IconDoneBlue } from 'assets/icons/iconDoneBlue.svg';
import { ReactComponent as IconWarning } from 'assets/icons/iconWarning.svg';
import s from './CustomToast.module.scss';
import './index.css';
import classNames from 'classnames';

const CustomToast = ({ closeToast, message, icon, type, buttonClose }) => {
    const typeClassMap = {
        error: s.notification_error,
        success: s.notification_success,
    };

    const defaultIcons = {
        success: <IconDoneBlue />,
        error: <IconWarning />,
    };
    const renderIcon = icon || defaultIcons[type];

    return (
        <div className={classNames(s.notification, typeClassMap[type])}>
            {renderIcon && <div className={s.icon}>{renderIcon}</div>}
            <p>{message}</p>
            {buttonClose && (
                <button className={s.close} onClick={closeToast}>
                    <IconClose />
                </button>
            )}
        </div>
    );
};

export default CustomToast;
