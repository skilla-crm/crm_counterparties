import { useMemo, useRef, useEffect, useState } from 'react';
import s from './DateGroup.module.scss';
import { PersonLog } from '../PersonLog/PersonLog';

export const DateGroup = ({ dateGroup, fontSize = 'medium' }) => {
  const { formattedDate, actions } = dateGroup;
  const lastAvatarRef = useRef(null);
  const personsListRef = useRef(null);
  const [lineHeight, setLineHeight] = useState(null);

  const personGroups = useMemo(() => {
    const actionsByPerson = actions.reduce((acc, action) => {
      const personId = action.person?.id || 'unknown';
      if (!acc[personId]) {
        acc[personId] = {
          person: action.person,
          actions: []
        };
      }
      acc[personId].actions.push(action);
      return acc;
    }, {});
    return Object.values(actionsByPerson);
  }, [actions]);
  
  const shouldHideLine = personGroups.length === 1;

  useEffect(() => {
    if (shouldHideLine || !lastAvatarRef.current || !personsListRef.current) {
      setLineHeight(null);
      return;
    }

    const updateLineHeight = () => {
      const lastAvatar = lastAvatarRef.current;
      const personsList = personsListRef.current;
      
      if (lastAvatar && personsList) {
        const avatarRect = lastAvatar.getBoundingClientRect();
        const listRect = personsList.getBoundingClientRect();
        const avatarCenterY = avatarRect.top - listRect.top + avatarRect.height / 2;
        const lineStartY = 15; 
        const calculatedHeight = avatarCenterY - lineStartY;
        
        setLineHeight(Math.max(0, calculatedHeight));
      }
    };

    const timeoutId = setTimeout(updateLineHeight, 0);
    
    window.addEventListener('resize', updateLineHeight);
    
    const resizeObserver = new ResizeObserver(updateLineHeight);
    if (lastAvatarRef.current) {
      resizeObserver.observe(lastAvatarRef.current);
    }
    if (personsListRef.current) {
      resizeObserver.observe(personsListRef.current);
    }
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateLineHeight);
      resizeObserver.disconnect();
    };
  }, [shouldHideLine, personGroups.length, formattedDate]);

  return (
    <div className={`${s.dateGroup} ${s[fontSize]}`}>
      <h3 className={s.dateHeader}>{formattedDate}</h3>
      <div 
        ref={personsListRef}
        className={`${s.personsList} ${shouldHideLine ? s.singlePerson : ''}`}
        style={{ '--timeline-height': `${lineHeight ?? 0}px` }}
      >
        {personGroups.map((personGroup, index) => {
          const isLast = index === personGroups.length - 1;
          return (
            <PersonLog 
              key={personGroup.person?.id || index} 
              log={personGroup}
              isLast={isLast}
              avatarRef={isLast ? lastAvatarRef : null}
              fontSize={fontSize}
            />
          );
        })}
      </div>
    </div>
  );
};

