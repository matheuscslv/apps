import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  addNewCard: ['cards', 'card'],
  incrementCredit: ['credit'],
  selectMoney: ['cards'],
  selectCredit: ['cards'],
  setCards: ['cards'],
  deleteCardRequest: [],
  selectMoneyAndCredit: ['cards'],
  selectCardAndCredit: ['cards'],
  selectCard: ['cards', 'card'],
  setRequestError: ['error'],
  getMoneyOption: [],
  getMoneyAndCreditOption: [],
  getCardAndCreditOption: [],
  getCreditOption: [],
  getCardOption: [],
  getAddCardRequest: [],
  getAddCreditRequest: [],
  resetData: [],
});

export const WalletTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  cards: [],
  credit: 0,
  loading: false,
  refreshing: false,
  money: true,
  credit_selected: false,
  card_selected: null,
  cardAndCredit: false,
  moneyAndCredit: false,
});

/* Reducers */

// export const reducer = state =>
//   state.merge({ data: [] });

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_MONEY_AND_CREDIT_OPTION]: state =>
    state.merge({
      loading: true,
    }),
  [Types.GET_CARD_AND_CREDIT_OPTION]: state =>
    state.merge({
      loading: true,
    }),
  [Types.GET_MONEY_OPTION]: state =>
    state.merge({
      loading: true,
    }),
  [Types.GET_ADD_CARD_REQUEST]: state =>
    state.merge({
      loading: true,
    }),
  [Types.GET_ADD_CREDIT_REQUEST]: state =>
    state.merge({
      loading: true,
    }),
  [Types.GET_CREDIT_OPTION]: state =>
    state.merge({
      loading: true,
    }),
  [Types.GET_CARD_OPTION]: state =>
    state.merge({
      loading: true,
    }),
  [Types.ADD_NEW_CARD]: (state, { cards, card }) =>
    state.merge({
      cards,
      loading: false,
      refreshing: false,
      card_selected: card,
      credit_selected: false,
      money: false,
      cardAndCredit: false,
      moneyAndCredit: false,
    }),
  [Types.INCREMENT_CREDIT]: (state, { credit }) =>
    state.merge({
      credit,
    }),
  [Types.SELECT_CARD]: (state, { cards, card }) =>
    state.merge({
      cards,
      loading: false,
      refreshing: false,
      card_selected: card,
      credit_selected: false,
      money: false,
      cardAndCredit: false,
      moneyAndCredit: false,
    }),
  [Types.SELECT_MONEY]: (state, { cards }) =>
    state.merge({
      money: true,
      loading: false,
      refreshing: false,
      credit_selected: false,
      card_selected: null,
      cards,
      cardAndCredit: false,
      moneyAndCredit: false,
    }),
  [Types.SELECT_CREDIT]: (state, { cards }) =>
    state.merge({
      money: false,
      loading: false,
      refreshing: false,
      credit_selected: true,
      card_selected: null,
      cards,
      cardAndCredit: false,
      moneyAndCredit: false,
    }),
  [Types.SELECT_MONEY_AND_CREDIT]: (state, { cards }) =>
    state.merge({
      money: false,
      loading: false,
      refreshing: false,
      credit_selected: false,
      card_selected: null,
      cards,
      cardAndCredit: false,
      moneyAndCredit: true,
    }),
  [Types.SET_REQUEST_ERROR]: (state, { error }) =>
    state.merge({
      error,
      loading: false,
    }),
  [Types.SET_CARDS]: (state, { cards }) =>
    state.merge({
      cards,
      loading: false,
    }),
  [Types.RESET_DATA]: state =>
    state.merge({
      cards: [],
      credit: 0,
      loading: false,
      refreshing: false,
      money: true,
      credit_selected: false,
      card_selected: null,
      cardAndCredit: false,
      moneyAndCredit: false,
    }),

  [Types.DELETE_CARD_REQUEST]: state =>
    state.merge({
      loading: true,
      refreshing: true,
    }),
});
