import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  getShoppingRequest: [],
  setDataSuccess: ['data', 'notification', 'current_page', 'requestIsNull'],
  setDataFailure: ['error'],
  setNewPurchaseRequest: [],
  getShoppingReloadRequest: [],
  stopShoppingRequest: [],
  resetShoppingData: [],
});

export const ShoppingTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  data: [],
  current_page: 0,
  notification: 0,
  loading: true,
  refreshing: false,
  error: null,
  requestIsNull: false,
});

/* Reducers */

// export const reducer = state =>
//   state.merge({ data: [] });

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_SHOPPING_REQUEST]: state => state.merge({ refreshing: true }),
  [Types.SET_NEW_PURCHASE_REQUEST]: state => state.merge({ refreshing: true }),
  [Types.GET_SHOPPING_RELOAD_REQUEST]: state =>
    state.merge({ refreshing: true }),
  [Types.SET_DATA_SUCCESS]: (
    state,
    { data, notification, current_page, requestIsNull }
  ) =>
    state.merge({
      data,
      notification,
      current_page,
      loading: false,
      refreshing: false,
      requestIsNull,
    }),
  [Types.SET_DATA_FAILURE]: (state, { error }) =>
    state.merge({
      error,
      loading: false,
      refreshing: false,
    }),
  [Types.STOP_SHOPPING_REQUEST]: state =>
    state.merge({
      loading: false,
      refreshing: false,
    }),
  [Types.RESET_SHOPPING_DATA]: state =>
    state.merge({
      data: [],
      current_page: 0,
      notification: 0,
      loading: true,
      refreshing: false,
      error: null,
      requestIsNull: false,
    }),
});
