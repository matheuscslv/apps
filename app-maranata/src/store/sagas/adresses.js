import { Alert } from 'react-native';

import { call, put, select } from 'redux-saga/effects';

import api from '~/services/api';
import NavigationService from '~/services/navigation';

import AdressesActions from '../ducks/adresses';

export function* getAdresses() {
  try {
    const { data: response } = yield call(api.get, `/enderecos`);

    const formattedAdresses = response.map((address, idx) => ({
      ...address,
      formattedAddress: `${address.logradouro}, ${address.numero}, ${
        address.bairro
      } - ${address.cidade} | ${
        address.complemento || 'Complemento não informado'
      }`,
      isDefault: idx === 0
    }));

    yield put(AdressesActions.getAdressesSuccess(formattedAdresses));
  } catch (err) {
    Alert.alert(
      'Erro',
      'Ocorreu um erro ao buscar suas informações de nossos servidores!',
    );
    yield put(AdressesActions.getAdressesFailure(err));
  }
}

export function* handleNewOrUpdateAddress({ payload }) {
  const adresses = yield select((state) => state.adresses.data);

  try {
    const {
      id,
      cep,
      logradouro,
      numero,
      bairro,
      complemento,
      cidade,
      estado,
      descricao,
    } = payload;

    let newListAdresses;

    if (id) {
      yield call(api.put, `/enderecos/${id}`, {
        cep,
        logradouro,
        numero,
        bairro,
        complemento,
        cidade,
        estado,
        descricao,
      });

      newListAdresses = adresses.map((a) =>
        a.id === id
          ? {
              ...a,
              cep,
              logradouro,
              numero,
              bairro,
              complemento,
              cidade,
              estado,
              descricao,
              isDefault: true,
            }
          : { ...a, isDefault: false },
      );
    } else {
      const { data: response } = yield call(api.post, `/enderecos`, {
        cep,
        logradouro,
        numero,
        bairro,
        complemento,
        cidade,
        estado,
        descricao,
      });

      const unselectAdresses = adresses.map((a) => ({
        ...a,
        isDefault: false,
      }));

      newListAdresses = [...unselectAdresses, { isDefault: true, ...response }];
    }

    yield put(AdressesActions.getAdressesSuccess(newListAdresses));
    NavigationService.goBack();
  } catch (err) {
    Alert.alert(
      'Erro',
      'Ocorreu um erro ao buscar suas informações de nossos servidores!',
    );
    yield put(AdressesActions.getAdressesFailure(err));
  }
}

export function* handleDeleteAddress({ payload }) {
  const adresses = yield select((state) => state.adresses.data);

  try {
    const { id, navigation } = payload;

    yield call(api.delete, `/enderecos/${id}`);

    const newListAdresses = adresses.filter((address) => address.id !== id);

    yield put(AdressesActions.getAdressesSuccess(newListAdresses));
    NavigationService.goBack();
  } catch (err) {
    Alert.alert(
      'Erro',
      'Ocorreu um erro ao buscar suas informações de nossos servidores!',
    );
    yield put(AdressesActions.getAdressesFailure(err));
  }
}

export function* setAddressWithDefault({ payload }) {
  const { id } = payload;
  const adresses = yield select((state) => state.adresses.data);

  const selectAddress = adresses.map((address) =>
    address.id === id
      ? { ...address, isDefault: true }
      : { ...address, isDefault: false },
  );

  yield put(AdressesActions.getAdressesSuccess(selectAddress));
}
