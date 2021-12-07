function omitCardNumber(cardnumber) {
  const number = cardnumber.replace(/[^0-9]+/g, '');

  return `${number.substring(0, 4)} **** **** ${number.substring(
    number.length - 4,
    number.length
  )}`;
}

export default omitCardNumber;
