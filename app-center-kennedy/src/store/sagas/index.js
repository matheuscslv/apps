import {all, takeLatest} from 'redux-saga/effects';
import {UserTypes} from '../ducks/user';
import {setData} from './user';

export default function* rootSaga() {
  yield all([takeLatest(UserTypes.SET_REQUEST_DATA, setData)]);
}
