import OneSignal from 'react-native-onesignal';

import NavigationService from './navigation';

function onReceived(notification) {
  // console.tron.warn('Notification received: ', notification);
}

async function onOpened(openResult) {
  if (openResult.notification.payload.additionalData) {
    const { pedido_id } = openResult.notification.payload.additionalData;

    await new Promise((resolve) => setTimeout(resolve, 1500));

    NavigationService.navigate('PurchaseDetail', { id: pedido_id });
  }
}

function onIds(device) {
  // console.log('Device info: ', device);
}

function subscribeToNotification(id = null) {
  OneSignal.init('ccf43fa7-7427-46d6-baa5-fe09dd94b251', {
    kOSSettingsKeyAutoPrompt: true,
  });
  OneSignal.addEventListener('received', onReceived);
  OneSignal.addEventListener('opened', onOpened);
  OneSignal.addEventListener('ids', onIds);
  if (id) {
    OneSignal.sendTag('user', String(id));
  }
  OneSignal.setSubscription(true);
}

function unsubscribeToNotification(id = null) {
  OneSignal.init('ccf43fa7-7427-46d6-baa5-fe09dd94b251', {
    kOSSettingsKeyAutoPrompt: true,
  });
  if (id) {
    OneSignal.deleteTag('user', String(id));
  }
}

export { subscribeToNotification, unsubscribeToNotification };
