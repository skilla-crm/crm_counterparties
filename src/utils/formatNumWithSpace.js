const formatNumWithSpace = (num) => {
    if (num == null || num === '') return '';

    const number = Number(num);
    if (isNaN(number)) return num;

    const [intPart, decimalPart] = number.toFixed(2).split('.');

    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    return decimalPart === '00'
        ? formattedInt
        : `${formattedInt}.${decimalPart}`;
};

export default formatNumWithSpace;
