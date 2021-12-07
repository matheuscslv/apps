import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  setConstants: ['data'],
  getConstants: [],
});

export const ConstantsTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  soccer_days: [],
  pakito_crash: null,
  payment_released: false,
  diarist_crash: null,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_CONSTANTS]: (state, { data }) => state.merge({ ...data }),
  [Types.GET_CONSTANTS]: state => state.merge({}),
});
