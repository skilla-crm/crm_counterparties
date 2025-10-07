const formatSum = (type, sum) => {
  const sign = type === 'income' || type === 'refund_outcome' ? '+' : '-';
  const num = parseFloat(sum);

  if (isNaN(num)) return `${sign}${num}`;

  const rounded = num.toFixed(2);
  return `${sign}${rounded}`;
};

export default formatSum;
