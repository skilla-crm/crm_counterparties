//icons
import { ReactComponent as IconTime } from 'assets/icons/iconTime.svg';
import { ReactComponent as IconDoneWhite } from 'assets/icons/iconDoneWhite.svg';
//styles
import s from './Badge.module.scss';

export const Badge = ({ type }) => {
  if (type === 'notSent') {
    return <div className={s.notSent}>Не отправлен</div>;
  }
  if (type === 'paper') {
    return (
      <div className={s.paper}>
        <IconDoneWhite />
        <span>На бумаге</span>
      </div>
    );
  }
  if (type === 'edo') {
    return (
      <div className={s.edo}>
        <IconTime />
        <span>ЭДО</span>
      </div>
    );
  }
};
