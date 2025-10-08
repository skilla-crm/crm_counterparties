import 'react-toastify/dist/ReactToastify.css';

// Styles
import s from './Table.module.scss';
import classNames from 'classnames';

const TableHeader = ({ type }) => {
    if (type === 'approved') {
        return (
            <div
                className={classNames(s.gridHeader, s.approved)}
                key={'approved'}
            >
                <div className={classNames(s.gridCell, s.justifyCell)}>
                    Наименование
                </div>
                <div className={classNames(s.gridCell)}></div>
                <div className={classNames(s.gridCell)}>Основной ОКВЕД </div>
                <div className={classNames(s.gridCell)}>
                    Доля от моей выручки, %
                </div>
                <div className={classNames(s.gridCell, s.right)}>
                    Выручка ЕГРЮЛ
                </div>
                <div className={classNames(s.gridCell, s.right)}>ССЧ, чел</div>
                <div className={classNames(s.gridCell, s.right)}>
                    Статус ЕГРЮЛ{' '}
                </div>
                <div className={classNames(s.gridCell, s.center)}>
                    Примечание
                </div>
                <div className={classNames(s.gridCell, s.center)}>Карточка</div>
            </div>
        );
    }

    if (type === 'notApproved') {
        return (
            <div
                className={classNames(s.gridHeader, s.notApproved)}
                key={'notApproved'}
            >
                <div>Наименование</div>
                <div>Примечание</div>
            </div>
        );
    }

    return null;
};

export default TableHeader;
