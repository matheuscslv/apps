import { all, takeLatest, takeEvery } from 'redux-saga/effects';

import { BagsTypes } from '../ducks/bag';
import { ShoppingTypes } from '../ducks/shopping';
import { UserTypes } from '../ducks/user';
import { WalletTypes } from '../ducks/wallet';
import { handlePayment } from './processPayment';
import { getData, setNewPurchase, reloadData } from './shopping';
import {
  handleLogin,
  handleSignUp,
  handleRefreshData,
  handleLogout,
  handleRefreshPassword,
} from './user';
import {
  selectOptionMoney,
  selectOptionMoneyAndCredit,
  selectOptionCredit,
  selectOptionCard,
  addNewCard,
  addCreditVoucher,
  excludeCard,
} from './wallet';

export default function* rootSaga() {
  yield all([
    takeLatest(WalletTypes.GET_MONEY_OPTION, selectOptionMoney),
    takeLatest(WalletTypes.GET_CREDIT_OPTION, selectOptionCredit),
    takeLatest(WalletTypes.GET_CARD_OPTION, selectOptionCard),
    takeLatest(WalletTypes.GET_ADD_CARD_REQUEST, addNewCard),
    takeLatest(WalletTypes.GET_ADD_CREDIT_REQUEST, addCreditVoucher),
    takeLatest(WalletTypes.DELETE_CARD_REQUEST, excludeCard),
    takeLatest(
      WalletTypes.GET_MONEY_AND_CREDIT_OPTION,
      selectOptionMoneyAndCredit
    ),
    takeLatest(UserTypes.GET_DATA_REQUEST, handleLogin),
    takeLatest(UserTypes.SET_ADDRESS_REQUEST, handleRefreshData),
    takeLatest(UserTypes.GET_REGISTER_REQUEST, handleSignUp),
    takeLatest(UserTypes.SET_REFRESH_DATA_REQUEST, handleRefreshData),
    takeLatest(UserTypes.GET_LOGOUT_REQUEST, handleLogout),
    takeLatest(UserTypes.SET_REFRESH_PASSWORD_REQUEST, handleRefreshPassword),

    takeLatest(BagsTypes.GET_BAGS_REQUEST, handlePayment),

    takeLatest(ShoppingTypes.GET_SHOPPING_REQUEST, getData),
    takeLatest(ShoppingTypes.GET_SHOPPING_RELOAD_REQUEST, reloadData),
  ]);
}
