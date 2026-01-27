import { useState, useMemo } from 'react';
import classNames from 'classnames';
import s from './HistoryLog.module.scss';
import { filterAndSortActions, groupActionsByDate, formatDateWithYear } from './helpers';
import { DateGroup } from './components/DateGroup/DateGroup';

const INITIAL_COUNT = 5;
const SCROLL_THRESHOLD = 8;

export const HistoryLog = ({ logs, title = 'История изменений', fontSize = 'medium' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const allActions = useMemo(() => filterAndSortActions(logs), [logs]);
  const displayedActions = useMemo(
    () => (isExpanded ? allActions : allActions.slice(0, INITIAL_COUNT)),
    [allActions, isExpanded]
  );
  const dateGroupsWithFormattedDates = useMemo(
    () => formatDateWithYear(groupActionsByDate(displayedActions)),
    [displayedActions]
  );

  const hasMoreItems = allActions.length > INITIAL_COUNT;
  const isScrollable = isExpanded && allActions.length > SCROLL_THRESHOLD;

  return (
    <div className={`${s.history} ${s[fontSize]}`}>
      <h2 className={s.title}>{title}</h2>

      <div
        className={classNames(s.logsContainer, !isExpanded && s.collapsed, isScrollable && s.scrollable)}
      >
        {dateGroupsWithFormattedDates.map((dateGroup, dateIndex) => (
          <div key={`${dateGroup.date}-${dateIndex}`} className={s.dateGroupWrapper}>
            <DateGroup dateGroup={dateGroup} fontSize={fontSize} />
          </div>
        ))}
      </div>

      {hasMoreItems && (
        <button className={s.toggleButton} onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? 'Свернуть' : 'Развернуть'}
        </button>
      )}
    </div>
  );
};