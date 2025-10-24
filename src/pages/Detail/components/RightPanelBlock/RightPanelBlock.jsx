// External
import classNames from 'classnames';
import dayjs from 'dayjs';

// Utils
import formatNumWithSpace from 'utils/formatNumWithSpace';

// Components
import EllipsisWithTooltip from 'components/General/EllipsisWithTooltip/EllipsisWithTooltip';

// Icons
import { ReactComponent as IconArrowRight } from 'assets/icons/iconTopRight.svg';

// Styles
import s from './RightPanelBlock.module.scss';

const RightPanelBlock = ({ list = [], title, navigateTo }) => {
    if (!Array.isArray(list) || list.length === 0) return null;

    const RowComponent =
        {
            Заказы: ListRowOrders,
            Транзакции: ListRowTransaction,
            Документы: ListRowDocs,
        }[title] || ListRowDocs;

    return (
        <div className={s.rightPanelBlock}>
            <h3 className={s.title}>{title}</h3>
            <div className={s.list}>
                {' '}
                {list.map((elem) => (
                    <RowComponent key={elem.id} elem={elem} />
                ))}
            </div>
            {title === 'Документы' ? (
                <div className={s.links}>
                    <div className={s.link} onClick={navigateTo}>
                        <IconArrowRight onClick={navigateTo} />
                        Все счета
                    </div>
                    <div className={s.link} onClick={navigateTo}>
                        <IconArrowRight onClick={navigateTo} />
                        Все упд
                    </div>
                    <div className={s.link} onClick={navigateTo}>
                        <IconArrowRight onClick={navigateTo} />
                        Все акты
                    </div>
                </div>
            ) : (
                <div className={s.link} onClick={navigateTo}>
                    <IconArrowRight onClick={navigateTo} />
                    Посмотреть все
                </div>
            )}
        </div>
    );
};

const ListRowOrders = ({ elem }) => {
    const { id, sum, date, address } = elem;

    return (
        <div className={s.listRow} key={id}>
            <div className={s.leftColumn}>
                <span>{dayjs(date).format('DD.MM.YYYY')}</span>
                <EllipsisWithTooltip text={address} />
            </div>
            <div className={classNames(s.rightColumn)}>
                {formatNumWithSpace(sum)}
            </div>
        </div>
    );
};
const ListRowTransaction = ({ elem }) => {
    const { id, sum, date, goal, type } = elem;

    return (
        <div className={s.listRow} key={id}>
            <div className={s.leftColumn}>
                <span>{dayjs(date).format('DD.MM.YYYY')}</span>
                <EllipsisWithTooltip text={goal} />
            </div>
            <div
                className={classNames(
                    s.rightColumn,
                    type === 'income' && s.greenText
                )}
            >
                {sum && (
                    <span>{`${type === 'outcome' ? '-' : '+'}${formatNumWithSpace(sum)}`}</span>
                )}
            </div>
        </div>
    );
};

const ListRowDocs = ({ elem }) => {
    const { id, sum, date, type, num } = elem;
    const TYPES = {
        0: 'СЧЕТ',
        1: 'АКТ',
        2: 'УПД',
    };
    return (
        <div className={s.listRow} key={id}>
            <div className={s.leftColumn}>
                <span>{dayjs(date).format('DD.MM.YYYY')}</span>
                <span>{`${TYPES[type]} №${num}`}</span>
            </div>
            <div className={classNames(s.rightColumn)}>
                {' '}
                {formatNumWithSpace(sum)}
            </div>
        </div>
    );
};
export default RightPanelBlock;
