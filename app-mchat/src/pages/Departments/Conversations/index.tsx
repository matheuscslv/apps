import React from 'react';

import CardChat from '@components/CardChat';

import { Container } from './styles';

const Conversations: React.FC = () => {
  return (
    <Container>
      <CardChat />
    </Container>
  );
};

export default Conversations;
