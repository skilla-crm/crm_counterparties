import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
const formatShortYear = (dateStr) => {
  return dayjs(dateStr, 'DD.MM.YYYY').format('DD.MM.YY');
};

export default formatShortYear;
