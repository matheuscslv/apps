import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  getBagsRequest: null,
  getBagRequest: ['id'],
  getBagsSuccess: ['data', 'total'],
  getBagsFailure: ['error'],
  updateProductRequest: ['payload'],
  setTrip: [],
});

export const BagsTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  loading: false,
  error: null,
  data: [],
  total: 0,
  refreshing: true,
  trip: false,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_BAGS_REQUEST]: (state) =>
    state.merge({
      loading: true,
      refreshing: true,
    }),
  [Types.UPDATE_PRODUCT_REQUEST]: (state) =>
    state.merge({
      loading: false,
      refreshing: false,
    }),
  [Types.GET_BAGS_SUCCESS]: (state, { data }) =>
    state.merge({
      data,
      total: data.reduce((amount, product) => amount + product.quantity, 0),
      loading: false,
      refreshing: false,
    }),
  [Types.SET_TRIP]: (state) =>
    state.merge({
      trip: !state.trip,
    }),
  [Types.GET_BAG_REQUEST]: (state, { id }) =>
    state.data.map((item) =>
      item.id != id ? item : { ...item, total: item.total + 1 },
    ),
  [Types.GET_BAGS_FAILURE]: (state, { error }) =>
    state.merge({
      error,
      data: [],
      loading: false,
      refreshing: false,
    }),
});
