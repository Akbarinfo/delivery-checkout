const currencyFormat = (num) => {
  const number = Number(num);
  const formattedNumber = number
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

  return formattedNumber.endsWith(".00")
    ? formattedNumber.slice(0, -3)
    : formattedNumber;
};

export default currencyFormat;
