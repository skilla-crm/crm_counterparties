import { useEffect, useState } from 'react';
import classNames from 'classnames';
//components
import LoaderCircle from 'components/General/LoaderCircle/LoaderCircle';

//icons
import { ReactComponent as IconClose } from './icons/iconClose.svg';
import { ReactComponent as IconDone } from './icons/iconDone.svg';

//styles
import s from './FilterButton.module.scss';

const FilterButton = ({
  title,
  Icon,
  load = false,
  done = false,
  count,
  handleReset,
  handleOpen,
  buttonRef,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      ref={buttonRef}
      onClick={handleOpen}
      className={classNames(s.filter, mounted && count > 0 && s.filter_active)}
    >
      <div className={s.icon}>
        <Icon className={(load || done) && s.hidden} />
        <div className={classNames(s.loader, load && s.loader_vis)}>
          <LoaderCircle />
        </div>

        <div className={classNames(s.loader, mounted && done && s.loader_vis)}>
          <IconDone />
        </div>
      </div>

      <p className={classNames(s.title, mounted && count > 0 && s.title_active)}>{title}</p>
      <div className={classNames(s.block, mounted && count > 0 && s.block_active)}>
        <div className={s.count}>{count}</div>
        <IconClose onClick={(e) => handleReset(e)} className={s.close} />
      </div>
    </div>
  );
};
export default FilterButton;

export const FilterButtonDate = ({
  title,
  Icon,
  load = false,
  done = false,
  isSelected,
  handleReset,
  handleOpen,
  buttonRef,
}) => {
  return (
    <div
      ref={buttonRef}
      onClick={handleOpen}
      className={classNames(s.filter, isSelected && s.filter_active)}
    >
      <div className={s.icon}>
        <Icon className={(load || done) && s.hidden} />
        <div className={classNames(s.loader, load && s.loader_vis)}>
          <LoaderCircle />
        </div>

        <div className={classNames(s.loader, !load && done && s.loader_vis)}>
          <IconDone />
        </div>
      </div>

      <p className={classNames(s.title, isSelected && s.title_active)}>{title}</p>
      <div className={classNames(s.block, isSelected && s.block_activeDate)}>
        <IconClose onClick={(e) => handleReset(e)} className={s.close} />
      </div>
    </div>
  );
};
