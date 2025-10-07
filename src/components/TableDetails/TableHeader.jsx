// Styles
import s from './TableDetails.module.scss';
import classNames from 'classnames';

const TableHeader = () => {
  return (
    <div className={classNames(s.gridHeader, s.gridRow)}>
      <div>Дата</div>
      <div className={classNames(s.gridCell, s.justifyCell, s.updHeader)}>
        <span>Продажа</span>
        <span>Заказ</span>
      </div>

      <div className={classNames(s.gridCell, s.right)}>Покупка</div>
      <div className={classNames(s.gridCell, s.right)}>Транзакция</div>
      <div className={classNames(s.gridCell)}>Назначение платежа</div>
    </div>
  );
};

export default TableHeader;
