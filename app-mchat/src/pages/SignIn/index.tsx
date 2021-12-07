import React, { useState, useCallback } from 'react';
import Modal from 'react-native-modal';
import { Event } from 'react-native-qrcode-scanner';
import FaIcon from 'react-native-vector-icons/FontAwesome';

import logomchat from '@assets/login_mchat.png';
import logomsb from '@assets/logo-msb.png';
import ModalPassword from '@components/ModalPassword';
import QRCodeView from '@components/QRCodeView';
import { useTheme } from 'styled-components';

import {
  Container,
  LogoHeader,
  Button,
  ButtonText,
  LogoBottom,
} from './styles';

const SignIn: React.FC = () => {
  const { colors } = useTheme();
  const [modalPassword, setModalPassword] = useState(false);
  const [cam, setCam] = useState(false);

  const closeModal = useCallback(() => {
    setModalPassword(false);
  }, []);

  const handleScanQRCode = useCallback((e: Event) => {
    console.log(e.data);
    setCam(false);
    setTimeout(() => setModalPassword(true), 500);
  }, []);

  if (cam) {
    return (
      <QRCodeView onClose={() => setCam(false)} onSubmit={handleScanQRCode} />
    );
  }

  return (
    <Container>
      <LogoHeader source={logomchat} />
      <Button onPress={() => setCam(true)}>
        <FaIcon name="qrcode" size={70} color={colors.white} />
        <ButtonText>Escanear QRCODE</ButtonText>
      </Button>
      <LogoBottom source={logomsb} />
      <Modal
        isVisible={modalPassword}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
        avoidKeyboard
      >
        <ModalPassword callback={closeModal} />
      </Modal>
    </Container>
  );
};

export default SignIn;
