import React, { useEffect } from 'react';
import { StatusBar, YellowBox, Platform } from 'react-native';
import CodePush from 'react-native-code-push';
import FlashMessage from 'react-native-flash-message';
import { useSelector, useDispatch } from 'react-redux';

import createNavigator from '~/routes';

import NavigationService from './services/navigation';

import './scripts/validation';
import api, { setToken } from './services/api';
import { ShoppingTypes } from './store/ducks/shopping';
import { WalletTypes } from './store/ducks/wallet';

YellowBox.ignoreWarnings(['']);

function App() {
  const dispatch = useDispatch();
  const Routes = createNavigator();
  const token = useSelector((state) => state.user.token);

  function reload() {
    console.log('iniciando');
    CodePush.sync({
      updateDialog: {
        title: 'Uma atualização está disponível!',
        optionalUpdateMessage:
          'Uma atualização está disponível. Deseja instalá-la?',
        optionalInstallButtonLabel: 'Instalar',
        optionalIgnoreButtonLabel: 'Ignorar',
        mandatoryContinueButtonLabel: 'Continuar',
        mandatoryUpdateMessage:
          'Está disponível uma atualização que deve ser instalada.',
      },
      installMode: CodePush.InstallMode.IMMEDIATE,
    });
  }

  useEffect(() => {
    // reload()
  }, []);

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
      <StatusBar
        backgroundColor="#f4761c"
        barStyle={Platform.OS == 'ios' ? 'dark-content' : 'light-content'}
      />
      <Routes
        ref={(navigatorRef) => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
      <FlashMessage textStyle={{ fontSize: 16, fontWeight: 'bold' }} />
    </>
  );
}

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  installMode: CodePush.InstallMode.IMMEDIATE,
  updateDialog: {
    title: 'Uma atualização está disponível!',
    optionalUpdateMessage:
      'Uma atualização está disponível. Deseja instalá-la?',
    optionalInstallButtonLabel: 'Instalar',
    optionalIgnoreButtonLabel: 'Ignorar',
    mandatoryContinueButtonLabel: 'Continuar',
    mandatoryUpdateMessage:
      'Está disponível uma atualização que deve ser instalada.',
  },
})(App);
