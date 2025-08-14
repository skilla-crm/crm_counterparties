export const addSpaceNumber = (value) => {
  return new Intl.NumberFormat('ru-RU').format(value);
};

export const addSpaceNumber2 = (value) => {
  return new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 }).format(parseFloat(value));
};
