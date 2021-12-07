import React, { useState, useEffect } from 'react';
import { Switch, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';

import getIconCard from '~/scripts/IconCards';
import { WalletTypes } from '~/store/ducks/wallet';

import ButtonDefault from '../ButtonDefault';
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
  const user = useSelector(state => state.user.data);

  const [number, setNumber] = useState('');
  const [validity, setValidity] = useState('');
  const [ccv, setCcv] = useState('');
  const [name, setName] = useState('');
  const [isHolder, setHolder] = useState(true);
  const [cpfHolder, setCpfHolder] = useState(user.cpf);
  // const [dataNascHolder, setDataNascHolder] = useState(user.data_nascimento);
  const [save, setSave] = useState(false);
  const [isDefault, setDefault] = useState(true);
  const [loading, setLoading] = useState(false);

  /*   useEffect(() => {
    if (isHolder) {
      setCpfHolder(user.cpf);
      // setDataNascHolder(user.data_nascimento);
    } else {
      setCpfHolder('');
      // setDataNascHolder('');
    }
  }, [isHolder, user.cpf]); */

  function addNewCard() {
    setLoading(true);
    try {
      let [mes_expiracao, ano_expiracao] = validity.split('/');

      if (
        !mes_expiracao ||
        !ano_expiracao ||
        ccv.length !== 3 ||
        number.length !== 19 ||
        mes_expiracao.length !== 2 ||
        ano_expiracao.length < 2
      ) {
        setLoading(false);
        Alert.alert('Erro', 'Preencha corretamente os campos!');
        return;
      }

      if (ano_expiracao.length === 2) {
        ano_expiracao = `20${ano_expiracao}`;
      }

      const data = {
        numero_cartao: number,
        mes_expiracao,
        ano_expiracao,
        titular: name,
        codigo_seguranca: ccv,

        // cpf: cpfHolder,
        // data_nasc: dataNascHolder,
      };
      dispatch({
        type: WalletTypes.GET_ADD_CARD_REQUEST,
        card: data,
        save: isDefault,
        onClose,
        setLoading,
      });
    } catch (e) {
      Alert.alert('Erro', 'Preencha corretamente os campos!');
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
            <ImageCard source={getIconCard(number)} resizeMode="contain" />
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
          {/*
          <Label>CPF do titular</Label>
          <InputMask
            editable={!isHolder}
            type="cpf"
            onChangeText={setCpfHolder}
            value={cpfHolder}
            placeholder="CPF do titular"
          />
           <Label>Data de nascimento do titular</Label>
          <InputMask
            editable={!isHolder}
            type="datetime"
            options={{
              format: 'DD/MM/YYYY',
            }}
            onChangeText={setDataNascHolder}
            value={dataNascHolder}
            placeholder="DD/MM/YYYY"
          />

          <CheckContainer>
            <CheckTitle>Você é o titular do cartao?</CheckTitle>
            <Switch
              onValueChange={() => setHolder(!isHolder)}
              value={isHolder}
            />
          </CheckContainer>
        */}
          {/* <CheckContainer>
            <CheckTitle>Salvar cartão</CheckTitle>
            <Switch onValueChange={() => setSave(!save)} value={save} />
          </CheckContainer> */}
          <CheckContainer>
            <CheckTitle>Usar cartao nas próximas compras</CheckTitle>
            <Switch
              onValueChange={() => setDefault(!isDefault)}
              value={isDefault}
            />
          </CheckContainer>
          <ButtonDefault
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
