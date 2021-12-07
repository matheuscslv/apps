import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  handleLoginRequest: [],
  handleLogoutRequest: [],
  handleUpdateUserRequest: [],
  handleRefreshUserRequest: [],
  changePackageRequest: [],
  handleLoginSuccess: ['data', 'token'],
  handleLoginFailure: ['error'],
});

export const UserTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  data: null,
  token: '',
  error: '',
  loading: false,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.HANDLE_LOGIN_REQUEST]: state => state.merge({ loading: true }),
  [Types.CHANGE_PACKAGE_REQUEST]: state => state.merge({}),
  [Types.HANDLE_LOGOUT_REQUEST]: state => state.merge({ loading: true }),
  [Types.HANDLE_UPDATE_USER_REQUEST]: state => state.merge({ loading: true }),
  [Types.HANDLE_REFRESH_USER_REQUEST]: state => state.merge({ loading: true }),
  [Types.HANDLE_LOGIN_SUCCESS]: (state, { data, token }) =>
    state.merge({ data, token, error: null, loading: false }),
  [Types.HANDLE_LOGIN_FAILURE]: (state, { error }) =>
    state.merge({ error, loading: false }),
});
