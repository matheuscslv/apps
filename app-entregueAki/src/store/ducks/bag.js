import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  getBagsRequest: null,
  getBagRequest: ['id'],
  getBagsSuccess: ['data', 'total'],
  getBagsFailure: ['error'],
  setTrip: [],
});

export const BagsTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  loading: true,
  error: null,
  data: [],
  total: 0,
  refreshing: true,
  trip: false,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_BAGS_REQUEST]: state =>
    state.merge({
      loading: true,
      refreshing: true,
    }),
  [Types.GET_BAGS_SUCCESS]: (state, { data, total }) =>
    state.merge({
      data,
      total,
      loading: false,
      refreshing: false,
    }),
  [Types.SET_TRIP]: state =>
    state.merge({
      trip: !state.trip,
    }),
  [Types.GET_BAG_REQUEST]: (state, { id }) =>
    state.data.map(item =>
      item.id != id ? item : { ...item, total: item.total + 1 }
    ),
  [Types.GET_BAGS_FAILURE]: (state, { error }) =>
    state.merge({
      error,
      data: [],
      loading: true,
      refreshing: false,
    }),
});
