import React, { useState, useEffect } from 'react';
import { Switch, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';

import getIconCard from '~/scripts/IconCards';
import { WalletTypes } from '~/store/ducks/wallet';

import ButtonDefault from '~/Components/ButtonDefault';
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

export default function CreditCard({
  number,
  setNumber,
  validity,
  setValidity,
  ccv,
  setCcv,
  name,
  setName,
  loading,
  setLoading
}) {

  const dispatch = useDispatch();

  return (
    <Container>
      <Scroll showsVerticalScrollIndicator={false}>

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

        </Content>
      </Scroll>
    </Container>
  );
}
