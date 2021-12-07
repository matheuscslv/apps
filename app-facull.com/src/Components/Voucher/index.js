import React, { useState, useCallback } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';

import { WalletTypes } from '~/store/ducks/wallet';
import { colors } from '~/styles';

import {
  Container,
  Header,
  HeaderTitle,
  Content,
  InputContainer,
  InputNumber,
  Button,
  ButtonText,
  Span,
} from './styles';

export default function Voucher({ onClose }) {
  const dispatch = useDispatch();
  const [number, setNumber] = useState('');

  function requestNewCredit() {
    dispatch({
      type: WalletTypes.GET_ADD_CREDIT_REQUEST,
      number,
      onClose,
    });
  }

  return (
    <Container>
      <Header onPress={() => onClose(false)}>
        <Icon name="close" size={25} color="#fff" />
        <HeaderTitle>Adicionar crédito voucher</HeaderTitle>
      </Header>
      <Content>
        <InputContainer>
          <InputNumber
            onChangeText={setNumber}
            value={number}
            placeholder="Código do voucher"
            keyboardType="number-pad"
          />
        </InputContainer>

        <Button onPress={requestNewCredit}>
          <ButtonText>OK</ButtonText>
        </Button>

        <Span>
          Uma vez creditado, você não poderá mais utilizar este código!
        </Span>
      </Content>
    </Container>
  );
}
