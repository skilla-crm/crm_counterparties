import moment from 'moment';
import 'moment/locale/ru';

const insertZeroNum = (count) => {
  return count < 10 ? `0${count}` : count;
};

const getDateFormatted = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return `${year}-${insertZeroNum(month + 1)}-${insertZeroNum(day)}`;
};

export const getDatePicker = (value) => {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return `${year}-${insertZeroNum(month + 1)}-${insertZeroNum(day)}`;
};

export const getCurrentDay = () => {
  const date = new Date();
  return getDateFormatted(date);
};

export const getNextDay = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return getDateFormatted(date);
};

export const getThreeDay = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return getDateFormatted(date);
};

export const getLastDay = () => {
  const date = new Date().setDate(new Date().getDate() - 1);
  const lastDay = moment(date).format('LL').replace(' г.', '');
  const formatedLastDay = lastDay.split(' ')[0].length < 2 ? '0' + lastDay : lastDay;
  return formatedLastDay;
};

export const getWeek = () => {
  const date = new Date();
  date.setDate(date.getDate() - 6);
  return getDateFormatted(date);
};

export const getLastWeek = (value) => {
  if (value === 'start') {
    const dateStart = moment().subtract(1, 'week').startOf('week').format();
    const date = new Date(dateStart);
    return getDateFormatted(date);
  }

  if (value === 'end') {
    const dateEnd = moment().subtract(1, 'week').endOf('week').format();
    const date = new Date(dateEnd);
    return getDateFormatted(date);
  }
};

export const getTwoLastWeek = () => {
  const date = new Date();
  date.setDate(date.getDate() - 13);
  return getDateFormatted(date);
};

export const getLastMonth = (value) => {
  if (value === 'start') {
    const dateStart = moment().subtract(1, 'month').startOf('month').format();
    const date = new Date(dateStart);
    return getDateFormatted(date);
  }

  if (value === 'end') {
    const dateEnd = moment().subtract(1, 'month').endOf('month').format();
    const date = new Date(dateEnd);
    return getDateFormatted(date);
  }

  if (value === 'title') {
    const title = moment().subtract(1, 'month').format('MMMM');
    return title;
  }
};



export const getBeforeLastMonth = (value) => {
  if (value === 'start') {
    const dateStart = moment().subtract(2, 'month').startOf('month').format();
    const date = new Date(dateStart);
    return getDateFormatted(date);
  }

  if (value === 'end') {
    const dateEnd = moment().subtract(2, 'month').endOf('month').format();
    const date = new Date(dateEnd);
    return getDateFormatted(date);
  }

  if (value === 'title') {
    const title = moment().subtract(2, 'month').format('MMMM');
    return title;
  }
};


export const getTitleDateDuration = (
  dateStart,
  dateEnd,
  viewFullMonth = false
) => {
  const currentYear = new Date().getFullYear();
  const startYear = new Date(`${dateStart}`).getFullYear();
  const endYear = new Date(`${dateEnd}`).getFullYear();

  const startMonth = new Date(`${dateStart}`).getMonth() + 1;
  const endMonth = new Date(`${dateEnd}`).getMonth() + 1;

  const startDay = new Date(`${dateStart}`).getDate();
  const endDay = new Date(`${dateEnd}`).getDate();

  //чтобы не было предупреждения о формате даты, то написать во всех moment(new Date(`${dateStart}`)) *DONE*
  const lastDayMonth = moment(new Date(`${dateStart}`))
    .endOf('month')
    .format('D');

    if(!dateStart && !dateEnd) {
      return 'Период'
    }

  if (
    startYear === endYear &&
    startMonth === 1 &&
    endMonth === 12 &&
    startDay === 1 &&
    endDay === 31
  ) {
    //выбран полный год
    return `${moment(new Date(`${dateStart}`)).format('YYYY')}`;
  }

  //выбран день текущего года
  if (dateStart === dateEnd && currentYear === startYear) {
    return moment(new Date(`${dateStart}`)).format('D MMMM');
  }

  //выбран день другого года
  if (dateStart === dateEnd && currentYear !== startYear) {
    return `${moment(new Date(`${dateStart}`)).format('D MMMM YYYY')}`;
  }

  //Выбран период в одном месяце текущего года
  if (currentYear === startYear && startMonth === endMonth) {
    //выбран полный месяц текущего года
    if (startDay === 1 && endDay === +lastDayMonth && !viewFullMonth) {
      const date = `${moment(new Date(`${dateStart}`)).format('MMMM')}`;
      return date[0].toUpperCase() + date.slice(1);
    }

    return `${startDay} — ${moment(new Date(`${dateEnd}`)).format('D MMMM')}`;
  }

  //Выбран период в одном месяце другого года
  if (currentYear !== endYear && startMonth === endMonth) {
    //выбран полный месяц другого года
    if (startDay === 1 && endDay === +lastDayMonth && !viewFullMonth) {
      const date = `${moment(new Date(`${dateStart}`)).format('MMMM YYYY')}`;
      return date[0].toUpperCase() + date.slice(1);
    }

    return `${startDay} — ${moment(new Date(`${dateEnd}`)).format('D MMMM YYYY')}`;
  }

  //Выбран период в разные месяцы текущего года
  if (currentYear === startYear && currentYear === endYear && startMonth !== endMonth) {
    return `${moment(new Date(`${dateStart}`)).format('D MMMM')} — ${moment(new Date(`${dateEnd}`)).format('D MMMM')}`;
  }

  //Выбран период в разные месяцы другого года
  if (currentYear !== endYear && currentYear !== startYear && startMonth !== endMonth) {
    return `${moment(new Date(`${dateStart}`)).format('D MMMM')} — ${moment(new Date(`${dateEnd}`)).format('D MMMM YYYY')}`;
  }

  //Выбран период в разные года
  if (startYear !== endYear) {
    return `${moment(new Date(`${dateStart}`)).format('D MMMM YYYY')} — ${moment(new Date(`${dateEnd}`)).format('D MMMM YYYY')}`;
  }
};