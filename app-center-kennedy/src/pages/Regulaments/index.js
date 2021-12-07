import React from 'react';
import {View} from 'react-native';

import {Container, Item, Title, SubTitle} from './styles';

export default function Regulaments({navigation}) {
  return (
    <Container>
      <Item
        onPress={() => {
          navigation.navigate('RegulamentDetail', {title: 'Frete'});
        }}>
        <Title>Frete</Title>
        <SubTitle>Confira regras e exceções aqui</SubTitle>
      </Item>
      <Item
        onPress={() => {
          navigation.navigate('RegulamentDetail', {title: 'Frete'});
        }}>
        <Title>Frete</Title>
        <SubTitle>Confira regras e exceções aqui</SubTitle>
      </Item>
      <Item
        onPress={() => {
          navigation.navigate('RegulamentDetail', {title: 'Frete'});
        }}>
        <Title>Frete</Title>
        <SubTitle>Confira regras e exceções aqui</SubTitle>
      </Item>
    </Container>
  );
}

Regulaments.navigationOptions = {
  headerTitle: 'Regulamentos',
};
