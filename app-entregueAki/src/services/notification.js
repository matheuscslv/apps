import React from 'react';

import OneSignal from 'react-native-onesignal';

import NavigationService from './navigation';

function onReceived(notification) {
  // console.tron.warn('Notification received: ', notification);
}

function onOpened(openResult) {
  try {
    if (openResult.notification.payload.additionalData) {
      const { pedido_id } = openResult.notification.payload.additionalData;
      NavigationService.navigate('DetailRequest', { item: { id: pedido_id } });
    } else {
      NavigationService.navigate('Main');
    }
  } catch (error) {
    NavigationService.navigate('Main');
  }
}

function onIds(device) {
  // console.log('Device info: ', device);
}

function subscribeToNotification(id = null) {
  OneSignal.init('93a7884b-2773-4f79-965b-0def4016336c', {
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
  OneSignal.init('93a7884b-2773-4f79-965b-0def4016336c', {
    kOSSettingsKeyAutoPrompt: true,
  });
  if (id) {
    OneSignal.deleteTag('user', String(id));
  }
}

export { subscribeToNotification, unsubscribeToNotification };
