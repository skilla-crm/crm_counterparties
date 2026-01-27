import s from './ActionItem.module.scss';

export const ActionItem = ({ description, time, fontSize = 'medium' }) => {
  return (
    <div className={`${s.actionItem} ${s[fontSize]}`}>
      <div className={s.description}>
        {description}
      </div>
      <div className={s.time}>
        {time}
      </div>
    </div>
  );
};

