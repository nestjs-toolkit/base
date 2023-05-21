export function currencyFormat(number, digits = 2) {
  return (parseFloat(number) || 0)
    .toFixed(digits)
    .replace('.', ',')
    .replace(/(\d)(?=(\d{4})+(?!\d))/g, '$1.');
}
