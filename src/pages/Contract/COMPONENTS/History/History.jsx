// React
import { useState, useMemo } from 'react';

// Libs
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

// Icons
import { ReactComponent as IconChewron } from 'assets/icons/iconChewron.svg';

// Styles
import s from './History.module.scss';

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

    // сортировака по дате создания, новые сверху
    const sortedHistory = useMemo(() => {
        return [...history].sort(
            (a, b) => dayjs(b.created_at).unix() - dayjs(a.created_at).unix()
        );
    }, [history]);

    // Ограничиваем количество событий, если isOpen = false
    const displayedHistory = isOpen
        ? sortedHistory
        : sortedHistory.slice(0, 10);

    // Группировка по дате
    const groupedHistory = useMemo(() => {
        const groups = {};
        displayedHistory.forEach((item) => {
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
    }, [displayedHistory]);

    return (
        <div className={`${s.root} ${isOpen ? s.root_open : ''}`}>
            <h3>История изменений</h3>

            <div className={s.list}>
                {groupedHistory.map((group) => (
                    <div key={group.date} className={s.group}>
                        <div className={s.groupDate}>{group.label}</div>
                        <div className={s.items}>
                            {group.items.map((elem) => (
                                <HistoryItem key={elem.id} elem={elem} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {history.length > 10 && (
                <div
                    className={`${s.openBtn} ${isOpen ? 'active' : ''}`}
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

const HistoryItem = ({ elem }) => (
    <div className={s.item}>
        <div className={s.description}>{elem.short_description}</div>
        <div className={s.time}>{dayjs(elem.created_at).format('HH:mm')}</div>
    </div>
);
