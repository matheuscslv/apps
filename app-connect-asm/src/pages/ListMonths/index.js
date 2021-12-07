import React, { useState, useEffect } from 'react';
import { View, Platform, ActivityIndicator, Modal } from 'react-native';

import {
  Container,
  Top,
  Session,
  BoxNotify,
  Item,
  NameItem,
  Icone,
  ButtonAnnual,
  ButtonAnnualText,
} from './styles';

import Logo from '~/components/Logo';

import ContraCheque from './ContraCheque';
import { user_service, connect_service } from '~/services/api';
import store from '~/services/storage';

import Banners from '~/components/Banners';

export default function ListMonths(props) {
  //const [data, setData] = useState('');
  const [ano] = useState(props.navigation.getParam('item'));
  const [loading, setLoading] = useState(false);
  //const [modalVisible, setModalVisible] = useState(false);

  const [modalVisible, setModalVisible] = useState(props.navigation.getParam("notification") || false);
  const [data, setData] = useState(`${props.navigation.getParam("month")}/${props.navigation.getParam("user")}/${props.navigation.getParam("year")}`)

  useEffect(() => {
    getContraCheques();
  }, []);

  async function getContraCheques() {
    setLoading(true);

    const user = await store.get('User');
    const meses = await connect_service.get(`/events/${user.cpf}/years/${ano}`);
    console.log(meses.data)

    let months = [];
    for (let i = 0; i < meses.data.length; i++) {
      if (meses.data[i].mes == 1) {
        months.push({ id: 1, mes: 'JAN' });
      }
      if (meses.data[i].mes == 2) {
        months.push({ id: 2, mes: 'FEV' });
      }
      if (meses.data[i].mes == 3) {
        months.push({ id: 3, mes: 'MAR' });
      }
      if (meses.data[i].mes == 4) {
        months.push({ id: 4, mes: 'ABR' });
      }
      if (meses.data[i].mes == 5) {
        months.push({ id: 5, mes: 'MAI' });
      }
      if (meses.data[i].mes == 6) {
        months.push({ id: 6, mes: 'JUN' });
      }
      if (meses.data[i].mes == 7) {
        months.push({ id: 7, mes: 'JUL' });
      }
      if (meses.data[i].mes == 8) {
        months.push({ id: 8, mes: 'AGO' });
      }
      if (meses.data[i].mes == 9) {
        months.push({ id: 9, mes: 'SET' });
      }
      if (meses.data[i].mes == 10) {
        months.push({ id: 10, mes: 'OUT' });
      }
      if (meses.data[i].mes == 11) {
        months.push({ id: 11, mes: 'NOV' });
      }
      if (meses.data[i].mes == 12) {
        months.push({ id: 12, mes: 'DEZ' });
      }
    }

    setMeses(months);

    setLoading(false);
  }

  const [meses, setMeses] = useState([
    { id: 1, mes: 'JAN' },
    { id: 2, mes: 'FEV' },
    { id: 3, mes: 'MAR' },
    { id: 4, mes: 'ABR' },
    { id: 5, mes: 'MAI' },
    { id: 6, mes: 'JUN' },
    { id: 7, mes: 'JUL' },
    { id: 8, mes: 'AGO' },
    { id: 9, mes: 'SET' },
    { id: 10, mes: 'OUT' },
    { id: 11, mes: 'NOV' },
    { id: 12, mes: 'DEZ' },
  ]);

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

              {/* <Top>
                <Session>Demonstrativo de Rendimento Anual</Session>
              </Top>

              <ButtonAnnual>
                <Icone name="download" color="#FFF" size={20} />
                <ButtonAnnualText>Rendimento Anual</ButtonAnnualText>
              </ButtonAnnual> */}

              <Top>
                <Session>MÊS DE CÁLCULO</Session>
              </Top>

              {meses.map(item => (
                <BoxNotify
                  key={item.id}
                  onPress={() => {
                    setData(`${item.id}/${item.mes}/${ano}`);
                    setModalVisible(true);
                  }}>
                  <Item>
                    <NameItem>
                      {item.mes} / {ano}
                    </NameItem>
                  </Item>
                  <Icone name="right" color="#999" size={20} />
                </BoxNotify>
              ))}
            </View>

            <Modal
              animationType="slide"
              transparent={false}
              visible={modalVisible}
              onRequestClose={() => { }}>
              <ContraCheque data={data} setModalVisible={setModalVisible} />
            </Modal>
          </Container>
        )}
    </>
  );
}
