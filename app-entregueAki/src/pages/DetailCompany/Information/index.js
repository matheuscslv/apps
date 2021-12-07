import React from 'react';
import { View } from 'react-native';

import { Container, CardAddress, CardValue, Title, Text } from './styles';
import formatMoney from '~/Components/ConvertMoney';

export default function Information({ informacoes }) {
  return (
    <Container>
      <CardValue>
        <Title>Taxas de Entrega</Title>

        <View style={{ padding: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>Bairro</Text>
          <Text>Taxa</Text>
        </View>

        {informacoes.taxas_entregas.map(item => (
          <View style={{ borderTopColor: "#ccc", padding: 10, marginBottom: 10, borderTopWidth: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>{item.bairro}</Text>
            <Text>R$ {formatMoney(item.taxa)}</Text>
          </View>
        ))}
      </CardValue>

      <CardAddress>
        <Title>Endereço</Title>

        <View style={{ padding: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>Endereço</Text>
          <Text>{informacoes.logradouro}, {informacoes.numero}</Text>
        </View>

        <View style={{ borderTopColor: "#ccc", padding: 10, marginBottom: 10, borderTopWidth: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>Contato</Text>
          <Text>{informacoes.telefone}</Text>
        </View>

      </CardAddress>
    </Container>
  );
}
