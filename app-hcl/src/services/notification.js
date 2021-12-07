import OneSignal from 'react-native-onesignal';

import api from './api';
import NavigationService from './navigation';

function onReceived(notification) {
  // console.tron.log("Notification received: ", notification);
}

async function onOpened(openResult) {
  if (openResult.notification.payload.additionalData.matche) {
    try {
      const {
        data: {
          matche: { id, available, date_full, locale, week_number },
        },
      } = await api.get(
        `/matches/${openResult.notification.payload.additionalData.matche}`
      );
      NavigationService.navigate('Detail', {
        matche: { id, available, date_full, locale, week_number },
      });
    } catch (e) {
      //
    }
  } else {
    setTimeout(() => {
      NavigationService.navigate('Pacotes');
    }, 1500);
  }
}

function onIds(device) {
  // console.log('Device info: ', device);
}

function subscribeToNotification() {
  OneSignal.init('1d4948de-7cb3-476b-ac08-4c0392354f5b', {
    kOSSettingsKeyAutoPrompt: true,
  });
  OneSignal.addEventListener('received', onReceived);
  OneSignal.addEventListener('opened', onOpened);
  OneSignal.addEventListener('ids', onIds);
  OneSignal.setSubscription(true);
}

function unsubscribeToNotification() {
  OneSignal.init('1d4948de-7cb3-476b-ac08-4c0392354f5b', {
    kOSSettingsKeyAutoPrompt: true,
  });
  OneSignal.removeEventListener('received', onReceived);
  OneSignal.removeEventListener('opened', onOpened);
  OneSignal.removeEventListener('ids', onIds);
  OneSignal.setSubscription(false);
}

export { subscribeToNotification, unsubscribeToNotification };
