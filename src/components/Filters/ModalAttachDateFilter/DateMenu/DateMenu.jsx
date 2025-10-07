import { useDispatch } from 'react-redux';
import classNames from 'classnames';

import { DatePickerСhoose } from './DatePickerСhoose/index';
import {
  getBeforeLastMonth,
  getCurrentDay,
  getLastMonth,
  getLastWeek,
  getNextDay,
  getThreeDay,
  getTwoLastWeek,
  getWeek,
} from './utils/date';

import styles from './DateMenu.module.scss';

import {
  setModalDateStartPicker,
  setModalDateEndPicker,
  resetModalDates,
} from '../../../../redux/filters/dateRangeAttachModalSlice';

export const DateMenu = ({ isOpen, setIsOpen, setShouldResetPicker, shouldResetPicker }) => {
  const dispatch = useDispatch();

  const handlerAll = () => {
    dispatch(setModalDateStartPicker(null));
    dispatch(setModalDateEndPicker(null));
    setIsOpen(false);
  };

  const handlerThreeDays = () => {
    dispatch(setModalDateStartPicker(getThreeDay()));
    dispatch(setModalDateEndPicker(getNextDay()));
    setIsOpen(false);
  };

  const handlerWeek = () => {
    dispatch(setModalDateStartPicker(getWeek()));
    dispatch(setModalDateEndPicker(getCurrentDay()));
    setIsOpen(false);
  };

  const handlerLastWeek = () => {
    dispatch(setModalDateStartPicker(getLastWeek('start')));
    dispatch(setModalDateEndPicker(getLastWeek('end')));
    setIsOpen(false);
  };

  const handlerTwoLastWeek = () => {
    dispatch(setModalDateStartPicker(getTwoLastWeek()));
    dispatch(setModalDateEndPicker(getCurrentDay()));
    setIsOpen(false);
  };

  const handlerLastMonth = () => {
    dispatch(setModalDateStartPicker(getLastMonth('start')));
    dispatch(setModalDateEndPicker(getLastMonth('end')));
    setIsOpen(false);
  };

  const handlerBeforeLastMonth = () => {
    dispatch(setModalDateStartPicker(getBeforeLastMonth('start')));
    dispatch(setModalDateEndPicker(getBeforeLastMonth('end')));
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
          setShouldResetPicker={setShouldResetPicker}
          shouldResetPicker={shouldResetPicker}
        />
      </div>
    </div>
  );
};
export default DateMenu;
