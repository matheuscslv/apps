import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  getAdressesRequest: ['payload'],
  getAdressesSuccess: ['data'],
  getAdressesFailure: ['error'],
  handleNewOrUpdateAddressRequest: ['payload'],
  handleDeleteAddressRequest: ['payload'],
  changeAddressDefaultRequest: ['payload'],
});

export const AdressesTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  data: [],
  loading: false,
  error: null,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_ADRESSES_REQUEST]: state =>
    state.merge({ loading: true, error: null }),
  [Types.HANDLE_NEW_OR_UPDATE_ADDRESS_REQUEST]: state =>
    state.merge({ loading: true, error: null }),
  [Types.CHANGE_ADDRESS_DEFAULT_REQUEST]: state => state.merge({}),
  [Types.HANDLE_DELETE_ADDRESS_REQUEST]: state =>
    state.merge({ loading: true }),
  [Types.GET_ADRESSES_SUCCESS]: (state, { data }) =>
    state.merge({ data, error: null, loading: false }),
  [Types.GET_ADRESSES_FAILURE]: (state, { error }) =>
    state.merge({ error, loading: false }),
});
