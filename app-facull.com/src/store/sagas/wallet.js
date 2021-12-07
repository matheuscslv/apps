import { Alert } from 'react-native';

import { call, put, select } from 'redux-saga/effects';

import api from '~/services/api';

import WalletActions from '../ducks/wallet';

export function* selectOptionMoneyAndCredit() {
  try {
    const cards = yield select(state => state.wallet.cards);
    const unselectCards = cards.map(card => ({ ...card, selected: false }));
    yield put(WalletActions.selectMoneyAndCredit(unselectCards));
  } catch (err) {
    yield put(WalletActions.setRequestError(err));
  }
}

export function* selectOptionMoney() {
  try {
    const cards = yield select(state => state.wallet.cards);

    const unselectCards = cards.map(card => ({ ...card, selected: false }));
    yield put(WalletActions.selectMoney(unselectCards));
  } catch (err) {
    yield put(WalletActions.setRequestError(err));
  }
}

export function* selectOptionCredit() {
  try {
    const cards = yield select(state => state.wallet.cards);

    const unselectCards = cards.map(card => ({ ...card, selected: false }));
    yield put(WalletActions.selectCredit(unselectCards));
  } catch (err) {
    yield put(WalletActions.setRequestError(err));
  }
}

export function* selectOptionCard({ id }) {
  try {
    const cards = yield select(state => state.wallet.cards);

    const selectCard = cards.map(card =>
      card.id === id
        ? { ...card, selected: true }
        : { ...card, selected: false }
    );

    const [card_selected] = cards.filter(card => card.id === id);

    yield put(WalletActions.selectCard(selectCard, card_selected));
  } catch (err) {
    yield put(WalletActions.setRequestError(err));
  }
}

export function* addNewCard({ card, onClose, setLoading }) {
  try {
    const cards = yield select(state => state.wallet.cards);
    const { data } = yield call(api.post, '/token/cartao', card);
    const unselectCards = cards.map(card => ({ ...card, selected: false }));

    yield put(
      WalletActions.addNewCard(
        [...unselectCards, { ...data, selected: null }],
        card
      )
    );
    Alert.alert('Sucesso', 'Cartão adicionado!');
    onClose(false);
  } catch (err) {
    Alert.alert(
      'Error',
      'Falha ao processar seus dados, verifique se os campos foram preechidos corretamente!'
    );
    yield put(WalletActions.setRequestError(err));
  }

  setLoading(false);
}

export function* addCreditVoucher({ number, onClose }) {
  try {
    const cards = yield select(state => state.wallet.cards);
    const credit = yield select(state => state.wallet.credit);

    const unselectCards = cards.map(card => ({ ...card, selected: false }));

    yield put(WalletActions.selectCredit(unselectCards));
    yield put(WalletActions.incrementCredit(credit + 20));
    Alert.alert('Sucesso', 'Crédito adicionado a sua conta!');
    onClose(false);
  } catch (err) {
    Alert.alert(
      'Error',
      'Falha ao processar seus dados, verifique se os campos foram preechidos corretamente!'
    );
    yield put(WalletActions.setRequestError(err));
  }
}

export function* excludeCard({ card_id, setLoading }) {
  try {
    const cards = yield select(state => state.wallet.cards);
    const card_deleted = yield call(api.delete, `/token/cartao/${card_id}`);

    const filteredCards = cards.filter(
      ({ cartao_id }) => cartao_id !== card_id
    );

    const unselectCards = filteredCards.map(card => ({
      ...card,
      selected: false,
    }));

    yield put(WalletActions.selectMoney(unselectCards));
    Alert.alert('Sucesso', 'Cartão excluido!');
  } catch (err) {
    Alert.alert('Error', 'Ocorreu um erro ao processar sua solicitação!');
    yield put(WalletActions.setRequestError(err));
  }
  setLoading(false);
}
