import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  getProductsRequest: null,
  getProductRequest: ['id'],
  getProductsSuccess: ['data'],
  getProductsFailure: ['error'],
});

export const ProductsTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  loading: true,
  error: null,
  data: [],
  refreshing: true,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PRODUCTS_REQUEST]: state =>
    state.merge({
      loading: true,
      refreshing: true,
    }),
  [Types.GET_PRODUCTS_SUCCESS]: (state, { data, total }) =>
    state.merge({
      data,
      loading: false,
      refreshing: false,
    }),
  [Types.GET_PRODUCTS_FAILURE]: (state, { error }) =>
    state.merge({
      error,
      data: [],
      loading: true,
      refreshing: false,
    }),
});
