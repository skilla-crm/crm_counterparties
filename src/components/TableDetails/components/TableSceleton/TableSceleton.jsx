import { useEffect, useState } from 'react';
import classNames from 'classnames';

// Components
import Loader from 'components/TableSceleton/Loader/Loader';

import s from './TableSceleton.module.scss';

const TableSceleton = ({ isLoading, type }) => {
  return (
    <div className={classNames(s.root, isLoading && s.root_vis)}>
      <div className={classNames(s.saldoRow)}>
        <Loader height={14} width={400} />
      </div>
      {[...Array(40)].map((_, i) => (
        <Row key={i} id={i} />
      ))}
    </div>
  );
};

const Row = ({ id }) => (
  <div className={classNames(s.gridRow, id % 2 === 0 && s.evenRow)}>
    <div className={classNames(s.gridCell, s.firstCell)}>
      <Loader height={14} width={64} />
    </div>
    <div className={classNames(s.gridCell, s.right)}>
      <Loader height={14} width={id % 2 === 0 ? 130 : 160} />
    </div>
    <div className={classNames(s.gridCell, s.right)}>
      <Loader height={14} width={id % 2 === 0 ? 130 : 160} />
    </div>
    <div className={classNames(s.gridCell, s.right)}>
      <Loader height={14} width={100} />
    </div>
    <div className={classNames(s.gridCell, s.right)}>
      <Loader height={14} width={150} />
    </div>
    <div className={classNames(s.gridCell)}>
      <Loader height={14} width={id % 2 === 0 ? 150 : 200} />
    </div>
  </div>
);

export default TableSceleton;
