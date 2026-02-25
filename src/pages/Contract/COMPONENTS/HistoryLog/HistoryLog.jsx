import { useState, useMemo, useEffect, useRef } from 'react';
import classNames from 'classnames';
import s from './HistoryLog.module.scss';
import { filterAndSortActions, groupActionsByDate, formatDateWithYear } from './helpers';
import { DateGroup } from './components/DateGroup/DateGroup';

const INITIAL_COUNT = 5;
const SCROLL_THRESHOLD = 8;

export const HistoryLog = ({ logs, title = 'История изменений', fontSize = 'medium' }) => {
  const [preload, setPreload] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [displayedActions, setDisplayedActions] = useState(filterAndSortActions(logs) || [])
  const [heightSizeContainer, setHeightSizeContainer] = useState(400);
  const [heightSizeContainerBig, setHeightSizeContainerBig] = useState(1000);
  const allActions = useMemo(() => filterAndSortActions(logs), [logs]);
  const containerRef = useRef(null)
  const containerSizeRef = useRef(null)

  const dateGroupsWithFormattedDates = useMemo(
    () => formatDateWithYear(groupActionsByDate(displayedActions)),
    [displayedActions]
  );

  //здесь оставляем 5 или 8 последнийх логов, этот массив используем для расчета высоты контейнера в двух состояниях
  const dateGroupsWithFormattedDatesHidden = useMemo(
    () => (isExpanded ? formatDateWithYear(groupActionsByDate(displayedActions?.slice(0, 8))) : formatDateWithYear(groupActionsByDate(displayedActions?.slice(0, 5)))),
    [displayedActions, isExpanded]
  );

  const hasMoreItems = allActions.length > INITIAL_COUNT;
  const isScrollable = isExpanded && allActions.length > SCROLL_THRESHOLD;


  //устанавливаем состояние прелоад в false после первой загрузке компонента для того что бы при установке высоты 5 логов не срабатывала анимация  высоты контейнера с 400px до высоты 5 логов
  useEffect(() => {
    setTimeout(() => {
      setPreload(false)
    }, 300)
  }, [])

  //расчитываем выосту контейнера в двух состояниях, в свернутом помещаеться 5 первых логов полностью, в развернутом 8 первых логов полностью
  useEffect(() => {
    if (containerSizeRef.current && !isExpanded) {
      setHeightSizeContainer(containerSizeRef.current.offsetHeight);
    }

    if (containerSizeRef.current && isExpanded) {
      setHeightSizeContainerBig(containerSizeRef.current.offsetHeight);
    }
  }, [containerSizeRef, isExpanded]);

  const handleExpanded = () => {
    setIsExpanded(!isExpanded)
    if (isExpanded) {
      containerRef.current.scrollTop = 0;
    }
  }

  return (
    <>
      <div className={`${s.history} ${s[fontSize]}`}>
        <h2 className={s.title}>{title}</h2>

        <div
          style={{ maxHeight: !isExpanded ? heightSizeContainer : heightSizeContainerBig }}
          ref={containerRef}
          className={classNames(s.logsContainer, preload && s.logsContainer_preload, !isExpanded && s.collapsed, isScrollable && s.scrollable)}
        >
          {dateGroupsWithFormattedDates.map((dateGroup, dateIndex) => (
            <div key={`${dateGroup.date}-${dateIndex}`} className={s.dateGroupWrapper}>
              <DateGroup dateGroup={dateGroup} fontSize={fontSize} />
            </div>
          ))}
        </div>

        {hasMoreItems && (
          <button className={s.toggleButton} onClick={handleExpanded}>
            {isExpanded ? 'Свернуть' : 'Развернуть'}
          </button>
        )}
      </div>

      {/* скрытый контейнер для расчета высоты */}
      <div
        ref={containerSizeRef}
        className={classNames(s.logsContainer, s.logsContainer_hidden)}
      >
        {dateGroupsWithFormattedDatesHidden.map((dateGroup, dateIndex) => (
          <div key={`${dateGroup.date}-${dateIndex}`} className={s.dateGroupWrapper}>
            <DateGroup dateGroup={dateGroup} fontSize={fontSize} />
          </div>
        ))}
      </div>
    </>



  );
};