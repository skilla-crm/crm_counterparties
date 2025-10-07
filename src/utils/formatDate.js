const formatDate = (date) => {
  if (!date) return '';

  const isoPattern = /^\d{4}-\d{2}-\d{2}$/;
  if (typeof date === 'string' && isoPattern.test(date)) {
    return date;
  }

  const parsed = new Date(date);
  if (isNaN(parsed)) return '';

  return parsed.toISOString().split('T')[0];
};

export default formatDate;
