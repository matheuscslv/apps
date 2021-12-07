import React, { memo } from 'react';
import { View } from 'react-native';

import { Container, Title } from './styles';

function Empty({ title }, props) {
  return (
    <Container>
      <Title {...props}>
        {title || 'Nenhuma pelada marcada!\nAguarde no aquecimento!'}
      </Title>
    </Container>
  );
}

export default memo(Empty);
