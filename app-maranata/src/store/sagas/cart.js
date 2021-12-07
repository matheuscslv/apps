import { Alert } from 'react-native';
import Immutable from 'seamless-immutable';
import { call, put, select } from 'redux-saga/effects';

import CartActions from '../ducks/bag';

export function* updateAmount({ payload }) {
  const { product, amount } = payload;

  try {
    const products = yield select((state) => state.bags.data);
    const productsTotal = yield select((state) => state.bags.total);

    if (amount <= 0) {
      const newList = products.filter((p) => p.id !== product.id);
      return yield put(CartActions.getBagsSuccess(newList, productsTotal));
    }

    if (amount > product.estoque_quantidade) {
      Alert.alert(
        'Quantidade indisponível',
        'Parece que o estoque deste produto acabou!',
      );
      return yield put(CartActions.getBagsFailure(null));
    }

    const cartProduct = products.find((p) => p.id === product.id);

    if (!cartProduct) {
      const newList = [
        ...products,
        {
          ...product,
          quantity: amount,
        },
      ];

      return yield put(CartActions.getBagsSuccess(newList, productsTotal));
    }

    const newList = products.map((p) =>
      p.id === product.id ? { ...p, quantity: amount } : p,
    );

    yield put(CartActions.getBagsSuccess(newList, productsTotal));
  } catch (err) {
    Alert.alert(
      'Erro',
      'Ocorreu um erro ao buscar as informações dos produtos!',
    );
    yield put(CartActions.getBagsFailure(err));
  }
}
