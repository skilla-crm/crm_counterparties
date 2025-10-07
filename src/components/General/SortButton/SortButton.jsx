import s from './SortButton.module.scss';
import classNames from 'classnames';
//icons
import { ReactComponent as IconClose } from './icons/iconClose.svg';
import LoaderCircle from '../LoaderCircle/LoaderCircle';

const SortButton = ({ title, Icon, load, handleReset, handleOpen, buttonRef, sort }) => {
  return (
    <div
      ref={buttonRef}
      onClick={handleOpen}
      className={classNames(s.filter, sort && s.filter_active)}
    >
      <div className={s.icon}>
        <Icon className={load ? s.hidden : ''} />
        <div className={`${s.loader} ${load ? s.loader_vis : ''}`}>
          <LoaderCircle />
        </div>
      </div>

      <p className={s.title}>{title}</p>
      <div className={classNames(s.block, sort && s.block_active)}>
        <IconClose onClick={handleReset} className={s.close} />
      </div>
    </div>
  );
};
export default SortButton;
