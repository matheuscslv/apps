/* eslint-disable */
const Icons = {
  cvc: require('~/assets/cards/stp_card_cvc.png'),
  cvc_amex: require('~/assets/cards/stp_card_cvc_amex.png'),
  'american-express': require('~/assets/cards/stp_card_amex.png'),
  elo: require('~/assets/cards/stp_card_diners.png'),
  mastercard: require('~/assets/cards/stp_card_mastercard.png'),
  discover: require('~/assets/cards/stp_card_discover.png'),
  jcb: require('~/assets/cards/stp_card_jcb.png'),
  placeholder: require('~/assets/cards/stp_card_unknown.png'),
  visa: require('~/assets/cards/stp_card_visa.png'),
  not: require('~/assets/cards/not_found.png'),
};

function getCardFlag(cardnumber) {
  var cardnumber = cardnumber.replace(/[^0-9]+/g, '');

  const cards = {
    visa: /^4[0-9]{12}(?:[0-9]{3})/,
    mastercard: /^5[1-5][0-9]{14}/,
    diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}/,
    amex: /^3[47][0-9]{13}/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}/,
    hipercard: /^(606282\d{10}(\d{3})?)|(3841\d{15})/,
    elo: /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})/,
    jcb: /^(?:2131|1800|35\d{3})\d{11}/,
    aura: /^(5078\d{2})(\d{2})(\d{11})$/,
  };

  for (const flag in cards) {
    if (cards[flag].test(cardnumber)) {
      return Icons[flag];
    }
  }

  return Icons['not'];
}

export default getCardFlag;
