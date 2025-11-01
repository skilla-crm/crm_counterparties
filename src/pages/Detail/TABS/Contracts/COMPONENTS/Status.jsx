// External
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';

//Components
import TooltipProgress from './ProgressTooltip';

// Icons
import { ReactComponent as IconTime } from 'assets/icons/iconTime.svg';
import { ReactComponent as IconDoneWhite } from 'assets/icons/iconDoneWhite.svg';

// Styles
import s from './Status.module.scss';

const Status = ({ lastLines, exchange }) => {
    const [openTooltip, setOpenTooltip] = useState(false);
    const [firstString, setFirstString] = useState('');
    const [secondString, setSecondString] = useState('');

    const handleOpenTooltip = () => {
        (exchange?.send === 1 || exchange?.sign === 1) && setOpenTooltip(true);
        const position =
            exchange?.person?.position === 'director'
                ? 'Руководитель'
                : exchange?.person?.position === 'accountant'
                  ? 'Бухгалтер'
                  : 'Менеджер';
        if (exchange?.send === 1 && exchange?.sign !== 1) {
            setFirstString(
                `Отправлен ${dayjs(exchange?.send_date).format('DD.MM.YY')}`
            );
            exchange?.person?.id &&
                setSecondString(
                    `${position} ${exchange?.person?.name} ${exchange?.person?.surname}`
                );
            return;
        }

        if (exchange?.send === 1 && exchange?.sign === 1) {
            setFirstString(
                `Подписан ${dayjs(exchange?.sign_date).format('DD.MM.YY')}`
            );
            exchange?.person?.id &&
                setSecondString(
                    `${position} ${exchange?.person?.name} ${exchange?.person?.surname}`
                );
            return;
        }
    };

    const handleCloseTooltip = () => {
        setOpenTooltip(false);
    };
    return (
        <div
            onMouseEnter={handleOpenTooltip}
            onMouseLeave={handleCloseTooltip}
            className={classNames(
                s.status,
                exchange?.send === 1 && exchange?.sign !== 1 && s.status_1,
                exchange?.send === 1 && exchange?.sign === 1 && s.status_2
            )}
        >
            {exchange?.send !== 1 && exchange?.sign !== 1 && (
                <p>Не отправлен</p>
            )}
            {exchange?.send === 1 &&
                exchange?.sign !== 1 &&
                exchange?.send_type !== 'edo' && (
                    <p>
                        <IconTime /> На бумаге{' '}
                    </p>
                )}
            {exchange?.send === 1 &&
                exchange?.sign !== 1 &&
                exchange?.send_type === 'edo' && (
                    <p>
                        <IconTime /> ЭДО
                    </p>
                )}
            {exchange?.send === 1 &&
                exchange?.sign === 1 &&
                exchange?.sign_type !== 'edo' && (
                    <p>
                        <IconDoneWhite /> На бумаге{' '}
                    </p>
                )}
            {exchange?.send === 1 &&
                exchange?.sign === 1 &&
                exchange?.sign_type === 'edo' && (
                    <p>
                        <IconDoneWhite /> ЭДО
                    </p>
                )}
            <TooltipProgress
                lastLines={lastLines}
                isStatus={true}
                open={openTooltip}
                firstString={firstString}
                secondString={secondString}
            />
        </div>
    );
};

export default Status;
