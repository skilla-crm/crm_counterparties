
import classNames from 'classnames';
import { DatePickerСhoose } from './DatePickerСhoose/index'
import { useDispatch } from 'react-redux';
import {
  getBeforeLastMonth,
  getCurrentDay,
  getLastMonth,
  getLastWeek,
  getNextDay,
  getThreeDay,
  getTwoLastWeek,
  getWeek
} from './utils/date';
import { setDateStart, setDateEnd } from '../../../../redux/dateRange/slice';
import styles from './DateMenu.module.scss';



export const DateMenu = ({ isOpen, setIsOpen, setLoadFilter, setDone }) => {
  const dispatch = useDispatch()

  const handlerAll = () => {
    setLoadFilter(true)
    setDone(false)

    dispatch(setDateStart(''));
    dispatch(setDateEnd(''));
    setIsOpen(false);
  }

  const handlerThreeDays = () => {
    setLoadFilter(true)
    setDone(false)
    dispatch(setDateStart(getThreeDay()));
    dispatch(setDateEnd(getNextDay()));
    setIsOpen(false);
  }


  const handlerWeek = () => {
    setLoadFilter(true)
    setDone(false)
    dispatch(setDateStart(getWeek()));
    dispatch(setDateEnd(getCurrentDay()));
    setIsOpen(false);
  };

  const handlerLastWeek = () => {
    setLoadFilter(true)
    setDone(false)
    dispatch(setDateStart(getLastWeek('start')));
    dispatch(setDateEnd(getLastWeek('end')));
    setIsOpen(false);
  };

  const handlerTwoLastWeek = () => {
    setLoadFilter(true)
    setDone(false)
    dispatch(setDateStart(getTwoLastWeek()));
    dispatch(setDateEnd(getCurrentDay()));
    setIsOpen(false);
  };

  const handlerLastMonth = () => {
    setLoadFilter(true)
    setDone(false)
    dispatch(setDateStart(getLastMonth('start')));
    dispatch(setDateEnd(getLastMonth('end')));
    setIsOpen(false);
  };

  const handlerBeforeLastMonth = () => {
    setLoadFilter(true)
    setDone(false)
    dispatch(setDateStart(getBeforeLastMonth('start')));
    dispatch(setDateEnd(getBeforeLastMonth('end')));
    setIsOpen(false);
  };

  return (
    <div className={classNames(styles.menu, isOpen ? styles.menu_open : '')} onClick={(e) => e.stopPropagation()}>
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
        <DatePickerСhoose setOpenDateFilter={setIsOpen} setLoadFilter={setLoadFilter} />
      </div>
    </div>
  );
};
