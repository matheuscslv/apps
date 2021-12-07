import React, { memo } from 'react';

import ball from '~/assets/animations/spinning-ball.json';
import { NunitoSemiBold } from '~/styles';

import { Container, Animation } from './styles';

function Loading({ title }, props) {
  return (
    <Container>
      <Animation
        source={ball}
        autoPlay
        loop
        resizeMode="contain"
        autoSize
        {...props}
      />
      <NunitoSemiBold>{title || 'CARREGANDO ...'}</NunitoSemiBold>
    </Container>
  );
}

export default memo(Loading);
