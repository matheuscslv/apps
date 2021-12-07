import { Alert } from 'react-native';

import { call, put, select } from 'redux-saga/effects';

import api from '~/services/api';

import ProductsActions from '../ducks/product';

export function* getProductsList() {
  try {
    const products = yield select((state) => state.products);
    const { data, current_page } = products;

    const response_api = yield call(
      api.get,
      `/produto/listar?page=${current_page + 1}`,
    );

    const { data: response } = response_api.data;

    const filteredList = response?.filter(
      (product) => !data.find((p) => p.id === product.id) && product?.estoque,
    );

    const formattedList = filteredList?.map((product) => ({
      ...product,
      estoque_quantidade: product.estoque.quantidade,
      quantity: 0,
    }));

    const productsList = formattedList.filter(
      (product) => product?.estoque_quantidade > 0,
    );

    if (response.length === 0) {
      return yield put(ProductsActions.getProductsSuccess(data, current_page));
    }

    yield put(
      ProductsActions.getProductsSuccess(
        [...data, ...productsList],
        current_page + 1,
      ),
    );
  } catch (err) {
    Alert.alert(
      'Erro',
      'Ocorreu um erro ao buscar as informações dos produtos!',
    );
    yield put(ProductsActions.getProductsFailure(err));
  }
}

export function* reloadProductsData() {
  try {
    const response_api = yield call(api.get, `/produto/listar?page=1`);

    const { data: response } = response_api.data;

    const formattedList = response?.map((product) => ({
      ...product,
      estoque_quantidade: product.estoque.quantidade,
      quantity: 0,
    }));

    const productsList = formattedList.filter(
      (product) => product?.estoque_quantidade > 0,
    );

    if (productsList.length === 0) {
      return yield put(ProductsActions.getProductsSuccess([], 1));
    }

    yield put(ProductsActions.getProductsSuccess(productsList, 1));
  } catch (err) {
    Alert.alert(
      'Erro',
      'Ocorreu um erro ao buscar as informações dos produtos!',
    );
    yield put(ProductsActions.getProductsFailure(err));
  }
}

export function* getCategoryProducts({ payload }) {
  const { page, id } = payload;
  try {
    const products = yield select((state) => state.products.data);
    const current_page = yield select((state) => state.products.current_page);

    const response_api = yield call(
      api.get,
      `/cardapio/secao/${id}/produtos?page=${page}`,
    );

    const { data: response } = response_api.data;

    const filteredList = response?.filter(
      (product) =>
        product.produto &&
        !products.find((p) => p.produto_id === product.produto_id),
    );

    const formattedList = filteredList?.map((product) => ({
      ...product,
      venda_sem_estoque: product.produto.venda_sem_estoque,
      estoque: product.produto.estoque,
      quantity: 0,
    }));

    const productsList = formattedList.filter(
      (product) => product.venda_sem_estoque || product?.estoque > 0,
    );

    if (productsList.length === 0) {
      return yield put(ProductsActions.getProductsSuccess(data, current_page));
    }

    yield put(
      ProductsActions.getProductsSuccess(
        [...data, ...productsList],
        current_page,
      ),
    );
  } catch (err) {
    Alert.alert(
      'Erro',
      'Ocorreu um erro ao buscar as informações dos produtos desta categoria!',
    );
    yield put(ProductsActions.getProductsFailure(err));
  }
}
