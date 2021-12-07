import { Alert } from 'react-native';

import { call, put, select } from 'redux-saga/effects';

import api, { setToken } from '~/services/api';
import NavigationService from '~/services/navigation';
import { unsubscribeToNotification } from '~/services/notification';

import UserActions from '../ducks/user';

export function* handleUpdateUser({ data, setLoading, setEditable }) {
  try {
    const token = yield select(state => state.user.token);
    const userId = yield select(state => state.user.data.id);

    const response = yield call(api.put, `/users/${userId}`, data);
    const [dataUser] = response.data;

    yield put(UserActions.handleLoginSuccess(dataUser, token));
    setEditable(false);
    Alert.alert('Sucesso', 'Seus dados foram atualizados!');
  } catch (err) {
    yield put(UserActions.handleLoginFailure(err));
    Alert.alert(
      'Erro ao atualizar seus dados',
      'Verifique se os campos estao preenchido corretamente e tente novamente!'
    );
  }
  setLoading(false);
}

export function* handleLogin({ data }) {
  try {
    const {
      data: { token },
    } = yield call(api.post, '/sessions', data);
    setToken(token);

    const { data: dataUser } = yield call(api.get, '/sessions');

    yield put(UserActions.handleLoginSuccess(dataUser, token));
    NavigationService.navigateReset('Main');
  } catch (err) {
    yield put(UserActions.handleLoginFailure(err));
    Alert.alert('Erro ao entrar', 'Verifique seus dados e tente novamente!');
  }
}

export function* refreshDataUser() {
  try {
    const { data } = yield call(api.get, '/sessions');
    const token = yield select(state => state.user.token);

    yield put(UserActions.handleLoginSuccess(data, token));
  } catch (err) {
    // yield put(UserActions.handleLoginFailure(err));
    Alert.alert(
      'Erro interno ao entrar',
      'Verifique sua conexão e tente novamente!'
    );
  }
}

export function* handleChangePackage({ data, onClose }) {
  try {
    const token = yield select(state => state.user.token);

    yield call(api.post, '/userpackages', data);

    const { data: dataUser } = yield call(api.get, '/sessions');

    yield put(UserActions.handleLoginSuccess(dataUser, token));
  } catch (err) {
    if (err.response) {
      Alert.alert('Transação não autorizada!', err.response.data.message);
    }
  }
  onClose();
}

export function* handleLogout({ setLoading }) {
  unsubscribeToNotification();
  yield put(UserActions.handleLoginSuccess({}, null));
  setTimeout(() => {
    setLoading();
    NavigationService.navigateReset('Login');
  }, 3500);
}
