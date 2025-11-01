// External
import { useState } from 'react';
import classNames from 'classnames';

// Icons
import { ReactComponent as IconUp } from 'assets/icons/iconUp.svg';

// Styles
import dayjs from 'dayjs';

import s from './Progress.module.scss';
import TooltipProgress from './ProgressTooltip';

const Progress = ({ lastLines, progress }) => {
    const [openTooltip, setOpenTooltip] = useState('');

    const handleOpenTooltip = (num) => {
        setOpenTooltip(num);
    };

    const handleCloseTooltip = () => {
        setOpenTooltip('');
    };

    return (
        <div className={s.line}>
            <div
                id={1}
                className={classNames(
                    s.bar,
                    progress?.first?.date && s.bar_active
                )}
                onMouseEnter={() => handleOpenTooltip(1)}
                onMouseLeave={handleCloseTooltip}
            >
                <TooltipProgress
                    id={1}
                    lastLines={lastLines}
                    open={openTooltip === 1}
                    firstString={`Создан ${dayjs(progress?.first?.date).format('DD.MM.YY в HH:mm')}`}
                    secondString={`${progress?.first?.person?.position === 'director' ? 'Руководитель' : 'Бухгалтер'} ${progress?.first?.person?.name} ${progress?.first?.person?.surname}`}
                />
            </div>
            <div
                id={2}
                className={classNames(
                    s.bar,
                    progress?.second?.date && s.bar_active
                )}
                onMouseEnter={() => handleOpenTooltip(2)}
                onMouseLeave={handleCloseTooltip}
            >
                <TooltipProgress
                    id={2}
                    lastLines={lastLines}
                    open={openTooltip === 2}
                    firstString={`Отправлен на e-mail ${dayjs(progress?.second?.date).format('DD.MM.YY в HH:mm')}`}
                    secondString={`${progress?.second?.person?.position === 'director' ? 'Руководитель' : 'Бухгалтер'} ${progress?.second?.person?.name} ${progress?.second?.person?.surname}`}
                />
            </div>
            <div
                id={3}
                className={classNames(
                    s.bar,
                    progress?.third?.date && s.bar_active
                )}
                onMouseEnter={() => handleOpenTooltip(3)}
                onMouseLeave={handleCloseTooltip}
            >
                <TooltipProgress
                    id={3}
                    lastLines={lastLines}
                    open={openTooltip === 3}
                    firstString={`Просмотрен ${dayjs(progress?.third?.date).format('DD.MM.YY в HH:mm')}`}
                    secondString={''}
                />
            </div>
        </div>
    );
};

export default Progress;
