function formatAmount(value) {
  if (value === null || isNaN(value)) return '';

  return Number(value)
    .toFixed(2)
    .replace('.', ',')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
export default formatAmount;
