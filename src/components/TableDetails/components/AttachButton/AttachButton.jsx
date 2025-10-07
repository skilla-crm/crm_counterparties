//icons
import { ReactComponent as IconAttachBlue } from 'assets/icons/IconAttachBlue.svg';
//styles
import s from './AttachButton.module.scss';

const AttachButton = ({ handler, type }) => {
  return (
    <button className={s.createButton} onClick={handler}>
      <IconAttachBlue className={s.icon} />
      <span>{type === 'detach' ? 'Открепить' : 'Прикрепить'}</span>
    </button>
  );
};
export default AttachButton;
