import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  getMatcheRequest: [],
  getMatcheSuccess: ['completed', 'current', 'me'],
  getMatcheFailure: ['error'],
});

export const MatcheTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  completed: [],
  current: [],
  me: [],
  error: null,
  loading: false,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_MATCHE_REQUEST]: state => state.merge({ loading: true }),
  [Types.GET_MATCHE_FAILURE]: (state, error) =>
    state.merge({ loading: false, error }),
  [Types.GET_MATCHE_SUCCESS]: (state, { completed, current, me }) =>
    state.merge({ loading: false, completed, current, me }),
});
