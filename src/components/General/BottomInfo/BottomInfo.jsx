import formatAmount from 'utils/formatAmount';
import s from './BottomInfo.module.scss';
import classNames from 'classnames';
const BottomInfo = ({ isOpen, sum }) => {
  return (
    <div className={classNames(s.root, isOpen && s.root_open)}>
      <span className={s.text}>{`Общая сумма задолженности ${formatAmount(sum)}`}</span>
    </div>
  );
};
export default BottomInfo;
