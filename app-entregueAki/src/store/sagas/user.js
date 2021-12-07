import { Alert } from 'react-native';

import { call, put, select } from 'redux-saga/effects';

import logout from '~/Components/Logout';
import api, { setToken } from '~/services/api';
import NavigationService from '~/services/navigation';
import {
  subscribeToNotification,
  unsubscribeToNotification,
} from '~/services/notification';
import store from '~/services/storage';

import ShoppingActions from '../ducks/shopping';
import UserActions from '../ducks/user';

export function* handleLogin({ email, password, setLoading }) {
  try {
    const {
      data: { user },
    } = yield call(api.post, `/login`, {
      email,
      password,
    });
    yield put(UserActions.setDataUser(user, user.token));
    setToken(user.token);
    subscribeToNotification(user.id);
    NavigationService.navigateReset('Main');
  } catch (err) {
    Alert.alert('Autenticação', 'Seus dados estão incorretos!');
    yield put(UserActions.getDataFailure(err));
  }
  setLoading(false);
}

export function* handleSignUp({ data, setLoading }) {
  try {
    const { name: nome, email, password } = data;
    yield call(api.post, `/registrar`, {
      nome,
      email,
      password,
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
    NavigationService.navigateReset('Main');
  } catch (err) {
    alert(err);
    try {
      const access_token = yield store.get('access_token');
      const idToken = yield store.get('idToken');
      const authorizationCode = yield store.get('authorizationCode');

      if (access_token != null) {
        Alert.alert(
          'Não foi possível entrar',
          'Você já possui uma conta cadastrada com o seu email! Entre em contato ou utilize a recuperação de senha!'
        );
      } else if (idToken != null) {
        Alert.alert(
          'Não foi possível entrar',
          'Você já possui uma conta cadastrada com o seu email! Entre em contato ou utilize a recuperação de senha!'
        );
      } else if (authorizationCode != null) {
        Alert.alert(
          'Não foi possível entrar',
          'Você já possui uma conta cadastrada com o seu email! Entre em contato ou utilize a recuperação de senha!'
        );
      } else {
        Alert.alert(
          'Não foi possível cadastrar',
          'Erro ao processar seus dados!'
        );
      }
    } catch (error) {
      alert(error);
    } finally {
      logout();
    }

    yield put(UserActions.getDataFailure(err));
  }
  setLoading(false);
}

export function* handleRefreshData({ data, setLoading }) {
  try {
    const token = yield select((state) => state.user.token);
    const response = yield call(api.put, `/perfil`, data);

    yield put(UserActions.setDataUser(response.data, token));

    Alert.alert('Sucesso', 'Seus dados foram salvos!');
  } catch (err) {
    Alert.alert('Atualização', 'Houve um erro ao processar suas informações!');
    yield put(UserActions.getDataFailure(err));
  }
  setLoading(false);
}

export function* handleLogout({ setLoading }) {
  try {
    const userId = yield select((state) => state.user.data.id);
    const token = yield select((state) => state.user.token);
    unsubscribeToNotification(userId);

    yield put(UserActions.setDataUser(null, null));

    yield put(ShoppingActions.setDataSuccess([], 0, 0, false));

    setLoading(false);
    NavigationService.navigateReset('Main');
  } catch (err) {
    Alert.alert('Autenticação', 'Houve um erro ao processar suas informações!');
    yield put(UserActions.getDataFailure(err));
  }
}

export function* handleRefreshPassword({ password, setLoading }) {
  try {
    yield call(api.put, `/perfil/senha/atualizar`, { password });

    Alert.alert('Sucesso', 'Sua senha foi alterada!');
  } catch (err) {
    Alert.alert('Atualização', 'Houve um erro ao processar suas informações!');
    yield put(UserActions.getDataFailure(err));
  }
  setLoading(false);
}

export function* handleNewAddress({ payload }) {
  const { setLoading } = payload;

  try {
    const {
      logradouro,
      estado,
      cidade,
      bairro,
      cep,
      numero,
      descricao,
    } = payload;
    const token = yield select((state) => state.user.token);
    const data = yield select((state) => state.user.data);

    const response = yield call(api.post, `/enderecos`, {
      logradouro,
      estado,
      cidade,
      bairro,
      cep,
      numero,
      descricao,
    });

    yield put(
      UserActions.setDataUser(
        {
          ...data,
          id_address: response.data.id,
          logradouro,
          estado,
          cidade,
          bairro,
          cep,
          numero,
          descricao,
        },
        token
      )
    );
    Alert.alert('Sucesso', 'Seu endereço foi salvo!');
    NavigationService.navigateReset('Main');
  } catch (err) {
    Alert.alert('Endereço', 'Houve um erro ao processar suas informações!');
    yield put(UserActions.getDataFailure(err));
  }
  setLoading(false);
}

export function* handleUpdateAddress({ payload }) {
  const { setLoading } = payload;

  try {
    const {
      logradouro,
      estado,
      cidade,
      bairro,
      cep,
      numero,
      descricao,
      id,
    } = payload;
    const token = yield select((state) => state.user.token);
    const data = yield select((state) => state.user.data);

    yield call(api.put, `/enderecos/${id}`, {
      logradouro,
      estado,
      cidade,
      bairro,
      cep,
      numero,
      descricao,
    });

    yield put(
      UserActions.setDataUser(
        {
          ...data,
          id_address: id,
          logradouro,
          estado,
          cidade,
          bairro,
          cep,
          numero,
          descricao,
        },
        token
      )
    );
    Alert.alert('Sucesso', 'Seu endereço foi salvo!');
    NavigationService.navigateReset('Main');
  } catch (err) {
    Alert.alert('Endereço', 'Houve um erro ao processar suas informações!');
    yield put(UserActions.getDataFailure(err));
  }
  setLoading(false);
}

export function* handleDeleteAddress({ payload }) {
  const { setLoadingDeleting } = payload;

  try {
    const {
      logradouro,
      estado,
      cidade,
      bairro,
      cep,
      numero,
      descricao,
      id,
    } = payload;
    const token = yield select((state) => state.user.token);
    const data = yield select((state) => state.user.data);

    const response = yield call(api.delete, `/enderecos/${id}`);

    yield put(
      UserActions.setDataUser(
        {
          ...data,
          id_address: 0,
          logradouro: null,
          estado: null,
          cidade: null,
          bairro: null,
          cep: null,
          numero: null,
          descricao: null,
        },
        token
      )
    );
    Alert.alert('Sucesso', 'Seu endereço foi removido!');
    NavigationService.navigateReset('Main');
  } catch (err) {
    Alert.alert('Endereço', 'Houve um erro ao processar suas informações!');
    yield put(UserActions.getDataFailure(err));
  }
  setLoadingDeleting(false);
}
