import { Alert } from 'react-native';

import { call, put, select } from 'redux-saga/effects';

import { formatDateToBr, formatString } from '~/scripts/formatFields';
import api, { setToken } from '~/services/api';
import NavigationService from '~/services/navigation';
import {
  unsubscribeToNotification,
  subscribeToNotification,
} from '~/services/notification';

import { getData } from './shopping';
import { getAdresses } from './adresses';
import { getCardsUser } from './wallet';

import UserActions from '../ducks/user';

export function* handleLogin({ payload }) {
  const { email, password } = payload;
  try {
    const {
      data: { user },
    } = yield call(api.post, `/login`, {
      email,
      password,
    });
    yield put(
      UserActions.setDataUser(
        {
          ...user,
          cpf: formatString(user.cpf),
          data_nascimento: formatDateToBr(user.data_nascimento),
        },
        user.token,
      ),
    );
    setToken(user.token);
    subscribeToNotification(user.id);
    yield getData();
    yield getAdresses();
    yield getCardsUser();
    NavigationService.navigateReset('Main');
  } catch (err) {
    Alert.alert('Fique atento', 'Seus dados estão incorretos!');
    yield put(UserActions.getDataFailure(err));
  }
}

export function* handleSignUp({ payload }) {
  const { name, email, password, cpf, telefone } = payload;
  try {
    yield call(api.post, `/registrar`, {
      name,
      email,
      password,
      cpf: formatString(cpf),
      telefone,
      perfil_id: 1,
    });

    const {
      data: { user },
    } = yield call(api.post, `/login`, {
      email,
      password,
    });

    yield put(UserActions.setDataUser(user, user.token));
    setToken(user.token);
    subscribeToNotification(user.id);
    Alert.alert('Sucesso', 'Cadastrado com sucesso!');
    yield getData();
    yield getAdresses();
    yield getCardsUser();
    NavigationService.navigateReset('Main');
  } catch (err) {
    Alert.alert(
      'Ocorreu um erro',
      'ocorreu um erro inesperado ao processar seus dados!',
    );
    yield put(UserActions.getDataFailure(err));
  }
}

export function* handleRefreshData({ payload }) {
  const { name, telefone } = payload;
  try {
    const token = yield select((state) => state.user.token);
    const { data } = yield call(api.put, `/perfil`, { name, telefone });

    yield put(UserActions.setDataUser(data, token));
    Alert.alert('Sucesso', 'Seus dados foram salvos!');
  } catch (err) {
    Alert.alert('Error', 'Houve um erro ao processar suas informações!');
    yield put(UserActions.getDataFailure(err));
  }
}

export function* handleLogout() {
  try {
    const userId = yield select((state) => state.user.data.id);
    unsubscribeToNotification(userId);
    yield put(UserActions.setDataUser(null, null));
  } catch (err) {
    Alert.alert('Error', 'Houve um erro ao processar suas informações!');
    yield put(UserActions.getDataFailure(err));
  }
}

export function* handleRefreshPassword({ payload }) {
  const { password } = payload;
  try {
    yield call(api.put, `/perfil/senha/atualizar`, { password });

    Alert.alert('Sucesso', 'Sua senha foi alterada!');
    yield put(UserActions.getDataFailure(null));
  } catch (err) {
    Alert.alert('Error', 'Houve um erro ao processar suas informações!');
    yield put(UserActions.getDataFailure(err));
  }
}
