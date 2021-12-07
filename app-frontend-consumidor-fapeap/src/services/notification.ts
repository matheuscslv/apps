import OneSignal, {
  OpenResult,
  ReceivedNotification,
} from 'react-native-onesignal';

import api from './api';
import { navigate } from './navigation';

const apikey = '344214ab-5d79-4019-a9d4-ef29f23e0356';

function onReceived(_notification: ReceivedNotification): void {
  // console.tron.warn('Notification received: ', notification);
}

async function onOpened(openResult: OpenResult): Promise<void> {
  try {
    if (openResult.notification.payload.additionalData) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const data = openResult.notification.payload.additionalData;

      // navigate('MyDelivery');

      api
        .get(`consumidor/pedidos/itens/${data.pedido_id}`)
        .then(({ data: responsePedido }) => {
          api
            .get(`fornecedor/${responsePedido[0].produto.fornecedor_id}`)
            .then(({ data: responseFornecedor }) => {
              try {
                navigate('DetailsDelivery', {
                  item: {
                    pedido: {
                      id: data.pedido_id,
                      fornecedor: responseFornecedor,
                      status_pedido: data.status_pedido,
                      created_at: responsePedido[0].created_at,
                      updated_at: responsePedido[0].updated_at,
                      delivery: true,
                    },
                    produtos: responsePedido,
                  },
                });
              } catch (error) {
                navigate('MyDelivery');
              }
            })
            .catch((error) => {
              navigate('MyDelivery');
            });
        })
        .catch((error) => {
          navigate('MyDelivery');
        });
    }
  } catch (error) {
    navigate('MyDelivery');
  }
}

function onIds(_device: any): void {
  // console.log('Device info: ', device);
}

function subscribeToNotification(idKey: string): void {
  OneSignal.init(apikey, {
    kOSSettingsKeyAutoPrompt: true,
  });
  OneSignal.addEventListener('received', onReceived);
  OneSignal.addEventListener('opened', onOpened);
  OneSignal.addEventListener('ids', onIds);
  if (idKey) {
    OneSignal.sendTag('user', idKey);
  }
  OneSignal.setSubscription(true);
}

function unsubscribeToNotification(id: string | undefined): void {
  OneSignal.init(apikey, {
    kOSSettingsKeyAutoPrompt: true,
  });
  if (id) {
    OneSignal.deleteTag('user', id);
  }
}

export { subscribeToNotification, unsubscribeToNotification };
