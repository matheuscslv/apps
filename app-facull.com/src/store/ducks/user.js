import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  setDataUser: ['data', 'token'],
  getDataFailure: ['error'],
  getDataRequest: [],
  getLogoutRequest: [],
  setRefreshDataRequest: [],
  setRefreshPasswordRequest: [],
  getRegisterRequest: [],
  setAddressRequest: [],
});

export const UserTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  data: null,
  token: null,
  loading: false,
  error: null,
});

/* Reducers */

// export const reducer = state =>
//   state.merge({ data: [] });

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_DATA_REQUEST]: state =>
    state.merge({
      loading: true,
    }),
  [Types.SET_REFRESH_DATA_REQUEST]: state =>
    state.merge({
      loading: true,
    }),
  [Types.SET_REFRESH_PASSWORD_REQUEST]: state =>
    state.merge({
      loading: true,
    }),
  [Types.SET_ADDRESS_REQUEST]: state =>
    state.merge({
      loading: true,
    }),
  [Types.GET_REGISTER_REQUEST]: state =>
    state.merge({
      loading: true,
    }),
  [Types.GET_LOGOUT_REQUEST]: state =>
    state.merge({
      loading: true,
    }),
  [Types.SET_DATA_USER]: (state, { data, token }) =>
    state.merge({
      data,
      token,
      loading: false,
      error: null,
    }),

  [Types.GET_DATA_FAILURE]: (state, { error }) =>
    state.merge({
      loading: false,
      error,
    }),
});
