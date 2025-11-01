import { ReactComponent as IconUp } from 'assets/icons/iconUp.svg';
import classNames from 'classnames';
import s from './ProgressTooltip.module.scss';
const TooltipProgress = ({
    isStatus,
    lastLines,
    open,
    firstString,
    secondString,
}) => {
    return (
        <div
            className={classNames(
                s.tooltip,
                s.tooltip_progress,
                isStatus && s.tooltip_status,
                open && s.tooltip_open,
                lastLines && s.tooltip_last
            )}
        >
            <IconUp />
            {firstString !== '' && <p>{firstString}</p>}
            {secondString !== '' && <p>{secondString}</p>}
        </div>
    );
};
export default TooltipProgress;
