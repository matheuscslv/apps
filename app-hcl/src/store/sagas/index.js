import { all, takeLatest } from 'redux-saga/effects';

import { ConstantsTypes } from '../ducks/constants';
import { MatcheTypes } from '../ducks/matche';
import { UserTypes } from '../ducks/user';
import { getConstants } from './constants';
import { load } from './matche';
import {
  handleUpdateUser,
  handleLogin,
  handleChangePackage,
  handleLogout,
  refreshDataUser,
} from './user';

export default function* rootSaga() {
  yield all([
    takeLatest(MatcheTypes.GET_MATCHE_REQUEST, load),
    takeLatest(UserTypes.HANDLE_UPDATE_USER_REQUEST, handleUpdateUser),
    takeLatest(UserTypes.HANDLE_REFRESH_USER_REQUEST, refreshDataUser),
    takeLatest(UserTypes.HANDLE_LOGIN_REQUEST, handleLogin),
    takeLatest(UserTypes.HANDLE_LOGOUT_REQUEST, handleLogout),
    takeLatest(UserTypes.CHANGE_PACKAGE_REQUEST, handleChangePackage),
    takeLatest(ConstantsTypes.GET_CONSTANTS, getConstants),
  ]);
}
