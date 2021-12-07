import React, { useEffect } from "react";
import { YellowBox, StatusBar, Platform } from "react-native";
import "~/config/StatusBarConfig";
import "~/config/ReactotronConfig";
import Routes from "~/routes";
import SplashScreen from "react-native-splash-screen";
import FlashMessage from "react-native-flash-message";
import CodePush from "react-native-code-push";

import { Provider, useDispatch } from "react-redux";
import store from "./store";
import storage from "./services/storage";

YellowBox.ignoreWarnings([
  "Warning: componentWillUpdate",
  "Warning: Encountered two children with the same key",
  "Warning: Each child in a list should have a unique",
  "Warning: Async"
]);

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      {Platform.OS === 'android'
        ?
        <StatusBar barStyle="light-content" />
        :
        <StatusBar barStyle="dark-content" />
      }

      <Routes />
      <FlashMessage position="top" />
    </Provider>
  );
}

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME
})(App);
