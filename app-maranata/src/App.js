import 'react-native-gesture-handler';
import React from 'react';
import '~/config/ReactotronConfig';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import CodePush from 'react-native-code-push';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { navigationRef } from './services/navigation';
import Routes from './routes';
import themeLigth from './styles/themes/light';

import { store, persistor } from './store';
import { useEffect } from 'react';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer ref={navigationRef}>
          <ThemeProvider theme={themeLigth}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" />
            <Routes />
          </ThemeProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(App);
