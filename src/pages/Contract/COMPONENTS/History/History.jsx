import { useState, useMemo } from 'react';
import s from './History.module.scss';
import { ReactComponent as IconChewron } from 'assets/icons/iconChewron.svg';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');
function getDateLabel(dateString) {
    const date = dayjs(dateString);
    const today = dayjs();
    const yesterday = dayjs().subtract(1, 'day');

    if (date.isSame(today, 'day')) return 'Сегодня';
    if (date.isSame(yesterday, 'day')) return 'Вчера';
    return date.format('D MMMM YYYY');
}

const History = ({ history = [] }) => {
    const [isOpen, setIsOpen] = useState(false);

    const groupedHistory = useMemo(() => {
        const groups = {};

        history.forEach((item) => {
            const date = dayjs(item.created_at).format('YYYY-MM-DD');
            if (!groups[date]) groups[date] = [];
            groups[date].push(item);
        });

        const sortedDates = Object.keys(groups).sort(
            (a, b) => dayjs(b).unix() - dayjs(a).unix()
        );

        return sortedDates.map((date) => ({
            date,
            label: getDateLabel(date),
            items: groups[date],
        }));
    }, [history]);

    const displayedGroups = isOpen
        ? groupedHistory
        : groupedHistory.slice(0, 2);

    return (
        <div className={s.root}>
            <h3>История изменений</h3>

            <div className={s.list}>
                {displayedGroups.map((group) => (
                    <div key={group.date} className={s.group}>
                        <div className={s.groupDate}>{group.label}</div>
                        {group.items.map((elem) => (
                            <HistoryItem key={elem.id} elem={elem} />
                        ))}
                    </div>
                ))}
            </div>

            {groupedHistory.length > 6 && (
                <div
                    className={`${s.openBtn} ${isOpen ? s.active : ''}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? 'Свернуть' : 'Развернуть'}
                    <IconChewron className={s.icon} />
                </div>
            )}
        </div>
    );
};

export default History;

const HistoryItem = ({ elem }) => {
    console.log('elem', elem);
    return (
        <div className={s.item}>
            <div className={s.time}>
                {dayjs(elem.created_at).format('HH:mm')}
            </div>
            <div className={s.text}>{elem.description}</div>
        </div>
    );
};
