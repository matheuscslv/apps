import 'react-native-gesture-handler';
import './config/ReactotronConfig';
import React from 'react';
import { StatusBar, YellowBox } from 'react-native';
import CodePush from 'react-native-code-push';

import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';

import AppProvider from './hooks';
import Routes from './routes';
import themeLigth from './styles/themes/light';

YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state, which can break usage such as persisting and restoring state.',
]);

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <AppProvider>
        <ThemeProvider theme={themeLigth}>
          <StatusBar backgroundColor="transparent" barStyle="dark-content" />
          <Routes />
        </ThemeProvider>
      </AppProvider>
    </NavigationContainer>
  );
};

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  installMode: CodePush.InstallMode.IMMEDIATE,
  updateDialog: {
    title: 'Nova atualização!',
    optionalUpdateMessage:
      'Uma nova atualização está disponível. Deseja instalá-la?',
    optionalInstallButtonLabel: 'Instalar',
    optionalIgnoreButtonLabel: 'Ignorar',
    mandatoryContinueButtonLabel: 'Continuar',
    mandatoryUpdateMessage:
      'Instale a nova atualização para garantir o correto funcionamento do app.',
  },
})(App);
