//utils
import formatAmount from 'utils/formatAmount';
//styles
import s from './Saldo.module.scss';
const SaldoInfo = ({ text, amount, type }) => {
  return (
    <>
      {type === 'top' && <div className={s.line}></div>}
      <div className={s.toplineRoot}>
        <div className={s.toplineContent}>
          <span className={s.toplineTitle}>{text}</span>
          <span className={s.toplineSum}>{amount}</span>
        </div>
      </div>
      {type === 'top' && <div className={s.line}></div>}
    </>
  );
};

export default SaldoInfo;


