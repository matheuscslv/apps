/**
 * @format
 */
import React from 'react';
import '~/config/ReactotronConfig';

import { AppRegistry, View, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import { name as appName } from './app.json';
import App from './src';
import { store, persistor } from './src/store';

export default function ReducerComponent() {
  function renderLoading() {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <ActivityIndicator color="#111" size="small" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <PersistGate loading={renderLoading()} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => ReducerComponent);
