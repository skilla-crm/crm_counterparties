// React
import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

// Components
import TableSceleton from './components/TableSceleton/TableSceleton';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import DetailsTableFooter from './components/FooterRow/FooterRow';
import SaldoInfo from './components/Saldo/Saldo';

// Styles
import s from './TableDetails.module.scss';

const TableDetails = ({ type, anim, isLoading, error, total, list, companyId, saldoCompanies }) => {
  const { dateStartPicker } = useSelector((state) => state.dateRange || {});
  if (error)
    return (
      <div className={s.error}>
        <div className={s.error}>
          {error?.data?.message || error?.error || 'Произошла ошибка...'}
        </div>
      </div>
    );
  if (list.length === 0 && !isLoading) {
    return <div className={s.noData}> По вашему запросу ничего не найдено</div>;
  }

  return (
    <>
      <div className={s.overlay}>
        <TableSceleton isLoading={isLoading} type={type} />
        <div className={classNames(s.root, anim && s.root_anim, isLoading && s.root_fetch)}>
          <TableHeader />

          <div className={s.scrollBody} id="scrollableDiv">
            <SaldoInfo
              text={`Сальдо начальное в пользу ${parseInt(total?.start_balance) > 0 ? saldoCompanies.companyForHeader.name : saldoCompanies.company?.name}`}
              amount={(total?.start_balance || '').toString().replace('-', '')}
              type={'top'}
            />
            {list.map((row, i) => {
              return (
                <React.Fragment key={row.id || i}>
                  <TableRow row={row} type={type} parentIndex={i} companyId={companyId} />
                </React.Fragment>
              );
            })}
            <SaldoInfo
              text={`Сальдо конечное в пользу ${parseInt(total?.end_balance) > 0 ? saldoCompanies.companyForHeader.name : saldoCompanies.company?.name}`}
              amount={(total?.end_balance || 0).toString().replace('-', '')}
              type={'bottom'}
            />
          </div>

        </div>
      </div>
      <DetailsTableFooter data={total} />
    </>

  );
};

export default TableDetails;
