export function getLogDate(log) {
  return log?.date_create ?? log?.created_at;
}

function compareByDateDesc(getDate) {
  return (a, b) => {
    const dateA = parseDate(getDate(a));
    const dateB = parseDate(getDate(b));
    if (isNaN(dateA.getTime())) return 1;
    if (isNaN(dateB.getTime())) return -1;
    return dateB - dateA;
  };
}

export function filterAndSortActions(logs, getDate = getLogDate) {
  return (logs || [])
    .filter(log => log.short_description && getDate(log) && log.person)
    .sort(compareByDateDesc(getDate));
}

export function groupActionsByDate(actions, getDate = getLogDate) {
  const grouped = {};
  for (const action of actions) {
    const dateStr = getDate(action);
    if (!dateStr) continue;
    const date = parseDate(dateStr);
    if (isNaN(date.getTime())) {
      console.warn(`Skipping action with invalid date: ${dateStr}`);
      continue;
    }
    date.setHours(0, 0, 0, 0);
    const dateKey = date.toISOString().split('T')[0];
    if (!grouped[dateKey]) grouped[dateKey] = { date, actions: [] };
    grouped[dateKey].actions.push(action);
  }
  for (const g of Object.values(grouped)) {
    g.actions.sort(compareByDateDesc(getDate));
  }
  return Object.values(grouped).sort((a, b) => b.date - a.date);
}

export function parseDate(dateString) {
  if (typeof dateString !== 'string') {
    return new Date(dateString);
  }
  const parts = dateString.split(' ');
  const datePart = parts[0];
  const timePart = parts[1] || '00:00:00';
  const [hours, minutes, seconds] = (timePart || '00:00:00').split(':');
  const sep = datePart?.includes('.') ? '.' : datePart?.includes('-') ? '-' : null;
  if (sep && datePart) {
    const [a, b, c] = datePart.split(sep);
    if (a && b && c) {
      const isDDMMYYYY = c.length >= 4;
      const year = isDDMMYYYY ? parseInt(c) : parseInt(a);
      const month = parseInt(b) - 1;
      const day = isDDMMYYYY ? parseInt(a) : parseInt(c);
      const parsedDate = new Date(year, month, day, parseInt(hours) || 0, parseInt(minutes) || 0, parseInt(seconds) || 0);
      if (!isNaN(parsedDate.getTime())) return parsedDate;
    }
  }
  const parsedDate = new Date(dateString);
  if (isNaN(parsedDate.getTime())) {
    console.warn(`Invalid date string: ${dateString}`);
    return new Date();
  }
  return parsedDate;
}

export function formatDate(date) {
  const dateObj = typeof date === 'string' ? parseDate(date) : date;
  return dateObj.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatDateWithYear(dateGroups) {
  return dateGroups.map((group, index) => {
    const currentYear = group.date.getFullYear();
    const prevYear = index > 0 ? dateGroups[index - 1].date.getFullYear() : null;
    const nextYear = index < dateGroups.length - 1 ? dateGroups[index + 1].date.getFullYear() : null;
    const showYear = (prevYear !== null && prevYear !== currentYear) || 
                     (nextYear !== null && nextYear !== currentYear);
    
    return {
      ...group,
      formattedDate: formatDateHeader(group.date, showYear)
    };
  });
}

function formatDateHeader(date, showYear) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const dateToCompare = new Date(date);
  dateToCompare.setHours(0, 0, 0, 0);
  
  const isToday = dateToCompare.getTime() === today.getTime();
  const isYesterday = dateToCompare.getTime() === yesterday.getTime();
  
  if (isToday) {
    return 'Сегодня';
  }
  
  if (isYesterday) {
    return 'Вчера';
  }
  
  const day = date.getDate();
  const month = date.toLocaleDateString('ru-RU', { month: 'long' });
  const year = date.getFullYear();
  
  if (showYear) {
    return `${day} ${month} ${year}`;
  }
  return `${day} ${month}`;
}

export function formatTime(date) {
  if (typeof date === 'string' && date.includes('.') && date.includes(' ')) {
    const timePart = date.split(' ')[1];
    if (timePart) {
      const [hours, minutes] = timePart.split(':');
      if (hours && minutes) {
        return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
      }
    }
  }
  
  const dateObj = typeof date === 'string' ? parseDate(date) : date;
  if (typeof date === 'string' && !date.includes('T') && !date.includes(':')) {
    return '';
  }
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  
  return dateObj.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
