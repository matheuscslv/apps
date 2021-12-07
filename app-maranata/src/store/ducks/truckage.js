import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  getTruckageRequest: ['payload'],
  getTruckageSuccess: ['payload'],
  getTruckageFailure: ['error'],
});

export const TruckageTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  origin: null,
  destination: null,
  distance: null,
  value: null,
  loading: false,
  error: null,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_TRUCKAGE_REQUEST]: state =>
    state.merge({ loading: true, error: null }),
  [Types.GET_TRUCKAGE_SUCCESS]: (state, { payload }) =>
    state.merge({
      loading: false,
      error: null,
      origin: payload.origin,
      destination: payload.destination,
      distance: payload.distance,
      value: payload.value,
    }),
  [Types.GET_TRUCKAGE_FAILURE]: (state, { error }) =>
    state.merge({ loading: false, error }),
});
