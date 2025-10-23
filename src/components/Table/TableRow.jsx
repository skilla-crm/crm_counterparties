import classNames from 'classnames';

//components
import CompanyLabelBadge from 'components/General/CompanyLabelBadge/CompanyLabelBadge';

import UniButton from 'components/General/UniButton/UniButton';

//utils
import formatNumWithSpace from 'utils/formatNumWithSpace';

//hooks
import { useNavigate } from 'react-router-dom';
import { useModal } from 'hooks/useModal';

// icons
import { ReactComponent as SmileRed } from 'assets/icons/cardFilling/redSmile.svg';
import { ReactComponent as SmileGreen } from 'assets/icons/cardFilling/greenSmile.svg';
import { ReactComponent as SmileYellow } from 'assets/icons/cardFilling/yellowSmile.svg';

// styles
import s from './Table.module.scss';
import EllipsisWithTooltip from 'components/General/EllipsisWithTooltip/EllipsisWithTooltip';

const TableRow = ({ row, type }) => {
    const navigate = useNavigate();
    const { showModal } = useModal();

    const {
        employee_count,
        status,
        id,
        name,
        label,
        inn,
        kpp,
        notes,
        okved,
        is_hidden,
        revenue,
        share_of_partnership_revenue,
    } = row;

    const handleOpenDetails = (id) => {
        navigate(`/details/${id}`);
    };
    const renderApproved = () => {
        return (
            <div
                className={classNames(s.gridRow, s.approved)}
                onClick={() => {
                    handleOpenDetails(id);
                }}
            >
                <div className={classNames(s.gridCell, s.columnCell)}>
                    <div className={classNames(s.nameWrapper, s.labelBadge)}>
                        <EllipsisWithTooltip text={name} />
                        <CompanyLabelBadge label={label} />
                    </div>{' '}
                    <div className={s.inn}>
                        <div> {inn && `ИНН ${inn}`}</div>
                        <div> {kpp && `КПП${kpp}`}</div>
                    </div>
                </div>
                <div>
                    {Boolean(is_hidden) && (
                        <UniButton
                            text="Риск"
                            type="danger"
                            width={44}
                            style={{ height: '24px' }}
                            onClick={(id) => {
                                showModal('REMOVE_RISK_BADGE', { id });
                            }}
                        />
                    )}
                </div>
                <div className={classNames(s.gridCell)}>{okved}</div>

                <div className={classNames(s.gridCell, s.right)}>
                    {share_of_partnership_revenue}
                </div>
                <div className={classNames(s.gridCell, s.right)}>
                    {formatNumWithSpace(revenue)}
                </div>
                <div className={classNames(s.gridCell, s.right)}>
                    {formatNumWithSpace(employee_count)}
                </div>
                <div className={classNames(s.gridCell)}>
                    <Badge status={status} />
                </div>

                <div className={classNames(s.gridCell)}>
                    <EllipsisWithTooltip text={notes} />
                </div>
                {/* <div className={classNames(s.gridCell, s.center)}>
                        <CardFilling filling={filling} />
                    </div> */}
            </div>
        );
    };

    const renderNotApproved = () => {
        const { id, sum, name, label, notes } = row;

        return (
            <div
                className={classNames(s.gridRow, s.notApproved)}
                onClick={() => {
                    handleOpenDetails(id);
                }}
            >
                <div className={classNames(s.gridCell, s.labelBadge)}>
                    <div>
                        <EllipsisWithTooltip text={name} />{' '}
                    </div>
                    <CompanyLabelBadge label={label} />
                </div>
                <div className={classNames(s.gridCell, s.gray)}>
                    <EllipsisWithTooltip text={notes} />{' '}
                </div>
            </div>
        );
    };

    if (type === 'approved') return renderApproved();
    if (type === 'notApproved') return renderNotApproved();

    return null;
};

export default TableRow;

const CardFilling = ({ filling }) => {
    let state;

    if (filling >= 80) {
        state = 1;
    } else if (filling >= 60) {
        state = 2;
    } else {
        state = 3;
    }

    switch (state) {
        case 1:
            return <SmileGreen />;
        case 2:
            return <SmileYellow />;
        case 3:
            return <SmileRed />;
        default:
            return null;
    }
};

const Badge = ({ status }) => {
    switch (status) {
        case 'ACTIVE':
            return (
                <div className={classNames(s.badge, s.badge_green)}>
                    Действующий
                </div>
            );
        case 'LIQUIDATING':
            return (
                <div className={classNames(s.badge, s.badge_yellow)}>
                    Ликвидация
                </div>
            );
        case 'REORGANIZING':
            return (
                <div className={classNames(s.badge, s.badge_yellow)}>
                    Реорганизация
                </div>
            );
        case 4:
            return (
                <div className={classNames(s.badge, s.badge_red)}>
                    Исключен из ЕГРЮЛ
                </div>
            );

        case 'LIQUIDATED':
            return (
                <div className={classNames(s.badge, s.badge_red)}>
                    Ликвидирован
                </div>
            );
        case 6:
            return (
                <div className={classNames(s.badge, s.badge_red)}>
                    Прекратил деятельность
                </div>
            );
        case 'BANKRUPT':
            return (
                <div className={classNames(s.badge, s.badge_red)}>
                    Исключается из ЕГРЮЛ
                </div>
            );
        case 7:
            return (
                <div className={classNames(s.badge, s.badge_red)}>
                    Недейств. регистрация
                </div>
            );
        // case 'BANKRUPT':
        //     return (
        //         <div className={classNames(s.badge, s.badge_red)}>
        //             Банкротство
        //         </div>
        //     );
        default:
            return null;
    }
};
