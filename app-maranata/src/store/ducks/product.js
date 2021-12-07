import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  getProductsRequest: null,
  getCategoryProductsRequest: ['payload'],
  reloadProductsRequest: null,
  getProductRequest: ['id'],
  getProductsSuccess: ['data', 'current_page'],
  getProductsFailure: ['error'],
});

export const ProductsTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  loading: true,
  error: null,
  data: [],
  refreshing: false,
  current_page: 0,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PRODUCTS_REQUEST]: (state) =>
    state.merge({
      refreshing: true,
    }),
  [Types.GET_CATEGORY_PRODUCTS_REQUEST]: (state) =>
    state.merge({
      refreshing: true,
      loading: true,
    }),

  [Types.RELOAD_PRODUCTS_REQUEST]: (state) =>
    state.merge({
      loading: true,
      refreshing: true,
    }),
  [Types.GET_PRODUCTS_SUCCESS]: (state, { data, current_page }) =>
    state.merge({
      data,
      loading: false,
      refreshing: false,
      current_page,
    }),
  [Types.GET_PRODUCTS_FAILURE]: (state, { error }) =>
    state.merge({
      error,
      loading: false,
      refreshing: false,
    }),
});
