// React & libs
import React from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';

// Hooks
import { useModal } from 'hooks/useModal';

// Utils
import formatAmount from 'utils/formatAmount';

// Components
import Goal from 'components/General/Goal/Goal';
import OperationItem from 'components/TableDetails/components/OperationItem/OperationItem';
import RowListBlock from './components/RowListBlock/RowListBlock';

// Styles
import s from './TableDetails.module.scss';

const TableRow = ({ row, parentIndex, companyId }) => {
  const isEven = parentIndex % 2 === 0;
  const { date, orders, purchases, transactions, documents } = row;

  return (
    <div className={classNames(s.gridRow, { [s.evenRow]: isEven })}>
      <div className={s.gridCell}>{dayjs(date).format('DD.MM.YY')}</div>
      <RowListBlock list={documents} orders={orders} companyId={companyId} />
      <PurchasesBlock purchases={purchases} />
      <TransactionsBlock transactions={transactions} />
      <TransactionGoalsBlock transactions={transactions} />
    </div>
  );
};

export default TableRow;

const PurchasesBlock = ({ purchases }) => {
  return (
    <div className={s.purchaseContainer}>
      {purchases.map((purchase, i) => (
        <OperationItem
          key={purchase.id}
          amount={purchase.sum}
          subtitle={purchase.num ? `№${purchase.num}` : ''}
          disableHover={true}
        />
      ))}
    </div>
  );
};
const TransactionsBlock = ({ transactions }) => {
  const { showModal } = useModal();
  const handleOpenTransactionDetails = (id) => {
    showModal('TRANSACTION', { id: id });
  };
  return (
    <div className={classNames(s.transactionSumContainer)}>
      {transactions.map((transaction, i) => (
        <div
          className={s.operationItem}
          key={transaction.id}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <div
            onClick={() => {
              handleOpenTransactionDetails(transaction.id);
            }}
          >
            <span className={transaction.type === 'outcome' ? s.red : ''} type="button">
              {transaction.type === 'outcome' && '-'}
              {formatAmount(transaction.sum).slice(0, -3)}
            </span>
            <span className={s.gray}>{formatAmount(transaction.sum).slice(-3)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
const TransactionGoalsBlock = ({ transactions }) => {
  return (
    <div
      className={classNames(s.gridCell, s.gray)}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      {transactions.map((transaction, i) => (
        <div className={s.transactionItem} key={i}>
          <Goal text={transaction.goal} />
        </div>
      ))}
    </div>
  );
};
