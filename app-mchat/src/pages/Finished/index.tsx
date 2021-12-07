import React from 'react';

import CardChat from '@components/CardChat';
import IsEmpty from '@components/IsEmpty';
import { useConversations } from '@hooks/conversations';

import { Container } from './styles';

const Finished: React.FC = () => {
  const { conversations } = useConversations();

  const users = conversations.filter((chat) => chat.status === 'FINISHED');

  if (users.length === 0) {
    return <IsEmpty>Não há atendimentos finalizados</IsEmpty>;
  }

  return (
    <Container>
      {users.map((chat) => (
        <CardChat key={chat.id} chat={chat} />
      ))}
    </Container>
  );
};

export default Finished;
