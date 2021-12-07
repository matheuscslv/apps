import React from 'react';

import { Container, Title, Icon } from './styles';

const IsEmpty: React.FC = ({ children }) => {
  return (
    <Container>
      <Icon name="message1" />
      <Title> {children} </Title>
    </Container>
  );
};

export default IsEmpty;
