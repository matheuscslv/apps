import {call, put, select} from 'redux-saga/effects';
import UserActions from '../ducks/user';
import store from '~/services/storage';

export function* loadData() {
  try {
    yield put(UserActions.setSuccessData());
  } catch (err) {
    console.log(err);
    yield put(UserActions.setFailureData(err));
  }
}

export function* setData({profile}) {
  try {
    const data = profile;
    yield put(UserActions.setSuccessData(data));
  } catch (err) {
    alert(err);
    yield put(UserActions.setFailureData(err));
  }
}
