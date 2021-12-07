export default function tipoPagamento(wallet, dispatch) {
  if (wallet.money == true) {
    return 'Dinheiro';
  }

  if (wallet.card_selected != null) {
    return 'Cartão';
  }

  if (wallet.credit_selected == true) {
    return 'Voucher';
  }

  if (wallet.cardAndCredit == true) {
    return 'Cartão e Voucher';
  }

  if (wallet.moneyAndCredit == true) {
    return 'Dinheiro e Voucher';
  }
}
