function finalCardNumber(cardnumber) {
  const number = cardnumber.replace(/[^0-9]+/g, '');
  return number.substring(number.length - 4, number.length);
}

export default finalCardNumber;
