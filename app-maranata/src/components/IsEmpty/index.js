import React from 'react';

import { Container, Title } from './styles';

export default function IsEmpty({ title, children }) {
  return (
    <Container>
      <Title>{title || children}</Title>
    </Container>
  );
}
