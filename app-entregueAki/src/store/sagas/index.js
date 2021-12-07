import { all, takeLatest, takeEvery } from 'redux-saga/effects';

import { BagsTypes } from '../ducks/bag';
import { ShoppingTypes } from '../ducks/shopping';
import { TruckageTypes } from '../ducks/truckage';
import { UserTypes } from '../ducks/user';
import { WalletTypes } from '../ducks/wallet';
import { handlePayment } from './processPayment';
import { getData, reloadData } from './shopping';
import { handleTruckage } from './truckage';
import {
  handleLogin,
  handleSignUp,
  handleRefreshData,
  handleLogout,
  handleRefreshPassword,
  handleNewAddress,
  handleDeleteAddress,
  handleUpdateAddress,
} from './user';
import {
  selectOptionMoney,
  selectOptionMoneyAndCredit,
  selectOptionCredit,
  selectOptionCard,
  addNewCard,
  addNewCardCart,
  addCreditVoucher,
  excludeCard,
  getCardsUser
} from './wallet';

import api, { setToken } from '~/services/api';
import { call, put, select } from 'redux-saga/effects';
import { subscribeToNotification } from '~/services/notification';

function* setInitialToken({ payload }) {
  if (!payload) return;
  const { token } = payload.user;
  if (token) {
    //const { id } = payload.user.data;
    setToken(token);
    //subscribeToNotification(id);
    yield getData();
    yield getCardsUser();
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest('persist/REHYDRATE', setInitialToken),
    takeLatest(WalletTypes.GET_MONEY_OPTION, selectOptionMoney),
    takeLatest(WalletTypes.GET_CREDIT_OPTION, selectOptionCredit),
    takeLatest(WalletTypes.GET_CARD_OPTION, selectOptionCard),
    takeLatest(WalletTypes.GET_ADD_CARD_REQUEST, addNewCard),
    takeLatest(WalletTypes.GET_ADD_CARD_CART_REQUEST, addNewCardCart),
    takeLatest(WalletTypes.GET_ADD_CREDIT_REQUEST, addCreditVoucher),
    takeLatest(WalletTypes.DELETE_CARD_REQUEST, excludeCard),
    takeLatest(
      WalletTypes.GET_MONEY_AND_CREDIT_OPTION,
      selectOptionMoneyAndCredit
    ),
    takeLatest(UserTypes.GET_DATA_REQUEST, handleLogin),
    takeLatest(UserTypes.SET_NEW_ADDRESS_REQUEST, handleNewAddress),
    takeLatest(UserTypes.SET_ADDRESS_REQUEST, handleUpdateAddress),
    takeLatest(UserTypes.SET_DELETE_ADDRESS_REQUEST, handleDeleteAddress),
    takeLatest(UserTypes.GET_REGISTER_REQUEST, handleSignUp),
    takeLatest(UserTypes.SET_REFRESH_DATA_REQUEST, handleRefreshData),
    takeLatest(UserTypes.GET_LOGOUT_REQUEST, handleLogout),
    takeLatest(UserTypes.SET_REFRESH_PASSWORD_REQUEST, handleRefreshPassword),

    takeLatest(BagsTypes.GET_BAGS_REQUEST, handlePayment),

    takeLatest(ShoppingTypes.GET_SHOPPING_REQUEST, getData),
    takeLatest(ShoppingTypes.GET_SHOPPING_RELOAD_REQUEST, reloadData),

    takeLatest(TruckageTypes.GET_TRUCKAGE_REQUEST, handleTruckage),
  ]);
}
