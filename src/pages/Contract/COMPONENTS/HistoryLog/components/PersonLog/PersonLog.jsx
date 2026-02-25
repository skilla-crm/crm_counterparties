import { useState, useMemo, useEffect } from 'react';
import s from './PersonLog.module.scss';
import { ActionItem } from '../ActionItem/ActionItem';
import { formatTime, getLogDate } from '../../helpers';
import EllipsisWithTooltip from '../../ui/EllipsisWithTooltip/EllipsisWithTooltip';

import { ReactComponent as DefaultAvatar } from "../../icons/DefaultAvatar.svg";

const POSITION_LABELS = {
  director: 'Директор',
  accountant: 'Бухгалтер',
  operator: 'Менеджер по работе с клиентами',
  supervisor: 'Менеджер по персоналу',
};

const getPositionLabel = (position) => POSITION_LABELS[position] || position || '';
const getPersonDisplayName = (person) =>
  [getPositionLabel(person.position), person.surname, person.name].filter(Boolean).join(' ').trim();

export const PersonLog = ({ log, isLast, avatarRef, fontSize = 'medium' }) => {
  const { person, actions } = log;
  const [avatar, setAvatar] = useState(person?.avatar || null)

  const handleImageError = () => {
    setAvatar(null)
  };

  if (!actions || actions.length === 0) {
    return null;
  }

  return (
    <div className={`${s.personLog} ${s[fontSize]}`} data-last={isLast}>
      <div className={s.personHeader}>
        <div ref={avatarRef} className={s.avatarContainer}>
          {avatar ? <img
            src={avatar}
            alt=""
            className={s.avatar}
            onError={handleImageError}
          />
            :
            <DefaultAvatar />
          }
        </div>
        <div className={s.personInfo}>
          <EllipsisWithTooltip text={getPersonDisplayName(person)} wrapperStyle={{ width: '100%' }} />
        </div>
      </div>

      <div className={s.actionsList}>
        {actions.map((action, index) => (
          <ActionItem
            key={action.id ?? index}
            description={action.short_description}
            time={formatTime(getLogDate(action))}
            fontSize={fontSize}
          />
        ))}
      </div>
    </div>
  );
};

