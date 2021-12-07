import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const {Types, Creators} = createActions({
  // actionType: ['dataPassed'],
  setRequestData: null,
  setSuccessData: ['data'],
  setFailureData: ['error'],
});

export const UserTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  data: {
    avatar:
      'https://lh3.googleusercontent.com/a-/AAuE7mA3VYEtWiLJGrsNOWkG2xZYlzVtuxUH0u8Zkz62vw=s96-c',
    birthday: '',
    email: 'manoelgomes53@gmail.com',
    name: 'Manoel Gomes',
    cpf: '12810651027',
  },
  loading: false,
  error: null,
});

/* Reducers */

// export const reducer = state =>
//   state.merge({ data: [] });

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  // [Types.ACTION_TYPE]: reducer,
  [Types.SET_SUCCESS_DATA]: (state, {data}) =>
    state.merge({data, loading: false, error: null}),
});
