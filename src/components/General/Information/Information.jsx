import classNames from 'classnames';

//icons
import { ReactComponent as IconViewing } from 'assets/icons/iconViewing.svg';
import { ReactComponent as WarningOctagon } from 'assets/icons/WarningOctagon.svg';
//styles
import s from './Information.module.scss';

const Information = ({ open, onClick, count, text }) => {
  const handleConfirm = () => {
    onClick();
  };

  return (
    <div onClick={handleConfirm} className={classNames(s.root, open && s.root_open)}>
      <div className={s.content}>
        <div className={s.block}>
          <WarningOctagon />
          <p>{text}</p>
          {count !== 0 && (
            <div className={classNames(s.countBlock, count > 0 && s.countBlock_active)}>
              <div className={s.count}>{count}</div>
            </div>
          )}
        </div>
        <button className={s.button}>
          <IconViewing />
          <p>Смотреть</p>
        </button>
      </div>
    </div>
  );
};

export default Information;
