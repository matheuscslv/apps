import React from 'react';

import CardChat from '@components/CardChat';
import IsEmpty from '@components/IsEmpty';
import { useConversations } from '@hooks/conversations';

import { Container } from './styles';

const InHold: React.FC = () => {
  const { conversations } = useConversations();

  const users = conversations.filter((chat) => chat.status === 'InHOLD');

  if (users.length === 0) {
    return <IsEmpty>Não há atendimentos em espera</IsEmpty>;
  }

  return (
    <Container>
      {users.map((chat) => (
        <CardChat key={chat.id} chat={chat} />
      ))}
    </Container>
  );
};

export default InHold;
