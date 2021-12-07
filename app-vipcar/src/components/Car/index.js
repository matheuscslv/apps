import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { withNavigation } from 'react-navigation';

import { Container } from './styles';

function Car(props) {
  const [car, setCar] = useState(props.data);

  return (
    <Container onPress={() => props.navigation.navigate('Detail', { item: car })}>
      <View>
        <Text style={{ fontWeight: 'bold' }}>{String(car.full_name).trim()}</Text>
        <View style={{ flexDirection: 'row' }}><Text style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Placa: </Text><Text>{car.plate}</Text></View>
        <View style={{ flexDirection: 'row' }}><Text style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Loja: </Text><Text>{car.tenant_fancy_name}</Text></View>
      </View>

      <View>

      </View>

      <View>
        <Text style={{ fontWeight: 'bold' }}>Valor</Text>
        <Text>R$ {car.sale_price}</Text>
      </View>
    </Container>
  );
}

export default withNavigation(Car);
