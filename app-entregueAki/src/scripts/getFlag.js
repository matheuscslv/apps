/* eslint-disable */
const Icons = {
  cvc: require('~/assets/cards/stp_card_cvc.png'),
  cvc_amex: require('~/assets/cards/stp_card_cvc_amex.png'),
  'American Express': require('~/assets/cards/stp_card_amex.png'),
  elo: require('~/assets/cards/stp_card_diners.png'),
  mastercard: require('~/assets/cards/stp_card_mastercard.png'),
  discover: require('~/assets/cards/stp_card_discover.png'),
  jcb: require('~/assets/cards/stp_card_jcb.png'),
  placeholder: require('~/assets/cards/stp_card_unknown.png'),
  visa: require('~/assets/cards/stp_card_visa.png'),
  not: require('~/assets/cards/not_found.png'),
};

function getCardFlag(string) {
  return Icons[string.toLowerCase()];
}

export default getCardFlag;
