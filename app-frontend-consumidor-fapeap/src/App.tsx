import React from 'react';
import { YellowBox } from 'react-native';
import CodePush from 'react-native-code-push';

import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';

import { AuthProvider } from './contexts/auth';
import { CartProvider } from './contexts/cart';
import Routes from './routes';
import { navigationRef } from './services/navigation';
import themeLigth from './styles/themes/light';

YellowBox.ignoreWarnings(['']);

const App: React.FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <CartProvider>
        <AuthProvider>
          <ThemeProvider theme={themeLigth}>
            <Routes />
          </ThemeProvider>
        </AuthProvider>
      </CartProvider>
    </NavigationContainer>
  );
};

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  installMode: CodePush.InstallMode.IMMEDIATE,
  /* updateDialog: {
    title: 'Uma atualização está disponível!',
    optionalUpdateMessage:
      'Uma atualização está disponível. Deseja instalá-la?',
    optionalInstallButtonLabel: 'Instalar',
    optionalIgnoreButtonLabel: 'Ignorar',
    mandatoryContinueButtonLabel: 'Continuar',
    mandatoryUpdateMessage:
      'Está disponível uma atualização que deve ser instalada.',
  }, */
})(App);
