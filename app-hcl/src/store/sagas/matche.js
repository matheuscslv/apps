import { Alert } from 'react-native';

import { call, put, select } from 'redux-saga/effects';

import api, { setToken } from '~/services/api';

import MatcheActions from '../ducks/matche';

export function* load() {
  try {
    const token = yield select(state => state.user.token);
    setToken(token);
    const {
      data: { my_matches, current, finished },
    } = yield call(api.get, 'user_matches');

    const me = my_matches.map(({ matche }) => matche);

    yield put(MatcheActions.getMatcheSuccess(finished, current, me));
  } catch (err) {
    yield put(MatcheActions.getMatcheFailure(err));
  }
}
