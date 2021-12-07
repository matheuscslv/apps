import { Alert } from 'react-native';

import { call, put, select } from 'redux-saga/effects';

import { formatDateToBr, formatString } from '~/scripts/formatFields';
import api, { setToken } from '~/services/api';
import NavigationService from '~/services/navigation';

import UserActions from '../ducks/user';

export function* handleLogin({ email, password, setLoading }) {
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
        user.token
      )
    );
    setToken(user.token);
    NavigationService.navigateReset('Main');
  } catch (err) {
    Alert.alert('Error', 'Seus dados estão incorretos!');
    yield put(UserActions.getDataFailure(err));
  }
  setLoading(false);
}

export function* handleSignUp({ data, setLoading }) {
  try {
    yield call(api.post, `/registrar`, {
      ...data,
      perfil_id: 1,
    });

    const { email, password } = data;
    const {
      data: { user },
    } = yield call(api.post, `/login`, {
      email,
      password,
    });
    yield put(UserActions.setDataUser(user, user.token));
    setToken(user.token);
    Alert.alert('Sucesso', 'Cadastrado com sucesso!');
    NavigationService.navigateReset('Main');
  } catch (err) {
    Alert.alert('Error', 'Seus erro ao processar seus dados!');
    yield put(UserActions.getDataFailure(err));
  }
  setLoading(false);
}

export function* handleRefreshData({ data, setLoading }) {
  try {
    const token = yield select(state => state.user.token);
    const response = yield call(api.put, `/perfil`, data);

    yield put(
      UserActions.setDataUser(
        {
          ...response.data,
          cpf: formatString(response.data.cpf),
          data_nascimento: formatDateToBr(response.data.data_nascimento),
        },
        token
      )
    );

    Alert.alert('Sucesso', 'Seus dados foram salvos!');
  } catch (err) {
    Alert.alert('Error', 'Houve um erro ao processar suas informações!');
    yield put(UserActions.getDataFailure(err));
  }
  setLoading(false);
}

export function* handleLogout() {
  try {
    yield put(UserActions.setDataUser(null, null));
  } catch (err) {
    Alert.alert('Error', 'Houve um erro ao processar suas informações!');
    yield put(UserActions.getDataFailure(err));
  }
}

export function* handleRefreshPassword({ password, setLoading }) {
  try {
    yield call(api.put, `/perfil/senha/atualizar`, { password });

    Alert.alert('Sucesso', 'Sua senha foi alterada!');
  } catch (err) {
    Alert.alert('Error', 'Houve um erro ao processar suas informações!');
    yield put(UserActions.getDataFailure(err));
  }
  setLoading(false);
}
