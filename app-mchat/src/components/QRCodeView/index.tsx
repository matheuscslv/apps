/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import QRCodeScanner, { Event } from 'react-native-qrcode-scanner';

import { Content, HeaderText, ButtonBack, ButtonBackText } from './styles';

interface IQRCodeProps {
  onSubmit(e: Event): void;
  onClose(): void;
}

const QRCodeView: React.FC<IQRCodeProps> = ({ onSubmit, onClose }) => {
  return (
    <QRCodeScanner
      onRead={onSubmit}
      topContent={
        <Content>
          <HeaderText>
            Acesse o painel administrativo do mChat para escanear o QRCODE!
          </HeaderText>
        </Content>
      }
      bottomContent={
        <Content>
          <ButtonBack onPress={onClose}>
            <ButtonBackText>Voltar</ButtonBackText>
          </ButtonBack>
        </Content>
      }
    />
  );
};

export default QRCodeView;
