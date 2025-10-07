import React from 'react';

//utils
import formatAmount from 'utils/formatAmount';

//styles
import classNames from 'classnames';
import s from './OperationItem.module.scss';

const OperationItem = ({ onClick, amount, subtitle, disableHover }) => {
  return (
    <div
      className={classNames(!disableHover ? s.operationItem : s.operationItemNoHover)}
      onClick={onClick}
    >
      <div>
        <span>{formatAmount(amount).slice(0, -3)}</span>
        <span className={s.gray}>{formatAmount(amount).slice(-3)}</span>
      </div>
      {subtitle && <div className={s.gray}>{subtitle}</div>}
    </div>
  );
};
export default OperationItem;
