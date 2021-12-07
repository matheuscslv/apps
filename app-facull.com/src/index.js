import React, { useEffect } from 'react';
import { StatusBar, YellowBox } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { useSelector, useDispatch } from 'react-redux';

import createNavigator from '~/routes';

import NavigationService from './services/navigation';

import './scripts/validation';
import api, { setToken } from './services/api';
import { ShoppingTypes } from './store/ducks/shopping';
import { WalletTypes } from './store/ducks/wallet';

YellowBox.ignoreWarnings(['Warning: ', 'Deprecation']);

export default function App() {
  const dispatch = useDispatch();
  const Routes = createNavigator();
  const token = useSelector(state => state.user.token);

  useEffect(() => {
    async function getCards() {
      if (!token) return;
      const { data } = await api.get('/token/cartao');
      dispatch({
        type: WalletTypes.SET_CARDS,
        cards: data,
      });
      dispatch({
        type: ShoppingTypes.GET_SHOPPING_REQUEST,
      });
    }
    setToken(token);
    getCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <>
      <StatusBar backgroundColor="#f4761c" barStyle="light-content" />
      <Routes
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
      <FlashMessage
        style={{ marginTop: 70 }}
        textStyle={{ fontSize: 16, fontWeight: 'bold' }}
      />
    </>
  );
}
