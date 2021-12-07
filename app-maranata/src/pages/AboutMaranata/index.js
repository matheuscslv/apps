import React from 'react';
import { TouchableOpacity, View, Text, Linking } from 'react-native';
import banner from '~/assets/banner.png';

import { Container, Logo } from './styles';

export default function AboutMaranata() {
  return (
    <Container>
      <Logo source={banner} resizeMode="stretch" />
    </Container>
  );
}
