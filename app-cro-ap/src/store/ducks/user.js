import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  setData: ['token', 'data'],
});

export const TokenTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  token: null,
  data: null,
});

/* Reducers */

// export const reducer = state =>
//   state.merge({ data: [] });

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_DATA]: (state, { token, data }) => state.merge({ token, data }),
});
