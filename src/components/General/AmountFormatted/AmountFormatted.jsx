const AmountFormatted = ({ value }) => {
  if (value == null || isNaN(value)) return null;

  const formatted = value
    .toFixed(2)
    .replace('.', ',')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const [whole, cents] = formatted.split(',');

  return (
    <span>
      <span style={{ color: 'black' }}>{whole},</span>
      <span style={{ color: 'gray' }}>{cents}</span>
    </span>
  );
};

export default AmountFormatted;
