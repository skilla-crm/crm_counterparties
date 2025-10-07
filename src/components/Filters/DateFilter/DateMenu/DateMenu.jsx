import { useDispatch } from 'react-redux';
import classNames from 'classnames';

import { DatePickerСhoose } from 'components/Filters/DateFilter/DateMenu/DatePickerСhoose/index';
import {
  getBeforeLastMonth,
  getCurrentDay,
  getLastMonth,
  getLastWeek,
  getNextDay,
  getThreeDay,
  getTwoLastWeek,
  getWeek,
} from 'components/Filters/DateFilter/DateMenu/utils/date';

import styles from './DateMenu.module.scss';

import {
  setDateEndPicker as setDateEnd,
  setDateStartPicker as setDateStart,
} from '../../../../redux/filters/dateRangeSlice';

export const DateMenu = ({
  isOpen,
  setIsOpen,
  setActiveFilter,
  setShouldResetPicker,
  shouldResetPicker,
}) => {
  const dispatch = useDispatch();

  const handlerAll = () => {
    dispatch(setDateStart(''));
    dispatch(setDateEnd(''));
    setIsOpen(false);
  };

  const handlerThreeDays = () => {
    dispatch(setDateStart(getThreeDay()));
    dispatch(setDateEnd(getNextDay()));
    setActiveFilter('date');
    setIsOpen(false);
  };

  const handlerWeek = () => {
    dispatch(setDateStart(getWeek()));
    dispatch(setDateEnd(getCurrentDay()));
    setActiveFilter('date');
    setIsOpen(false);
  };

  const handlerLastWeek = () => {
    dispatch(setDateStart(getLastWeek('start')));
    dispatch(setDateEnd(getLastWeek('end')));
    setActiveFilter('date');
    setIsOpen(false);
  };

  const handlerTwoLastWeek = () => {
    dispatch(setDateStart(getTwoLastWeek()));
    dispatch(setDateEnd(getCurrentDay()));
    setActiveFilter('date');
    setIsOpen(false);
  };

  const handlerLastMonth = () => {
    dispatch(setDateStart(getLastMonth('start')));
    dispatch(setDateEnd(getLastMonth('end')));
    setActiveFilter('date');
    setIsOpen(false);
  };

  const handlerBeforeLastMonth = () => {
    dispatch(setDateStart(getBeforeLastMonth('start')));
    dispatch(setDateEnd(getBeforeLastMonth('end')));
    setActiveFilter('date');
    setIsOpen(false);
  };

  return (
    <div
      className={classNames(styles.menu, isOpen ? styles.menu_open : '')}
      onClick={(e) => e.stopPropagation()}
    >
      <ul className={styles.list}>
        <li className={styles.item} onClick={handlerAll}>
          За все время
        </li>
        <li className={styles.item} onClick={handlerThreeDays}>
          3 дня
        </li>
        <li className={styles.item} onClick={handlerWeek}>
          Неделя
        </li>
        <li className={styles.item} onClick={handlerLastWeek}>
          Прошлая неделя
        </li>
        <li className={styles.item} onClick={handlerTwoLastWeek}>
          Две недели
        </li>
        <li className={`${styles.item} ${styles.item_month}`} onClick={handlerLastMonth}>
          {getLastMonth('title')}
        </li>
        <li className={`${styles.item} ${styles.item_month}`} onClick={handlerBeforeLastMonth}>
          {getBeforeLastMonth('title')}
        </li>
      </ul>
      <div className={styles.date}>
        <DatePickerСhoose
          setOpenDateFilter={setIsOpen}
          setActiveFilter={setActiveFilter}
          setShouldResetPicker={setShouldResetPicker}
          shouldResetPicker={shouldResetPicker}
        />
      </div>
    </div>
  );
};
