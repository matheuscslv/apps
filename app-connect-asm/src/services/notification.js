import OneSignal from 'react-native-onesignal';
import NavigationService from './navigation';

function onReceived(notification) {
  // console.tron.warn('Notification received: ', notification);
}

async function onOpened(openResult) {
  try {
    if (openResult.notification.payload.additionalData) {
      const { month, year } = openResult.notification.payload.additionalData;
      NavigationService.navigate('ContraCheque', { notification: true, month_text: mes(month), month: month, year: year, item: year });
    }
  } catch (error) {
    NavigationService.navigate('Main');
  }
}

function mes(month) {
  if (month == 1) {
    return 'JAN';
  }
  if (month == 2) {
    return 'FEV';
  }
  if (month == 3) {
    return 'MAR';
  }
  if (month == 4) {
    return 'ABR';
  }
  if (month == 5) {
    return 'MAI';
  }
  if (month == 6) {
    return 'JUN';
  }
  if (month == 7) {
    return 'JUL';
  }
  if (month == 8) {
    return 'AGO';
  }
  if (month == 9) {
    return 'SET';
  }
  if (month == 10) {
    return 'OUT';
  }
  if (month == 11) {
    return 'NOV';
  }
  if (month == 12) {
    return 'DEZ';
  }
}

function onIds(device) {
  // console.log('Device info: ', device);
}

function subscribeToNotification(id = null) {
  OneSignal.init('c6103ef8-8238-494e-b47a-d069b2f46f50', {
    kOSSettingsKeyAutoPrompt: true,
  });
  OneSignal.addEventListener('received', onReceived);
  OneSignal.addEventListener('opened', onOpened);
  OneSignal.addEventListener('ids', onIds);
  if (id) {
    OneSignal.sendTag('user', String(id));
  }
  OneSignal.setSubscription(true);
  //NavigationService.navigate('ContraCheque', { notification: true, month_text: "JAN", month: "1", year: "2020", item: "2020" });
}

function unsubscribeToNotification(id = null) {
  OneSignal.init('c6103ef8-8238-494e-b47a-d069b2f46f50', {
    kOSSettingsKeyAutoPrompt: true,
  });
  if (id) {
    OneSignal.deleteTag('user', String(id));
  }
}

export { subscribeToNotification, unsubscribeToNotification };
