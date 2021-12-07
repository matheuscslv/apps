import React, { memo, useMemo } from 'react';

import { IConversation } from '@dtos/ConversationsDTO';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  ContentContact,
  Contact,
  Message,
  ContentInfo,
  Hour,
  Tooltip,
} from './styles';

interface ICardChatProps {
  chat: IConversation;
}

const CardChat: React.FC<ICardChatProps> = ({ chat }) => {
  const navigation = useNavigation();

  const messages = useMemo(() => chat.chat, [chat]);

  const lastMessage = useMemo(() => {
    const dataLastMessage = messages[messages.length - 1];

    return {
      message: dataLastMessage.message,
      fromMe: dataLastMessage.fromMe,
    };
  }, [messages]);

  const formattedLastMessage = useMemo(() => {
    const { text, name } = lastMessage.message;
    const message = text || name;

    return lastMessage.fromMe ? message : `você: ${message}`;
  }, [lastMessage]);

  const activeConversation = useMemo(() => chat.status !== 'FINISHED', [
    chat.status,
  ]);

  return (
    <Container
      onPress={() =>
        navigation.navigate('Chat', {
          name: chat.name,
          chatId: chat.id,
          activeConversation,
        })
      }
    >
      <ContentContact>
        <Contact>{chat.name}</Contact>
        <Message numberOfLines={1}>{formattedLastMessage}</Message>
      </ContentContact>
      <ContentInfo>
        <Hour>08:32</Hour>
        {chat.new > 0 && <Tooltip color="success">{chat.new}</Tooltip>}
      </ContentInfo>
    </Container>
  );
};

export default memo(CardChat);
