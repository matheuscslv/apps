import { Alert } from 'react-native';

import { call, put, select } from 'redux-saga/effects';

import api from '~/services/api';

import ShoppingActions from '../ducks/shopping';

export function* getData() {
  try {
    const shopping = yield select(state => state.shopping);
    const { data, notification, current_page, requestIsNull } = shopping;

    if (requestIsNull) {
      yield put(ShoppingActions.stopShoppingRequest());
      return;
    }

    const { data: response } = yield call(
      api.get,
      `/vendas/usuario/listar?page=${current_page + 1}`
    );

    const num_notification = response.data.filter(
      ({ status }) => status !== 'Finalizado' && status !== 'Pagamento Falhou'
    );

    yield put(
      ShoppingActions.setDataSuccess(
        [...data, ...response.data],
        notification + num_notification.length,
        current_page + 1,
        response.data.length === 0
      )
    );
  } catch (err) {
    Alert.alert('Erro', 'Ocorreu um erro ao processar seus dados!');
    yield put(ShoppingActions.setDataFailure(err));
  }
}

export function* reloadData() {
  try {
    const { data: response } = yield call(
      api.get,
      `/vendas/usuario/listar?page=${1}`
    );

    const num_notification = response.data.filter(
      ({ status }) => status !== 'Finalizado' && status !== 'Pagamento Falhou'
    );

    yield put(
      ShoppingActions.setDataSuccess(
        response.data,
        num_notification.length,
        1,
        response.data.length === 0
      )
    );
  } catch (err) {
    Alert.alert('Erro', 'Ocorreu um erro ao processar seus dados!');
    yield put(ShoppingActions.setDataFailure(err));
  }
}

export function* setNewPurchase(purchase) {
  try {
    const shopping = yield select(state => state.shopping);
    const { data, notification, current_page, requestIsNull } = shopping;

    const formatedData = {
      ...purchase,
      itens_count: purchase.itens.length,
    };

    yield put(
      ShoppingActions.setDataSuccess(
        [formatedData, ...data],
        notification + 1,
        current_page,
        requestIsNull
      )
    );
  } catch (err) {
    Alert.alert('Erro', 'Ocorreu um erro ao processar seus dados!');
    yield put(ShoppingActions.setDataFailure(err));
  }
}
