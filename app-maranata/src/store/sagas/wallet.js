import { Alert } from 'react-native';

import { call, put, select } from 'redux-saga/effects';

import api from '~/services/api';
import NavigationService from '~/services/navigation';
import { setNewPurchase } from './shopping';
import { reloadProductsData } from './products';
import WalletActions from '../ducks/wallet';
import BagActions from '../ducks/bag';

export function* selectOptionMoney() {
  try {
    const cards = yield select((state) => state.wallet.cards);

    const unselectCards = cards.map((card) => ({ ...card, selected: false }));
    yield put(WalletActions.selectMoney(unselectCards));
  } catch (err) {
    yield put(WalletActions.setRequestError(err));
  }
}

export function* selectOptionCard({ id }) {
  try {
    const cards = yield select((state) => state.wallet.cards);

    const selectCard = cards.map((card) =>
      card.id === id
        ? { ...card, selected: true }
        : { ...card, selected: false },
    );

    const [card_selected] = cards.filter((card) => card.id === id);

    yield put(WalletActions.selectCard(selectCard, card_selected));
  } catch (err) {
    yield put(WalletActions.setRequestError(err));
  }
}

export function* addNewCard({ card, onClose, setLoading }) {
  try {
    const cards = yield select((state) => state.wallet.cards);
    const { data } = yield call(api.post, '/token/cartao', card);
    const unselectCards = cards.map((card) => ({ ...card, selected: false }));

    yield put(
      WalletActions.addNewCard(
        [
          ...unselectCards,
          {
            ...data,
            selected: null,
            formattedCard: `${data['4primeiros_digitos']}} **** **** ****`,
          },
        ],
        card,
      ),
    );
    Alert.alert('Sucesso', 'Cartão adicionado!');
    onClose(false);
  } catch (err) {
    if (err?.response?.status === 500) {
      Alert.alert(
        'Aconteceu um erro',
        'Ocorreu um erro interno em nossos servidores!',
      );
      setLoading(false);
      return yield put(WalletActions.setRequestError(err));
    }

    if (err?.response?.status === 400) {
      Alert.alert('Dados inválidos', 'Os dados de seu cartão são inválidos!');
      setLoading(false);
      return yield put(WalletActions.setRequestError(err));
    }

    Alert.alert(
      'Ação não autorizada',
      'Seu cartão foi recusado pela instituição financeira!',
    );
    setLoading(false);
    return yield put(WalletActions.setRequestError(err));
  }

  setLoading(false);
}

export function* handleSelectDebit() {
  try {
    const cards = yield select((state) => state.wallet.cards);

    const unselectCards = cards.map((card) => ({ ...card, selected: false }));
    yield put(WalletActions.selectDebit(unselectCards));
  } catch (err) {
    yield put(WalletActions.setRequestError(err));
  }
}

export function* excludeCard({ card_id, setLoading }) {
  try {
    const cards = yield select((state) => state.wallet.cards);
    yield call(api.delete, `/token/cartao/${card_id}`);

    const filteredCards = cards.filter(
      ({ cartao_id }) => cartao_id !== card_id,
    );

    const unselectCards = filteredCards.map((card) => ({
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

export function* getCardsUser() {
  try {
    const { data } = yield call(api.get, `/token/cartao`);

    const cards = data.filter((card) => card.token);

    const formattedCard = cards.map((card) => ({
      ...card,
      formattedCard: `${card['4primeiros_digitos']} **** **** ****`,
    }));

    yield put(WalletActions.setCards(formattedCard));
  } catch (err) {
    Alert.alert('Error', 'Ocorreu um erro ao processar sua solicitação!');
    yield put(WalletActions.setRequestError(err));
  }
}

export function* handleProductsPayment({ payload }) {
  const {
    tipo_entrega,
    forma_pagamento,
    endereco_entrega_id,
    card,
    numero_parcelas,
  } = payload;

  try {
    const cart = yield select((state) => state.bags.data);

    const itens = cart.reduce(
      (data, product) => ({
        total: data.total + product.quantity * product.preco_venda,
        itens: [
          ...data.itens,
          {
            produto_id: product.id,
            preco: product.preco_venda,
            quantidade: product.quantity,
            desconto: 0,
            total: product.quantity * product.preco_venda,
          },
        ],
      }),
      { total: 0, itens: [] },
    );

    const dataPay = Object.assign(
      { tipo_entrega, forma_pagamento, endereco_entrega_id, ...itens },
      card
        ? {
            numero_parcelas,
            cartao_id: card.cartao_id,
            bandeira: card.bandeira,
          }
        : {},
    );

    const { data } = yield call(api.post, `/vendas`, dataPay);
    yield setNewPurchase(data);
    yield reloadProductsData();
    yield put(BagActions.getBagsSuccess([], 0));
    Alert.alert('Finalização do Pedido', 'Pedido confirmado com sucesso!');
    NavigationService.goBack();
    NavigationService.navigate('PurchaseDetail', { id: data.id });
    yield put(WalletActions.setRequestError(null));
  } catch (err) {
    if (err?.response?.data) {
      Alert.alert(
        'Ocorreu um erro ao efetuar o pagamento',
        err?.response?.data,
      );
      return yield put(WalletActions.setRequestError(err));
    }
    Alert.alert(
      'Ocorreu um erro',
      'Ocorreu um erro ao concluir sua transação, tente novamente!',
    );
    yield put(WalletActions.setRequestError(err));
  }
}
