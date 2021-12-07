import OneSignal, { OpenResult } from 'react-native-onesignal';

import { useNavigation } from '@react-navigation/native';

function onOpened(openResult: OpenResult): void {
  const navigation = useNavigation();

  try {
    if (openResult.notification.payload.additionalData) {
      const {
        pedido_id: pedido,
      } = openResult.notification.payload.additionalData;
      navigation.navigate('DetailsDelivery', { pedido });
    } else {
      navigation.navigate('Home');
    }
  } catch (error) {
    navigation.navigate('Home');
  }
}

function subscribeToNotification(id: string | null): void {
  OneSignal.init('344214ab-5d79-4019-a9d4-ef29f23e0356', {
    kOSSettingsKeyAutoPrompt: true,
  });
  OneSignal.addEventListener('opened', onOpened);
  if (id) {
    OneSignal.sendTag('user', id);
  }
  OneSignal.setSubscription(true);
}

function unsubscribeToNotification(id: string | null): void {
  OneSignal.init('344214ab-5d79-4019-a9d4-ef29f23e0356', {
    kOSSettingsKeyAutoPrompt: true,
  });
  if (id) {
    OneSignal.deleteTag('user', id);
  }
}

export { subscribeToNotification, unsubscribeToNotification };
