import formatAmount from 'utils/formatAmount';
import classNames from 'classnames';
import s from './FooterRow.module.scss';

const DetailsTableFooter = ({ data }) => {
  const { order_total, purchase_total, closing_total, transaction_total } = data;
  return (
    <div className={classNames(s.footerRow)}>
      <div className={classNames(s.gridCell, s.gray)} style={{ paddingLeft: '50px' }}>
        Всего
      </div>
      <div className={classNames(s.gridCell, s.right)}>{closing_total}</div>
      <div className={classNames(s.gridCell, s.right)}>{order_total}</div>
      <div className={classNames(s.gridCell, s.right)}>{purchase_total}</div>
      <div className={classNames(s.gridCell, s.right)}>{transaction_total}</div>
      <span></span>
    </div>
  );
};
export default DetailsTableFooter;
