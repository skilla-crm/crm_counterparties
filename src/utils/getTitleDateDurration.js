import dayjs from 'dayjs';

import 'dayjs/locale/ru';
dayjs.locale('ru');

export const getTitleDateDuration = (dateStart, dateEnd) => {
  if (!dateStart && !dateEnd) {
    return 'Выберите период';
  }

  const start = dateStart ? dayjs(dateStart).format('DD.MM.YYYY') : '';
  const end = dateEnd ? dayjs(dateEnd).format('DD.MM.YYYY') : '';

  if (start && end) {
    return `с ${start} по ${end}`;
  } else if (start) {
    return `с ${start}`;
  } else if (end) {
    return `по ${end}`;
  }

  return 'Выберите период';
};
