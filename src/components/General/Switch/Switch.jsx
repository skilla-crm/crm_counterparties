import { useState } from 'react';

// Icons
import { ReactComponent as IconClose } from 'assets/icons/iconClose.svg';

// Styles
import s from './Switch.module.scss';

const Switch = ({ label, activate, onChange, blocked }) => {
  const [checked, setChecked] = useState(activate);

  return (
    <div className={s.switchWrapper}>
      <button
        onClick={() => setChecked(!checked)}
        className={`${s.switch} ${checked ? s.active : ''}`}
      >
        {checked && blocked && (
          <span className={s.icon}>
            <IconClose />
          </span>
        )}
        <div className={`${s.thumb} ${checked ? s.thumbActive : ''}`} />
      </button>
      <div className={s.labelWrapper}>
        <span className={s.label}>{label}</span>
      </div>
    </div>
  );
};

export default Switch;
