import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Platform, Alert, Modal } from 'react-native';

import {
  Container,
  Top,
  Session,
  BoxNotify,
  Item,
  NameItem,
  Icone,
  Center,
  Image,
} from './styles';

import { StackActions, NavigationActions } from 'react-navigation';

import Logo from '~/components/Logo';

import { user_service, connect_service } from '~/services/api';
import store from '~/services/storage';

import Banners from '~/components/Banners';
import { showMessage } from 'react-native-flash-message';

import ContraCheque from '~/pages/ListMonths/ContraCheque';
import { subscribeToNotification, unsubscribeToNotification } from '~/services/notification'

export default function Main({ navigation }) {
  const [anos, setAnos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(navigation.getParam("notification") || false);
  const [data, setData] = useState(`${navigation.getParam("month")}/${navigation.getParam("user")}/${navigation.getParam("year")}`)

  useEffect(() => {
    notificationOn();
    getContraCheques();
  }, []);

  async function notificationOn() {
    const user = await store.get('User');
    subscribeToNotification(user.cpf);
  }

  async function getContraCheques() {
    try {
      setLoading(true);

      const user = await store.get('User');
      const { data } = await connect_service.get(`/events/${user.cpf}/years`);

      let anos = [];
      for (let i = 0; i < data.length; i++) {
        anos.push({ ano: data[i].ano });
      }

      setAnos(anos);
      setLoading(false);
    } catch (error) {
      let resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'SignIn' })],
      });

      //Você não possui mais acesso! Qualquer dúvida favor contatar o RH.
      if (String(error).includes('401')) {
        await store.save('token', null);
        const user = await store.get('User');
        unsubscribeToNotification(user.cpf);
        await store.save('User', null);

        Alert.alert(
          'Não autorizado',
          "Seu acesso ao sistema está bloqueado. Para regularizá-lo, procure o RH.",
          [{ text: 'OK', onPress: () => navigation.dispatch(resetAction) }],
          { cancelable: false },
        );
      } else {
        showMessage({
          message: 'Desculpe, no momento o sistema encontra-se indisponível. Por favor, tente novamente daqui a alguns minutos.',
          type: 'danger',
          autoHide: false
        });
        navigation.dispatch(resetAction)
      }
    }
  }

  return (
    <>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator
            style={{ marginTop: 10 }}
            size="large"
            color={'#000'}
          />
        </View>
      ) : (
          <Container>
            <View>
              {/* <Logo /> */}

              {Platform.OS === 'android' ? (
                <Banners
                  data={[
                    {
                      id: 1,
                      image:
                        'https://calendariopis2020.com.br/wp-content/uploads/2019/08/APP-CAIXA-TRABALHADOR-1280x720.jpg',
                      url:
                        'https://play.google.com/store/apps/details?id=br.gov.caixa.trabalhador&hl=pt_BR',
                    },
                    {
                      id: 2,
                      image:
                        'https://lh3.googleusercontent.com/ZEACvivcpQfNcK3H3KcqsQRr0HDH4rlz31bzGwz6TevaurtjBlGndZV0nf2L2BnxJlE',
                      url:
                        'https://play.google.com/store/apps/details?id=br.gov.caixa.fgts.trabalhador&hl=pt_BR',
                    },
                  ]}
                />
              ) : (
                  <Logo />
                  // <Banners
                  //   data={[
                  //     {
                  //       id: 1,
                  //       image:
                  //         'https://calendariopis2020.com.br/wp-content/uploads/2019/08/APP-CAIXA-TRABALHADOR-1280x720.jpg',
                  //       url:
                  //         'https://apps.apple.com/br/app/caixa-trabalhador/id1047323337?l=en',
                  //     },
                  //     {
                  //       id: 2,
                  //       image:
                  //         'https://lh3.googleusercontent.com/ZEACvivcpQfNcK3H3KcqsQRr0HDH4rlz31bzGwz6TevaurtjBlGndZV0nf2L2BnxJlE',
                  //       url: 'https://apps.apple.com/br/app/fgts/id1038441027?l=en',
                  //     },
                  //   ]}
                  // />
                )}

              <Top>
                <Session>CONTRACHEQUES</Session>
              </Top>

              {anos.map(item => (
                <BoxNotify
                  key={item.id}
                  onPress={() =>
                    navigation.navigate('ListMonths', { item: item.ano })
                  }>
                  <Item>
                    <NameItem>{item.ano}</NameItem>
                  </Item>
                  <Icone name="right" color="#999" size={20} />
                </BoxNotify>
              ))}
            </View>
          </Container>
        )}

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => { }}>
        <ContraCheque data={data} setModalVisible={setModalVisible} />
      </Modal>

    </>
  );
}
