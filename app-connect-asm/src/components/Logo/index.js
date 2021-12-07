import React from 'react';

import { Center, Image } from './styles';

export default function Logo() {
  return (
    <Center>
      <Image resizeMode={'stretch'} source={require('~/assets/banner.jpeg')} />
    </Center>
  );
}
