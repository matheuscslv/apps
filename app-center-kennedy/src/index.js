import React, {useEffect, useState} from 'react';
import '~/config/StatusBarConfig';
import '~/config/ReactotronConfig';
import '~/scripts/validation';
import {YellowBox} from 'react-native';
import createNavigator from '~/routes';
import FlashMessage from 'react-native-flash-message';
import {Provider} from 'react-redux';
import store from './store';
import SetEstado from './components/SetEstado';

YellowBox.ignoreWarnings(['Virtualized']);

export default function App() {
  const [userLogged, setUserLogged] = useState(false);
  const [userChecked, setUserChecked] = useState(false);
  const [errorConnection, setErrorConnection] = useState(false);

  const Routes = createNavigator(userLogged);

  return (
    <Provider store={store}>
      <Routes />
      <SetEstado />
    </Provider>
  );
}
/* export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME
})(App); */
