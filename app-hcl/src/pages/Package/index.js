import React, { useState, useEffect, useMemo } from 'react';
import { Modal } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { useSelector } from 'react-redux';

import profile from '~/assets/profile.png';
import Loading from '~/components/Loading';
import ModalChangePackage from '~/components/ModalChangePackage';
import api from '~/services/api';

import ItemContent from './ItemContent';
import {
  Container,
  Header,
  Avatar,
  PackageName,
  Bold,
  DaysPackageName,
  Button,
  ButtonText,
  Content,
  Title,
} from './styles';

export default function Package() {
  const payment_released = useSelector(
    state => state.constants?.payment_released
  );
  const package_user = useSelector(state => state.user.data?.package?.name);
  const avatar_user = useSelector(state => state.user.data?.url);
  const package_days = useSelector(state => state.user.data?.weekdays);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    getHistoryPackages();
  }, []);

  async function getHistoryPackages() {
    setLoading(true);
    const response = await api.get('/userpackages/history');
    setPayments(response.data);
    setLoading(false);
  }

  const packageDaysFormmated = useMemo(() => {
    return package_days ? package_days.join(' - ') : 'Sob escolha do usuário';
  }, [package_days]);

  return (
    <>
      <Container>
        <Header>
          <Avatar source={avatar_user ? { uri: avatar_user } : profile} />
          <PackageName>
            Pacote vigente: <Bold>{package_user}</Bold>
          </PackageName>
          <DaysPackageName>{packageDaysFormmated}</DaysPackageName>

          {payment_released && (
            <Button onPress={() => setModal(true)}>
              <Icon name="redo" color="#000" size={30} />
              <ButtonText>ALTERAR PACOTE</ButtonText>
            </Button>
          )}
        </Header>

        <Content>
          <Title>Lançamentos</Title>
          {payments?.map(payment => (
            <ItemContent key={payment.id} payment={payment} />
          ))}
          {loading && <Loading style={{ marginTop: 30 }} />}
        </Content>
      </Container>

      <Modal
        animationType="fade"
        transparent
        visible={modal}
        onRequestClose={() => setModal(false)}
      >
        <ModalChangePackage
          closeModal={() => setModal(false)}
          onClose={() => {
            setModal(false);
            getHistoryPackages();
          }}
        />
      </Modal>
    </>
  );
}
