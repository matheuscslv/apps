import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  addNewCard: ['cards', 'card'],
  selectMoney: ['cards'],
  setCards: ['cards'],
  deleteCardRequest: [],
  selectCard: ['cards', 'card'],
  selectDebitRequest: [],
  selectDebit: ['cards'],
  setRequestError: ['error'],
  getMoneyOption: [],
  getCardOption: [],
  getAddCardRequest: [],
  resetData: [],
  handleProcessPayment: ['payload'],
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

export const reducer = createReducer(INITIAL_STATE, {
  [Types.HANDLE_PROCESS_PAYMENT]: (state) =>
    state.merge({
      loading: true,
    }),
  [Types.GET_MONEY_OPTION]: (state) =>
    state.merge({
      loading: true,
    }),
  [Types.GET_ADD_CARD_REQUEST]: (state) =>
    state.merge({
      loading: true,
    }),
  [Types.SELECT_DEBIT_REQUEST]: (state) =>
    state.merge({
      loading: false,
    }),
  [Types.GET_CARD_OPTION]: (state) =>
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
      debit: false,
      money: false,
      cardAndCredit: false,
      moneyAndCredit: false,
    }),
  [Types.SELECT_CARD]: (state, { cards, card }) =>
    state.merge({
      cards,
      loading: false,
      debit: false,
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
      debit: false,
      refreshing: false,
      credit_selected: false,
      card_selected: null,
      cards,
      debit: false,
      cardAndCredit: false,
      moneyAndCredit: false,
    }),
  [Types.SELECT_DEBIT]: (state, { cards }) =>
    state.merge({
      money: false,
      loading: false,
      debit: true,
      refreshing: false,
      credit_selected: false,
      card_selected: null,
      cards,
      cardAndCredit: false,
      moneyAndCredit: false,
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
  [Types.RESET_DATA]: (state) =>
    state.merge({
      cards: [],
      credit: 0,
      debit: false,
      loading: false,
      refreshing: false,
      money: true,
      credit_selected: false,
      card_selected: null,
      cardAndCredit: false,
      moneyAndCredit: false,
    }),

  [Types.DELETE_CARD_REQUEST]: (state) =>
    state.merge({
      loading: true,
      refreshing: true,
    }),
});
