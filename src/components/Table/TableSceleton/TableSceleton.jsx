import { useEffect, useState } from 'react';
import classNames from 'classnames';

// Components
import Loader from 'components/TableSceleton/Loader/Loader';

import s from './TableSceleton.module.scss';

const TableSceleton = ({ isLoading, type }) => {
    const Row = type === 'approved' ? ApprovedRow : NotApprovedRow;

    return (
        <div className={classNames(s.root, isLoading && s.root_vis)}>
            {[...Array(40)].map((_, i) => (
                <>
                    <div className={s.line}></div>
                    <Row key={i} id={i} />
                </>
            ))}
        </div>
    );
};

const ApprovedRow = () => (
    <div className={classNames(s.gridRow, s.approved)} onClick={() => {}}>
        <div className={classNames(s.gridCell, s.columnCell)}>
            <div className={classNames(s.nameWrapper, s.labelBadge)}>
                <Loader height={14} width={200} />
                <Loader height={14} width={60} />
            </div>{' '}
            <div className={s.inn}>
                <Loader height={14} width={80} />
                <Loader height={14} width={80} />
            </div>
        </div>

        <div className={classNames(s.gridCell)}>
            <Loader height={14} width={44} />
        </div>

        <div className={classNames(s.gridCell, s.right)}>
            {' '}
            <Loader height={14} width={100} />
        </div>
        <div className={classNames(s.gridCell, s.right)}>
            {' '}
            <Loader height={14} width={100} />
        </div>
        <div className={classNames(s.gridCell, s.right)}>
            {' '}
            <Loader height={14} width={100} />
        </div>
        <div className={classNames(s.gridCell, s.right)}>
            {' '}
            <Loader height={14} width={60} />
        </div>

        <div className={classNames(s.gridCell)}>
            {' '}
            <Loader height={14} width={120} />
        </div>
        <div className={classNames(s.gridCell)}>
            {' '}
            <Loader height={14} width={250} />
        </div>
    </div>
);

const NotApprovedRow = () => (
    <div className={classNames(s.gridRow, s.notApproved)} onClick={() => {}}>
        <div className={classNames(s.gridCell, s.labelBadge)}>
            <Loader height={14} width={350} />
            <Loader height={14} width={80} />
        </div>
        <div className={classNames(s.gridCell, s.gray)}>
            <Loader height={14} width={400} />
        </div>
    </div>
);
export default TableSceleton;
