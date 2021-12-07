/* eslint-disable @typescript-eslint/interface-name-prefix */
import Reactotron from 'reactotron-react-native';

declare global {
  interface Console {
    tron: {
      log?: any;
      error?: any;
    };
  }
}

if (__DEV__) {
  const tron = Reactotron.configure({ host: '192.168.0.104' })
    .useReactNative()
    .connect();

  tron.clear;
  // eslint-disable-next-line no-console
  console.tron = tron;
}
