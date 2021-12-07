import { all, takeLatest } from 'redux-saga/effects';

import { setToken } from '~/services/api';

import { AdressesTypes } from '../ducks/adresses';
import { BagsTypes } from '../ducks/bag';
import { ShoppingTypes } from '../ducks/shopping';
import { TruckageTypes } from '../ducks/truckage';
import { UserTypes } from '../ducks/user';
import { WalletTypes } from '../ducks/wallet';
import {
  getAdresses,
  handleNewOrUpdateAddress,
  setAddressWithDefault,
  handleDeleteAddress,
} from './adresses';
import { getData, reloadData } from './shopping';
import { handleTruckage } from './truckage';
import {
  handleLogin,
  handleSignUp,
  handleRefreshData,
  handleLogout,
  handleRefreshPassword,
} from './user';
import {
  selectOptionMoney,
  selectOptionCard,
  addNewCard,
  excludeCard,
  getCardsUser,
  handleProductsPayment,
  handleSelectDebit,
} from './wallet';
import { ProductsTypes } from '../ducks/product';
import {
  getProductsList,
  reloadProductsData,
  getCategoryProducts,
} from './products';
import { updateAmount } from './cart';
import { subscribeToNotification } from '~/services/notification';

function* setInitialToken({ payload }) {
  if (!payload) return;

  const { token } = payload.user;

  if (token) {
    const { id } = payload.user.data;
    subscribeToNotification(id);

    setToken(token);
    yield getData();
    yield getAdresses();
    yield getCardsUser();
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest('persist/REHYDRATE', setInitialToken),
    takeLatest(WalletTypes.GET_CARD_OPTION, selectOptionCard),
    takeLatest(WalletTypes.GET_ADD_CARD_REQUEST, addNewCard),
    takeLatest(WalletTypes.DELETE_CARD_REQUEST, excludeCard),
    takeLatest(WalletTypes.HANDLE_PROCESS_PAYMENT, handleProductsPayment),
    takeLatest(WalletTypes.GET_MONEY_OPTION, selectOptionMoney),
    takeLatest(WalletTypes.SELECT_DEBIT_REQUEST, handleSelectDebit),

    takeLatest(ProductsTypes.GET_PRODUCTS_REQUEST, getProductsList),
    takeLatest(ProductsTypes.RELOAD_PRODUCTS_REQUEST, reloadProductsData),
    takeLatest(
      ProductsTypes.GET_CATEGORY_PRODUCTS_REQUEST,
      getCategoryProducts,
    ),

    takeLatest(UserTypes.GET_DATA_REQUEST, handleLogin),
    takeLatest(UserTypes.GET_REGISTER_REQUEST, handleSignUp),
    takeLatest(UserTypes.SET_REFRESH_DATA_REQUEST, handleRefreshData),
    takeLatest(UserTypes.GET_LOGOUT_REQUEST, handleLogout),
    takeLatest(UserTypes.SET_REFRESH_PASSWORD_REQUEST, handleRefreshPassword),

    takeLatest(BagsTypes.UPDATE_PRODUCT_REQUEST, updateAmount),

    takeLatest(ShoppingTypes.GET_SHOPPING_REQUEST, getData),
    takeLatest(ShoppingTypes.GET_SHOPPING_RELOAD_REQUEST, reloadData),

    takeLatest(TruckageTypes.GET_TRUCKAGE_REQUEST, handleTruckage),

    takeLatest(AdressesTypes.GET_ADRESSES_REQUEST, getAdresses),
    takeLatest(
      AdressesTypes.HANDLE_DELETE_ADDRESS_REQUEST,
      handleDeleteAddress,
    ),
    takeLatest(
      AdressesTypes.CHANGE_ADDRESS_DEFAULT_REQUEST,
      setAddressWithDefault,
    ),
    takeLatest(
      AdressesTypes.HANDLE_NEW_OR_UPDATE_ADDRESS_REQUEST,
      handleNewOrUpdateAddress,
    ),
  ]);
}
