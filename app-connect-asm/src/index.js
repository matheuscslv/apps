import React from 'react';
import {
  View,
  StatusBar,
  Platform,
  BackHandler,
  YellowBox,
  ToastAndroid,
} from 'react-native';
import createNavigator from '~/routes';
import store2 from '~/services/storage';

import FlashMessage from 'react-native-flash-message';

import NavigationService from '~/services/navigation';

import CodePush from 'react-native-code-push'

import { colors } from '~/styles';
import Splash from './splash';

if (Platform.OS === 'android') {
  StatusBar.setBackgroundColor(`${colors.primary}`);
  StatusBar.setBarStyle('light-content');
} else {
  StatusBar.setBarStyle('dark-content');
}

YellowBox.ignoreWarnings(['Warning:']);

class App extends React.Component {
  state = {
    userLogged: false,
    loading: true,
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.reload();
    this.checkUser();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    //ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
    return true;
  }

  reload() {
    console.log("iniciando")
    CodePush.sync({
      updateDialog: {
        title: "Uma atualização está disponível!",
        optionalUpdateMessage: "Uma atualização está disponível. Deseja instalá-la?",
        optionalInstallButtonLabel: "Instalar",
        optionalIgnoreButtonLabel: "Ignorar",
        mandatoryContinueButtonLabel: "Continuar",
        mandatoryUpdateMessage: "Está disponível uma atualização que deve ser instalada."
      },
      installMode: CodePush.InstallMode.IMMEDIATE
    });
  }

  checkUser = async () => {
    const user = await store2.get('token');

    this.setState({
      userLogged: !!user,
      loading: false,
    });
  };

  render() {
    const { userLogged, loading } = this.state;
    const Routes = createNavigator(userLogged);

    return <>
      {loading
        ?
        <Splash />
        :
        <>
          <Routes
            ref={(navigatorRef) => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
          <FlashMessage position="top" />
        </>
      }
    </>;
  }
}

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  installMode: CodePush.InstallMode.IMMEDIATE
})(App);
