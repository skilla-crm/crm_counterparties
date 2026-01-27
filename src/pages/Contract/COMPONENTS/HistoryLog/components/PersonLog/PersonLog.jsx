import { useState, useMemo, useEffect } from 'react';
import s from './PersonLog.module.scss';
import NullAvatar from '../../icons/NullAvatar.svg';
import { ActionItem } from '../ActionItem/ActionItem';
import { formatTime, getLogDate } from '../../helpers';
import EllipsisWithTooltip from '../../ui/EllipsisWithTooltip/EllipsisWithTooltip';

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

  const avatarSources = useMemo(
    () => [person.avatar, person.avatar_mini].filter((src) => src?.trim()).concat(NullAvatar),
    [person.avatar, person.avatar_mini]
  );

  const [currentSourceIndex, setCurrentSourceIndex] = useState(0);
  const currentAvatarSrc = avatarSources[currentSourceIndex];

  useEffect(() => {
    setCurrentSourceIndex(0);
  }, [person.id, person.avatar, person.avatar_mini]);

  const handleImageError = () => {
    if (currentSourceIndex < avatarSources.length - 1) {
      setCurrentSourceIndex(prev => prev + 1);
    }
  };

  if (!actions || actions.length === 0) {
    return null;
  }

  return (
    <div className={`${s.personLog} ${s[fontSize]}`} data-last={isLast}>
      <div className={s.personHeader}>
        <div ref={avatarRef} className={s.avatarContainer}>
          <img
            src={currentAvatarSrc}
            alt=""
            className={s.avatar}
            onError={handleImageError}
          />
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

