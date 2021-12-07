import React, { useState, useEffect } from 'react';
import { StatusBar, Platform, YellowBox } from 'react-native';
import '~/config/ReactotronConfig';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import createNavigator from '~/routes';

import Loading from './components/Loading';
import NavigationService from './services/navigation';
import { store, persistor } from './store';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount',
  'Warning: componentWillReceiveProps',
]);

export default function App() {
  const [userLogged, setUserLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setUserLogged(!!store.getState().user.token);
      setLoading(false);
    }, 500);
  }, []);

  const Routes = createNavigator(userLogged);

  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <StatusBar backgroundColor="#222" barStyle="light-content" />
        {loading ? (
          <Loading title="Estamos carregando seus dados!" />
        ) : (
          <Routes
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
        )}
      </PersistGate>
    </Provider>
  );
}
