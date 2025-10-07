import { useEffect, useState } from 'react';
import classNames from 'classnames';

// Components
import Loader from 'components/TableSceleton/Loader/Loader';

import s from './TableSceleton.module.scss';

const TableSceleton = ({ isLoading, type }) => {
  const Row = type === 'clientsDebts' ? ClientsRow : OurDebtsRow;

  return (
    <div className={classNames(s.root, isLoading && s.root_vis)}>
      {[...Array(40)].map((_, i) => (
        <Row key={i} />
      ))}
    </div>
  );
};

const ClientsRow = () => (
  <div className={classNames(s.gridRow, s.clientsDebts)}>
    <div className={classNames(s.gridCell, s.firstCell)}>
      <Loader height={14} width={240} />
    </div>
    <div className={classNames(s.gridCell)}>
      <Loader height={14} width={100} />
    </div>
    <div className={classNames(s.gridCell)}>
      <Loader height={14} width={90} />
    </div>
    <div className={classNames(s.gridCell, s.right)}>
      <Loader height={14} width={90} />
    </div>
    <div className={classNames(s.gridCell, s.right)}>
      <Loader height={14} width={90} />
    </div>
    <div className={classNames(s.gridCell, s.right)}>
      <Loader height={14} width={90} />
    </div>
    <div style={{justifyContent: 'center'}} className={classNames(s.gridCell)}>
      <Loader height={14} width={50} />
    </div>
    <div className={classNames(s.gridCell)}>
      <Loader height={14} width={160} />
    </div>
    <div style={{justifyContent: 'center'}}  className={classNames(s.gridCell)}>
      <Loader height={14} width={70} />
    </div>
   {/*  <div className={classNames(s.gridCell)}>
      <Loader height={14} width={70} />
    </div> */}
  </div>
);

const OurDebtsRow = () => (
  <div className={classNames(s.gridRow, s.ourDebts)}>
    <div className={classNames(s.gridCell)}>
      <Loader height={14} width={220} />
    </div>
    <div className={classNames(s.gridCell)}>
      <Loader height={14} width={120} />
    </div>
    <div className={classNames(s.gridCell)}>
      <Loader height={14} width={100} />
    </div>
    <div className={classNames(s.gridCell)}>
      <Loader height={14} width={180} />
    </div>
    <div className={classNames(s.gridCell)}>
      <Loader height={14} width={60} />
    </div>
    <div className={classNames(s.gridCell)}>
      <Loader height={14} width={90} />
    </div>
  </div>
);
export default TableSceleton;
