import React from 'react';
import { TouchableOpacity, View, Text, Linking } from 'react-native';

import DeviceInfo from 'react-native-device-info';
import msb from '~/assets/msb.png';

import { Container, Companies, Companie, Logo, Divider, Title } from './styles';

export default function About() {
  return (
    <Container>
      <Divider>
        <Title>desenvolvido por</Title>
      </Divider>

      <Companies duration={500}>
        <Companie>
          <TouchableOpacity
            onPress={() => Linking.openURL('http://www.msbtec.com.br')}
          >
            <Logo source={msb} resizeMode="contain" />
          </TouchableOpacity>
        </Companie>
      </Companies>

      <View
        style={{
          marginBottom: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 21, color: '#333' }}>
          Versão: {DeviceInfo.getVersion()}
        </Text>
        <Text style={{ fontSize: 16, color: '#999' }}>
          © Facull.com - Todos os direitos reservados
        </Text>
      </View>
    </Container>
  );
}
