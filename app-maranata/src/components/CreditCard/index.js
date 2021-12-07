import React, { useState } from 'react';
import { Switch, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';

import { getFlagWithNumber, getIconWithNumber } from '~/scripts/card';
import { WalletTypes } from '~/store/ducks/wallet';

import Button from '../Button';
import {
  Container,
  Header,
  HeaderTitle,
  Content,
  InputContainer,
  InputContainer2,
  InputNumber,
  ImageCard,
  InputCode,
  InputValid,
  InputName,
  CheckContainer,
  CheckTitle,
  Scroll,
} from './styles';

export default function CreditCard({ onClose }) {
  const dispatch = useDispatch();
  const [number, setNumber] = useState('');
  const [validity, setValidity] = useState('');
  const [ccv, setCcv] = useState('');
  const [name, setName] = useState('');
  const [save, setSave] = useState(false);
  const [isDefault, setDefault] = useState(true);
  const [loading, setLoading] = useState(false);

  function addNewCard() {
    setLoading(true);
    try {
      let [mes_expiracao, ano_expiracao] = validity.split('/');

      if (number.length !== 19) {
        Alert.alert('Erro', 'Preencha o número do cartão corretamente!');
        setLoading(false);
        return;
      }

      const bandeira = getFlagWithNumber(number);

      if (!bandeira) {
        Alert.alert(
          'Erro',
          'A bandeira do seu cartão não é válida para contiuar a transação!',
        );
        setLoading(false);
        return;
      }

      if (
        !mes_expiracao ||
        !ano_expiracao ||
        mes_expiracao.length !== 2 ||
        ano_expiracao.length < 2
      ) {
        setLoading(false);
        Alert.alert('Erro', 'Preencha o campo de validade corretamente!');
        return;
      }

      if (ccv.length !== 3) {
        Alert.alert('Erro', 'Preencha o CVV corretamente!');
        setLoading(false);
        return;
      }

      if (!name) {
        Alert.alert('Erro', 'Informe o titular do cartão!');
        setLoading(false);
        return;
      }

      if (ano_expiracao.length === 2) {
        ano_expiracao = `20${ano_expiracao}`;
      }

      if (!bandeira) {
        Alert.alert(
          'Erro',
          'A bandeira do seu cartão não é válida para contiuar a transação!',
        );
        return;
      }

      const data = {
        numero_cartao: String(number).replace(/[\s-]/g, ''),
        mes_expiracao,
        ano_expiracao,
        titular: name,
        codigo_seguranca: ccv,
        bandeira,
      };

      dispatch({
        type: WalletTypes.GET_ADD_CARD_REQUEST,
        card: data,
        save: isDefault,
        onClose,
        setLoading,
      });
    } catch (e) {
      Alert.alert('Erro', 'Preencha o campo de validade corretamente!');
      setLoading(false);
    }
  }

  return (
    <Container>
      <Scroll showsVerticalScrollIndicator={false}>
        <Header onPress={() => onClose(false)}>
          <Icon name="close" size={25} color="#fff" />
          <HeaderTitle>Adicionar cartão de crédito</HeaderTitle>
        </Header>

        <Content>
          <InputContainer>
            <InputNumber
              onChangeText={setNumber}
              value={number}
              placeholder="Número do Cartão"
              keyboardType="number-pad"
              placeholderTextColor="#666"
            />
            <ImageCard
              source={getIconWithNumber(number)}
              resizeMode="contain"
            />
          </InputContainer>
          <InputContainer2>
            <InputValid
              onChangeText={setValidity}
              value={validity}
              placeholder="MM/YYYY"
              keyboardType="number-pad"
              placeholderTextColor="#666"
            />
            <InputCode
              onChangeText={setCcv}
              value={ccv}
              placeholder="CVV"
              keyboardType="number-pad"
              placeholderTextColor="#666"
            />
          </InputContainer2>
          <InputName
            onChangeText={setName}
            value={name}
            autoCapitalize="words"
            autoCorrect={false}
            maxLength={150}
            placeholder="NOME COMPLETO DO TITULAR"
            placeholderTextColor="#666"
          />

          <CheckContainer>
            <CheckTitle>Usar cartão nas próximas compras</CheckTitle>
            <Switch
              onValueChange={() => setDefault(!isDefault)}
              value={isDefault}
            />
          </CheckContainer>
          <Button
            onSubmit={addNewCard}
            title="OK"
            loading={loading}
            disable={loading}
            style={{
              marginTop: 10,
            }}
          />
        </Content>
      </Scroll>
    </Container>
  );
}
