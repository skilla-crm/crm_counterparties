import React from 'react';

import classNames from 'classnames';

// Styless
import s from './Transaction.module.scss';
//components
import Goal from 'components/General/Goal/Goal';

const PaymentDetails = ({ payer, receiver, data }) => {
  const typeTransactionMap = {
    income: 'Поступление',
    outcome: 'Платеж',
    refund_income: 'Возврат поступления',
    refund_outcome: 'Возврат платежа',
  };

  const fields = [
    ['Наименование', 'name'],
    ['ИНН', 'inn'],
    ['КПП', 'kpp'],
    ['Банк', 'bank'],
    ['БИК', 'bik'],
    ['Корр. счет', 'ks'],
    ['Расчетный счет', 'rs'],
  ];

  const summaryData = [
    ['Сумма', data?.sum],
    ['Тип транзакции', typeTransactionMap[data?.type]],
    ['Вид', data?.kind],
    ['Назначение', data?.goal],
  ];

  const renderSummaryBlock = () => (
    <div className={s.paymentSummary}>
      <div className={s.sectionSubtitle}>Детали платежа из выписки</div>
      {summaryData.map(([label, value], index) => (
        <div key={index} className={s.paymentsRow}>
          <div className={s.paymentsLabel}>{label}</div>
          {label === 'Назначение' && (
            <div className={classNames(s.content, s.content_2)}>
              <Goal text={value?.toString().trim() || '—'} />
            </div>
          )}
          {label !== 'Назначение' && (
            <div className={s.content}>{value?.toString().trim() || '—'}</div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className={s.paymentDetails}>
      {/* {isSummaryFirst && renderSummaryBlock()} */}

      <div className={classNames(s.row, s.gridHeader)}>
        <div></div>
        <div>Плательщик</div>
        <div>Получатель</div>
      </div>
      <div className={s.gridInfo}>
        {fields.map(([label, key], index) => (
          <div key={index} className={s.row}>
            <div className={s.label}>{label}</div>
            <div>{payer?.[key]?.toString().trim() || '—'}</div>
            <div>{receiver?.[key]?.toString().trim() || '—'}</div>
          </div>
        ))}
      </div>
      {renderSummaryBlock()}
      {/* {!isSummaryFirst && renderSummaryBlock()} */}
    </div>
  );
};
export default PaymentDetails;
